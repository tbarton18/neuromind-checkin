/** Crear cuenta — UI only (no validation, no server yet). */
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { colors, spacing } from '@/constants/theme';
import { authCopy } from '@/content/auth';
import { useFinishSignIn } from '@/hooks/use-finish-sign-in';

export default function Registro() {
  const router = useRouter();
  const finishSignIn = useFinishSignIn();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const copy = authCopy.signUp;
  const f = authCopy.fields;

  return (
    <AuthLayout title={copy.title} subtitle={copy.subtitle} showLogo showBack={false}>
      <TextField
        label={f.name.label}
        placeholder={f.name.placeholder}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        returnKeyType="next"
      />
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
        returnKeyType="next"
      />
      <TextField
        label={f.password.label}
        placeholder={f.password.placeholder}
        value={password}
        onChangeText={setPassword}
        secure
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="next"
      />
      <TextField
        label={f.confirmPassword.label}
        placeholder={f.confirmPassword.placeholder}
        value={confirm}
        onChangeText={setConfirm}
        secure
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="done"
      />

      {/* Placeholder: no validation or server yet, just continues into the app. */}
      <Button title={copy.submit} onPress={finishSignIn} style={{ marginTop: spacing.sm }} />

      <View style={{ height: 1, backgroundColor: colors.border, marginVertical: spacing.sm }} />

      <AppText variant="secondary" align="center">
        {copy.haveAccount}
      </AppText>
      <Button title={copy.toSignIn} variant="secondary" onPress={() => router.replace('/cuenta/iniciar-sesion')} />
    </AuthLayout>
  );
}
