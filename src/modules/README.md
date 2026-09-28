# src/modules/

Módulos de dominio de ARTS Global. Cada carpeta es un área funcional del negocio.

## Estructura interna

```
modules/<modulo>/
├── <subdominio>/
│   ├── components/   # UI específica del subdominio
│   ├── services/     # Llamadas a mock/API de este dominio
│   ├── constants/
│   ├── types/
│   ├── hooks/
│   └── utils/
├── shared/           # Piezas compartidas del módulo
└── index.ts          # API pública (barrel)
```

## Módulos ARTS

| Módulo | Subdominios | Responsabilidad |
|--------|-------------|-----------------|
| `auth/` | — | Login, sesión, selección de rol |
| `producer/` | `panel`, `shared` | Home del producer, KPIs, renovaciones |
| `quote/` | `step-insured`, `step-aircraft`, `step-pilots`, `step-history`, `step-coverage`, `rating`, `result`, `shared` | Wizard 5 pasos + prima + vinculación |
| `policies/` | `registry`, `detail`, `lifecycle`, `shared` | Listados, detalle, endoso/cancel/renovar |
| `countries/` | `list`, `config`, `shared` | Gestión y configuración de país (16 ítems) |
| `users/` | `list`, `form`, `shared` | Gestión de usuarios |
| `claims/` | `list`, `detail`, `shared` | Reclamaciones (solo lectura) |
| `audit/` | `history`, `shared` | Historial de auditoría |
| `reports/` | `admin`, `producer`, `shared` | Reportes conversacionales |
| `portfolio/` | `dashboard`, `shared` | Panel de portafolio (Admin) |

## Convención

- La página en `app/` importa desde el módulo, no al revés.
- UI genérica → `src/components/`. UI de negocio → `modules/.../components/`.
- Un paso del wizard = un subdominio = carpeta propia (evita un `QuoteWizard.tsx` de 1000 líneas).
