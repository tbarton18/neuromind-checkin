/** Dimension intro: the circular card from the PDF + guiding question. */
import { Image } from 'expo-image';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { NavFooter } from '@/components/nav-footer';
import { Screen } from '@/components/screen';
import { dimensionCards } from '@/constants/illustrations';
import { colors, spacing } from '@/constants/theme';
import { dimensionCopy, getDimension, isAvailable } from '@/content/dimensions';

export default function DimensionIntro() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dimension = getDimension(Number(id));

  if (!dimension) return <Redirect href="/mapa" />;

  const available = isAvailable(dimension);

  const footer = available ? (
    // STEP 2: "Comenzar" is disabled until the question screens arrive (step 3).
    <NavFooter title={dimensionCopy.start} onPress={() => {}} disabled />
  ) : (
    <NavFooter title={dimensionCopy.backToMap} onPress={() => router.back()} hideBack />
  );

  return (
    <Screen footer={footer}>
      <AppText variant="label" align="center">
        {dimensionCopy.label(dimension.id)}
      </AppText>

      <Image
        source={dimensionCards[dimension.id]}
        style={{ width: '100%', aspectRatio: 1 }}
        contentFit="contain"
        accessibilityRole="header"
        accessibilityLabel={`${dimension.title}. ${dimension.intro}`}
      />

      {available ? (
        <>
          {dimension.subtitle ? (
            <AppText variant="heading" align="center">
              {dimension.subtitle}
            </AppText>
          ) : null}
          {dimension.context ? <AppText>{dimension.context}</AppText> : null}
          {dimension.instruction ? (
            <Card variant="soft">
              <AppText variant="bodyStrong">{dimension.instruction}</AppText>
            </Card>
          ) : null}
          <AppText variant="secondary" align="center">
            {dimensionCopy.questionCount(dimension.questions.length)}
          </AppText>
          <AppText variant="caption" align="center" style={{ color: colors.textMuted, marginTop: spacing.xs }}>
            {dimensionCopy.questionsArriving}
          </AppText>
        </>
      ) : (
        <Card variant="soft" style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
          <AppText variant="heading" align="center">
            {dimensionCopy.comingSoon}
          </AppText>
          <AppText align="center">{dimensionCopy.comingSoonBody}</AppText>
        </Card>
      )}
    </Screen>
  );
}
