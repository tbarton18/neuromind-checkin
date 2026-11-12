import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, radius, spacing } from '@/constants/theme';
import { dimensionCopy } from '@/content/dimensions';
import type { DimensionStatus } from '@/hooks/use-dimension-progress';

export function statusText(status: DimensionStatus): string {
  switch (status.kind) {
    case 'pending':
      return dimensionCopy.status.pending;
    case 'inProgress':
      return dimensionCopy.status.inProgress(status.answered, status.total);
    case 'completed':
      return dimensionCopy.status.completed;
    case 'comingSoon':
      return dimensionCopy.status.comingSoon;
  }
}

/** Colors for the round number badge, shared by the wheel and the list. */
export function badgeColors(status: DimensionStatus) {
  switch (status.kind) {
    case 'completed':
      return { bg: colors.inverse, fg: colors.accent, border: colors.inverse };
    case 'inProgress':
      return { bg: colors.accent, fg: colors.onAccent, border: colors.inverse };
    case 'comingSoon':
      return { bg: colors.disabled, fg: colors.onDisabled, border: colors.disabled };
    default:
      return { bg: colors.accent, fg: colors.onAccent, border: colors.accent };
  }
}

/** Round badge with the dimension number, or ✓ once completed. */
export function NumberBadge({ n, status, size = 26 }: { n: number; status: DimensionStatus; size?: number }) {
  const c = badgeColors(status);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.full,
        backgroundColor: c.bg,
        borderWidth: 2,
        borderColor: c.border,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <AppText variant="chip" maxFontSizeMultiplier={1.2} style={{ color: c.fg }}>
        {status.kind === 'completed' ? '✓' : n}
      </AppText>
    </View>
  );
}

/** Small pill with the status text, for the dimension list. */
export function StatusPill({ status }: { status: DimensionStatus }) {
  const look = {
    pending: { bg: 'transparent', fg: colors.textSecondary, border: colors.border },
    inProgress: { bg: colors.surfaceSoft, fg: colors.text, border: colors.surfaceSoft },
    completed: { bg: colors.inverse, fg: colors.onInverse, border: colors.inverse },
    comingSoon: { bg: colors.disabled, fg: colors.textSecondary, border: colors.disabled },
  }[status.kind];

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: look.bg,
        borderColor: look.border,
        borderWidth: 1,
        borderRadius: radius.full,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xxs,
      }}>
      <AppText variant="chip" style={{ color: look.fg }}>
        {statusText(status)}
      </AppText>
    </View>
  );
}
