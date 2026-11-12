import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { colors, radius, spacing } from '@/constants/theme';
import { planCopy, type PlanBlock } from '@/content/plans';

/** Renders the content blocks of a dimension plan. */
export function PlanBlocks({ blocks }: { blocks: PlanBlock[] }) {
  return (
    <View style={{ gap: spacing.md }}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </View>
  );
}

function Block({ block }: { block: PlanBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <AppText variant="heading" accessibilityRole="header" style={{ marginTop: spacing.sm }}>
          {block.text}
        </AppText>
      );

    case 'paragraph':
      return <AppText>{block.text}</AppText>;

    case 'quote':
      return (
        <AppText variant="heading" align="center" style={{ marginVertical: spacing.sm }}>
          {block.text}
        </AppText>
      );

    case 'bullets':
      return (
        <View style={{ gap: spacing.sm }}>
          {block.items.map((item) => (
            <View key={item} style={{ flexDirection: 'row', gap: spacing.sm + spacing.xs }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  marginTop: 7, // optical: centers the dot on the first line of body text
                  borderRadius: radius.full,
                  backgroundColor: colors.accent,
                }}
              />
              <AppText style={{ flex: 1 }}>{item}</AppText>
            </View>
          ))}
        </View>
      );

    case 'callout':
      return (
        <Card variant="soft">
          {block.title ? <AppText variant="bodyStrong">{block.title}</AppText> : null}
          <AppText>{block.text}</AppText>
        </Card>
      );

    case 'option':
      return (
        <Card style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: radius.full,
                backgroundColor: colors.accent,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText variant="chip" style={{ color: colors.onAccent }}>
                {block.number}
              </AppText>
            </View>
            <AppText variant="subtitle" style={{ flex: 1 }}>
              {block.title}
            </AppText>
          </View>
          <AppText>{block.body}</AppText>
          {block.neuromind ? (
            <Card variant="soft" style={{ padding: spacing.sm + spacing.xs }}>
              <AppText variant="label" style={{ color: colors.text }}>
                {planCopy.neuromindOption}
              </AppText>
              <AppText variant="secondary" style={{ color: colors.text }}>
                {block.neuromind}
              </AppText>
            </Card>
          ) : null}
        </Card>
      );

    case 'references':
      return (
        <View style={{ gap: spacing.xs, marginTop: spacing.sm }}>
          <AppText variant="label">{planCopy.references}</AppText>
          {block.items.map((ref) => (
            <AppText key={ref} variant="caption" selectable>
              {ref}
            </AppText>
          ))}
        </View>
      );
  }
}
