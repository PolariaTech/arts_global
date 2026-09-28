import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { TabTitleProvider } from '@/components/shared/document/TabTitleProvider';
import { AuthProvider } from '@/providers/auth/AuthProvider';
import { APP_TAB_BRAND } from '@/config/pageTitles';
import './globals.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: APP_TAB_BRAND,
    template: `%s · ${APP_TAB_BRAND}`,
  },
  description: 'Plataforma de brokers — Aerospace Risk Transfer Solutions Inc.',
  applicationName: APP_TAB_BRAND,
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AuthProvider>
          <TabTitleProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
