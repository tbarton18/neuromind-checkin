/** Dimension intro: the circular card from the PDF + guiding question. */
import { Image } from 'expo-image';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { NavFooter } from '@/components/nav-footer';
import { Screen } from '@/components/screen';
import { dimensionCards } from '@/constants/illustrations';
import { spacing } from '@/constants/theme';
import { dimensionCopy, getDimension, isAvailable } from '@/content/dimensions';
import { useCheckinAnswers } from '@/data/answers-store';
import { firstUnanswered, useDimensionProgress } from '@/hooks/use-dimension-progress';

export default function DimensionIntro() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { answers } = useCheckinAnswers();
  const progress = useDimensionProgress();
  const dimension = getDimension(Number(id));

  if (!dimension) return <Redirect href="/mapa" />;

  const status = progress[dimension.id];
  const params = { id: String(dimension.id) };
  const allAnswered = dimension.questions.every((q) => answers.has(q.id));
  const showAnswers = status.kind === 'completed' || allAnswered;

  function primaryAction() {
    if (!dimension) return;
    if (showAnswers) {
      router.push({ pathname: '/dimension/[id]/respuestas', params });
    } else {
      // Resume at the first unanswered question (question 1 when starting).
      const q = String(firstUnanswered(dimension, answers));
      router.push({ pathname: '/dimension/[id]/pregunta/[q]', params: { ...params, q } });
    }
  }

  const primaryTitle = showAnswers
    ? dimensionCopy.viewAnswers
    : status.kind === 'inProgress'
      ? dimensionCopy.resume
      : dimensionCopy.start;

  const footer = isAvailable(dimension) ? (
    <NavFooter title={primaryTitle} onPress={primaryAction} />
  ) : (
    <NavFooter title={dimensionCopy.backToMap} onPress={() => router.back()} showBack={false} />
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

      {isAvailable(dimension) ? (
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
