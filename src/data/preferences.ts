/**
 * Small app flags stored on the device (expo-sqlite key-value store).
 * Check-in answers do NOT go here; they get their own tables in step 4.
 */
import Storage from 'expo-sqlite/kv-store';

const KEYS = {
  onboardingCompleted: 'onboarding.completedAt',
} as const;

/** True once the person has gone through Pantallas 1–3 at least once. */
export function hasCompletedOnboarding(): boolean {
  return Storage.getItemSync(KEYS.onboardingCompleted) != null;
}

export function markOnboardingCompleted(): void {
  if (!hasCompletedOnboarding()) {
    Storage.setItemSync(KEYS.onboardingCompleted, new Date().toISOString());
  }
}
