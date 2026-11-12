import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { AppText } from '@/components/app-text';
import { StatusPill, statusText } from '@/components/dimension-status';
import { dimensionFaces } from '@/constants/illustrations';
import { colors, radius, shadows, spacing } from '@/constants/theme';
import { dimensionCopy, type Dimension } from '@/content/dimensions';
import type { DimensionStatus } from '@/hooks/use-dimension-progress';
import { usePressScale } from '@/hooks/use-press-scale';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  dimension: Dimension;
  status: DimensionStatus;
  onPress: () => void;
};

/** One dimension in the list under the wheel: face, number, title, status. */
export function DimensionRow({ dimension: d, status, onPress }: Props) {
  const muted = status.kind === 'comingSoon';
  const { pressed, pressHandlers, scaleStyle } = usePressScale(0.98);

  return (
    <AnimatedPressable
      onPress={onPress}
      {...pressHandlers}
      accessibilityRole="button"
      accessibilityLabel={`Dimensión ${d.id}, ${d.title}. ${statusText(status)}`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
          padding: spacing.md,
          borderRadius: radius.lg,
          borderCurve: 'continuous',
          backgroundColor: pressed ? colors.surfaceSoft : colors.surface,
          boxShadow: shadows.card,
        },
        scaleStyle,
      ]}>
      <Image
        source={dimensionFaces[d.id]}
        style={{ width: 56, height: 56, opacity: muted ? 0.5 : 1 }}
        contentFit="contain"
        accessible={false}
      />
      <View style={{ flex: 1, gap: spacing.xs }}>
        <AppText variant="label">{dimensionCopy.label(d.id)}</AppText>
        <AppText variant="subtitle" style={muted ? { color: colors.textSecondary } : undefined}>
          {d.title}
        </AppText>
        <StatusPill status={status} />
      </View>
      <Svg width={10} height={16} viewBox="0 0 10 16" accessible={false}>
        <Path d="M2 2l6 6-6 6" stroke={colors.textMuted} strokeWidth={2} fill="none" strokeLinecap="round" />
      </Svg>
    </AnimatedPressable>
  );
}
