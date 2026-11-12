import { useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';

import { hasCompletedOnboarding, markOnboardingCompleted } from '@/data/preferences';

export const ONBOARDING_STEPS = 3;

/**
 * Shared onboarding behaviour for Pantallas 1–3.
 * - `canSkip`: true for people who have already seen the introduction.
 * - `finish()`: saves that onboarding was seen and lands on the Mapa (Pantalla 4).
 */
export function useOnboarding() {
  const router = useRouter();
  const navigation = useNavigation();
  const [canSkip] = useState(hasCompletedOnboarding);

  function finish() {
    markOnboardingCompleted();
    // One transition either way, and "back" from the Mapa never re-enters the intro.
    const state = navigation.getState();
    if (!state || state.routes.some((r) => r.name === 'mapa')) {
      router.dismissTo('/mapa'); // intro was opened from the Mapa: go back to it
      return;
    }
    // First launch: make the Mapa the only screen in history. Expo Router needs
    // a complete state for a reset (key, routeNames, routeKeySeq…), so we copy
    // the current one and swap in the new route list; the key is minted for us.
    navigation.reset({
      ...state,
      index: 0,
      routes: [{ name: 'mapa' }],
      stale: false,
    } as unknown as Parameters<typeof navigation.reset>[0]);
  }

  return { canSkip, finish, skip: canSkip ? finish : undefined };
}
