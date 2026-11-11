import { dimensions, isAvailable, type Dimension, type DimensionId } from '@/content/dimensions';
import { useCheckinAnswers } from '@/data/answers-store';

export type DimensionStatus =
  | { kind: 'pending' }
  | { kind: 'inProgress'; answered: number; total: number }
  | { kind: 'completed' }
  | { kind: 'comingSoon' };

export type ProgressMap = Record<DimensionId, DimensionStatus>;

/** Status of each dimension in the current check-in, derived from saved answers. */
export function useDimensionProgress(): ProgressMap {
  const { answers, completed } = useCheckinAnswers();
  const map = {} as ProgressMap;
  for (const d of dimensions) {
    map[d.id] = statusOf(d, answers, completed);
  }
  return map;
}

function statusOf(
  d: Dimension,
  answers: ReadonlyMap<string, number>,
  completed: ReadonlySet<DimensionId>,
): DimensionStatus {
  if (!isAvailable(d)) return { kind: 'comingSoon' };
  if (completed.has(d.id)) return { kind: 'completed' };
  const answered = d.questions.filter((q) => answers.has(q.id)).length;
  return answered === 0 ? { kind: 'pending' } : { kind: 'inProgress', answered, total: d.questions.length };
}

/** 1-based number of the first unanswered question (where "Continuar" resumes). */
export function firstUnanswered(d: Dimension, answers: ReadonlyMap<string, number>): number {
  const i = d.questions.findIndex((q) => !answers.has(q.id));
  return i === -1 ? d.questions.length : i + 1;
}
