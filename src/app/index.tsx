/**
 * TEMPORARY — step 0 brand check. Shows the fonts, colors, buttons, cards and
 * illustrations so the design system can be reviewed on a device.
 * Replaced in step 1 by the onboarding redirect (Pantalla 1).
 */
import { Image } from 'expo-image';
import { useState } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { dimensionFaces, illustrations, type DimensionId } from '@/constants/illustrations';
import { palette, radius, spacing } from '@/constants/theme';

const DIMENSIONS: DimensionId[] = [1, 2, 3, 4, 5, 6];

export default function BrandCheck() {
  const [presses, setPresses] = useState(0);

  return (
    <Screen
      footer={
        <Button
          title={presses === 0 ? 'Continuar' : `Continuar (${presses})`}
          onPress={() => setPresses((n) => n + 1)}
        />
      }>
      <Image
        source={illustrations.logo}
        style={{ width: 160, aspectRatio: 911 / 790, alignSelf: 'center' }}
        contentFit="contain"
        accessibilityLabel="Logo NeuroMind"
      />

      <AppText variant="label">Paso 0 · Sistema de marca</AppText>
      <AppText variant="display">NeuroMind te ayuda a conocerte</AppText>
      <AppText variant="title">Mapa de Bienestar</AppText>
      <AppText variant="heading">Bienestar personal</AppText>
      <AppText variant="question">¿Con qué frecuencia me siento con energía para enfrentar mi jornada?</AppText>
      <AppText variant="subtitle">Detente · Conecta · Descubre</AppText>
      <AppText>
        Este recorrido te invita a detenerte, escucharte y reconocer qué necesitas para cultivar el
        equilibrio.
      </AppText>
      <AppText variant="secondary">Texto secundario para descripciones.</AppText>
      <AppText variant="caption">Metadata · Noviembre 2026</AppText>

      <Card variant="soft">
        <AppText variant="bodyStrong" align="center">
          “Tu bienestar comienza cuando te das un espacio para escucharte”
        </AppText>
      </Card>

      <Card>
        <AppText variant="label">Colores</AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          {Object.entries(palette).map(([name, hex]) => (
            <View key={name} style={{ alignItems: 'center', gap: spacing.xs, width: 64 }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: radius.sm,
                  backgroundColor: hex,
                  borderWidth: 1,
                  borderColor: palette.gray2,
                }}
              />
              <AppText variant="caption" align="center">
                {name}
              </AppText>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <AppText variant="label">Dimensiones</AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: spacing.sm }}>
          {DIMENSIONS.map((id) => (
            <Image key={id} source={dimensionFaces[id]} style={{ width: 90, height: 90 }} contentFit="contain" />
          ))}
        </View>
      </Card>

      <Image
        source={illustrations.cycle}
        style={{ width: '100%', aspectRatio: 1 }}
        contentFit="contain"
        accessibilityLabel="Ciclo NeuroMind"
      />

      <View style={{ gap: spacing.sm }}>
        <Button title="Enviar (desactivado)" disabled />
        <Button title="Botón oscuro" variant="dark" />
        <Button title="Atrás" variant="secondary" />
        <Button title="Saltar" variant="ghost" />
      </View>
    </Screen>
  );
}
