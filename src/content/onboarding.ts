/**
 * Onboarding copy (Pantallas 1–3), taken from "Check-in de Bienestar NeuroMind".
 * Edit wording here, not in the screens.
 *
 * Rich text: a paragraph is a list of parts; `strong: true` renders in bold.
 */
export type TextPart = { text: string; strong?: boolean };

export const bienvenida = {
  tagline: '“NeuroMind te ayuda a conocerte para sentirte mejor”',
  body:
    'Aquí podrás explorar tu “Mapa de Bienestar NeuroMind” a través de la exploración de estas seis ' +
    'dimensiones que podrán reflejar diferentes aspectos de tu salud mental y vida cotidiana. Este ' +
    'recorrido te invita a detenerte, escucharte y reconocer qué necesitas para cultivar el equilibrio, ' +
    'fortalecer tu autocuidado y avanzar en tu desarrollo personal, favoreciendo una mayor armonía, ' +
    'plenitud y satisfacción personal, y una mejor calidad de vida.',
  quote: '“Tu bienestar comienza cuando te das un espacio para escucharte”',
  cta: 'Continuar',
} as const;

export const beneficios: {
  title: string;
  intro: string;
  items: readonly (readonly TextPart[])[];
  cta: string;
} = {
  title: '¿Qué beneficios tiene explorar tu Mapa de Bienestar?',
  intro: 'Conocer tu mapa de bienestar te permitirá:',
  items: [
    [
      { text: 'Reconocer', strong: true },
      { text: ' cómo te encuentras actualmente, identificando fortalezas y áreas que requieren mayor atención.' },
    ],
    [
      { text: 'Tomar conciencia', strong: true },
      { text: ' de tus propios recursos para afrontar el estrés y las demandas de la vida cotidiana.' },
    ],
    [
      { text: 'Identificar patrones y necesidades', strong: true },
      { text: ' relacionados con tus emociones, descanso, relaciones, estrés, motivación y bienestar personal.' },
    ],
    [
      { text: 'Reflexionar', strong: true },
      { text: ' sobre tus hábitos de autocuidado y sobre aquellas áreas que podrías fortalecer.' },
    ],
    [
      { text: 'Orientar', strong: true },
      { text: ' pequeñas acciones de cambio, de acuerdo con tus necesidades y posibilidades.' },
    ],
    [
      { text: 'Hacer seguimiento', strong: true },
      { text: ' de tu bienestar a lo largo del tiempo, observando cómo evolucionan las distintas dimensiones.' },
    ],
  ],
  cta: 'Continuar',
};

export const comoUsar: {
  title: string;
  steps: readonly string[];
  objective: readonly TextPart[];
  cycleLabel: string;
  cta: string;
} = {
  title: '¿Cómo usar NeuroMind?',
  steps: ['Detente', 'Conecta', 'Descubre'],
  objective: [
    { text: 'El objetivo no es obtener un resultado “bueno” o “malo”, sino ' },
    { text: 'conocerte mejor', strong: true },
    { text: ' y contar con información que te ayude a tomar decisiones para cuidar tu bienestar.' },
  ],
  cycleLabel:
    'Ciclo NeuroMind: 1 Exploración, 2 Identificación de necesidades, 3 Acciones de autocuidado, ' +
    '4 Seguimiento, 5 Reevaluación, 6 Evolución y efectividad.',
  cta: 'Continuar',
};

export const mapa = {
  title: 'Ahora inicia tu recorrido por NeuroMind',
} as const;

export const common = {
  skip: 'Saltar',
  howItWorks: '¿Cómo funciona NeuroMind?',
} as const;
