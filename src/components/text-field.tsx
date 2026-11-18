import { useState } from 'react';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, fonts, layout, radius, spacing } from '@/constants/theme';
import { authCopy } from '@/content/auth';

export type TextFieldProps = Omit<TextInputProps, 'style' | 'secureTextEntry'> & {
  label: string;
  /** Password field: hides the text and adds a "Mostrar / Ocultar" toggle. */
  secure?: boolean;
};

/** Labelled text input in NeuroMind style. No validation (UI only for now). */
export function TextField({ label, secure = false, onFocus, onBlur, ...inputProps }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  return (
    <View style={{ gap: spacing.xs }}>
      <AppText variant="bodyStrong" maxFontSizeMultiplier={1.4}>
        {label}
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: layout.buttonHeight - 4,
          borderRadius: radius.lg,
          borderCurve: 'continuous',
          borderWidth: 1.5,
          borderColor: focused ? colors.accent : colors.border,
          backgroundColor: colors.surface,
          paddingLeft: spacing.md,
          paddingRight: secure ? spacing.xs : spacing.md,
        }}>
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          secureTextEntry={secure && hidden}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.text}
          cursorColor={colors.text}
          maxFontSizeMultiplier={1.4}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={{
            flex: 1,
            paddingVertical: spacing.sm + spacing.xs,
            fontFamily: fonts.sansRegular,
            fontSize: 16,
            color: colors.text,
          }}
        />
        {secure ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? `${authCopy.show} ${label.toLowerCase()}` : `${authCopy.hide} ${label.toLowerCase()}`}
            hitSlop={8}
            style={({ pressed }) => ({
              minHeight: layout.minTapTarget,
              justifyContent: 'center',
              paddingHorizontal: spacing.sm + spacing.xs,
              opacity: pressed ? 0.5 : 1,
            })}>
            <AppText variant="chip" maxFontSizeMultiplier={1.3}>
              {hidden ? authCopy.show : authCopy.hide}
            </AppText>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
