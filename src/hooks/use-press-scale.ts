import { useState } from 'react';
import { cubicBezier, useReducedMotion } from 'react-native-reanimated';

import { motion } from '@/constants/theme';

const EASE_OUT = cubicBezier(0.23, 1, 0.32, 1);

/**
 * Press feedback for tappable elements: shrink slightly the moment a finger
 * lands (feedback on press-in), spring back on release. Runs as a Reanimated
 * CSS transition on the UI thread. Turned off when "Reduce Motion" is on.
 *
 * Use with an Animated pressable:
 *   const { pressed, pressHandlers, scaleStyle } = usePressScale();
 *   <AnimatedPressable {...pressHandlers} style={[base, scaleStyle]} />
 */
export function usePressScale(scaleTo = 0.97) {
  const [pressed, setPressed] = useState(false);
  const reduced = useReducedMotion();

  return {
    pressed,
    pressHandlers: {
      onPressIn: () => setPressed(true),
      onPressOut: () => setPressed(false),
    },
    scaleStyle: {
      transform: [{ scale: pressed && !reduced ? scaleTo : 1 }],
      transitionProperty: 'transform',
      transitionDuration: motion.fast - 30, // 120ms: press feedback should feel instant
      transitionTimingFunction: EASE_OUT,
    } as const,
  };
}
