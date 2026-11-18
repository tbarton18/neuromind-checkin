import type { ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/constants/theme';

export type ScreenProps = {
  children: ReactNode;
  /** Pinned to the bottom, outside the scroll area — e.g. the main button. */
  footer?: ReactNode;
  /** Set false for screens that manage their own layout (no scrolling). */
  scroll?: boolean;
  /** Forms: shrink the page when the keyboard opens so the active field stays visible. */
  keyboardAvoiding?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Standard page: warm-gray background, safe areas, centered column with a max
 * width, consistent edge padding, and an optional pinned footer.
 */
export function Screen({ children, footer, scroll = true, keyboardAvoiding = false, contentStyle }: ScreenProps) {
  const column: ViewStyle = {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.screenPadding,
    gap: spacing.md,
  };

  const body = (
    <>
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[column, { paddingVertical: spacing.lg }, contentStyle]}
          showsVerticalScrollIndicator={false}
          // A tap on a button while the keyboard is open should press the button.
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          {children}
        </ScrollView>
      ) : (
        <View style={[column, { flex: 1, paddingVertical: spacing.lg }, contentStyle]}>{children}</View>
      )}
      {footer ? <View style={[column, { paddingTop: spacing.sm, paddingBottom: spacing.md }]}>{footer}</View> : null}
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
      {keyboardAvoiding ? (
        // "padding" on both platforms: Android apps are edge-to-edge, so the
        // system no longer resizes the window for the keyboard.
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          {body}
        </KeyboardAvoidingView>
      ) : (
        body
      )}
    </SafeAreaView>
  );
}
