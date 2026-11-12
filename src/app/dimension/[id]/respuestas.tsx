/** "Tus respuestas": read-only recap of the answers for one dimension. */
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { NavFooter } from '@/components/nav-footer';
import { Screen } from '@/components/screen';
import { colors, radius, spacing } from '@/constants/theme';
import { dimensionCopy, getDimension } from '@/content/dimensions';
import { getPlan, planCopy } from '@/content/plans';
import { completeDimension, useCheckinAnswers } from '@/data/answers-store';

export default function Respuestas() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { answers, completed } = useCheckinAnswers();
  const dimension = getDimension(Number(id));

  if (!dimension) return <Redirect href="/mapa" />;

  const isCompleted = completed.has(dimension.id);
  const copy = dimensionCopy.answers;

  const hasPlan = getPlan(dimension.id) != null;
  const params = { id: String(dimension.id) };

  function openPlan() {
    router.push({ pathname: '/dimension/[id]/plan', params });
  }

  function finish() {
    if (!dimension) return;
    completeDimension(dimension.id);
    if (hasPlan) openPlan();
    else router.dismissTo('/mapa');
  }

  return (
    <Screen
      footer={
        isCompleted ? (
          hasPlan ? (
            <NavFooter title={planCopy.viewPlan} onPress={openPlan} />
          ) : (
            <NavFooter title={dimensionCopy.backToMap} onPress={() => router.dismissTo('/mapa')} />
          )
        ) : (
          // "Atrás" returns to the last question so an answer can still be changed.
          <NavFooter title={dimensionCopy.finish} onPress={finish} />
        )
      }>
      <AppText variant="label">
        {dimensionCopy.label(dimension.id)} · {dimension.title}
      </AppText>
      <AppText variant="title" accessibilityRole="header">
        {copy.title}
      </AppText>
      <AppText variant="secondary">{isCompleted ? copy.introCompleted : copy.intro}</AppText>

      <View style={{ gap: spacing.sm }}>
        {dimension.questions.map((question, i) => {
          const value = answers.get(question.id);
          return (
            <Card
              key={question.id}
              accessible
              accessibilityLabel={`Pregunta ${i + 1}. ${question.text} Respuesta: ${value ?? 'sin responder'} de 10.`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
              <AppText style={{ flex: 1 }}>{question.text}</AppText>
              <View
                style={{
                  minWidth: 64,
                  paddingVertical: spacing.xs,
                  paddingHorizontal: spacing.sm,
                  borderRadius: radius.full,
                  backgroundColor: value == null ? colors.disabled : colors.accent,
                  alignItems: 'center',
                }}>
                <AppText variant="bodyStrong" style={{ color: colors.onAccent }}>
                  {value == null ? '–' : copy.outOf(value)}
                </AppText>
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
