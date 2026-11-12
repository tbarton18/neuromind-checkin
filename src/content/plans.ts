/**
 * Plan shown after finishing each dimension. Text comes from the PDF where it
 * exists; everything is marked as placeholder until the final content arrives.
 * Edit here only. A plan is a list of simple blocks the screen knows how to show.
 */
import type { DimensionId } from '@/content/dimensions';

export type PlanBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'bullets'; items: string[] }
  | {
      type: 'option'; // numbered action the person can choose
      number: number;
      title: string;
      body: string;
      /** "Opción NeuroMind" note under the option. */
      neuromind?: string;
    }
  | { type: 'callout'; title?: string; text: string } // highlighted box
  | { type: 'references'; items: string[] };

export type Plan = {
  title: string;
  /** Show the plan card from the PDF at the top, when there is one. */
  showCard: boolean;
  /** Text printed on the card image (read aloud by screen readers). */
  cardText?: string;
  placeholder: boolean;
  blocks: PlanBlock[];
};

export const planCopy = {
  label: 'Tu plan',
  placeholderTitle: 'Contenido en preparación',
  placeholderBody: 'Este plan es una versión preliminar y puede cambiar.',
  comingSoon: 'Estamos preparando un plan para esta dimensión. Muy pronto encontrarás aquí acciones concretas para cuidar tu bienestar.',
  neuromindOption: 'Opción NeuroMind',
  references: 'Referencias',
  viewPlan: 'Ver mi plan',
} as const;

export const plans: Partial<Record<DimensionId, Plan>> = {
  1: {
    title: 'Plan de recuperación de energía',
    showCard: true,
    cardText:
      'Durante una semana, identifica qué actividades consumen tu energía y cuáles te ayudan a recuperarla. A partir de esto, incorpora diariamente dos actividades de 10 a 20 minutos que te permitan descansar y recuperar energía.',
    placeholder: true,
    blocks: [
      { type: 'heading', text: '¿Sabes cómo recuperar tu energía?' },
      {
        type: 'paragraph',
        text: 'Plan de recuperación de energía mental para disminuir la fatiga durante o después de la jornada laboral.',
      },
      {
        type: 'callout',
        title: 'Pausas NeuroMind de recuperación',
        text: '“¡Dame un respiro!”',
      },
      {
        type: 'paragraph',
        text: 'En una cultura de “conexión permanente”, es esencial encontrar un equilibrio entre la eficacia en el trabajo y el bienestar óptimo. Los datos respaldan el papel de los microdescansos para el bienestar y recuperación de energía; se evidencia que actividades de recuperación de corta duración son beneficiosas en la prevención del estrés (Albulescu et al., 2022).',
      },
      {
        type: 'bullets',
        items: [
          'Actividades de recuperación',
          'Pausas ergonómicas',
          'Nutrición e hidratación para el rendimiento cognitivo',
        ],
      },
      {
        type: 'paragraph',
        text: 'Hidratación: una revisión sistemática de 33 estudios y 3.636 adultos encontró resultados variables, aunque mantener una hidratación adecuada mostró posibles beneficios en atención, memoria de trabajo y control inhibitorio. La evidencia no permite afirmar que simplemente “beber más agua” mejore siempre la cognición.',
      },
      {
        type: 'references',
        items: [
          'Albulescu, P., Macsinga, I., Rusu, A., Sulea, C., Bodnaru, A., & Tulbure, B. T. (2022). "Give me a break!" A systematic review and meta-analysis on the efficacy of micro-breaks for increasing well-being and performance. PLoS ONE, 17(8), e0272460. https://doi.org/10.1371/journal.pone.0272460',
          'Sarwar (2025/2026). Impact of Hydration Status on Cognitive Performance.',
          'Białecka-Dębek et al. (2025). Water intake, hydration status and cognitive functions in older adults.',
          'Wiśniewska & Okręglicka (2021). Effect of dehydration on cognitive functions.',
          'Katz, Airaghi & Davy (2021). Does Hydration Status Influence Executive Function? A Systematic Review.',
        ],
      },
    ],
  },

  2: {
    title: 'Equilibrio emocional',
    showCard: false,
    placeholder: true,
    blocks: [{ type: 'paragraph', text: planCopy.comingSoon }],
  },

  3: {
    title: 'Plan para gestionar el estrés',
    showCard: true,
    placeholder: true,
    blocks: [{ type: 'paragraph', text: planCopy.comingSoon }],
  },

  4: {
    title: 'Plan de reconexión social',
    showCard: false,
    placeholder: true,
    blocks: [
      { type: 'paragraph', text: 'Activación conductual orientada a la conexión social.' },
      {
        type: 'paragraph',
        text: 'Esta es una estrategia simple para comenzar a activar tu conexión social. Esta consiste en identificar actividades sociales que sean valiosas para ti y las que has dejado fuera de tu rutina.',
      },
      { type: 'quote', text: '“Lo que no se planifica no se hace”' },
      {
        type: 'callout',
        title: 'Objetivo',
        text: 'Invitación a reconectar progresivamente. Puedes considerar comenzar por alguna de estas actividades; son opciones, no es necesario hacer las tres al mismo tiempo. Te recomendamos comenzar por una de las tres.',
      },
      {
        type: 'paragraph',
        text: 'Comienza por planificar un día específico e incorporar una actividad simple, como salir a caminar con una amiga con la que perdiste contacto o hacer una videollamada.',
      },
      {
        type: 'option',
        number: 1,
        title: 'Activación conductual orientada a la conexión social',
        body: 'Elige una persona con la que te gustaría reconectar y agenda durante esta semana un momento concreto para conversar, tomar un café, caminar o realizar alguna actividad juntos.',
        neuromind: 'En NeuroMind contamos con psicólogos que te podrían orientar.',
      },
      {
        type: 'option',
        number: 2,
        title: 'Priorizar la calidad de los vínculos',
        body: 'Identifica 1 o 2 personas con quienes te sientas escuchado/a, valorado/a o acompañado/a y busca una oportunidad para fortalecer esos vínculos.',
        neuromind: 'En NeuroMind contamos con psicólogos que te podrían orientar.',
      },
      {
        type: 'option',
        number: 3,
        title: 'Incorporar actividades grupales con intereses compartidos',
        body: 'Durante las próximas semanas, participa en una actividad que conecte con alguno de tus intereses: deporte, arte, lectura, voluntariado, aprendizaje u otra actividad compartida.',
        neuromind: 'En NeuroMind encontrarás ideas de una variedad de actividades grupales en las que podrás conectar.',
      },
      {
        type: 'paragraph',
        text: 'Una revisión de intervenciones encontró resultados favorables especialmente en actividades sociales grupales, actividades recreativas y grupos de apoyo, porque generan oportunidades repetidas de interacción y pertenencia.',
      },
    ],
  },
};

export function getPlan(id: DimensionId): Plan | undefined {
  return plans[id];
}
