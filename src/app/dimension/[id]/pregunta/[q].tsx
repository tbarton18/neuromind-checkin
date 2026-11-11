/** One question at a time: 0–10 slider, "Enviar" saves and moves on. */
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { NavFooter } from '@/components/nav-footer';
import { QuestionHeader } from '@/components/question-header';
import { Screen } from '@/components/screen';
import { ScoreSlider } from '@/components/score-slider';
import { colors, spacing } from '@/constants/theme';
import { dimensionCopy, getDimension } from '@/content/dimensions';
import { saveAnswer, useCheckinAnswers } from '@/data/answers-store';

export default function Pregunta() {
  const router = useRouter();
  const { id, q } = useLocalSearchParams<{ id: string; q: string }>();
  const { answers, completed } = useCheckinAnswers();

  const dimension = getDimension(Number(id));
  const number = Number(q);
  const question = dimension?.questions[number - 1];

  // Start from the saved answer when coming back to a question.
  const [draft, setDraft] = useState<number | null>(question ? (answers.get(question.id) ?? null) : null);

  if (!dimension || !question) return <Redirect href="/mapa" />;
  // A finished dimension is read-only for this check-in.
  if (completed.has(dimension.id)) {
    return <Redirect href={{ pathname: '/dimension/[id]/respuestas', params: { id: String(dimension.id) } }} />;
  }

  const total = dimension.questions.length;
  const scale = dimension.scale;
  const minLabel = scale.kind === 'faces' ? dimensionCopy.faces.min : scale.min;
  const maxLabel = scale.kind === 'faces' ? dimensionCopy.faces.max : scale.max;

  function submit() {
    if (draft == null || !dimension || !question) return;
    saveAnswer(question.id, draft);
    const params = { id: String(dimension.id) };
    if (number < total) {
      router.push({ pathname: '/dimension/[id]/pregunta/[q]', params: { ...params, q: String(number + 1) } });
    } else {
      router.push({ pathname: '/dimension/[id]/respuestas', params });
    }
  }

  return (
    <Screen
      scroll={false}
      footer={<NavFooter title={dimensionCopy.submit} onPress={submit} disabled={draft == null} />}>
      <QuestionHeader dimension={dimension} number={number} total={total} />

      <AppText variant="question" accessibilityRole="header" style={{ marginTop: spacing.md }}>
        {question.text}
      </AppText>

      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.lg }}>
        <View style={{ alignItems: 'center', gap: spacing.xs }}>
          <AppText
            variant="display"
            align="center"
            accessible={false}
            style={{ fontSize: 64, lineHeight: 70, color: draft == null ? colors.textMuted : colors.text }}>
            {draft ?? '–'}
          </AppText>
          {draft == null ? (
            <AppText variant="secondary" align="center">
              {dimensionCopy.sliderHint}
            </AppText>
          ) : null}
        </View>

        <ScoreSlider
          value={draft}
          onChange={setDraft}
          minLabel={minLabel}
          maxLabel={maxLabel}
          accessibilityLabel={question.text}
        />
      </View>
    </Screen>
  );
}
