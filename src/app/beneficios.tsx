/** Pantalla 2 — Beneficios */
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { NavFooter } from '@/components/nav-footer';
import { OnboardingHeader } from '@/components/onboarding-header';
import { RichText } from '@/components/rich-text';
import { Screen } from '@/components/screen';
import { colors, radius, spacing } from '@/constants/theme';
import { beneficios as copy } from '@/content/onboarding';
import { ONBOARDING_STEPS, useOnboarding } from '@/hooks/use-onboarding';

export default function Beneficios() {
  const router = useRouter();
  const { skip } = useOnboarding();

  return (
    <Screen footer={<NavFooter title={copy.cta} onPress={() => router.push('/como-usar')} />}>
      <OnboardingHeader step={2} total={ONBOARDING_STEPS} onSkip={skip} />

      <AppText variant="title" accessibilityRole="header">
        {copy.title}
      </AppText>
      <AppText variant="subtitle">{copy.intro}</AppText>

      <Card style={{ gap: spacing.md, paddingVertical: spacing.lg }}>
        {copy.items.map((parts, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: spacing.sm + spacing.xs }}>
            <View
              style={{
                width: 10,
                height: 10,
                marginTop: 7, // optical: centers the dot on the first line of body text
                borderRadius: radius.full,
                backgroundColor: colors.accent,
              }}
            />
            <RichText parts={parts} style={{ flex: 1 }} />
          </View>
        ))}
      </Card>
    </Screen>
  );
}
