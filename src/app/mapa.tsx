/**
 * Pantalla 4 — Mapa de Bienestar.
 * PLACEHOLDER for step 1: shows the wheel image from the PDF. Step 2 replaces
 * it with the interactive wheel and the dimension list.
 */
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { illustrations } from '@/constants/illustrations';
import { common, mapa as copy } from '@/content/onboarding';

export default function Mapa() {
  const router = useRouter();

  return (
    <Screen>
      <AppText variant="title" align="center" accessibilityRole="header">
        {copy.title}
      </AppText>

      <Image
        source={illustrations.wheel}
        style={{ width: '100%', aspectRatio: 1 }}
        contentFit="contain"
        accessibilityLabel="Mapa de Bienestar NeuroMind con seis dimensiones"
      />

      <AppText variant="caption" align="center">
        Las dimensiones serán interactivas en el siguiente paso.
      </AppText>

      <Button title={common.howItWorks} variant="ghost" onPress={() => router.push('/bienvenida')} />
    </Screen>
  );
}
