/**
 * The six dimensions of the Mapa de Bienestar NeuroMind.
 * Source: "Check-in de Bienestar NeuroMind" (PDF). Edit wording here only.
 *
 * Question ids are permanent: answers are saved by id, so never reuse or
 * renumber an id. To change wording, edit `text`; to replace a question with
 * a different one, give it a new id.
 */
import type { DimensionId } from '@/constants/illustrations';

export type { DimensionId };

export type Question = { id: string; text: string };

export type Scale =
  | { kind: 'faces' } // 😟 … 😄 at the ends of the slider
  | { kind: 'labels'; min: string; max: string }; // e.g. Nunca … Siempre

export type Dimension = {
  id: DimensionId;
  title: string;
  /** Title split for the wheel, where space is tight. */
  wheelTitle: string;
  /** Description printed on the intro card (also used as its accessibility label). */
  intro: string;
  /** Guiding question shown under the intro card. */
  subtitle?: string;
  /** Optional extra paragraph under the subtitle. */
  context?: string;
  /** Optional instruction before the first question. */
  instruction?: string;
  scale: Scale;
  /** Empty = not available yet ("Próximamente"). */
  questions: Question[];
};

const FACES: Scale = { kind: 'faces' };

export const dimensions: Dimension[] = [
  {
    id: 1,
    title: 'Bienestar personal',
    wheelTitle: 'Bienestar\npersonal',
    intro:
      'Esta dimensión invita a detenerte y reconocer cómo te has sentido estas últimas dos semanas, de esta manera podrás identificar tus necesidades y aquello que puedes incorporar para cuidar tu bienestar.',
    subtitle: '¿Cómo me he sentido estas últimas dos semanas?',
    context:
      'Es importante saber que las distintas actividades y contextos laborales consumen nuestra energía. Por eso, también necesitamos aprender a reconocer qué nos ayuda a recuperarla y generar pequeños espacios de recuperación durante el día.',
    instruction: 'Avanza con la cara de NeuroMind de acuerdo a tu percepción del día a día.',
    scale: FACES,
    questions: [
      { id: 'd1_q1', text: '¿Con qué frecuencia me siento con energía para enfrentar mi jornada?' },
      { id: 'd1_q2', text: '¿Estoy disfrutando los momentos cotidianos de mi vida?' },
      { id: 'd1_q3', text: '¿Siento motivación para realizar mis actividades?' },
      { id: 'd1_q4', text: '¿Encuentro momentos de tranquilidad durante mi día?' },
      { id: 'd1_q5', text: '¿Con qué frecuencia siento satisfacción con la vida que estoy construyendo?' },
      {
        id: 'd1_q6',
        text: '¿Con qué frecuencia siento que puedo cuidar de mí mientras cumplo con mis responsabilidades?',
      },
    ],
  },
  {
    id: 2,
    title: 'Equilibrio emocional',
    wheelTitle: 'Equilibrio\nemocional',
    intro:
      'Esta dimensión te invita a reconocer, comprender la manera en cómo expresas tus emociones, desarrollando estrategias que te ayuden a regularlas y comunicarlas de manera saludable.',
    subtitle: '¿Cómo estoy gestionando lo que me pasa?',
    scale: FACES,
    questions: [
      { id: 'd2_q1', text: '¿Con qué frecuencia siento que puedo mantener la calma frente a situaciones difíciles?' },
      { id: 'd2_q2', text: '¿Con qué frecuencia logro reconocer lo que estoy sintiendo?' },
      {
        id: 'd2_q3',
        text: '¿Con qué frecuencia siento que tengo recursos para manejar mis emociones cuando me siento sobrepasado/a?',
      },
      { id: 'd2_q4', text: '¿Puedo recuperar mi equilibrio después de una situación difícil?' },
      { id: 'd2_q5', text: '¿Puedo expresar lo que siento de una manera que me ayude?' },
      { id: 'd2_q6', text: '¿Siento que puedo tomar distancia de mis preocupaciones cuando lo necesito?' },
    ],
  },
  {
    id: 3,
    title: 'Relación con el estrés',
    wheelTitle: 'Relación\ncon el estrés',
    intro:
      'Esta dimensión te invita a identificar cómo respondes frente al estrés, reconocer aquello que lo genera y explorar estrategias para afrontarlo y recuperar tu equilibrio.',
    subtitle: '¿Cómo estoy enfrentando las demandas de mi vida cotidiana?',
    scale: { kind: 'labels', min: 'Nunca', max: 'Siempre' },
    questions: [
      { id: 'd3_q1', text: '¿Con qué frecuencia siento que las demandas de mi día superan mis recursos?' },
      { id: 'd3_q2', text: '¿Con qué frecuencia siento tensión o sobrecarga durante mi jornada?' },
      { id: 'd3_q3', text: '¿Con qué frecuencia logro hacer pausas que me permiten recuperar energía?' },
      {
        id: 'd3_q4',
        text: '¿Con qué frecuencia siento que puedo organizar mis responsabilidades sin sentirme sobrepasado/a?',
      },
      {
        id: 'd3_q5',
        text: '¿Con qué frecuencia termino mi jornada sintiendo que necesito seguir funcionando aunque esté agotado/a?',
      },
      {
        id: 'd3_q6',
        text: '¿Con qué frecuencia tengo dificultades para desconectarme de mis responsabilidades al finalizar el día?',
      },
    ],
  },
  {
    id: 4,
    title: 'Conexión y apoyo',
    wheelTitle: 'Conexión\ny apoyo',
    intro:
      'Esta dimensión te invita a reconocer y fortalecer tus vínculos, identificando las personas y redes con las que cuentas cuando necesitas apoyo, compañía o contención.',
    subtitle: '6 preguntas de autoevaluación y reflexión',
    context:
      'Recuerda que no existen respuestas buenas ni malas, este es un espacio de reflexión, por lo tanto no se trata simplemente de “socializar más”, sino de favorecer conexiones significativas y sostenidas. Esto te permitirá tomar acciones y en NeuroMind te podemos ayudar a facilitar esa conexión.',
    scale: FACES,
    questions: [
      { id: 'd4_q1', text: '¿Habitualmente haces espacio en tu rutina para compartir con personas importantes para ti?' },
      {
        id: 'd4_q2',
        text: '¿Intentas buscar momentos para conversar, compartir o realizar actividades con otras personas?',
      },
      {
        id: 'd4_q3',
        text: '¿Con qué frecuencia realizas actividades que te permiten conocer nuevas personas o fortalecer tus vínculos?',
      },
      {
        id: 'd4_q4',
        text: '¿Sueles reservar tiempo para mantener el contacto con familiares, amistades o personas significativas para ti?',
      },
      { id: 'd4_q5', text: 'Cuando tu rutina se vuelve exigente, ¿Intentas mantener espacios de conexión social?' },
      {
        id: 'd4_q6',
        text: '¿Intentas incorporar en tu rutina para generar más espacios de encuentro, compañía y conexión con otras personas?',
      },
    ],
  },
  {
    id: 5,
    title: 'Recuperación y descanso',
    wheelTitle: 'Recuperación\ny descanso',
    intro:
      'Esta dimensión te invita a hacer una pausa y observar cómo estás recuperando tu energía, considerando tus hábitos de descanso, sueño y autocuidado físico y mental.',
    scale: FACES,
    questions: [], // Próximamente
  },
  {
    id: 6,
    title: 'Propósito y motivación',
    wheelTitle: 'Propósito\ny motivación',
    intro:
      'Esta dimensión te invita a conectar con aquello que te impulsa y da sentido a lo que haces, reconociendo tus motivaciones, valores y objetivos personales y laborales.',
    scale: FACES,
    questions: [], // Próximamente
  },
];

export function getDimension(id: number): Dimension | undefined {
  return dimensions.find((d) => d.id === id);
}

export function isAvailable(d: Dimension): boolean {
  return d.questions.length > 0;
}

/** Copy used around the dimensions. */
export const dimensionCopy = {
  label: (id: DimensionId) => `Dimensión ${id}`,
  comingSoon: 'Próximamente',
  comingSoonBody: 'Estamos preparando las preguntas de esta dimensión. Muy pronto podrás explorarla.',
  start: 'Comenzar',
  questionsArriving: 'Las preguntas se activan en el siguiente paso de desarrollo.',
  backToMap: 'Volver al mapa',
  status: {
    pending: 'Pendiente',
    inProgress: (answered: number, total: number) => `En progreso · ${answered}/${total}`,
    completed: 'Completado',
    comingSoon: 'Próximamente',
  },
  questionCount: (n: number) => `${n} preguntas`,
} as const;
