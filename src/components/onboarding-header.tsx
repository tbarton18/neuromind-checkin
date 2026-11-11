import { View } from 'react-native';

import { Button } from '@/components/button';
import { colors, radius, spacing } from '@/constants/theme';
import { common } from '@/content/onboarding';

type Props = {
  /** 1-based index of the current onboarding screen. */
  step: number;
  total: number;
  /** Shown only for people who have already seen the introduction. */
  onSkip?: () => void;
};

/** Progress dots + optional "Saltar" link at the top of Pantallas 1–3. */
export function OnboardingHeader({ step, total, onSkip }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 44,
      }}>
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={`Paso ${step} de ${total}`}
        style={{ flexDirection: 'row', gap: spacing.xs }}>
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            style={{
              height: 8,
              width: i + 1 === step ? 24 : 8,
              borderRadius: radius.full,
              backgroundColor: i + 1 <= step ? colors.accent : colors.border,
            }}
          />
        ))}
      </View>
      {onSkip ? (
        <Button title={common.skip} variant="ghost" onPress={onSkip} style={{ paddingHorizontal: spacing.sm }} />
      ) : null}
    </View>
  );
}
