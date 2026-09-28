/**
 * Pólizas con reclamación (11).
 * Fuente: ARTS Global - Lista de reclamaciones.dc.html
 */
import type { ClaimRecord } from "@/types/claim/claim";

export const CLAIM_STAGES = ["Reclamo registrado","Ajustador asignado","En liquidación"] as const;

export const CLAIMS: ClaimRecord[] = [
  {
    "number": "2529",
    "insured": "Aerocharter Antillano S.R.L.",
    "aircraft": "Beechcraft 58",
    "reg": "HI-7521",
    "country": "República Dominicana",
    "producer": "N. Bautista",
    "premium": "US$ 1.988",
    "boundDate": "28 ene 2026",
    "claimCause": "Impacto de ave en motor derecho",
    "reported": "14 ago 2026",
    "stageIdx": 0,
    "stage": "Reclamo registrado"
  },
  {
    "number": "2543",
    "insured": "Aerotransporte Caribe S.R.L.",
    "aircraft": "Bell 206",
    "reg": "HI-1861",
    "country": "República Dominicana",
    "producer": "C. Peña",
    "premium": "US$ 1.155",
    "boundDate": "12 feb 2026",
    "claimCause": "Aterrizaje forzoso por falla de instrumentos",
    "reported": "02 sep 2026",
    "stageIdx": 1,
    "stage": "Ajustador asignado"
  },
  {
    "number": "2609",
    "insured": "Aerotaxis Bocas S.A.",
    "aircraft": "Piper PA-23-250",
    "reg": "HP-4172",
    "country": "Panamá",
    "producer": "D. Franco",
    "premium": "US$ 1.875",
    "boundDate": "9 abr 2026",
    "claimCause": "Daño de tren de aterrizaje en pista no pavimentada",
    "reported": "22 jul 2026",
    "stageIdx": 2,
    "stage": "En liquidación"
  },
  {
    "number": "2382",
    "insured": "Aviación Chiriquí S.A.",
    "aircraft": "Cessna 208B",
    "reg": "HP-1968",
    "country": "Panamá",
    "producer": "L. Cedeño",
    "premium": "US$ 6.633",
    "boundDate": "15 oct 2025",
    "claimCause": "Daño en ala izquierda por objeto en pista",
    "reported": "30 ago 2026",
    "stageIdx": 0,
    "stage": "Reclamo registrado"
  },
  {
    "number": "2402",
    "insured": "Aerotransporte Caribe S.R.L.",
    "aircraft": "Cessna Citation II",
    "reg": "HI-2186",
    "country": "República Dominicana",
    "producer": "N. Bautista",
    "premium": "US$ 12.681",
    "boundDate": "25 sep 2025",
    "claimCause": "Incidente durante rodaje en plataforma",
    "reported": "05 sep 2026",
    "stageIdx": 1,
    "stage": "Ajustador asignado"
  },
  {
    "number": "2674",
    "insured": "Aerocharter Metropolitano S.A.",
    "aircraft": "King Air C90",
    "reg": "HP-9364",
    "country": "Panamá",
    "producer": "J. Salgado",
    "premium": "US$ 10.244",
    "boundDate": "8 jun 2026",
    "claimCause": "Falla de tren de aterrizaje delantero",
    "reported": "10 sep 2026",
    "stageIdx": 0,
    "stage": "Reclamo registrado"
  },
  {
    "number": "2692",
    "insured": "Transportes Aéreos Oriente Cía. Ltda.",
    "aircraft": "Robinson 44",
    "reg": "HC-1930",
    "country": "Ecuador",
    "producer": "S. Andrade",
    "premium": "US$ 8.085",
    "boundDate": "22 jun 2026",
    "claimCause": "Aterrizaje duro con daño en patines",
    "reported": "18 ago 2026",
    "stageIdx": 2,
    "stage": "En liquidación"
  },
  {
    "number": "2607",
    "insured": "Andes Aéreo Cía. Ltda.",
    "aircraft": "Cessna 182 Skyline",
    "reg": "HC-5577",
    "country": "Ecuador",
    "producer": "D. Vaca",
    "premium": "US$ 4.275",
    "boundDate": "8 abr 2026",
    "claimCause": "Daño por granizo en fuselaje",
    "reported": "27 ago 2026",
    "stageIdx": 1,
    "stage": "Ajustador asignado"
  },
  {
    "number": "2460",
    "insured": "Aerotaxis Cuenca Cía. Ltda.",
    "aircraft": "Robinson R66",
    "reg": "HC-7955",
    "country": "Ecuador",
    "producer": "D. Vaca",
    "premium": "US$ 10.796",
    "boundDate": "12 oct 2025",
    "claimCause": "Incidente de rotor en tierra",
    "reported": "13 sep 2026",
    "stageIdx": 0,
    "stage": "Reclamo registrado"
  },
  {
    "number": "2440",
    "insured": "AGROPECUARIA BAMBUSA S.A.S",
    "aircraft": "Cessna TU206G",
    "reg": "HK-9711",
    "country": "Colombia",
    "producer": "M. Herrera",
    "premium": "US$ 2.765",
    "boundDate": "10 nov 2025",
    "claimCause": "Daño por FOD en hélice",
    "reported": "01 sep 2026",
    "stageIdx": 2,
    "stage": "En liquidación"
  },
  {
    "number": "2744",
    "insured": "Andes Cargo Aéreo S.A.C.",
    "aircraft": "Cessna T207A",
    "reg": "OB-6999",
    "country": "Perú",
    "producer": "P. Quispe",
    "premium": "US$ 4.155",
    "boundDate": "8 ago 2026",
    "claimCause": "Aterrizaje de emergencia por falla de motor",
    "reported": "16 sep 2026",
    "stageIdx": 1,
    "stage": "Ajustador asignado"
  }
];
