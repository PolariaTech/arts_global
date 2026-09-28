# src/components/

Componentes React reutilizables. Sin reglas de negocio de ARTS (esas van en `modules/`).

## Subcarpetas

| Carpeta | Contenido |
|---------|-----------|
| `auth/` | Guards de rol, formulario de login, bootstrap de sesión |
| `layouts/` | `shell/AppShell`, `sidebar/` (marca, nav, colapsar) |
| `shared/` | Tablas, formularios genéricos, cards, badges, toast, shells de módulo |
| `forms/` | Formularios compuestos reutilizables |
| `ui/` | Primitivos (botón, input, select…) — design system base |

## Convención

```typescript
import { AppShell } from '@/components/layouts/shell/AppShell';
import { RoleGate } from '@/components/auth/guards/RoleGate';
```

Si el componente solo tiene sentido en cotización o pólizas, no va aquí: va en `modules/quote` o `modules/policies`.
