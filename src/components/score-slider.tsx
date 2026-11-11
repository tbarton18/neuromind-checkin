/**
 * 0–10 answer slider. The NeuroMind face is the thumb ("avanza con la cara de
 * NeuroMind"); the 0–10 numbers sit exactly under each stop.
 *
 * Motion: the thumb follows the finger on the UI thread (no React render per
 * frame), snaps to the nearest whole number on release, and gives one light
 * haptic tick each time it crosses a number. Tapping anywhere on the line
 * jumps there. Screen readers get an "adjustable" control (swipe up/down).
 */
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { View, type AccessibilityActionEvent, type LayoutChangeEvent } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  ReduceMotion,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { AppText } from '@/components/app-text';
import { illustrations } from '@/constants/illustrations';
import { colors, radius, shadows, spacing } from '@/constants/theme';

const MIN = 0;
const MAX = 10;
const MIDDLE = 5;
const THUMB = 60;
const TRACK_HEIGHT = 10;
const TICKS = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);
// Settle onto a number without overshooting past it.
const SNAP = { duration: 300, dampingRatio: 1, overshootClamping: true, reduceMotion: ReduceMotion.System };

type Props = {
  /** null = not answered yet (the face waits in the middle, faded). */
  value: number | null;
  onChange: (value: number) => void;
  /** Ends of the scale: emoji faces or words such as "Nunca" / "Siempre". */
  minLabel: string;
  maxLabel: string;
  accessibilityLabel: string;
};

export function ScoreSlider({ value, onChange, minLabel, maxLabel, accessibilityLabel }: Props) {
  const [width, setWidth] = useState(0);
  const usable = useSharedValue(0); // track width minus the thumb
  const pos = useSharedValue(value ?? MIDDLE); // continuous 0–10 while dragging
  const dragging = useSharedValue(false);
  const answered = value != null;

  // Keep the thumb in sync when the value changes from outside (e.g. a saved
  // answer is loaded, or a screen reader adjusts it).
  useEffect(() => {
    if (value != null && !dragging.get()) pos.set(withSpring(value, SNAP));
  }, [value, pos, dragging]);

  function onLayout(e: LayoutChangeEvent) {
    const w = e.nativeEvent.layout.width;
    setWidth(w);
    usable.set(Math.max(0, w - THUMB));
  }

  function tick(n: number) {
    Haptics.selectionAsync();
    onChange(n);
  }

  function commit(n: number) {
    onChange(n);
  }

  const pan = usePanGesture({
    minDistance: 0, // a tap counts too
    onBegin: (e) => {
      'worklet';
      dragging.set(true);
      pos.set(toPosition(e.x, usable.get()));
    },
    onUpdate: (e) => {
      'worklet';
      pos.set(toPosition(e.x, usable.get()));
    },
    onFinalize: () => {
      'worklet';
      dragging.set(false);
      const target = Math.round(pos.get());
      pos.set(withSpring(target, SNAP));
      scheduleOnRN(commit, target);
    },
  });

  // One haptic + state update per whole number crossed (not per frame).
  useAnimatedReaction(
    () => Math.round(pos.get()),
    (current, previous) => {
      if (previous !== null && current !== previous && dragging.get()) {
        scheduleOnRN(tick, current);
      }
    },
  );

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (pos.get() / MAX) * usable.get() }],
  }));
  // Absolutely positioned and childless, so animating width is cheap.
  const fillStyle = useAnimatedStyle(() => ({
    width: (pos.get() / MAX) * usable.get() + THUMB / 2,
  }));

  function onAccessibilityAction(e: AccessibilityActionEvent) {
    const current = value ?? MIDDLE;
    if (e.nativeEvent.actionName === 'increment') onChange(value == null ? MIDDLE : Math.min(MAX, current + 1));
    if (e.nativeEvent.actionName === 'decrement') onChange(value == null ? MIDDLE : Math.max(MIN, current - 1));
  }

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Desliza hacia arriba o hacia abajo para cambiar el valor de 0 a 10."
      accessibilityValue={{ min: MIN, max: MAX, now: value ?? undefined, text: value == null ? 'Sin responder' : String(value) }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={onAccessibilityAction}
      style={{ gap: spacing.sm }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <AppText variant="subtitle" accessible={false}>
          {minLabel}
        </AppText>
        <AppText variant="subtitle" accessible={false}>
          {maxLabel}
        </AppText>
      </View>

      <GestureDetector gesture={pan}>
        <View onLayout={onLayout} style={{ height: THUMB, justifyContent: 'center' }}>
          {/* Track */}
          <View
            style={{
              position: 'absolute',
              left: THUMB / 2,
              right: THUMB / 2,
              height: TRACK_HEIGHT,
              borderRadius: radius.full,
              backgroundColor: colors.border,
            }}
          />
          {/* Filled part, only once answered */}
          {answered ? (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  left: 0,
                  height: TRACK_HEIGHT,
                  borderRadius: radius.full,
                  backgroundColor: colors.accent,
                },
                fillStyle,
              ]}
            />
          ) : null}
          {/* Thumb: the NeuroMind face */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: 0,
                width: THUMB,
                height: THUMB,
                borderRadius: radius.full,
                backgroundColor: colors.surface,
                borderWidth: 3,
                borderColor: answered ? colors.accent : colors.border,
                boxShadow: shadows.raised,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: answered ? 1 : 0.75,
              },
              thumbStyle,
            ]}>
            <Image source={illustrations.face} style={{ width: THUMB - 16, height: THUMB - 16 }} contentFit="contain" />
          </Animated.View>
        </View>
      </GestureDetector>

      {/* 0–10, each number centred under its stop */}
      <View style={{ height: 20 }} accessible={false}>
        {width > 0
          ? TICKS.map((n) => (
              <AppText
                key={n}
                variant={n === value ? 'chip' : 'caption'}
                align="center"
                style={{
                  position: 'absolute',
                  width: 24,
                  left: THUMB / 2 + (n / MAX) * (width - THUMB) - 12,
                  color: n === value ? colors.text : colors.textSecondary,
                }}>
                {n}
              </AppText>
            ))
          : null}
      </View>
    </View>
  );
}

/** Finger x (relative to the slider) → value 0–10 (continuous). */
function toPosition(x: number, usable: number): number {
  'worklet';
  if (usable <= 0) return MIDDLE;
  const p = ((x - THUMB / 2) / usable) * MAX;
  return Math.min(MAX, Math.max(MIN, p));
}
