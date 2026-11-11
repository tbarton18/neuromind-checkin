/**
 * NeuroMind design tokens — the single source of truth for visual values.
 * Source: "Manual de Marca NeuroMind" v1.0 (context/neuromind-manual-de-marca.html).
 *
 * Rules:
 * - Screens and components never hardcode hex colors, font sizes or spacing.
 * - The brand palette is fixed (light only); app.json sets userInterfaceStyle: "light".
 */
import type { TextStyle } from 'react-native';

/* ------------------------------------------------------------------ colors */

export const palette = {
  yellow: '#F5C842', // Amarillo NeuroMind — primary color, buttons, accents
  yellowMid: '#FAD857', // pressed / highlight
  yellowLight: '#FFF3C0', // Amarillo Suave — soft backgrounds, cards
  black: '#1A1A18', // Negro Profundo — text, dark surfaces
  grayDark: '#3A3A36', // secondary text
  gray3: '#B0AD9A', // metadata, disabled text
  gray2: '#EDEBD9', // borders, unfilled tracks
  gray1: '#F7F6F0', // Gris Cálido — page background
  white: '#FFFFFF',
} as const;

/** Semantic roles. Components use these, not the raw palette. */
export const colors = {
  background: palette.gray1,
  surface: palette.white,
  surfaceSoft: palette.yellowLight,
  text: palette.black,
  textSecondary: palette.grayDark,
  textMuted: palette.gray3,
  border: palette.gray2,
  accent: palette.yellow,
  accentPressed: palette.yellowMid,
  onAccent: palette.black, // approved pair: black text on yellow
  inverse: palette.black,
  onInverse: palette.white, // approved pairs: white or yellow on black
  disabled: palette.gray2,
  onDisabled: palette.gray3,
} as const;

/* ------------------------------------------------------------- typography */

/** Font family names registered in src/app/_layout.tsx. */
export const fonts = {
  serif: 'DMSerifDisplay_400Regular', // DM Serif Display — titles
  sansRegular: 'DMSans_400Regular', // DM Sans — body
  sansMedium: 'DMSans_500Medium',
  sansBold: 'DMSans_700Bold', // labels (700, uppercase)
} as const;

/**
 * Type ramp. The brand manual's web sizes (H1 64 / H2 40 / H3 24 / body 15 /
 * label 11) are scaled for phone screens. Weight comes from fontFamily, never
 * fontWeight, because each weight is its own font file.
 */
export const type = {
  display: { fontFamily: fonts.serif, fontSize: 40, lineHeight: 44, color: colors.text },
  title: { fontFamily: fonts.serif, fontSize: 30, lineHeight: 34, color: colors.text },
  heading: { fontFamily: fonts.serif, fontSize: 24, lineHeight: 29, color: colors.text },
  question: { fontFamily: fonts.serif, fontSize: 24, lineHeight: 31, color: colors.text },
  subtitle: { fontFamily: fonts.sansMedium, fontSize: 18, lineHeight: 25, color: colors.text },
  body: { fontFamily: fonts.sansRegular, fontSize: 16, lineHeight: 24, color: colors.text },
  bodyStrong: { fontFamily: fonts.sansBold, fontSize: 16, lineHeight: 24, color: colors.text },
  secondary: { fontFamily: fonts.sansRegular, fontSize: 14, lineHeight: 20, color: colors.textSecondary },
  caption: { fontFamily: fonts.sansRegular, fontSize: 12, lineHeight: 16, color: colors.textSecondary },
  label: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  button: { fontFamily: fonts.sansBold, fontSize: 17, lineHeight: 22, color: colors.text },
} as const satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;

/* ----------------------------------------------------- spacing and shape */

/** 4-point grid. Name by size, not by use. */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/** Brand manual: --radius 16px, --radius-sm 8px. */
export const radius = {
  sm: 8,
  lg: 16,
  full: 9999,
} as const;

export const shadows = {
  card: '0 2px 8px rgba(26, 26, 24, 0.06)',
  raised: '0 6px 16px rgba(26, 26, 24, 0.10)',
} as const;

export const motion = {
  fast: 150,
  base: 250,
  slow: 400,
} as const;

/* ---------------------------------------------------------------- layout */

export const layout = {
  screenPadding: spacing.lg,
  maxContentWidth: 560, // keeps lines readable on tablets / web
  minTapTarget: 44,
  buttonHeight: 56,
} as const;
