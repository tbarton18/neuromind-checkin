/**
 * Brand illustrations. v1 images are cropped from "Check-in de Bienestar
 * NeuroMind.pdf". To upgrade, drop high-resolution files into
 * assets/illustrations/ with the same file names; no code changes needed.
 */
/** Metro returns a numeric asset id for static require() of an image. */
export type Illustration = number;

export type DimensionId = 1 | 2 | 3 | 4 | 5 | 6;

export const illustrations = {
  logo: require('@/assets/illustrations/logo.png'),
  face: require('@/assets/illustrations/face.png'),
  wheel: require('@/assets/illustrations/wheel.png'),
  cycle: require('@/assets/illustrations/cycle.png'),
} as const satisfies Record<string, Illustration>;

/** Small face per dimension (transparent), for the wheel and headers. */
export const dimensionFaces: Record<DimensionId, Illustration> = {
  1: require('@/assets/illustrations/face-d1.png'),
  2: require('@/assets/illustrations/face-d2.png'),
  3: require('@/assets/illustrations/face-d3.png'),
  4: require('@/assets/illustrations/face-d4.png'),
  5: require('@/assets/illustrations/face-d5.png'),
  6: require('@/assets/illustrations/face-d6.png'),
};

/** Full circular intro card per dimension (number, title, face, description). */
export const dimensionCards: Record<DimensionId, Illustration> = {
  1: require('@/assets/illustrations/card-d1.png'),
  2: require('@/assets/illustrations/card-d2.png'),
  3: require('@/assets/illustrations/card-d3.png'),
  4: require('@/assets/illustrations/card-d4.png'),
  5: require('@/assets/illustrations/card-d5.png'),
  6: require('@/assets/illustrations/card-d6.png'),
};

/** Plan cards that exist in the PDF so far. */
export const planCards: Partial<Record<DimensionId, Illustration>> = {
  1: require('@/assets/illustrations/plan-d1.png'),
  3: require('@/assets/illustrations/plan-d3.png'),
};
