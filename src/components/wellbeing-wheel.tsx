import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { AppText } from '@/components/app-text';
import { NumberBadge, statusText } from '@/components/dimension-status';
import { illustrations } from '@/constants/illustrations';
import { colors, spacing } from '@/constants/theme';
import { dimensions, type DimensionId } from '@/content/dimensions';
import type { ProgressMap } from '@/hooks/use-dimension-progress';

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
        accessibilityIgnoresInvertColors
        accessible={false}
      />

      {nodes.map(({ d, cos, sin }) => {
        const status = progress[d.id];
        const muted = status.kind === 'comingSoon';
        return (
          <Pressable
            key={d.id}
            onPress={() => onSelect(d.id)}
            accessibilityRole="button"
            accessibilityLabel={`Dimensión ${d.id}, ${d.title}. ${statusText(status)}`}
            hitSlop={4}
            style={({ pressed }) => ({
              position: 'absolute',
              width: nodeW,
              height: nodeH,
              left: c + cos * nodeRadius - nodeW / 2,
              top: c + sin * nodeRadius - nodeH / 2,
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.xs,
              opacity: pressed ? 0.55 : 1,
            })}>
            <NumberBadge n={d.id} status={status} />
            <AppText
              variant="wheelLabel"
              align="center"
              numberOfLines={2}
              style={muted ? { color: colors.textMuted } : undefined}>
              {d.wheelTitle}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
