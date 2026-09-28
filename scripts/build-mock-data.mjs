/**
 * Genera src/data/mock/*.ts tipados desde el mockup HTML de ARTS.
 * Ejecutar: node scripts/build-mock-data.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mockDir = path.join(root, "src", "data", "mock");
const artsDir = "C:/Users/Daniel/Downloads/ARTS";

function readHtml(name) {
  const b = fs.readFileSync(path.join(artsDir, name));
  let s = b.toString("utf8");
  if (s.includes("\ufffd") || !/[áéíóúñÁÉÍÓÚÑ]/.test(s)) {
    s = Buffer.from(b).toString("latin1");
  }
  return s;
}

function extractArray(text, decl) {
  const i = text.indexOf(decl);
  if (i < 0) throw new Error(`missing ${decl}`);
  let depth = 0;
  let started = false;
  for (let k = i; k < text.length; k++) {
    const ch = text[k];
    if (ch === "[") {
      depth++;
      started = true;
    } else if (ch === "]") {
      depth--;
      if (started && depth === 0) {
        let end = k + 1;
        if (text[end] === ";") end++;
        return text.slice(i, end);
      }
    }
  }
  throw new Error(`unclosed ${decl}`);
}

function evalArray(slice, name) {
  return Function(`${slice}; return ${name};`)();
}

function writeTs(file, header, body) {
  const out = `${header}\n\n${body}\n`;
  fs.writeFileSync(path.join(mockDir, file), out, "utf8");
  console.log("wrote", file, out.length);
}

fs.mkdirSync(mockDir, { recursive: true });

const POLICIES = evalArray(
  extractArray(readHtml("ARTS Global - Registro de polizas.dc.html"), "const POLICIES = "),
  "POLICIES",
);
writeTs(
  "policies.ts",
  `/**
 * Libro de pólizas del mockup ARTS (${POLICIES.length} registros).
 * Fuente: ARTS Global - Registro de polizas.dc.html
 */
import type { PolicyRecord } from "@/types/policy/policy";`,
  `export const POLICIES: PolicyRecord[] = ${JSON.stringify(POLICIES, null, 2)};`,
);

const CLAIMS_RAW = evalArray(
  extractArray(readHtml("ARTS Global - Lista de reclamaciones.dc.html"), "const CLAIMS = "),
  "CLAIMS",
);
const STAGES = ["Reclamo registrado", "Ajustador asignado", "En liquidación"];
const CLAIMS = CLAIMS_RAW.map((c) => ({
  ...c,
  stage: STAGES[c.stageIdx] ?? STAGES[0],
}));
writeTs(
  "claims.ts",
  `/**
 * Pólizas con reclamación (${CLAIMS.length}).
 * Fuente: ARTS Global - Lista de reclamaciones.dc.html
 */
import type { ClaimRecord } from "@/types/claim/claim";`,
  `export const CLAIM_STAGES = ${JSON.stringify(STAGES)} as const;\n\nexport const CLAIMS: ClaimRecord[] = ${JSON.stringify(CLAIMS, null, 2)};`,
);

const COUNTRY_STATS = evalArray(
  extractArray(readHtml("ARTS Global - Panel de Portafolio.dc.html"), "const COUNTRIES = "),
  "COUNTRIES",
);
const COUNTRY_NAMES = evalArray(
  extractArray(readHtml("ARTS Global - Gestion de usuarios.dc.html"), "const COUNTRIES = "),
  "COUNTRIES",
);
writeTs(
  "countries.ts",
  `/**
 * Países del portafolio (${COUNTRY_STATS.length}) + catálogo de nombres.
 * Fuentes: Panel de Portafolio + Gestión de usuarios.
 */
import type { CountryStat } from "@/types/country/country";`,
  `export const COUNTRY_NAMES = ${JSON.stringify(COUNTRY_NAMES)} as const;\n\nexport const COUNTRY_STATS: CountryStat[] = ${JSON.stringify(COUNTRY_STATS, null, 2)};`,
);

const usersHtml = readHtml("ARTS Global - Gestion de usuarios.dc.html");
const usersSlice = extractArray(usersHtml, "const SEED = ").replaceAll(
  "[...COUNTRIES]",
  JSON.stringify(COUNTRY_NAMES),
);
const USERS = evalArray(usersSlice.replace("const SEED", "const USERS"), "USERS");
writeTs(
  "users.ts",
  `/**
 * Usuarios seed del mockup (${USERS.length}).
 * Fuente: ARTS Global - Gestión de usuarios.dc.html
 */
import type { UserRecord } from "@/types/user/user";`,
  `export const USERS: UserRecord[] = ${JSON.stringify(USERS, null, 2)};`,
);

const EVENTS = evalArray(
  extractArray(readHtml("ARTS Global - Historial de auditoria.dc.html"), "const EVENTS = "),
  "EVENTS",
);
writeTs(
  "auditEvents.ts",
  `/**
 * Eventos de auditoría (${EVENTS.length}).
 * Fuente: ARTS Global - Historial de auditoria.dc.html
 */
import type { AuditEvent } from "@/types/audit/audit";`,
  `export const AUDIT_EVENTS: AuditEvent[] = ${JSON.stringify(EVENTS, null, 2)};`,
);

const POLICY_AUDIT = evalArray(
  extractArray(readHtml("ARTS Global - Detalle de poliza.dc.html"), "const AUDIT = "),
  "AUDIT",
);
writeTs(
  "policyAuditTrail.ts",
  `/**
 * Historial de auditoría de ejemplo en detalle de póliza.
 * Fuente: ARTS Global - Detalle de poliza.dc.html
 */
import type { PolicyAuditEntry } from "@/types/audit/audit";`,
  `export const POLICY_AUDIT_TRAIL: PolicyAuditEntry[] = ${JSON.stringify(POLICY_AUDIT, null, 2)};`,
);

writeTs(
  "index.ts",
  `/** Reexporta datasets mock compartidos. */`,
  `export { POLICIES } from "./policies";
export { CLAIMS, CLAIM_STAGES } from "./claims";
export { USERS } from "./users";
export { COUNTRY_STATS, COUNTRY_NAMES } from "./countries";
export { AUDIT_EVENTS } from "./auditEvents";
export { POLICY_AUDIT_TRAIL } from "./policyAuditTrail";`,
);

console.log("done", {
  policies: POLICIES.length,
  claims: CLAIMS.length,
  users: USERS.length,
  countries: COUNTRY_STATS.length,
  events: EVENTS.length,
});
