/** Cambiar contraseña — UI only (no validation, no server yet). */
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { spacing } from '@/constants/theme';
import { authCopy } from '@/content/auth';

export default function CambiarContrasena() {
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const copy = authCopy.change;
  const f = authCopy.fields;

  function cancel() {
    if (router.canGoBack()) router.back();
    else router.replace('/mapa');
  }

  return (
    <AuthLayout title={copy.title} subtitle={copy.subtitle}>
      <TextField
        label={f.currentPassword.label}
        placeholder={f.currentPassword.placeholder}
        value={current}
        onChangeText={setCurrent}
        secure
        autoCapitalize="none"
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="next"
      />
      <TextField
        label={f.newPassword.label}
        placeholder={f.newPassword.placeholder}
        value={next}
        onChangeText={setNext}
        secure
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="next"
      />
      <TextField
        label={f.confirmNewPassword.label}
        placeholder={f.confirmNewPassword.placeholder}
        value={confirm}
        onChangeText={setConfirm}
        secure
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="done"
      />

      {/* Not connected yet */}
      <Button title={copy.submit} onPress={() => {}} style={{ marginTop: spacing.sm }} />
      <Button title={copy.cancel} variant="secondary" onPress={cancel} />
    </AuthLayout>
  );
}
