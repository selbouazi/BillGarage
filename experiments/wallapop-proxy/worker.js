/**
 * experiments/wallapop-proxy/worker.js — EXPERIMENTO (no forma parte de la web).
 *
 * Objetivo: averiguar si una IP de Cloudflare (la de un Worker propio) puede
 * leer el perfil público de Wallapop. Si funciona, se puede volver a ejecutar
 * el sync en GitHub Actions 24/7 y gratis: la Action llama al Worker, y el
 * Worker hace la petición real.
 *
 * Rutas:
 *   GET /__diag                     → diagnóstico: IP de salida del Worker +
 *                                     estado real de Wallapop (sin secreto).
 *   GET /user/<handle>?k=<TOKEN>    → pasarela al perfil (HTML tal cual).
 *   GET /item/<slug>?k=<TOKEN>      → pasarela a una ficha.
 *
 * El TOKEN evita que el Worker quede como proxy abierto para terceros.
 * Si lo dejas vacío, el passthrough queda abierto: úsalo solo en la prueba.
 */

const BASE = "https://es.wallapop.com";

// Cámbialo por una cadena larga y aleatoria antes de desplegar.
const TOKEN = "cambia-esto-por-una-cadena-larga";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const HEADERS = {
  "User-Agent": UA,
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  "Upgrade-Insecure-Requests": "1",
};

const CABECERAS_INTERESANTES = [
  "server",
  "cf-ray",
  "cf-mitigated",
  "content-type",
  "content-length",
  "retry-after",
  "set-cookie",
  "x-amzn-waf-action",
  "x-datadome",
  "x-vercel-mitigated",
];

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const html = (body, status, extra = {}) =>
  new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      ...extra,
    },
  });

/** Petición real a Wallapop desde la IP del Worker. */
async function upstream(path, search = "") {
  const url = BASE + path + search;
  const r = await fetch(url, { headers: HEADERS, redirect: "follow" });
  const body = await r.text();

  const headers = {};
  for (const k of CABECERAS_INTERESANTES) {
    const v = r.headers.get(k);
    if (v) headers[k] = v;
  }

  return {
    url,
    status: r.status,
    headers,
    bytes: body.length,
    hasNextData: body.includes("__NEXT_DATA__"),
    head: body.slice(0, 400).replace(/\s+/g, " "),
    body,
  };
}

export default {
  async fetch(request) {
    const u = new URL(request.url);

    // --- Diagnóstico (público a propósito: no revela nada sensible) ---
    if (u.pathname === "/__diag") {
      let egress;
      try {
        const r = await fetch("https://ipinfo.io/json");
        egress = await r.json();
      } catch (e) {
        egress = { error: String(e.message) };
      }

      // Colo de Cloudflare que atiende esta petición (pista de geografía).
      const colo = request.cf?.colo ?? null;
      const paisPeticion = request.cf?.country ?? null;

      const probes = [];
      for (const p of ["/", "/user/soulaimanee-434683562"]) {
        const x = await upstream(p);
        const { body, ...rest } = x;
        probes.push(rest);
      }

      return json({ colo, paisPeticion, egress, probes });
    }

    // --- Pasarela ---
    if (TOKEN && u.searchParams.get("k") !== TOKEN) {
      return json(
        { error: "Falta ?k=<TOKEN>", pista: "prueba /__diag, que no lo necesita" },
        401,
      );
    }

    // Se reenvía la query tal cual, salvo el propio token.
    const query = new URLSearchParams(
      [...u.searchParams].filter(([key]) => key !== "k"),
    ).toString();
    const x = await upstream(u.pathname, query ? `?${query}` : "");
    return html(x.body, x.status, {
      "x-upstream-status": String(x.status),
      "x-has-next-data": String(x.hasNextData),
    });
  },
};
