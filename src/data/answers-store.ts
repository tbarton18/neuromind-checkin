/**
 * Answers for the current check-in.
 *
 * STEP 3: kept in memory only, so they reset when the app restarts.
 * STEP 4 keeps these exact function names but stores everything with
 * expo-sqlite (one row per answer, monthly check-ins that are never
 * overwritten). Screens only use the functions below, so they won't change.
 */
import { useSyncExternalStore } from 'react';

import type { DimensionId } from '@/content/dimensions';

type Snapshot = {
  answers: ReadonlyMap<string, number>; // questionId → 0–10
  completed: ReadonlySet<DimensionId>;
};

let snapshot: Snapshot = { answers: new Map(), completed: new Set() };
const listeners = new Set<() => void>();

function publish(next: Snapshot) {
  snapshot = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Save (or update) the answer to one question. */
export function saveAnswer(questionId: string, value: number): void {
  const answers = new Map(snapshot.answers);
  answers.set(questionId, value);
  publish({ ...snapshot, answers });
}

/** Mark a dimension as finished for this check-in (its answers become read-only). */
export function completeDimension(id: DimensionId): void {
  if (snapshot.completed.has(id)) return;
  const completed = new Set(snapshot.completed);
  completed.add(id);
  publish({ ...snapshot, completed });
}

/** React hook: re-renders when any answer or completion changes. */
export function useCheckinAnswers(): Snapshot {
  return useSyncExternalStore(subscribe, () => snapshot);
}
