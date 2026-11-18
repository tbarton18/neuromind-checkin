import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { illustrations } from '@/constants/illustrations';
import { spacing } from '@/constants/theme';
import { authCopy } from '@/content/auth';

type Props = {
  title: string;
  subtitle?: string;
  /** Show the NeuroMind logo above the title (sign in / sign up). */
  showLogo?: boolean;
  /** Hide "Atrás" on the entry screens (nothing to go back to before signing in). */
  showBack?: boolean;
  children: ReactNode;
};

/**
 * Shared layout for the account screens: "Atrás", optional logo, title and
 * subtitle, then the form. Scrolls and moves up with the keyboard so the
 * active field stays visible.
 */
export function AuthLayout({ title, subtitle, showLogo = false, showBack = true, children }: Props) {
  const router = useRouter();

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/mapa');
  }

  return (
    <Screen keyboardAvoiding>
      {showBack ? (
        <View style={{ flexDirection: 'row' }}>
          <Button title={`‹ ${authCopy.back}`} variant="ghost" onPress={goBack} style={{ paddingHorizontal: spacing.xs }} />
        </View>
      ) : null}

      {showLogo ? (
        <Image
          source={illustrations.logo}
          style={{ width: 120, aspectRatio: 911 / 790, alignSelf: 'center' }}
          contentFit="contain"
          accessibilityLabel="NeuroMind"
        />
      ) : null}

      <View style={{ gap: spacing.sm, marginBottom: spacing.sm }}>
        <AppText variant="title" accessibilityRole="header">
          {title}
        </AppText>
        {subtitle ? <AppText variant="secondary">{subtitle}</AppText> : null}
      </View>

      {children}
    </Screen>
  );
}
