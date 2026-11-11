import { Redirect } from 'expo-router';

import { hasCompletedOnboarding } from '@/data/preferences';

/** Entry point: first launch → introduction (Pantalla 1); afterwards → Mapa. */
export default function Index() {
  return <Redirect href={hasCompletedOnboarding() ? '/mapa' : '/bienvenida'} />;
}
