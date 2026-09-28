/**
 * Países del portafolio (13) + catálogo de nombres.
 * Fuentes: Panel de Portafolio + Gestión de usuarios.
 */
import type { CountryStat } from "@/types/country/country";

export const COUNTRY_NAMES = ["Panamá","Ecuador","República Dominicana","Colombia","Chile","Guatemala","Perú","Bolivia","El Salvador","Honduras","Argentina","Paraguay","Venezuela"] as const;

export const COUNTRY_STATS: CountryStat[] = [
  {
    "name": "Panamá",
    "code": "PA",
    "policies": 172,
    "usd": 1665169
  },
  {
    "name": "Ecuador",
    "code": "EC",
    "policies": 79,
    "usd": 661037
  },
  {
    "name": "República Dominicana",
    "code": "DO",
    "policies": 44,
    "usd": 488444
  },
  {
    "name": "Chile",
    "code": "CL",
    "policies": 17,
    "usd": 306011
  },
  {
    "name": "Colombia",
    "code": "CO",
    "policies": 21,
    "usd": 163544
  },
  {
    "name": "Guatemala",
    "code": "GT",
    "policies": 13,
    "usd": 138681
  },
  {
    "name": "Bolivia",
    "code": "BO",
    "policies": 6,
    "usd": 56050
  },
  {
    "name": "Argentina",
    "code": "AR",
    "policies": 2,
    "usd": 38512
  },
  {
    "name": "Perú",
    "code": "PE",
    "policies": 8,
    "usd": 23699
  },
  {
    "name": "El Salvador",
    "code": "SV",
    "policies": 3,
    "usd": 23591
  },
  {
    "name": "Honduras",
    "code": "HN",
    "policies": 2,
    "usd": 19999
  },
  {
    "name": "Paraguay",
    "code": "PY",
    "policies": 1,
    "usd": 5897
  },
  {
    "name": "Venezuela",
    "code": "VE",
    "policies": 1,
    "usd": 2237
  }
];
