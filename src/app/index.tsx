import { Redirect } from 'expo-router';

import { hasCompletedOnboarding } from '@/data/preferences';
import { isSignedIn } from '@/data/session';

/**
 * Entry point:
 * - not signed in → Iniciar sesión
 * - signed in, first time → introduction (Pantalla 1)
 * - signed in, returning → Mapa
 */
export default function Index() {
  if (!isSignedIn()) return <Redirect href="/cuenta/iniciar-sesion" />;
  return <Redirect href={hasCompletedOnboarding() ? '/mapa' : '/bienvenida'} />;
}
