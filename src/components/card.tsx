import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing } from '@/constants/theme';

const variants = {
  /** White card on the warm-gray page. */
  default: { backgroundColor: colors.surface, boxShadow: shadows.card },
  /** Amarillo Suave — highlights, quotes, plan tips. */
  soft: { backgroundColor: colors.surfaceSoft },
  /** Outlined, no fill. */
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
} as const;

export type CardProps = ViewProps & {
  variant?: keyof typeof variants;
  style?: StyleProp<ViewStyle>;
};

export function Card({ variant = 'default', style, ...props }: CardProps) {
  return (
    <View
      style={[
        { borderRadius: radius.lg, borderCurve: 'continuous', padding: spacing.md, gap: spacing.sm },
        variants[variant],
        style,
      ]}
      {...props}
    />
  );
}
