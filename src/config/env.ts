import { APP_VERSION } from '@/constants/app/version';

/**
 * Variables de entorno tipadas.
 * Frontend-only por ahora; la API se conectará después.
 */
export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? 'ARTS Global',
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION ?? APP_VERSION,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  isDev: process.env.NODE_ENV === 'development',
} as const;
