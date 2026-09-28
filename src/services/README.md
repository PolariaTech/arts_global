# src/services/

Acceso a datos. Hoy: capa `mock/`. Después: `api/` contra el backend.

Los módulos llaman a services; las páginas no hablan con fetch directo.

## Mock actual (`services/mock/`)

| Service | Dataset | Origen mockup |
|---------|---------|---------------|
| `policies` | 369 pólizas | Registro de pólizas |
| `claims` | 11 reclamos | Lista de reclamaciones |
| `users` | 17 usuarios | Gestión de usuarios |
| `countries` | 13 países | Panel de portafolio |
| `audit` | 369 eventos | Historial de auditoría |
| `producerPanel` | panel producer | derivado de pólizas + extras |

Regenerar datasets tipados: `node scripts/build-mock-data.mjs`
