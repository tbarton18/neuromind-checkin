/**
 * Copy for the account screens (sign in, sign up, forgot / change password).
 * UI only for now: no validation and no server calls yet.
 */
export const authCopy = {
  fields: {
    name: { label: 'Nombre', placeholder: 'Tu nombre' },
    email: { label: 'Correo electrónico', placeholder: 'tucorreo@ejemplo.com' },
    password: { label: 'Contraseña', placeholder: 'Tu contraseña' },
    confirmPassword: { label: 'Confirmar contraseña', placeholder: 'Repite tu contraseña' },
    currentPassword: { label: 'Contraseña actual', placeholder: 'Tu contraseña actual' },
    newPassword: { label: 'Nueva contraseña', placeholder: 'Tu nueva contraseña' },
    confirmNewPassword: { label: 'Confirmar nueva contraseña', placeholder: 'Repite tu nueva contraseña' },
  },
  show: 'Mostrar',
  hide: 'Ocultar',
  back: 'Atrás',

  signIn: {
    title: 'Iniciar sesión',
    subtitle: 'Ingresa a tu cuenta para guardar tu Mapa de Bienestar.',
    forgot: '¿Olvidaste tu contraseña?',
    submit: 'Iniciar sesión',
    noAccount: '¿No tienes una cuenta?',
    toSignUp: 'Crear cuenta',
  },

  signUp: {
    title: 'Crear cuenta',
    subtitle: 'Crea tu cuenta para guardar tu progreso y ver tu evolución mes a mes.',
    submit: 'Crear cuenta',
    haveAccount: '¿Ya tienes una cuenta?',
    toSignIn: 'Iniciar sesión',
  },

  forgot: {
    title: '¿Olvidaste tu contraseña?',
    subtitle: 'Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.',
    submit: 'Enviar instrucciones',
    toSignIn: 'Volver a iniciar sesión',
  },

  change: {
    title: 'Cambiar contraseña',
    subtitle: 'Ingresa tu contraseña actual y elige una nueva.',
    submit: 'Guardar cambios',
    cancel: 'Cancelar',
  },

  /** Button on the Mapa. */
  signOut: 'Cerrar sesión',
} as const;
