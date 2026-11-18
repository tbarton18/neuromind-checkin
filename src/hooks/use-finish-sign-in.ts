import { hasCompletedOnboarding } from '@/data/preferences';
import { signIn } from '@/data/session';
import { useResetTo } from '@/hooks/use-reset-to';

/**
 * After "Iniciar sesión" / "Crear cuenta": mark the device as signed in
 * (placeholder, see data/session.ts) and continue to the introduction on the
 * first visit, or the Mapa afterwards. The sign-in screens are removed from
 * history so "back" can't return to them.
 */
export function useFinishSignIn() {
  const resetTo = useResetTo();
  return function finishSignIn() {
    signIn();
    resetTo(hasCompletedOnboarding() ? 'mapa' : 'bienvenida');
  };
}
