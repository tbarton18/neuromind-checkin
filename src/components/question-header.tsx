import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, radius, spacing } from '@/constants/theme';
import type { Dimension } from '@/content/dimensions';

/** "DIMENSIÓN 1 · BIENESTAR PERSONAL", progress bar and "Pregunta 2 de 6". */
export function QuestionHeader({ dimension, number, total }: { dimension: Dimension; number: number; total: number }) {
  return (
    <View style={{ gap: spacing.sm }}>
      <AppText variant="label">
        Dimensión {dimension.id} · {dimension.title}
      </AppText>
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={`Pregunta ${number} de ${total}`}
        accessibilityValue={{ min: 0, max: total, now: number }}
        style={{ height: 6, borderRadius: radius.full, backgroundColor: colors.border, overflow: 'hidden' }}>
        <View
          style={{
            width: `${(number / total) * 100}%`,
            height: '100%',
            borderRadius: radius.full,
            backgroundColor: colors.accent,
          }}
        />
      </View>
      <AppText variant="secondary" accessible={false}>
        Pregunta {number} de {total}
      </AppText>
    </View>
  );
}
