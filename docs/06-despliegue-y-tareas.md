# 06 — Despliegue, recetas rápidas y pendientes

## 1. Git y GitHub

- El `.gitignore` descarta: `node_modules/`, `dist/`, `.smoke/`, `.env*`,
  editores, sistema operativo y logs. **Se sube** todo lo demás, incluidas las
  fotos de `public/` (son parte del sitio).
- Antes de cada `git commit`: `npm run build && npm run smoke` en verde.
- Commits en imperativo y un tema por commit (`añadir stock del Seat Ibiza`,
  `conectar formulario con Web3Forms`…).

Primer commit (si el repo aún no existe):

```bash
git init -b main
git add .
git commit -m "feat: prototipo web Bill Garage"
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

> Recomendación: repo **privado** mientras haya datos pendientes de confirmar
> (dominio ficticio, textos legales sin revisar).

---

## 2. Despliegue

**Netlify**: `netlify.toml` ya está listo — build `npm run build`, carpeta
`dist`, redirect SPA `/* → /index.html 200`, cabeceras de seguridad
(`X-Frame-Options`, `nosniff`, `Referrer-Policy`) y caché inmutable para
`/assets/*`.

Pasos: conectar el repo en Netlify → Build command `npm run build` →
Publish directory `dist` → publicar.

**Cloudflare Pages / cualquier otro que lea `_redirects`**: leen
`public/_redirects` (`/*  /index.html  200`).

**Vercel**: usa `vercel.json` (incluido) con `rewrites`
(`/(.*) → /index.html`), porque **no lee** `netlify.toml` ni `_redirects`.
Al importar el repo: rama `main`, preset Vite, Root Directory `./`
(build `npm run build`, output `dist`).

Después de publicar: sustituir el dominio ficticio (§4) y comprobar una ruta
profunda (`/coches/seat-leon-2013`) y el favicon.

---

## 3. Recetas rápidas: "quiero cambiar X"

| Quiero… | Dónde |
|---|---|
| Añadir, editar o quitar un coche | **En Wallapop** (llega solo en ≤5 min; o ya: `npm run sync:wallapop`) |
| Marcar un coche como reservado | Botón "reservado" de Wallapop → etiqueta y CTA bloqueados |
| Marcar vendido sin borrar el anuncio | `src/data/cars.overrides.json` → `{"id": "…", "estado": "vendido"}` |
| Cambiar teléfono, redes o cifras | `src/lib/site.js` |
| Cambiar colores o tipografías | `src/index.css` → bloque `@theme` |
| Cambiar textos de la home | `src/sections/*.jsx` |
| Cambiar los textos legales | `src/pages/legal/content.jsx` |
| Añadir una sección nueva | crear en `src/sections/` y montarla en `src/pages/Home.jsx` |
| Poner el formulario real | `src/lib/forms.js` → `simulateSubmit()` (ver [05-integraciones.md](05-integraciones.md)) |
| Cambiar el logo o favicon | `public/logo.png` / `public/favicon.png` (ver README §4) |
| Cambiar la foto del hero | `public/hero.webp` |
| Probar que nada se rompe | `npm run build && npm run smoke` |

### Sincronización automática con Wallapop

La Action `.github/workflows/sync-wallapop.yml` ejecuta
`scripts/sync-wallapop.mjs` cada **5 min** y también al instante bajo
demanda desde la pestaña Actions → *Run workflow*:

- Lee el perfil público del cliente y **solo** descarga las fichas de anuncios
  nuevos o modificados; el resultado es `src/data/cars.generated.json`.
- **Solo commitea si el inventario cambió** (`git diff` como gate, siempre con
  build + smoke antes de publicar) → sin redeploys inútiles en Vercel.
- Seguridades: 0 anuncios en el perfil → **no escribe nada** (nunca se vacía
  la web); una ficha que falla → se conserva el snapshot anterior; error
  general → la web se queda en el último snapshot **y GitHub envía un email
  de aviso** al dueño del repositorio (activarle las notificaciones).
- Wallapop contesta **403 a las IP de centro de datos** (la de los runners
  de GitHub): el script manda cabeceras completas de navegador y, si aún así
  lo bloquean, reintenta con un **Chromium real** (Playwright, instalado en
  la CI con `--no-save` → el proyecto no gana dependencias). En local no hace
  falta: la IP residencial pasa directo con el fetch normal.
- Si GitHub pausa las crons tras 60 días sin actividad del repo, se reactivan
  desde la pestaña Actions (o dispara *Run workflow*); los commits del propio
  sync cuentan como actividad, así que solo afectaría a un verano sin vender.
- GitHub solo dispara los cron que existan en la **rama por defecto**: el
  fichero de la Action vive también en `main`, aunque su checkout y sus
  commits apuntan a `integracion`.
- Tras cada sync la Action **publica en `main`** (push fast-forward) →
  producción (Vercel) se actualiza sola. Si `main` diverge a mano, el push
  falla, la Action avisa por email y se arregla uniendo ramas.
- **Plan B**: si Wallapop cambia sus páginas, sustituir el scraping por un
  actor de Apify manteniendo el mismo `cars.generated.json` — solo cambiaría
  el script, no la web.

---

## 4. Pendientes antes de publicar

Lista viva ampliada en [`../README.md` §9](../README.md). Resumen:

1. **Dominio real** en `index.html`, `src/lib/site.js`, `public/sitemap.xml`
   y `public/robots.txt` (ahora dice `https://billgarage.example`) + imagen
   `og.png` 1200×630.
2. **Dirección y horario** en `site.js` (mejoran mapa y JSON-LD).
3. **Foto propia del taller** para el hero (ahora hay una provisional). Las
   fotos de los coches ya llegan solas desde Wallapop.
4. **Datos legales** del titular (nombre, NIF, domicilio, email) y revisión
   profesional de las 3 páginas legales.
5. **Servicio de formularios** (Web3Forms / Netlify Forms) o dejar WhatsApp
   como canal único.
6. ✅ Hecho: **reseñas reales** de Wallapop (con permiso del cliente).
7. ✅ Hecho: logo/favicon ahora **a color** (`public/logo.png`,
   `public/favicon.png`); los negros quedan sin uso en `public/`.

---

## 5. Limitaciones conocidas del prototipo (a propósito)

- Formularios **simulados**: no envían a ningún sitio (el canal real es WhatsApp).
- Dominio ficticio, sin dirección exacta ni horario.
- Textos legales por completar con un profesional.
- Sin analítica (ni cookies): si se añade, toca repensar el aviso de cookies
  (el iframe de Google Maps sí puede instalar cookies de tercero).

Anterior: [← 05-integraciones.md](05-integraciones.md) ·
Índice: [docs/README.md](README.md)
