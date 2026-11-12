/**
 * Testing tools shown at the bottom of the Mapa.
 * Visible only in development builds (__DEV__). To show them in a TestFlight
 * or internal test build too, set SHOW_DEV_TOOLS = true — and back to __DEV__
 * before releasing to the public.
 */
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { devResetAnswers, devSimulateNextMonth } from '@/data/answers-store';
import { resetOnboarding } from '@/data/preferences';

export const SHOW_DEV_TOOLS = __DEV__;

export function DevTools() {
  const router = useRouter();
  if (!SHOW_DEV_TOOLS) return null;

  function confirmReset() {
    Alert.alert(
      'Borrar respuestas',
      'Se eliminarán todas las respuestas y check-ins guardados en este dispositivo. Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Borrar', style: 'destructive', onPress: devResetAnswers },
      ],
    );
  }

  return (
    <Card variant="outline">
      <AppText variant="label">Herramientas de prueba</AppText>
      <Button title="Borrar respuestas" variant="secondary" onPress={confirmReset} />
      <Button title="Simular mes siguiente" variant="secondary" onPress={devSimulateNextMonth} />
      <Button
        title="Reiniciar introducción"
        variant="secondary"
        onPress={() => {
          resetOnboarding();
          router.replace('/');
        }}
      />
      <AppText variant="caption">
        Solo visible en desarrollo. «Simular mes siguiente» adelanta 31 días: si el check-in actual está
        completo, comienza uno nuevo; si no, continúa el mismo.
      </AppText>
    </Card>
  );
}
