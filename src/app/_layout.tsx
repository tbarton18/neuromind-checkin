import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useReducedMotion } from 'react-native-reanimated';

import { colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    primary: colors.text,
    border: colors.border,
  },
};

/**
 * Screen transitions (native, never hand-built):
 * - Moving through a flow: the platform push on iOS (with swipe-back), and the
 *   same iOS-style slide on Android instead of Android's zoom/fade default.
 * - Question → question: a short fade. The layout stays put and only the
 *   question changes, so sliding the whole screen each time feels heavy.
 * - Pantallas 1–3: a short crossfade, so the intro reads as one continuous piece.
 * - Arriving at the Mapa: a short fade.
 * - Mapa → a dimension: rises gently and fades in, like a card coming forward.
 * - Reduce Motion on: fades everywhere.
 * Fade durations only apply on iOS (Android uses its system fade timing).
 */
const PUSH = Platform.OS === 'ios' ? 'default' : 'ios_from_right';
const FADE_MS = 250;
const QUESTION_FADE_MS = 200;
const DIMENSION_OPEN_MS = 300;

export default function RootLayout() {
  const reduceMotion = useReducedMotion();
  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    DMSerifDisplay_400Regular,
  });

  const ready = fontsLoaded || fontError != null;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  // Keep the splash screen up until the brand fonts are available.
  if (!ready) return null;

  return (
    // GestureHandlerRootView: required for the answer slider's drag gesture.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: reduceMotion ? 'fade' : PUSH,
            animationDuration: FADE_MS,
          }}>
          <Stack.Screen name="index" options={{ animation: 'none' }} />
          <Stack.Screen name="bienvenida" options={{ animation: 'fade', animationDuration: FADE_MS }} />
          <Stack.Screen name="beneficios" options={{ animation: 'fade', animationDuration: FADE_MS }} />
          <Stack.Screen name="como-usar" options={{ animation: 'fade', animationDuration: FADE_MS }} />
          <Stack.Screen name="mapa" options={{ animation: 'fade', animationDuration: FADE_MS }} />
          <Stack.Screen
            name="dimension/[id]/index"
            options={{
              animation: reduceMotion ? 'fade' : 'fade_from_bottom',
              animationDuration: DIMENSION_OPEN_MS,
            }}
          />
          <Stack.Screen
            name="dimension/[id]/pregunta/[q]"
            options={{ animation: 'fade', animationDuration: QUESTION_FADE_MS }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
