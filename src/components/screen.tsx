import type { ReactNode } from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/constants/theme';

export type ScreenProps = {
  children: ReactNode;
  /** Pinned to the bottom, outside the scroll area — e.g. the main button. */
  footer?: ReactNode;
  /** Set false for screens that manage their own layout (no scrolling). */
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Standard page: warm-gray background, safe areas, centered column with a max
 * width, consistent edge padding, and an optional pinned footer.
 */
export function Screen({ children, footer, scroll = true, contentStyle }: ScreenProps) {
  const column: ViewStyle = {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.screenPadding,
    gap: spacing.md,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[column, { paddingVertical: spacing.lg }, contentStyle]}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[column, { flex: 1, paddingVertical: spacing.lg }, contentStyle]}>{children}</View>
      )}
      {footer ? <View style={[column, { paddingTop: spacing.sm, paddingBottom: spacing.md }]}>{footer}</View> : null}
    </SafeAreaView>
  );
}
