import { dimensions, isAvailable, type DimensionId } from '@/content/dimensions';

export type DimensionStatus =
  | { kind: 'pending' }
  | { kind: 'inProgress'; answered: number; total: number }
  | { kind: 'completed' }
  | { kind: 'comingSoon' };

export type ProgressMap = Record<DimensionId, DimensionStatus>;

/**
 * Status of each dimension in the current check-in.
 * STEP 2: no saved answers yet, so everything available is "pending".
 * STEP 4 replaces the body with a read from the local database; the shape of
 * the result stays the same, so the Mapa screen won't change.
 */
export function useDimensionProgress(): ProgressMap {
  const map = {} as ProgressMap;
  for (const d of dimensions) {
    map[d.id] = isAvailable(d) ? { kind: 'pending' } : { kind: 'comingSoon' };
  }
  return map;
}
