/** ¿Olvidaste tu contraseña? — UI only (no validation, no server yet). */
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { spacing } from '@/constants/theme';
import { authCopy } from '@/content/auth';

export default function RecuperarContrasena() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const copy = authCopy.forgot;
  const f = authCopy.fields;

  return (
    <AuthLayout title={copy.title} subtitle={copy.subtitle}>
      <TextField
        label={f.email.label}
        placeholder={f.email.placeholder}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="send"
      />

      {/* Not connected yet */}
      <Button title={copy.submit} onPress={() => {}} style={{ marginTop: spacing.sm }} />
      <Button title={copy.toSignIn} variant="ghost" onPress={() => router.back()} />
    </AuthLayout>
  );
}
