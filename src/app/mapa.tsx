/** Pantalla 4 — Mapa de Bienestar (hub). */
import { useRouter } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { DimensionRow } from '@/components/dimension-row';
import { Screen } from '@/components/screen';
import { WellbeingWheel } from '@/components/wellbeing-wheel';
import { layout, spacing } from '@/constants/theme';
import { dimensions, type DimensionId } from '@/content/dimensions';
import { common, mapa as copy } from '@/content/onboarding';
import { resetOnboarding } from '@/data/preferences';
import { useDimensionProgress } from '@/hooks/use-dimension-progress';

export default function Mapa() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const progress = useDimensionProgress();

  const wheelSize = Math.min(width - layout.screenPadding * 2, 380);

  function open(id: DimensionId) {
    router.push({ pathname: '/dimension/[id]', params: { id: String(id) } });
  }

  return (
    <Screen>
      <AppText variant="title" align="center" accessibilityRole="header">
        {copy.title}
      </AppText>

      <WellbeingWheel size={wheelSize} progress={progress} onSelect={open} />

      <View style={{ gap: spacing.sm, marginTop: spacing.sm }}>
        {dimensions.map((d) => (
          <DimensionRow key={d.id} dimension={d} status={progress[d.id]} onPress={() => open(d.id)} />
        ))}
      </View>

      <Button title={common.howItWorks} variant="ghost" onPress={() => router.push('/bienvenida')} />

      {__DEV__ ? (
        // Development only: never shown in a release build.
        <Button
          title="Reiniciar introducción (solo desarrollo)"
          variant="secondary"
          onPress={() => {
            resetOnboarding();
            router.replace('/');
          }}
        />
      ) : null}
    </Screen>
  );
}
