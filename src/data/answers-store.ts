/**
 * Answers for the current check-in, saved on the device (see checkins.ts).
 * Screens use only the functions in this file. The data is read from the
 * database once, kept in memory for instant reads, and every change is
 * written to the database before the screens are updated.
 */
import { useSyncExternalStore } from 'react';
import { AppState } from 'react-native';

import type { DimensionId } from '@/content/dimensions';
import {
  deleteAllCheckins,
  getOrCreateCurrentCheckin,
  loadAnswers,
  loadCompletedDimensions,
  markDimensionCompleted,
  shiftCheckinsIntoPast,
  upsertAnswer,
  type Checkin,
} from '@/data/checkins';

type Snapshot = {
  checkin: Checkin;
  answers: ReadonlyMap<string, number>; // questionId → 0–10
  completed: ReadonlySet<DimensionId>;
};

const listeners = new Set<() => void>();
let snapshot: Snapshot = load();

function load(): Snapshot {
  const checkin = getOrCreateCurrentCheckin();
  return { checkin, answers: loadAnswers(checkin.id), completed: loadCompletedDimensions(checkin.id) };
}

function reload() {
  snapshot = load();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// When the app comes back to the foreground, a new month may have started.
AppState.addEventListener('change', (state) => {
  if (state === 'active' && getOrCreateCurrentCheckin().id !== snapshot.checkin.id) reload();
});

/** Save (or update) the answer to one question. */
export function saveAnswer(questionId: string, value: number): void {
  if (!upsertAnswer(snapshot.checkin, questionId, value)) return;
  reload();
}

/** Mark a dimension as finished for this check-in (its answers become read-only). */
export function completeDimension(id: DimensionId): void {
  if (snapshot.completed.has(id)) return;
  markDimensionCompleted(snapshot.checkin, id);
  reload();
}

/** React hook: re-renders when the check-in, an answer or a completion changes. */
export function useCheckinAnswers(): Snapshot {
  return useSyncExternalStore(subscribe, () => snapshot);
}

/* ------------------------------------------------- testing tools (dev) */

/** Erase all check-ins and answers on this device and start a fresh check-in. */
export function devResetAnswers(): void {
  deleteAllCheckins();
  reload();
}

/** Move all check-ins 31 days into the past, then apply the monthly rules. */
export function devSimulateNextMonth(): void {
  shiftCheckinsIntoPast();
  reload();
}
