/** One question at a time: 0–10 slider, "Enviar" saves and moves on. */
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

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
  const { height } = useWindowDimensions();

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
      footer={
        <NavFooter
          title={dimensionCopy.submit}
          onPress={submit}
          disabled={draft == null}
          disabledHint={dimensionCopy.submitDisabledHint}
        />
      }>
      <QuestionHeader dimension={dimension} number={number} total={total} />

      <AppText
        variant="question"
        accessibilityRole="header"
        // This screen doesn't scroll (so dragging the slider never fights a scroll):
        // allow larger text, but not so large that the slider is pushed off screen.
        maxFontSizeMultiplier={1.6}
        style={{ marginTop: spacing.md }}>
        {question.text}
      </AppText>

      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.lg }}>
        <View style={{ alignItems: 'center', gap: spacing.xs }}>
          <AppText
            variant="display"
            align="center"
            accessible={false}
            maxFontSizeMultiplier={1.1}
            // Smaller readout on short phones (e.g. iPhone SE) to leave room for the question.
            style={{
              fontSize: height < 700 ? 48 : 64,
              lineHeight: height < 700 ? 54 : 70,
              color: draft == null ? colors.textMuted : colors.text,
            }}>
            {draft ?? '–'}
          </AppText>
          {/* Always rendered so it keeps its space: hiding it (not removing it)
              keeps the slider from shifting up once a value is chosen. */}
          <AppText
            variant="secondary"
            align="center"
            style={{ opacity: draft == null ? 1 : 0 }}
            accessibilityElementsHidden={draft != null}
            importantForAccessibility={draft == null ? 'auto' : 'no-hide-descendants'}>
            {dimensionCopy.sliderHint}
          </AppText>
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
