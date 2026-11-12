/**
 * Check-in rules and database access.
 *
 * - One check-in ≈ one month of answers. Each is its own row; old check-ins
 *   are never overwritten.
 * - An unfinished check-in carries over until it's completed.
 * - Once completed, a new check-in starts when the app is opened
 *   CHECKIN_INTERVAL_DAYS or more after the completed one started.
 * - Inside an open check-in, answers can be changed until their dimension is
 *   finished; finished dimensions (and completed check-ins) are read-only.
 */
import { dimensions, isAvailable, type DimensionId } from '@/content/dimensions';
import { db, SQL_UUID } from '@/data/db';

export const CHECKIN_INTERVAL_DAYS = 30;
export const CONTENT_VERSION = '2026-11';
const DAY_MS = 24 * 60 * 60 * 1000;

export type CheckinStatus = 'in_progress' | 'completed' | 'abandoned';

export type Checkin = {
  id: string;
  period: string;
  status: CheckinStatus;
  startedAt: string;
  completedAt: string | null;
};

type CheckinRow = {
  id: string;
  period: string;
  status: CheckinStatus;
  started_at: string;
  completed_at: string | null;
};

const toCheckin = (r: CheckinRow): Checkin => ({
  id: r.id,
  period: r.period,
  status: r.status,
  startedAt: r.started_at,
  completedAt: r.completed_at,
});

const nowIso = () => new Date().toISOString();

function periodOf(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

/* ------------------------------------------------------------------ user */

function getOrCreateUserId(): string {
  const existing = db.getFirstSync<{ id: string }>('SELECT id FROM users ORDER BY created_at LIMIT 1');
  if (existing) return existing.id;
  const row = db.getFirstSync<{ id: string }>(
    `INSERT INTO users (id, created_at) VALUES (${SQL_UUID}, ?) RETURNING id`,
    nowIso(),
  );
  return row!.id;
}

/* -------------------------------------------------------------- check-ins */

function latestCheckin(userId: string): Checkin | null {
  const row = db.getFirstSync<CheckinRow>(
    'SELECT id, period, status, started_at, completed_at FROM checkins WHERE user_id = ? ORDER BY started_at DESC LIMIT 1',
    userId,
  );
  return row ? toCheckin(row) : null;
}

function createCheckin(userId: string, now = new Date()): Checkin {
  const iso = now.toISOString();
  const row = db.getFirstSync<CheckinRow>(
    `INSERT INTO checkins (id, user_id, period, status, started_at, content_version, updated_at)
     VALUES (${SQL_UUID}, ?, ?, 'in_progress', ?, ?, ?)
     RETURNING id, period, status, started_at, completed_at`,
    userId,
    periodOf(now),
    iso,
    CONTENT_VERSION,
    iso,
  );
  return toCheckin(row!);
}

/** The check-in the app should show right now (creates one when due). */
export function getOrCreateCurrentCheckin(now = new Date()): Checkin {
  const userId = getOrCreateUserId();
  const latest = latestCheckin(userId);
  if (!latest) return createCheckin(userId, now);
  if (latest.status === 'in_progress') return latest; // carries over
  if (now.getTime() - Date.parse(latest.startedAt) >= CHECKIN_INTERVAL_DAYS * DAY_MS) {
    return createCheckin(userId, now);
  }
  return latest; // completed, next one not due yet
}

/** Date the next check-in opens (only meaningful once the current one is completed). */
export function nextCheckinDate(checkin: Checkin): Date {
  return new Date(Date.parse(checkin.startedAt) + CHECKIN_INTERVAL_DAYS * DAY_MS);
}

/** All check-ins, newest first (for a future history screen). */
export function listCheckins(): Checkin[] {
  return db
    .getAllSync<CheckinRow>('SELECT id, period, status, started_at, completed_at FROM checkins ORDER BY started_at DESC')
    .map(toCheckin);
}

/* --------------------------------------------------------------- answers */

export function loadAnswers(checkinId: string): Map<string, number> {
  const rows = db.getAllSync<{ question_id: string; value: number }>(
    'SELECT question_id, value FROM answers WHERE checkin_id = ?',
    checkinId,
  );
  return new Map(rows.map((r) => [r.question_id, r.value]));
}

export function loadCompletedDimensions(checkinId: string): Set<DimensionId> {
  const rows = db.getAllSync<{ dimension_id: number }>(
    'SELECT dimension_id FROM dimension_progress WHERE checkin_id = ? AND completed_at IS NOT NULL',
    checkinId,
  );
  return new Set(rows.map((r) => r.dimension_id as DimensionId));
}

function dimensionOfQuestion(questionId: string): DimensionId | null {
  return dimensions.find((d) => d.questions.some((q) => q.id === questionId))?.id ?? null;
}

/** Insert or update one answer. Ignored if the check-in or dimension is closed. */
export function upsertAnswer(checkin: Checkin, questionId: string, value: number): boolean {
  const dimensionId = dimensionOfQuestion(questionId);
  if (dimensionId == null || checkin.status !== 'in_progress') return false;
  if (loadCompletedDimensions(checkin.id).has(dimensionId)) return false;

  const clamped = Math.max(0, Math.min(10, Math.round(value)));
  const now = nowIso();
  db.withTransactionSync(() => {
    db.runSync(
      `INSERT INTO answers (id, checkin_id, dimension_id, question_id, value, answered_at, updated_at)
       VALUES (${SQL_UUID}, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (checkin_id, question_id)
       DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
      checkin.id,
      dimensionId,
      questionId,
      clamped,
      now,
      now,
    );
    db.runSync('UPDATE checkins SET updated_at = ? WHERE id = ?', now, checkin.id);
  });
  return true;
}

/**
 * Mark a dimension finished. When every available dimension is finished, the
 * check-in itself is completed. Returns the (possibly updated) check-in.
 */
export function markDimensionCompleted(checkin: Checkin, dimensionId: DimensionId): Checkin {
  if (checkin.status !== 'in_progress') return checkin;
  const now = nowIso();
  db.withTransactionSync(() => {
    db.runSync(
      `INSERT INTO dimension_progress (checkin_id, dimension_id, completed_at, updated_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT (checkin_id, dimension_id)
       DO UPDATE SET completed_at = COALESCE(dimension_progress.completed_at, excluded.completed_at),
                     updated_at = excluded.updated_at`,
      checkin.id,
      dimensionId,
      now,
      now,
    );
    const done = loadCompletedDimensions(checkin.id);
    const allDone = dimensions.filter(isAvailable).every((d) => done.has(d.id));
    if (allDone) {
      db.runSync(
        "UPDATE checkins SET status = 'completed', completed_at = ?, updated_at = ? WHERE id = ?",
        now,
        now,
        checkin.id,
      );
    } else {
      db.runSync('UPDATE checkins SET updated_at = ? WHERE id = ?', now, checkin.id);
    }
  });
  const row = db.getFirstSync<CheckinRow>(
    'SELECT id, period, status, started_at, completed_at FROM checkins WHERE id = ?',
    checkin.id,
  );
  return row ? toCheckin(row) : checkin;
}

/* ------------------------------------------------- testing tools (dev) */

/** Delete every check-in and answer on this device (the user row is kept). */
export function deleteAllCheckins(): void {
  db.runSync('DELETE FROM checkins'); // answers + dimension_progress cascade
}

/**
 * Pretend time has passed: moves every check-in's start date back by
 * CHECKIN_INTERVAL_DAYS + 1 days, so the monthly rules can be tested now.
 */
export function shiftCheckinsIntoPast(): void {
  const shift = (CHECKIN_INTERVAL_DAYS + 1) * DAY_MS;
  const rows = db.getAllSync<{ id: string; started_at: string }>('SELECT id, started_at FROM checkins');
  db.withTransactionSync(() => {
    for (const r of rows) {
      const started = new Date(Date.parse(r.started_at) - shift);
      db.runSync('UPDATE checkins SET started_at = ?, period = ? WHERE id = ?', started.toISOString(), periodOf(started), r.id);
    }
  });
}
