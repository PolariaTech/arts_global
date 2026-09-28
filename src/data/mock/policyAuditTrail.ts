/**
 * Historial de auditoría de ejemplo en detalle de póliza.
 * Fuente: ARTS Global - Detalle de poliza.dc.html
 */
import type { PolicyAuditEntry } from "@/types/audit/audit";

export const POLICY_AUDIT_TRAIL: PolicyAuditEntry[] = [
  {
    "action": "Nota de reclamo agregada · REC-2026-00218",
    "who": "Suscripción",
    "when": "19 ago 2026, 14:32",
    "current": true
  },
  {
    "action": "Factura emitida · FAC-2025-01944",
    "who": "Sistema",
    "when": "22 sep 2025, 09:05"
  },
  {
    "action": "Carátula de póliza generada y firmada",
    "who": "M. Herrera",
    "when": "20 sep 2025, 16:48"
  },
  {
    "action": "Póliza vinculada desde COT-2025-02188",
    "who": "M. Herrera",
    "when": "19 sep 2025, 11:20"
  },
  {
    "action": "Cotización calculada",
    "who": "M. Herrera",
    "when": "12 sep 2025, 10:02"
  }
];
