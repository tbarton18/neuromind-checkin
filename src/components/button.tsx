import { ActivityIndicator, Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, layout, radius, spacing } from '@/constants/theme';

const variants = {
  /** Black text on yellow — main action on every screen (Continuar, Enviar). */
  primary: { bg: colors.accent, bgPressed: colors.accentPressed, fg: colors.onAccent, border: 'transparent' },
  /** White text on black — strong secondary action. */
  dark: { bg: colors.inverse, bgPressed: colors.textSecondary, fg: colors.onInverse, border: 'transparent' },
  /** Outlined — low-emphasis action (Atrás). */
  secondary: { bg: 'transparent', bgPressed: colors.border, fg: colors.text, border: colors.text },
  /** Text only — tertiary links (Saltar). */
  ghost: { bg: 'transparent', bgPressed: colors.border, fg: colors.text, border: 'transparent' },
} as const;

export type ButtonVariant = keyof typeof variants;

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  accessibilityHint,
}: ButtonProps) {
  const v = variants[variant];
  const inactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: variant === 'ghost' ? layout.minTapTarget : layout.buttonHeight,
          paddingHorizontal: spacing.lg,
          borderRadius: radius.lg,
          borderCurve: 'continuous',
          borderWidth: variant === 'secondary' ? 1.5 : 0,
          borderColor: disabled ? colors.disabled : v.border,
          backgroundColor:
            disabled && (variant === 'primary' || variant === 'dark')
              ? colors.disabled
              : pressed
                ? v.bgPressed
                : v.bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style, // caller overrides (layout only) merge last
      ]}>
      {loading ? (
        <ActivityIndicator color={v.fg} />
      ) : (
        <AppText variant="button" style={{ color: disabled ? colors.onDisabled : v.fg }}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
}
