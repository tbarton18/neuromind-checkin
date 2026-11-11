import { useRouter } from 'expo-router';
import { useState } from 'react';

import { hasCompletedOnboarding, markOnboardingCompleted } from '@/data/preferences';

export const ONBOARDING_STEPS = 3;

/**
 * Shared onboarding behaviour for Pantallas 1–3.
 * - `canSkip`: true for people who have already seen the introduction.
 * - `finish()`: saves that onboarding was seen and lands on the Mapa
 *   (Pantalla 4) with the introduction screens removed from history,
 *   so "back" from the Mapa doesn't return into them.
 */
export function useOnboarding() {
  const router = useRouter();
  const [canSkip] = useState(hasCompletedOnboarding);

  function finish() {
    markOnboardingCompleted();
    if (router.canDismiss()) router.dismissAll();
    router.replace('/mapa');
  }

  return { canSkip, finish, skip: canSkip ? finish : undefined };
}
