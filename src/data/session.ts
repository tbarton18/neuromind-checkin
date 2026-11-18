/**
 * Sign-in state.
 *
 * PLACEHOLDER: there is no account server yet. "Iniciar sesión" / "Crear cuenta"
 * simply mark this device as signed in (no validation). When real login is
 * added, replace signIn/signOut with the auth provider's calls and keep these
 * function names so the screens don't change.
 *
 * Note: check-in answers are stored per device for now, not per account, so
 * signing out does not delete them.
 */
import Storage from 'expo-sqlite/kv-store';

const KEY = 'session.signedInAt';

export function isSignedIn(): boolean {
  return Storage.getItemSync(KEY) != null;
}

export function signIn(): void {
  Storage.setItemSync(KEY, new Date().toISOString());
}

export function signOut(): void {
  Storage.removeItemSync(KEY);
}
