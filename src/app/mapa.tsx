/** Pantalla 4 — Mapa de Bienestar (hub). */
import { useRouter } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { DevTools } from '@/components/dev-tools';
import { DimensionRow } from '@/components/dimension-row';
import { Screen } from '@/components/screen';
import { WellbeingWheel } from '@/components/wellbeing-wheel';
import { layout, spacing } from '@/constants/theme';
import { dimensions, type DimensionId } from '@/content/dimensions';
import { common, mapa as copy } from '@/content/onboarding';
import { useCheckinAnswers } from '@/data/answers-store';
import { nextCheckinDate } from '@/data/checkins';
import { useDimensionProgress } from '@/hooks/use-dimension-progress';

export default function Mapa() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const progress = useDimensionProgress();
  const { checkin } = useCheckinAnswers();

  const wheelSize = Math.min(width - layout.screenPadding * 2, 380);

  function open(id: DimensionId) {
    router.push({ pathname: '/dimension/[id]', params: { id: String(id) } });
  }

  return (
    <Screen>
      <AppText variant="title" align="center" accessibilityRole="header">
        {copy.title}
      </AppText>
      <AppText variant="label" align="center">
        {copy.period(checkin.period)}
      </AppText>

      {checkin.status === 'completed' ? (
        <Card variant="soft" style={{ alignItems: 'center' }}>
          <AppText variant="heading" align="center">
            {copy.completedTitle}
          </AppText>
          <AppText align="center">{copy.completedBody(nextCheckinDate(checkin))}</AppText>
        </Card>
      ) : null}

      <WellbeingWheel size={wheelSize} progress={progress} onSelect={open} />

      <View style={{ gap: spacing.sm, marginTop: spacing.sm }}>
        {dimensions.map((d) => (
          <DimensionRow key={d.id} dimension={d} status={progress[d.id]} onPress={() => open(d.id)} />
        ))}
      </View>

      <Button title={common.howItWorks} variant="ghost" onPress={() => router.push('/bienvenida')} />

      <DevTools />
    </Screen>
  );
}
