# src/app/

App Router de Next.js. Aquí solo viven rutas, layouts y páginas delgadas.

## Estructura de rutas ARTS

```
app/
├── (auth)/
│   └── login/                 → /login
├── (shell)/                   → layout con sidebar según rol
│   ├── producer/
│   │   ├── panel/
│   │   ├── mis-polizas/
│   │   ├── reportes/
│   │   ├── cotizacion/paso-1 … paso-5, calculando, resultado
│   │   └── polizas/           → detalle ?pol=
│   ├── admin/
│   │   ├── portafolio/
│   │   ├── registro/
│   │   ├── reportes/
│   │   ├── paises/ (+ configuracion)
│   │   ├── usuarios/
│   │   └── polizas/
│   ├── claims/
│   │   ├── reclamaciones/
│   │   └── polizas/           → detalle solo lectura
│   ├── auditor/
│   │   └── auditoria/
│   └── perfil/
├── layout.tsx
├── page.tsx                   → redirige a /login
└── globals.css
```

## Convención

Cada `page.tsx` debe ser delgado:

```tsx
import { ProducerPanelPage } from '@/modules/producer/panel';

export default function Page() {
  return <ProducerPanelPage />;
}
```
