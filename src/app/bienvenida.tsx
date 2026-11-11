/** Pantalla 1 — Bienvenida */
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { NavFooter } from '@/components/nav-footer';
import { OnboardingHeader } from '@/components/onboarding-header';
import { Screen } from '@/components/screen';
import { illustrations } from '@/constants/illustrations';
import { spacing } from '@/constants/theme';
import { bienvenida as copy } from '@/content/onboarding';
import { ONBOARDING_STEPS, useOnboarding } from '@/hooks/use-onboarding';

export default function Bienvenida() {
  const router = useRouter();
  const { skip, canSkip } = useOnboarding();

  return (
    <Screen
      footer={
        <NavFooter
          title={copy.cta}
          onPress={() => router.push('/beneficios')}
          // First launch: nothing behind Pantalla 1. Opened from the Mapa: back returns there.
          showBack={canSkip}
        />
      }>
      <OnboardingHeader step={1} total={ONBOARDING_STEPS} onSkip={skip} />

      <Image
        source={illustrations.logo}
        style={{ width: 170, aspectRatio: 911 / 790, alignSelf: 'center', marginVertical: spacing.sm }}
        contentFit="contain"
        accessibilityLabel="NeuroMind"
      />

      <AppText variant="title" align="center" accessibilityRole="header">
        {copy.tagline}
      </AppText>
      <AppText>{copy.body}</AppText>

      <Card variant="soft" style={{ paddingVertical: spacing.lg }}>
        <AppText variant="heading" align="center">
          {copy.quote}
        </AppText>
      </Card>
    </Screen>
  );
}
