#!/usr/bin/env node
/**
 * scripts/watchdog-sync.mjs — avisa si el sync de Wallapop deja de EJECUTARSE.
 *
 * Qué mide: la fecha de la última ejecución registrada (sea cual sea su
 * resultado) de `.github/workflows/sync-wallapop.yml`. Si han pasado más de
 * UMBRAL_HORAS (10 por defecto), abre un Issue con el prefijo "[vigilante]";
 * en avisos posteriores comenta en el mismo en vez de duplicarlo, y cuando el
 * sync vuelve a ejecutarse lo cierra solo.
 *
 * Qué NO mide, a propósito:
 *   - Si el inventario cambió: es normal que no cambie durante días.
 *   - Si la última ejecución falló: de eso ya avisa GitHub por email.
 *
 * Límite conocido: si GitHub desactiva TODOS los cron del repo (60 días sin
 * actividad), este vigilante también se queda callado. Cubre el resto:
 * workflow borrado o renombrado, cron con error, YAML roto, permisos, etc.
 *
 * Uso en la Action (permisos: actions:read, issues:write):
 *   GITHUB_TOKEN=… GITHUB_REPOSITORY=owner/repo node scripts/watchdog-sync.mjs
 */
import { pathToFileURL } from "node:url";

const API = "https://api.github.com";
const WORKFLOW = "sync-wallapop.yml";
const MARCA = "[vigilante]";
const UMBRAL_DEFECTO = 10;

/** Horas transcurridas desde una fecha ISO (Infinity si no hay fecha válida). */
export function horasDesde(iso, ahora = Date.now()) {
  if (!iso) return Infinity;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? Infinity : (ahora - t) / 3_600_000;
}

/** "9 h", "2 días" o "nunca". */
export function formatearHoras(horas) {
  if (!Number.isFinite(horas)) return "nunca";
  if (horas < 48) return `${Math.round(horas)} h`;
  return `${Math.round(horas / 24)} días`;
}

export function tituloAviso(horas) {
  return Number.isFinite(horas)
    ? `${MARCA} El sync de Wallapop no se ejecuta desde hace ${formatearHoras(horas)}`
    : `${MARCA} El sync de Wallapop no registra ninguna ejecución`;
}

export function cuerpoAviso({ horas, ultima, resultado, umbral }) {
  const cuando = ultima ? `${ultima} (${formatearHoras(horas)})` : "ninguna";
  return `## El sync de Wallapop no se está ejecutando

- Última ejecución registrada: **${cuando}**
- Umbral configurado: **${umbral} h**
- Resultado de esa última ejecución: **${resultado}**

Esto significa que **el workflow no ha arrancado**. No significa que el stock
haya cambiado (que no cambie es normal) ni que la web esté rota: sigue
mostrando el último snapshot.

### Qué mirar

1. **Actions → Sincronizar stock con Wallapop**: ¿está habilitado? ¿hay
   ejecuciones recientes? Si GitHub lo pausó, aparece un botón *Enable workflow*.
2. **¿Sigue el workflow en la rama por defecto?** GitHub solo programa los
   cron que existen en \`main\`. Si se renombró, este vigilante también avisa.
3. **¿Siguen los secretos** \`WALLAPOP_BASE\` y \`WALLAPOP_BASE_TOKEN\`?
4. **¿Sigue vivo el Worker?** Abre su \`/__diag\`.

Cuando el sync vuelva a ejecutarse, este Issue se cierra solo.`;
}

async function api(repo, token, ruta, init = {}) {
  const res = await fetch(API + ruta, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "billgarage-watchdog",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  const texto = await res.text();
  let json = null;
  try {
    json = texto ? JSON.parse(texto) : null;
  } catch {
    /* respuesta no JSON: se devuelve null */
  }
  if (!res.ok) {
    const err = new Error(`${res.status} ${res.statusText} en ${ruta}`);
    err.status = res.status;
    throw err;
  }
  return json;
}

export async function main() {
  const repo = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  const umbral = Number(process.env.UMBRAL_HORAS ?? UMBRAL_DEFECTO);

  if (!repo || !token) {
    throw new Error("Faltan GITHUB_REPOSITORY o GITHUB_TOKEN en el entorno");
  }

  // 1) Última ejecución del sync (404 = el workflow ya no existe: también avisa)
  let run = null;
  try {
    const data = await api(repo, token, `/repos/${repo}/actions/workflows/${WORKFLOW}/runs?per_page=1`);
    run = data?.workflow_runs?.[0] ?? null;
  } catch (e) {
    if (e.status !== 404) throw e;
    console.warn(`[vigilante] No se encuentra el workflow ${WORKFLOW}`);
  }

  const ultima = run?.created_at ?? null;
  const resultado = run?.conclusion ?? "desconocido";
  const horas = horasDesde(ultima);

  console.log(
    `[vigilante] Última ejecución: ${ultima ?? "ninguna"} · hace ${formatearHoras(horas)} · resultado: ${resultado} · umbral: ${umbral} h`,
  );

  // 2) ¿Hay ya un aviso abierto?
  const issues = (await api(repo, token, `/repos/${repo}/issues?state=open&per_page=100`)) || [];
  const abierto = issues.find(
    (i) => !i.pull_request && String(i.title || "").startsWith(MARCA),
  );

  // 3) Vivo → cerrar el aviso si existía
  if (horas < umbral) {
    console.log("[vigilante] El sync está vivo: no hay nada que avisar.");
    if (abierto) {
      await api(repo, token, `/repos/${repo}/issues/${abierto.number}/comments`, {
        method: "POST",
        body: JSON.stringify({
          body: `✅ El sync vuelve a ejecutarse (última: ${ultima}, ${formatearHoras(horas)}).`,
        }),
      });
      await api(repo, token, `/repos/${repo}/issues/${abierto.number}`, {
        method: "PATCH",
        body: JSON.stringify({ state: "closed", state_reason: "completed" }),
      });
      console.log(`[vigilante] Issue #${abierto.number} cerrado.`);
    }
    return;
  }

  // 4) Parado → crear o comentar el aviso
  const cuerpo = cuerpoAviso({ horas, ultima, resultado, umbral });

  if (abierto) {
    await api(repo, token, `/repos/${repo}/issues/${abierto.number}/comments`, {
      method: "POST",
      body: JSON.stringify({
        body: `Sigue sin ejecutarse: última ${ultima ?? "ninguna"} (${formatearHoras(horas)}).`,
      }),
    });
    console.log(`[vigilante] Aviso repetido en el Issue #${abierto.number}.`);
    return;
  }

  const creado = await api(repo, token, `/repos/${repo}/issues`, {
    method: "POST",
    body: JSON.stringify({ title: tituloAviso(horas), body: cuerpo }),
  });
  console.log(`[vigilante] Issue #${creado.number} creado.`);
}

// Solo se ejecuta si se llama directamente (permite importar en pruebas).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  });
}
