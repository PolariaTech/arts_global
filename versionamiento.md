# Versionado semántico (SemVer)

Cuando ves una versión como `1.0.0`, suele ser **Semantic Versioning** (SemVer).

## Estructura

```text
MAJOR.MINOR.PATCH
  1  .  0  .  0
```

Cada número indica qué tipo de cambio se publicó.

| Número | Significado corto      |
| ------ | ---------------------- |
| MAJOR  | Rompí compatibilidad   |
| MINOR  | Agregué funcionalidad  |
| PATCH  | Corregí algo           |

---

## 1. MAJOR — `1.x.x`

Cambia cuando hay un cambio **incompatible** con versiones anteriores.

**Ejemplo:** `1.4.2` → `2.0.0`

### ¿Cuándo aplica?

- Una función deja de aceptar los parámetros anteriores
- Eliminas una API que otros sistemas usaban
- Cambias el formato de una respuesta y los clientes antiguos fallan
- Quienes actualicen deben adaptar su código
- Eliminas o cambias una característica de forma incompatible

**Regla:** si alguien actualiza y su código podría dejar de funcionar → **MAJOR**.

---

## 2. MINOR — `x.1.x`

Cambia cuando agregas **funcionalidad nueva** y mantienes compatibilidad.

**Ejemplo:** `1.4.2` → `1.5.0`

### Ejemplo

Calculadora con `sumar()` y `restar()`. Agregas `multiplicar()` sin romper lo anterior → `1.4.2` → `1.5.0`.

### Otros casos

- Nueva función o endpoint
- Nueva opción / configuración
- Nueva característica compatible
- Nueva funcionalidad sin romper lo existente

**Regla:** agregué algo nuevo y no rompí lo anterior → **MINOR**.

---

## 3. PATCH — `x.x.1`

Cambia cuando haces **correcciones** pequeñas, sin funcionalidad nueva esperada.

**Ejemplo:** `1.4.2` → `1.4.3`

### Ejemplo

`login()` falla para algunos usuarios. Corriges el bug sin cambiar el contrato → `1.4.2` → `1.4.3`.

### Otros casos

- Corregir un bug, cálculo o validación
- Corregir un error de UI que no cambia la funcionalidad
- Mejorar implementación interna sin cambiar el comportamiento
- Parche de seguridad sin romper la API

**Regla:** corregí algo sin cambiar las funcionalidades → **PATCH**.

---

## Evolución típica

```text
1.0.0
  → 1.0.1   # corrección
  → 1.1.0   # nueva funcionalidad
  → 1.1.1   # corrección
  → 1.2.0   # nueva funcionalidad
  → 2.0.0   # cambio incompatible
  → 2.0.1   # corrección
  → 2.1.0   # nueva funcionalidad
  → 2.1.1   # corrección
  → 3.0.0   # cambio incompatible
```

---

## Cómo decidir qué número subir

1. ¿Rompí algo que ya funcionaba? → **MAJOR** (`1.5.0` → `2.0.0`)
2. ¿Agregué algo nuevo sin romper lo anterior? → **MINOR** (`1.5.0` → `1.6.0`)
3. ¿Solo corregí o mejoré sin cambiar API / comportamiento esperado? → **PATCH** (`1.5.0` → `1.5.1`)

### Árbol rápido

```text
¿Algo que funcionaba dejó de ser compatible?
        │
       SÍ ──────→ MAJOR
        │
       NO
        ↓
¿Agregué una funcionalidad nueva?
        │
       SÍ ──────→ MINOR
        │
       NO
        ↓
¿Corregí / mejoré algo existente?
        │
       SÍ ──────→ PATCH
```

---

## Memotécnica

```text
MAJOR.MINOR.PATCH
  1  .  0  .  0
  ↑    ↑    ↑
  │    │    └── «Arreglé algo»
  │    └─────── «Agregué algo»
  └──────────── «Cambié algo de forma incompatible»
```

- **PATCH** = arreglo  
- **MINOR** = agrego  
- **MAJOR** = rompo compatibilidad  

---

## Ejemplo práctico con una API

API `v1.0.0` con:

- `GET /users`
- `POST /users`
- `DELETE /users`

| Caso | Cambio | Versión | Tipo |
| ---- | ------ | ------- | ---- |
| Bug en `GET /users` | Se corrigen datos incorrectos | `1.0.0` → `1.0.1` | PATCH |
| Nuevo endpoint | Se agrega `GET /users/{id}` | `1.0.1` → `1.1.0` | MINOR |
| Respuesta incompatible | `name` pasa a `user_name` | `1.1.0` → `2.0.0` | MAJOR |

Antes (compatible):

```json
{ "name": "Luis" }
```

Después (rompe clientes que esperaban `name`):

```json
{ "user_name": "Luis" }
```

---

## Versiones `0.x.x`

Antes de `1.0.0` es común ver:

```text
0.1.0 → 0.2.0 → 0.2.1 → 0.3.0
```

En SemVer, `0.y.z` indica etapa inicial: la API **puede cambiar** con más libertad. Un salto `0.1.0` → `0.2.0` puede ser un cambio importante aunque aún no sea `1.0.0`.

---

## Qué significa `1.0.0`

Marca la **primera versión estable** declarada del proyecto o API. No implica software perfecto; a partir de ahí SemVer se aplica con más rigor:

```text
1.0.0 → 1.0.1 (corrección)
      → 1.1.0 (funcionalidad)
      → 1.1.1 (corrección)
      → 2.0.0 (incompatible)
```

---

## Resumen

| Número | Se cambia cuando…                              | Ejemplo           |
| ------ | ---------------------------------------------- | ----------------- |
| MAJOR  | Hay cambios incompatibles                      | `1.9.0` → `2.0.0` |
| MINOR  | Se agregan funcionalidades compatibles         | `1.9.0` → `1.10.0` |
| PATCH  | Se corrigen errores o cambios pequeños compatibles | `1.9.0` → `1.9.1` |

Si tienes `2.4.7`:

| Acción                         | Nueva versión |
| ------------------------------ | ------------- |
| Corriges un bug                | `2.4.8`       |
| Agregas una funcionalidad      | `2.5.0`       |
| Cambias algo incompatible      | `3.0.0`       |

**Frase:** MAJOR rompe · MINOR agrega · PATCH corrige.
