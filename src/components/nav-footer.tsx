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
  /**
   * Whether to show "Atrás". Each screen decides this explicitly: asking the
   * navigator while a new screen is first drawn can give a stale "no".
   */
  showBack?: boolean;
  /** Override what "Atrás" does. Defaults to the previous screen (or the Mapa). */
  onBack?: () => void;
};

/** Bottom bar: optional "Atrás" + the main action. */
export function NavFooter({ title, onPress, disabled, showBack = true, onBack }: Props) {
  const router = useRouter();

  function goBack() {
    if (onBack) return onBack();
    // Checked on tap (not during render), so the answer is current.
    if (router.canGoBack()) router.back();
    else router.replace('/mapa');
  }

  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm }}>
      {showBack ? <Button title={BACK_LABEL} variant="secondary" onPress={goBack} style={{ flex: 1 }} /> : null}
      <Button title={title} onPress={onPress} disabled={disabled} style={{ flex: showBack ? 2 : 1 }} />
    </View>
  );
}
