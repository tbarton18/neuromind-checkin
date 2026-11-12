/** Plan shown after finishing a dimension (also reachable from "Tus respuestas"). */
import { Image } from 'expo-image';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { NavFooter } from '@/components/nav-footer';
import { PlanBlocks } from '@/components/plan-blocks';
import { Screen } from '@/components/screen';
import { planCards } from '@/constants/illustrations';
import { dimensionCopy, getDimension } from '@/content/dimensions';
import { getPlan, planCopy } from '@/content/plans';

export default function PlanScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dimension = getDimension(Number(id));
  const plan = dimension ? getPlan(dimension.id) : undefined;

  if (!dimension || !plan) return <Redirect href="/mapa" />;

  const card = plan.showCard ? planCards[dimension.id] : undefined;

  return (
    <Screen footer={<NavFooter title={dimensionCopy.backToMap} onPress={() => router.dismissTo('/mapa')} />}>
      <AppText variant="label">
        {dimensionCopy.label(dimension.id)} · {planCopy.label}
      </AppText>

      {card ? (
        <Image
          source={card}
          style={{ width: '100%', aspectRatio: 1 }}
          contentFit="contain"
          accessibilityRole="header"
          accessibilityLabel={plan.cardText ? `${plan.title}. ${plan.cardText}` : plan.title}
        />
      ) : (
        <AppText variant="title" accessibilityRole="header">
          {plan.title}
        </AppText>
      )}

      {plan.placeholder ? (
        <Card variant="outline">
          <AppText variant="label">{planCopy.placeholderTitle}</AppText>
          <AppText variant="secondary">{planCopy.placeholderBody}</AppText>
        </Card>
      ) : null}

      <PlanBlocks blocks={plan.blocks} />
    </Screen>
  );
}
