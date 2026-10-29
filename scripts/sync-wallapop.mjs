#!/usr/bin/env node
/**
 * scripts/sync-wallapop.mjs — Sincroniza el stock de la web desde el perfil
 * PÚBLICO de Wallapop del cliente (sin API oficial, sin credenciales).
 *
 * Flujo:
 *   1. Lee la página del perfil  → lista de anuncios (título, precio, fotos,
 *      isReserved, descripción) + orden del cliente.
 *   2. Compara cada anuncio con src/data/cars.generated.json (huella `f`).
 *      Solo descarga la ficha completa de los anuncios NUEVOS o MODIFICADOS.
 *   3. Mapea los datos estructurados (typeAttributes/carInfo) al modelo de la
 *      web, limpia el bloque SEO de la descripción y extrae equipamiento,
 *      ITV, propietarios y garantía cuando aparecen en el texto.
 *   4. Escribe src/data/cars.generated.json SOLO si algo ha cambiado
 *      (así la Action no commitea ni Vercel redespliega sin motivo).
 *
 * Reglas de seguridad:
 *   - Perfil con 0 anuncios → ERROR (nunca se vacía la web).
 *   - Ficha que falla o no valida → se conserva la versión anterior.
 *   - Cualquier error → exit 1 SIN escribir nada: la web queda en el último
 *     snapshot y GitHub avisa por email del fallo de la Action.
 *   - Si Wallapop bloquea la IP (403, típico en la CI), se reintenta con un
 *     Chromium real cuando playwright está disponible (la Action lo instala
 *     con --no-save; local no lo necesita).
 *
 * Uso local:  node scripts/sync-wallapop.mjs   (o npm run sync:wallapop)
 * El gate de commit lo hace .github/workflows/sync-wallapop.yml con git diff.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { SITE } from "../src/lib/site.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_FILE = path.join(ROOT, "src", "data", "cars.generated.json");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const CABECERAS = {
  "User-Agent": UA,
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
};

let navMod = null; // { chromium } si hay playwright instalado (la CI); false si no.

/**
 * Reintento con Chromium real: Wallapop responde 403 a las IP de centro de
 * datos (p. ej. la de los runners de GitHub) aunque la petición sea legítima.
 * Devuelve el HTML o null si no hay navegador o también está bloqueado.
 */
async function getConNavegador(url) {
  if (!navMod) {
    try {
      navMod = await import("playwright");
    } catch {
      navMod = false; // uso local: no hay navegador y se propaga el error directo
    }
  }
  if (!navMod) return null;
  let br;
  try {
    br = await navMod.chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const ctx = await br.newContext({ userAgent: UA, locale: "es-ES" });
    const page = await ctx.newPage();
    const resp = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    if ((resp?.status() ?? 0) >= 400) return null; // también bloqueado
    await page.waitForSelector("script#__NEXT_DATA__", { timeout: 25000 });
    const html = await page.content();
    return html.includes("__NEXT_DATA__") ? html : null;
  } catch {
    return null;
  } finally {
    await br?.close().catch(() => {});
  }
}

async function get(url) {
  let fallo = null;
  let reintentar = false;
  try {
    const res = await fetch(url, { headers: CABECERAS, redirect: "follow" });
    if (res.ok) return res.text();
    fallo = `HTTP ${res.status}`;
    reintentar = res.status === 403 || res.status === 429 || res.status >= 500;
  } catch (e) {
    fallo = e.message;
    reintentar = true; // error de red: mismo tratamiento
  }
  if (!reintentar) throw new Error(`${fallo} en ${url}`);
  const html = await getConNavegador(url);
  if (html) return html;
  throw new Error(`${fallo} en ${url}`);
}

/** Extrae el objeto JSON embebido que sirve Wallapop al renderizar en servidor. */
function nextData(html) {
  const m = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s,
  );
  if (!m) throw new Error("__NEXT_DATA__ no encontrado (¿ha cambiado Wallapop?)");
  return JSON.parse(m[1]).props.pageProps;
}

/** Huella de cambio a partir de los datos del perfil (barato: sin fichas). */
function fingerprint(item) {
  const raw = [
    item.title,
    item.price?.amount,
    item.isReserved,
    item.description,
    (item.images || []).map((i) => i.id).join(","),
  ].join("|");
  return createHash("sha1").update(raw).digest("hex").slice(0, 12);
}

/** URL de foto en el mayor tamaño permitido del CDN (1024 px). */
const w1024 = (url) => url?.replace(/pictureSize=W\d+/, "pictureSize=W1024");

const MESES = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10,
  noviembre: 11, diciembre: 12,
};

/** "… ITV Mayo 2027 …" → "2027-05" (null si no hay fecha). */
function parseItv(desc) {
  const m = desc.match(/ITV\s+(?:hasta\s+|en\s+)?([A-Za-záéíóúÁÉÍÓÚ]+)\s+(\d{4})/i);
  if (!m) return null;
  const mes = MESES[m[1].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")];
  return mes ? `${m[2]}-${String(mes).padStart(2, "0")}` : null;
}

/** "- 2 propietarios" → 2, "Único propietario" → 1. */
function parsePropietarios(desc) {
  const n = desc.match(/(\d+)\s*propietarios/i);
  if (n) return Math.min(Math.max(Number(n[1]), 1), 9);
  if (/únic[oa] propietario|unic[oa] propietario/i.test(desc)) return 1;
  return null;
}

/** El cliente escribe "12 MESES DE GARANTÍA" en la descripción. */
function parseGarantia(desc) {
  return /\b12\s+MESES\s+DE\s+GARANT/i.test(desc) ? 12 : null;
}

/** Recorta el bloque de palabras clave SEO que pega al final + espacios muertos. */
function cleanDescription(raw) {
  let d = String(raw || "").replace(/\r\n/g, "\n").trim();
  const seo = d.search(/(?:^|\n)\s*(?:\n\s*)*Audi,\s*audi a3/i);
  if (seo > -1) d = d.slice(0, seo);
  return d.replace(/\n{3,}/g, "\n\n").trim();
}

/** Extrae la lista de "- item" del bloque "Equipamiento:" de la descripción. */
function extractEquipamiento(raw) {
  const d = String(raw || "").replace(/\r\n/g, "\n");
  const start = d.match(/(?:^|\n)\s*Equipamiento:?\s*\n/i);
  if (!start) return [];
  const resto = d.slice(start.index + start[0].length);
  const fin = resto.search(
    /\n\s*\n\s*\n|\n\s*(?:Para m[áa]s|Si tu|Contact|Se acepta|Audi,\s*audi a3)/i,
  );
  const bloque = fin > -1 ? resto.slice(0, fin) : resto;
  return [
    ...new Set(
      bloque
        .split("\n")
        .map((l) => l.trim().replace(/^[-•]\s*/, ""))
        .filter((l) => /^(?:[-•]\s*)?\S/.test(l) && l.length > 2 && l.length < 70)
        .filter((l) => d.includes(`- ${l}`) || d.includes(`• ${l}`)),
    ),
  ];
}

/** String desde los formatos que usa Wallapop (string u objeto {original}). */
const asText = (v) =>
  typeof v === "string"
    ? v
    : v && typeof v === "object"
      ? String(v.original ?? v.text ?? v.content ?? "")
      : "";

/** Construye un registro del sitio a partir del anuncio + su ficha completa. */
function buildRecord(item, detail, { destacado, f }) {
  const ta = detail.typeAttributes || {};
  const ci = detail.carInfo || {};
  const pick = (a, b) => a?.value ?? a?.text ?? b?.value ?? b?.text ?? null;
  const descRaw = asText(detail.description) || asText(item.description);
  const descripcion = cleanDescription(descRaw);

  const fotos = (detail.images?.length ? detail.images : item.images || [])
    .map((img) => w1024(img.urls?.big))
    .filter(Boolean);

  const rec = {
    id: item.slug,
    wallapopId: item.id,
    wallapopUrl: `https://es.wallapop.com/item/${item.slug}`,
    f,
    marca: ta.brand?.text ?? null,
    modelo: ta.model?.text ?? null,
    version: pick(ci.version, ta.version),
    año: num(pick(ci.year, ta.year)),
    km: num(pick(ci.km, ta.km)),
    combustible: ci.engine?.text ?? ta.engine?.text ?? null,
    cambio: ci.gearBox?.text ?? ta.gear_box?.text ?? null,
    cv: num(pick(ci.horsePower, ta.horse_power)),
    carroceria: ci.bodyType?.text ?? ta.body_type?.text ?? null,
    puertas: num(pick(ci.doors, ta.doors)),
    plazas: num(pick(ci.seats, ta.seats)),
    etiqueta: (ta.eco_label?.text ?? null)?.replace(/^Etiqueta\s+/i, "") ?? null,
    precio: item.price?.amount ?? null,
    estado: item.isReserved ? "reservado" : "disponible",
    destacado,
    fotos,
    equipamiento: extractEquipamiento(descRaw),
    descripcion,
    wallapopTitle: asText(item.title) || asText(detail.title),
  };

  const color = ci.color?.text ?? ta.color?.text ?? null;
  if (color) rec.color = color;
  const itv = parseItv(descRaw);
  if (itv) rec.itvHasta = itv;
  const prop = parsePropietarios(descRaw);
  if (prop) rec.propietarios = prop;
  const gar = parseGarantia(descRaw);
  if (gar) rec.garantiaMeses = gar;

  return rec;
}

/** Un registro es válido si trae lo mínimo para renderizar la ficha. */
function validate(rec) {
  const problemas = [];
  if (!rec.id) problemas.push("sin slug");
  if (!rec.marca || !rec.modelo) problemas.push("sin marca/modelo");
  if (!rec.año) problemas.push("sin año");
  if (rec.km == null) problemas.push("sin km");
  if (!rec.precio) problemas.push("sin precio");
  if (!Array.isArray(rec.fotos) || rec.fotos.length === 0) problemas.push("sin fotos");
  if (!rec.combustible || !rec.cambio || !rec.cv) problemas.push("sin ficha básica");
  return problemas;
}

async function main() {
  const profileUrl = SITE.wallapop;
  console.log(`Perfil: ${profileUrl}`);

  // 1) Perfil (1 petición)
  const pp = nextData(await get(profileUrl));
  const items = pp.publishedItems?.data || [];
  if (items.length === 0) {
    throw new Error(
      "El perfil devuelve 0 anuncios: posible bloqueo o modo vacaciones. NO se escribe nada.",
    );
  }
  console.log(`Anuncios en Wallapop: ${items.length}`);

  // 2) Estado anterior
  let previous = { cars: [] };
  if (existsSync(OUT_FILE)) {
    try {
      previous = JSON.parse(readFileSync(OUT_FILE, "utf8"));
    } catch {
      throw new Error("cars.generated.json ilegible: ¿corrupción? No se escribe nada.");
    }
  }
  const prevById = new Map((previous.cars || []).map((c) => [c.wallapopId, c]));

  // 3) Diff barato + ficha completa solo de los cambiados
  const plan = items.map((item, i) => ({
    item,
    f: fingerprint(item),
    prev: prevById.get(item.id),
    destacado: i < 3,
  }));
  const aPedir = plan.filter((p) => !p.prev || p.prev.f !== p.f);
  console.log(`Fichas a descargar: ${aPedir.length} (sin cambios: ${plan.length - aPedir.length})`);

  const nuevos = new Map();
  for (let i = 0; i < aPedir.length; i += 2) {
    const lote = aPedir.slice(i, i + 2);
    await Promise.all(
      lote.map(async (p) => {
        try {
          const detail = nextData(await get(`https://es.wallapop.com/item/${p.item.slug}`)).item;
          const rec = buildRecord(p.item, detail, { destacado: p.destacado, f: p.f });
          const problemas = validate(rec);
          if (problemas.length) {
            if (p.prev) {
              console.warn(`  ! "${p.item.title}" no valida (${problemas.join(", ")}): se conserva la versión anterior`);
            } else {
              console.warn(`  ! "${p.item.title}" no valida (${problemas.join(", ")}) y no hay versión anterior: se omite`);
            }
            return;
          }
          nuevos.set(p.item.id, rec);
        } catch (err) {
          console.warn(`  ! ficha fallida para "${p.item.title}": ${err.message} → se conserva la anterior si existe`);
        }
      }),
    );
    await sleep(500);
  }

  // 4) Resultado: orden del perfil, conservando lo anterior cuando no tocó
  const final = [];
  for (const p of plan) {
    const rec = nuevos.get(p.item.id) ?? (p.prev ? { ...p.prev, destacado: p.destacado } : null);
    if (rec) final.push(rec);
    else console.warn(`  ! sin datos para "${p.item.title}": no aparecerá en la web`);
  }
  if (final.length === 0) throw new Error("Ningún coche válido tras el sync. No se escribe nada.");

  // 5) ¿Cambios? (comparar SOLO los coches: generatedAt no cuenta)
  const cambiado = JSON.stringify(final) !== JSON.stringify(previous.cars || []);
  if (!cambiado) {
    console.log("Sin cambios en el inventario. No se escribe nada.");
    return;
  }

  const payload = {
    fuente: profileUrl,
    generadoPor: "scripts/sync-wallapop.mjs",
    generatedAt: new Date().toISOString(),
    cars: final,
  };
  writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2) + "\n", "utf8");

  const prevIds = new Set(prevById.keys());
  const nuevosIds = final.filter((c) => !prevIds.has(c.wallapopId)).length;
  const borrados = prevById.size - final.filter((c) => prevById.has(c.wallapopId)).length;
  console.log(
    `OK: ${final.length} coches (${nuevosIds} nuevos, ${borrados} eliminados, ` +
      `${aPedir.length - nuevosIds} actualizados). Escrito ${path.relative(ROOT, OUT_FILE)}`,
  );
}

main().catch((err) => {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
});
