import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Circle, Line } from 'react-native-svg';

import { AppText } from '@/components/app-text';
import { NumberBadge, statusText } from '@/components/dimension-status';
import { illustrations } from '@/constants/illustrations';
import { colors, spacing } from '@/constants/theme';
import { dimensions, type Dimension, type DimensionId } from '@/content/dimensions';
import type { DimensionStatus, ProgressMap } from '@/hooks/use-dimension-progress';
import { usePressScale } from '@/hooks/use-press-scale';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  size: number;
  progress: ProgressMap;
  onSelect: (id: DimensionId) => void;
};

/**
 * Mapa de Bienestar: the NeuroMind face in the middle and the six dimensions
 * around it, clockwise from 12 o'clock (as in the PDF). Each dimension is
 * tappable and shows its status on the number badge.
 */
export function WellbeingWheel({ size, progress, onSelect }: Props) {
  const c = size / 2;
  const ringWidth = 5;
  const r = c - ringWidth; // ring radius
  const nodeRadius = r * 0.64; // where the dimension labels sit
  const nodeW = size * 0.36;
  const nodeH = 68;
  const faceSize = size * 0.27;

  const nodes = dimensions.map((d, i) => {
    const angle = (-90 + i * 60) * (Math.PI / 180);
    return { d, cos: Math.cos(angle), sin: Math.sin(angle) };
  });

  return (
    <View style={{ width: size, height: size, alignSelf: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle cx={c} cy={c} r={r} fill={colors.surface} stroke={colors.accent} strokeWidth={ringWidth} />
        {nodes.map(({ d, cos, sin }) => (
          <Line
            key={d.id}
            x1={c + cos * r * 0.25}
            y1={c + sin * r * 0.25}
            x2={c + cos * r * 0.36}
            y2={c + sin * r * 0.36}
            stroke={colors.accent}
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}
      </Svg>

      <Image
        source={illustrations.face}
        style={{
          position: 'absolute',
          width: faceSize,
          height: faceSize,
          left: c - faceSize / 2,
          top: c - faceSize / 2,
        }}
        contentFit="contain"
        accessible={false}
      />

      {nodes.map(({ d, cos, sin }) => (
        <WheelNode
          key={d.id}
          dimension={d}
          status={progress[d.id]}
          onPress={() => onSelect(d.id)}
          left={c + cos * nodeRadius - nodeW / 2}
          top={c + sin * nodeRadius - nodeH / 2}
          width={nodeW}
          height={nodeH}
        />
      ))}
    </View>
  );
}

type NodeProps = {
  dimension: Dimension;
  status: DimensionStatus;
  onPress: () => void;
  left: number;
  top: number;
  width: number;
  height: number;
};

function WheelNode({ dimension: d, status, onPress, left, top, width, height }: NodeProps) {
  const { pressHandlers, scaleStyle } = usePressScale(0.94);
  const muted = status.kind === 'comingSoon';

  return (
    <AnimatedPressable
      onPress={onPress}
      {...pressHandlers}
      accessibilityRole="button"
      accessibilityLabel={`Dimensión ${d.id}, ${d.title}. ${statusText(status)}`}
      hitSlop={4}
      style={[
        {
          position: 'absolute',
          left,
          top,
          width,
          height,
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.xs,
        },
        scaleStyle,
      ]}>
      <NumberBadge n={d.id} status={status} />
      <AppText
        variant="wheelLabel"
        align="center"
        numberOfLines={2}
        // The wheel has fixed geometry: cap growth so labels still fit at large text sizes.
        maxFontSizeMultiplier={1.15}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
        style={muted ? { color: colors.textMuted } : undefined}>
        {d.wheelTitle}
      </AppText>
    </AnimatedPressable>
  );
}
