/** Pantalla 3 — ¿Cómo usar NeuroMind? */
import { Image } from 'expo-image';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { NavFooter } from '@/components/nav-footer';
import { OnboardingHeader } from '@/components/onboarding-header';
import { RichText } from '@/components/rich-text';
import { Screen } from '@/components/screen';
import { illustrations } from '@/constants/illustrations';
import { colors, radius, spacing } from '@/constants/theme';
import { comoUsar as copy } from '@/content/onboarding';
import { ONBOARDING_STEPS, useOnboarding } from '@/hooks/use-onboarding';

export default function ComoUsar() {
  const { skip, finish } = useOnboarding();

  return (
    <Screen footer={<NavFooter title={copy.cta} onPress={finish} />}>
      <OnboardingHeader step={3} total={ONBOARDING_STEPS} onSkip={skip} />

      <AppText variant="title" align="center" accessibilityRole="header">
        {copy.title}
      </AppText>

      <View
        accessible
        accessibilityLabel={copy.steps.join(', ')}
        style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: spacing.sm }}>
        {copy.steps.map((step) => (
          <View
            key={step}
            style={{
              backgroundColor: colors.accent,
              borderRadius: radius.full,
              paddingVertical: spacing.xs + spacing.xxs,
              paddingHorizontal: spacing.md,
            }}>
            <AppText variant="bodyStrong" style={{ color: colors.onAccent }}>
              {step}
            </AppText>
          </View>
        ))}
      </View>

      <RichText parts={copy.objective} align="center" />

      <Image
        source={illustrations.cycle}
        style={{ width: '100%', aspectRatio: 1 }}
        contentFit="contain"
        accessibilityLabel={copy.cycleLabel}
      />
    </Screen>
  );
}
