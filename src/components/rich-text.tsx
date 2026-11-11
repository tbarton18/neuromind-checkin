import { Text } from 'react-native';

import { AppText, type AppTextProps } from '@/components/app-text';
import { fonts } from '@/constants/theme';
import type { TextPart } from '@/content/onboarding';

/**
 * Renders a paragraph made of parts, where some parts are bold. Parts are plain
 * nested <Text>, so they inherit the paragraph variant's size and color.
 */
export function RichText({ parts, ...props }: AppTextProps & { parts: readonly TextPart[] }) {
  return (
    <AppText {...props}>
      {parts.map((part, i) => (
        <Text key={i} style={part.strong ? { fontFamily: fonts.sansBold } : undefined}>
          {part.text}
        </Text>
      ))}
    </AppText>
  );
}
