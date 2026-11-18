/** Iniciar sesión — UI only (no validation, no server yet). */
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

export default function IniciarSesion() {
  const router = useRouter();
  const finishSignIn = useFinishSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const copy = authCopy.signIn;
  const f = authCopy.fields;

  return (
    <AuthLayout title={copy.title} subtitle={copy.subtitle} showLogo showBack={false}>
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
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="done"
      />

      <View style={{ alignItems: 'flex-end' }}>
        <Button
          title={copy.forgot}
          variant="ghost"
          onPress={() => router.push('/cuenta/recuperar-contrasena')}
          style={{ paddingHorizontal: spacing.xs }}
        />
      </View>

      {/* Placeholder: no validation or server yet, just continues into the app. */}
      <Button title={copy.submit} onPress={finishSignIn} />

      <View style={{ height: 1, backgroundColor: colors.border, marginVertical: spacing.sm }} />

      <AppText variant="secondary" align="center">
        {copy.noAccount}
      </AppText>
      <Button title={copy.toSignUp} variant="secondary" onPress={() => router.replace('/cuenta/registro')} />
    </AuthLayout>
  );
}
