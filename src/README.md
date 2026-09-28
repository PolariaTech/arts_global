# src/

Código fuente de **ARTS Global** (Aerospace Risk Transfer Solutions) — plataforma de brokers para seguros de aviación.

## Propósito

Next.js resuelve las rutas desde `app/`. El resto organiza el código por responsabilidad para que ninguna pantalla acumule toda la lógica en un solo archivo.

## Mapa de carpetas

```
src/
├── app/          → Rutas (App Router). Páginas delgadas; sin lógica de negocio.
├── assets/       → Iconos e imágenes importables
├── components/   → UI reutilizable (shell, auth, tablas, badges…)
├── config/       → Env, rutas, navegación por rol
├── constants/    → Marca, roles, UI, coberturas/tarifas
├── data/mock/    → Datos mock del frontend (libro de pólizas, etc.)
├── hooks/        → Custom hooks de React
├── lib/          → Utilidades puras (format, storage, auth helpers)
├── modules/      → Dominio ARTS (quote, policies, countries…)
├── providers/    → Context providers
├── services/     → Clientes API y capa mock
├── stores/       → Estado global (Zustand u otro)
├── styles/       → Tokens / notas de diseño
├── test/         → Setup de pruebas
└── types/        → Tipos TypeScript compartidos
```

## Regla de oro

| Vive en… | Qué va ahí |
|----------|------------|
| `app/` | Solo routing + composición de página (< ~40 líneas) |
| `modules/<dominio>/` | UI y lógica de ese dominio |
| `components/` | Piezas genéricas sin reglas de negocio |
| `services/` / `data/mock/` | Acceso a datos |
| `hooks/` / `stores/` | Estado y efectos reutilizables |

Si un archivo pasa de ~200–250 líneas, pártelo (subcomponente, hook o util).

## Alias

`@/` → `src/`

```typescript
import { ROUTES } from '@/config/routes';
import { ROLES } from '@/constants/roles';
```
