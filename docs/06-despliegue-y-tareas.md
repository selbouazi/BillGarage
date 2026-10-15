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
| Añadir, editar o quitar un coche | `src/data/cars.js` (+ foto en `public/coches/<id>/`) |
| Marcar un coche como vendido | `estado: "vendido"` → deja de mostrarse |
| Cambiar teléfono, redes o cifras | `src/lib/site.js` |
| Cambiar colores o tipografías | `src/index.css` → bloque `@theme` |
| Cambiar textos de la home | `src/sections/*.jsx` |
| Cambiar los textos legales | `src/pages/legal/content.jsx` |
| Añadir una sección nueva | crear en `src/sections/` y montarla en `src/pages/Home.jsx` |
| Poner el formulario real | `src/lib/forms.js` → `simulateSubmit()` (ver [05-integraciones.md](05-integraciones.md)) |
| Cambiar el logo o favicon | `public/logo.png` / `public/favicon.png` (ver README §4) |
| Cambiar la foto del hero | `public/hero.webp` |
| Probar que nada se rompe | `npm run build && npm run smoke` |

---

## 4. Pendientes antes de publicar

Lista viva ampliada en [`../README.md` §9](../README.md). Resumen:

1. **Dominio real** en `index.html`, `src/lib/site.js`, `public/sitemap.xml`
   y `public/robots.txt` (ahora dice `https://billgarage.example`) + imagen
   `og.png` 1200×630.
2. **Dirección y horario** en `site.js` (mejoran mapa y JSON-LD).
3. **Fotos adicionales** de los 6 coches (interior, atrás) y **foto propia del
   taller** para el hero (ahora hay una provisional).
4. **Datos legales** del titular (nombre, NIF, domicilio, email) y revisión
   profesional de las 3 páginas legales.
5. **Servicio de formularios** (Web3Forms / Netlify Forms) o dejar WhatsApp
   como canal único.
6. **Reseñas reales** de Wallapop (pedir permiso) sustituyendo las de ejemplo.
7. Comprobar el **contraste del logo/favicon negros** sobre el fondo `#0a0a0a`.

---

## 5. Limitaciones conocidas del prototipo (a propósito)

- Formularios **simulados**: no envían a ningún sitio (el canal real es WhatsApp).
- Reseñas de ejemplo y descripciones/versión/km de los coches inventados.
- Dominio ficticio, sin dirección exacta ni horario.
- Textos legales por completar con un profesional.
- Sin analítica (ni cookies): si se añade, toca repensar el aviso de cookies
  (el iframe de Google Maps sí puede instalar cookies de tercero).

Anterior: [← 05-integraciones.md](05-integraciones.md) ·
Índice: [docs/README.md](README.md)
