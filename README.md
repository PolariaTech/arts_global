# ARTS Global

**Versión: 0.1.0** (estructura inicial · frontend mock)

Frontend de la plataforma de brokers **Aerospace Risk Transfer Solutions Inc.**  
Next.js 16 · React 19 · TypeScript · Tailwind 4.

Estructura inspirada en `polaria-wms-web` (organización por responsabilidad y módulos de dominio), adaptada al flujo ARTS. Independiente de Polaria WMS.

## Inicio rápido

```bash
npm install
cp .env.example .env
npm run dev
```

Abre [http://localhost:3002/login](http://localhost:3002/login).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Desarrollo en puerto **3002** |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción (3002) |
| `npm run lint` | ESLint |

## Organización (`src/`)

| Carpeta | Rol |
|---------|-----|
| `app/` | Rutas delgadas (App Router) |
| `modules/` | Dominio: quote, policies, countries, users, claims, audit, reports… |
| `components/` | UI reutilizable (shell, auth, tablas…) |
| `config/` | Env, rutas, navegación por rol |
| `constants/` | Marca, roles, coberturas |
| `data/mock/` | Datos mock del libro de pólizas |
| `services/` | Mock hoy · API mañana |
| `hooks/`, `stores/`, `lib/`, `types/` | Estado, utils y tipos |

Lee `src/README.md` y `src/modules/README.md` antes de agregar código.

## Regla de oro

- `page.tsx` solo compone (< ~40 líneas).
- Un archivo de UI/lógica ≈ un concern; partir al superar ~200–250 líneas.
- Negocio en `modules/`; UI genérica en `components/`.

## Rutas previstas (mockup)

- `/login`
- Producer: `/producer/panel`, `/producer/mis-polizas`, `/producer/cotizacion/paso-1`…`resultado`
- Admin: `/admin/portafolio`, `/admin/registro`, `/admin/paises`, `/admin/usuarios`, …
- Claims: `/claims/reclamaciones`
- Auditor: `/auditor/auditoria`
