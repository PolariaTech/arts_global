export type LoginLang = 'ES' | 'EN';

export const LOGIN_COPY = {
  ES: {
    platformLabel: 'Plataforma de Brokers',
    heading: 'Iniciar sesión',
    subheading: 'Acceso exclusivo para brokers autorizados de ARTS Global.',
    emailLabel: 'Correo electrónico',
    emailHint: 'Seleccione la cuenta con la que quiere entrar.',
    passwordLabel: 'Contraseña',
    show: 'Ver',
    hide: 'Ocultar',
    submit: 'Iniciar sesión',
    submitting: 'Verificando…',
    forgot: '¿Olvidaste tu contraseña?',
    security: 'Conexión cifrada. Uso restringido a personal autorizado.',
    footer: 'ARTS Global · Aerospace Risk Transfer Solutions Inc. · Miami, FL',
  },
  EN: {
    platformLabel: 'Broker Platform',
    heading: 'Sign in',
    subheading: 'Restricted access for authorized ARTS Global brokers.',
    emailLabel: 'Email address',
    emailHint: 'Choose the account you want to sign in as.',
    passwordLabel: 'Password',
    show: 'Show',
    hide: 'Hide',
    submit: 'Sign in',
    submitting: 'Verifying…',
    forgot: 'Forgot your password?',
    security: 'Encrypted connection. Authorized personnel only.',
    footer: 'ARTS Global · Aerospace Risk Transfer Solutions Inc. · Miami, FL',
  },
} as const;
