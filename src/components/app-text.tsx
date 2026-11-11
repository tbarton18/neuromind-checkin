import { Text, type TextProps } from 'react-native';

import { type, type TypeVariant } from '@/constants/theme';

export type AppTextProps = TextProps & {
  variant?: TypeVariant;
  align?: 'left' | 'center' | 'right';
};

/** All text in the app goes through this, so screens never set font sizes. */
export function AppText({ variant = 'body', align, style, ...props }: AppTextProps) {
  return <Text style={[type[variant], align && { textAlign: align }, style]} {...props} />;
}
