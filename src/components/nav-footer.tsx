import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Button } from '@/components/button';
import { spacing } from '@/constants/theme';

export const BACK_LABEL = 'Atrás';

type Props = {
  /** Main action, e.g. "Continuar" or "Enviar". */
  title: string;
  onPress: () => void;
  disabled?: boolean;
  /** Override what "Atrás" does. Defaults to going to the previous screen. */
  onBack?: () => void;
  /** Force-hide "Atrás" (it is also hidden when there is no previous screen). */
  hideBack?: boolean;
};

/** Bottom bar: "Atrás" (when there's somewhere to go back to) + the main action. */
export function NavFooter({ title, onPress, disabled, onBack, hideBack }: Props) {
  const router = useRouter();
  const showBack = !hideBack && (onBack != null || router.canGoBack());

  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm }}>
      {showBack ? (
        <Button
          title={BACK_LABEL}
          variant="secondary"
          onPress={onBack ?? (() => router.back())}
          style={{ flex: 1 }}
        />
      ) : null}
      <Button title={title} onPress={onPress} disabled={disabled} style={{ flex: showBack ? 2 : 1 }} />
    </View>
  );
}
