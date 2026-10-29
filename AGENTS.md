# AGENTS.md — Contexto del proyecto para asistentes de IA

> **Lee este archivo antes de tocar código.** La documentación está partida por
> temas en `docs/`: no hace falta leer el código entero para entender el
> proyecto, solo el documento de la tarea que te hayan encargado.

---

## Qué es

**Bill Garage**: web de un compraventa de coches de ocasión en El Vendrell
(Tarragona). **Prototipo de una sola página (SPA) estático** — sin backend, sin
base de datos, sin servidor — pensado para enseñar al cliente y cerrar el
proyecto. Los datos viven en JS plano para poder sustituirlos por un backend
(Google Sheets / Supabase) más adelante sin reescribir la interfaz.

**Stack**: React 19 · Vite 7 · Tailwind CSS **4 (CSS-first, tokens en
`@theme`)** · React Router 7 · fuentes locales con `@fontsource`.
Alias `@` = `src/`.

---

## Comandos

```bash
npm install       # dependencias (una vez)
npm run dev       # desarrollo → http://localhost:5173 (si está ocupado: 5174/5175…)
npm run build     # build de producción → dist/
npm run preview   # sirve dist/ en local
npm run smoke     # TEST: renderiza todas las páginas en SSR y falla si algo se rompe
npm run sync:wallapop  # inventario desde Wallapop (la Action lo hace sola cada 5 min)
```

**Regla: antes de dar cualquier cambio por bueno → `npm run build && npm run smoke`.**
(El dev y el build no se comportan igual; hay que validar el build.)

---

## Reglas duras (no negociables)

1. **No inventar datos de negocio.** Todo dato no confirmado se marca con
   `// TODO` o `// EJEMPLO` en el código y se documenta en `README.md` §9.
   Los datos reales y su estado están en [`docs/02-datos.md`](docs/02-datos.md).
2. **Nunca borrar ni sobrescribir los archivos del cliente**: fotos reales en
   `public/coches/`, `public/hero.webp`, `public/logo.png`,
   `public/favicon.png` (y los originales `logo.svg`, `favicon.svg`,
   `favicoin.png`).
3. **Tokens, no valores sueltos**: colores, radios y tipografías salen de
   `src/index.css` → bloque `@theme`. No meter `#hex` sueltos en componentes.
4. **Un solo acento rojo** (`--color-accent: #e11d2e`; para texto usar
   `accent-soft`, errores `danger`). Verde `#25d366` **solo** para WhatsApp.
5. **Sin CDNs ni librerías nuevas** sin preguntar antes (fuentes con @fontsource,
   iconos SVG propios en `src/components/Icons.jsx`). Excepción ya aprobada:
   las fotos del inventario se sirven del CDN de Wallapop con
   `referrerPolicy="no-referrer"`.
6. **Mobile-first** (360 → 1440) y toda animación respetando
   `prefers-reduced-motion`.
7. **Formularios sin backend**: el envío está simulado en
   `src/lib/forms.js → simulateSubmit()`. Si hay que conectarlo de verdad, esa
   es la función a sustituir (Web3Forms / Formspree / Netlify Forms).
8. **Accesibilidad**: no romper `aria-*`, foco visible, "Saltar al contenido",
   contraste AA (los tokens ya vienen preparados).
9. Tras un cambio grande: dejar el proyecto sin archivos huérfanos ni referencias
   colgantes (revisar `grep` de lo que se toque).

---

## Mapa rápido de archivos

| Archivo / carpeta | Para qué |
|---|---|
| `src/index.css` | **Tokens del diseño** (colores, tipografías, radios, `.reveal`, `.glow-hover`) |
| `src/data/cars.js` | Adaptador del inventario (generado + overrides). **No editar a mano** |
| `src/data/cars.generated.json` | Inventario sincronizado desde Wallapop (lo escribe el script; no editar) |
| `src/data/cars.overrides.json` | Ajustes manuales por id de Wallapop (p. ej. marcar "vendido" a mano) |
| `scripts/sync-wallapop.mjs` | Sincronización con el perfil público de Wallapop |
| `.github/workflows/sync-wallapop.yml` | Action: cron 5 min, build+smoke, commit solo si cambia, publica en `main` |
| `src/lib/site.js` | Datos del negocio: teléfono, redes, cifras, dirección, dominio |
| `src/data/reviews.js` | Reseñas **reales** de Wallapop (3, aportadas por el cliente) |
| `src/lib/whatsapp.js` | Enlaces `wa.me` con mensaje prellenado |
| `src/lib/forms.js` | Validación de formularios + envío **simulado** |
| `src/App.jsx` | Rutas + Header/Footer + scroll |
| `src/pages/Home.jsx` | Orden de las 9 secciones de la home |
| `src/sections/*.jsx` | Un archivo por bloque de la home |
| `src/components/*` | Piezas reutilizables (Button, Badge, Field, Icons…) |
| `index.html` | Meta SEO + JSON-LD + favicon/logo |
| `public/` | Todo lo que se sirve tal cual (fotos, logo, sitemap…) |
| `netlify.toml` + `public/_redirects` | Despliegue y redirección SPA |

---

## Documentación — léela según la tarea

| Tarea | Documento |
|---|---|
| Entender el proyecto, stack, comandos, carpetas | [`docs/01-arquitectura.md`](docs/01-arquitectura.md) |
| Añadir/editar coches, datos del negocio, qué es real y qué no | [`docs/02-datos.md`](docs/02-datos.md) |
| Rutas, home bloque a bloque, ficha de coche, páginas legales | [`docs/03-pantallas.md`](docs/03-pantallas.md) |
| Colores, tipografías, componentes, accesibilidad, rendimiento | [`docs/04-diseno.md`](docs/04-diseno.md) |
| Formularios, WhatsApp, fotos de coches, SEO | [`docs/05-integraciones.md`](docs/05-integraciones.md) |
| Git, despliegue (Netlify/Cloudflare), recetas "quiero cambiar X", pendientes | [`docs/06-despliegue-y-tareas.md`](docs/06-despliegue-y-tareas.md) |
| Guía rápida de uso (humano) | [`README.md`](README.md) |

---

## Estado del proyecto (octubre 2026)

- ✅ Inventario **sincronizado con Wallapop** (ahora: perfil de prueba
  `soulaimanee-434683562` — volver al cliente antes de publicar). Cadencia
  5 min + disparo al instante (Run workflow); commitea en `integracion` y
  **sube `main`** (producción Vercel). El fichero vive también en `main`
  porque GitHub lee los cron de la rama por defecto.
- ✅ Hero con foto provisional del taller.
- ✅ Logo y favicon **a color** del cliente (`public/logo.png` y
  `public/favicon.png`, fondo transparente). Los SVG negros y `favicoin.png`
  quedan en `public/` sin uso.
- ✅ Perfil de Wallapop real en hero, opiniones, redes, footer y JSON-LD.
- ⚠️ Formularios **simulados**; el canal real de contacto es WhatsApp
  (612 276 847).
- ⛔ **Antes de publicar**: dominio ficticio `https://billgarage.example`,
  dirección/horario sin confirmar, textos legales sin completar, falta `og.png`
  → lista completa en [`README.md` §9](README.md).
