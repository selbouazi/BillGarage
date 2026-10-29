# Bill Garage — Prototipo web

Web de una sola página (SPA) para **Bill Garage**, compra y venta de coches de
ocasión en El Vendrell (Tarragona). Prototipo estático, sin backend, para
enseñar al cliente y cerrar el proyecto.

- **Stack**: React 19 + Vite 7 + Tailwind CSS 4 + React Router 7
- **Tipografías**: Barlow Condensed (títulos, cursiva como el logo) + Inter
  (texto), cargadas con `@fontsource` — sin CDNs externas
- **Datos**: inventario **sincronizado automáticamente desde Wallapop**
  (`src/data/cars.generated.json`; fácil de sustituir por Google Sheets /
  Sanity / Supabase)
- **Despliegue**: Vercel (rama `main`, con `vercel.json` y rewrites SPA);
  queda preparado también para Netlify (`netlify.toml` + `public/_redirects`)
- **Documentación**: [`docs/`](docs/README.md) — manual por temas (arquitectura,
  datos, pantallas, diseño, integraciones, despliegue y pendientes)
- **Para asistentes de IA**: [`AGENTS.md`](AGENTS.md) — contexto, reglas y
  mapa de la documentación (léelo antes de tocar código)

---

## 1. Cómo ejecutarlo

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo → http://localhost:5173
npm run build      # build de producción en dist/
npm run preview    # ver el build de producción
npm run smoke      # test SSR: comprueba que todas las páginas renderizan
npm run sync:wallapop  # inventario desde Wallapop (automático cada 30 min)
```

Páginas disponibles:

| Ruta                  | Contenido                                    |
| --------------------- | -------------------------------------------- |
| `/`                   | Home completa (hero, stock, tasación, etc.)  |
| `/coches/:id`         | Ficha de cada coche                          |
| `/aviso-legal`        | Aviso legal (plantilla)                      |
| `/politica-privacidad`| Política de privacidad (plantilla)           |
| `/politica-cookies`   | Política de cookies (plantilla)              |
| `/sistema-diseno`     | Página de prueba del sistema de diseño       |

---

## 2. Estructura

```
public/
  coches/<id>/1.webp      ← foto real de cada coche (1 por ficha)
  hero.webp               ← foto de fondo del hero (provisional, ver §9)
  logo.png                ← logo a color del cliente (cabecera y footer, ver §4)
  favicon.png             ← favicon (badge circular del cliente)
  logo.svg, favicon.svg, favicoin.png  ← originales del cliente (sin uso, §4)
  sitemap.xml, robots.txt, _redirects
scripts/
  smoke.jsx                   ← test SSR (npm run smoke)
src/
  components/   Button, Badge, SectionTitle, Container, Header, Footer,
                CarCard, CarFilters, Field, Reveal, Icons, WhatsAppFloat
  sections/     Hero, Stock, TradeIn, WhyUs, Reviews, Stats, Social,
                Location, Contact
  pages/        Home, CarDetail, NotFound, DesignSystem, legal/
  data/         cars.js (adaptador), cars.generated.json (Wallapop),
                cars.overrides.json, reviews.js
  lib/          site.js (datos del negocio), whatsapp.js, forms.js, seo.js
  index.css     ← TOKENS del diseño (colores, tipografías, utilidades)
```

---

## 3. Cómo se actualizan los coches (automático, desde Wallapop)

El inventario **no se edita a mano en la web**: sale del perfil público de
Wallapop del cliente (<https://es.wallapop.com/user/erwanj-46555843>). Un
script lo comprueba **cada 30 min** con una Action de GitHub y actualiza
`src/data/cars.generated.json`; solo se publica si algo ha cambiado (siempre
con build + smoke antes):

| Quiero… | Dónde se hace |
|---|---|
| Añadir / editar un coche, precio, fotos | **En Wallapop** (o ya: `npm run sync:wallapop`) |
| Poner un coche como reservado | Botón "reservado" de Wallapop |
| Borrar un coche | Borrar el anuncio → desaparece de la web |
| Marcar vendido sin borrar el anuncio | `src/data/cars.overrides.json` → `[{ "id": "<slug>", "estado": "vendido" }]` |

`src/data/cars.js` es solo el **adaptador** (lo generado + los ajustes
manuales): **no editar a mano**. Cada coche trae la ficha estructurada de
Wallapop, todas las fotos del anuncio y la descripción limpia del bloque de
palabras clave SEO. Ejemplo real:

```js
{
  id: "fiat-tipo-2017-1314457031",   // ← es la URL: /coches/fiat-tipo-2017-…
  wallapopId: "p618nvn7exz5",
  wallapopUrl: "https://es.wallapop.com/item/fiat-tipo-2017-1314457031",
  marca: "FIAT", modelo: "Tipo", version: "1.4 16v 95 Easy 5p",
  año: 2017, km: 170000, combustible: "Gasolina", cambio: "Manual", cv: 95,
  carroceria: "Pequeño", puertas: 5, plazas: 5, etiqueta: "C",
  precio: 5500, estado: "disponible", destacado: true,
  fotos: ["https://cdn.wallapop.com/…?pictureSize=W1024", …],  // 39 fotos
  equipamiento: ["Volante multifuncion", "Control crucero", …],
  descripcion: "…",                  // limpiada del bloque SEO de Wallapop
  itvHasta: "2027-01", propietarios: 1, garantiaMeses: 12  // leídos de la descripción
}
```

Notas:

- Los **filtros del listado se generan solos** a partir de los datos: no hay
  que tocar nada al añadir un coche.
- Los coches con `estado: "vendido"` **no se muestran**; `"reservado"` bloquea
  el botón principal de WhatsApp.
- Las fotos se sirven del **CDN de Wallapop** (no pesan en el repositorio) y
  llevan `referrerPolicy="no-referrer"`; los marcos son 4:3 con recorte
  `object-[center_57%]` para centrar los coches verticales. Las fotos
  antiguas de muestra siguen en `public/coches/` (conservadas, sin uso).
- Seguridades del sync: perfil con 0 anuncios → **no se vacía la web**; si
  Wallapop falla se conserva el último snapshot (y GitHub avisa por email).
  Detalle en [`docs/02-datos.md`](docs/02-datos.md).

---

## 4. Cómo cambiar el logo

- **`public/logo.png`** → logo a color de la cabecera y el footer
  (PNG con fondo transparente, 1157×803).
- **`public/favicon.png`** → icono de pestaña (badge circular, 512×512,
  generado a partir de `favicoin.png`, el original que entregó el cliente).
- Referencias en el código: `src/components/Header.jsx`,
  `src/components/Footer.jsx` y `src/pages/DesignSystem.jsx` (buscar
  `logo.png`); el favicon, en `index.html`.
- Sin uso en la web (originales del cliente, conservados por si acaso):
  `logo.svg` y `favicon.svg` (versiones monocromas en negro) y `favicoin.png`.
- Para cambiarlo: sustituye el PNG en `public/` (mismo nombre). Si el nuevo
  logo es oscuro, acordar versión clara: el fondo de la web es `#0a0a0a`.

---

## 5. Cómo cambiar colores y tipografías

Todo vive en **`src/index.css` → bloque `@theme`** (tokens de Tailwind 4):

| Token                  | Valor     | Uso                                  |
| ---------------------- | --------- | ------------------------------------ |
| `--color-bg`           | `#0a0a0a` | Fondo                                |
| `--color-surface`      | `#141414` | Superficie                           |
| `--color-surface-2`    | `#1c1c1c` | Superficie elevada                   |
| `--color-border`       | `#2a2a2a` | Bordes                               |
| `--color-accent`       | `#e11d2e` | Acento rojo (botones, líneas)        |
| `--color-accent-hover` | `#b31524` | Hover del acento                     |
| `--color-accent-soft`  | `#ff4d5a` | Acento en **texto** (contraste AA)   |
| `--color-whatsapp`     | `#25d366` | Solo botones/enlaces de WhatsApp     |
| `--font-display`       | Barlow Condensed | Títulos (`font-display`)       |
| `--font-sans`          | Inter     | Texto (`font-sans`)                  |

Cambiar un color = cambiar el token. No hay colores sueltos en los componentes.

---

## 6. Cómo cambiar textos

- **Datos del negocio** (teléfono, redes, dirección, horario, mapa, cifras):
  `src/lib/site.js` → objeto `SITE`. Un solo sitio para todo.
- **Textos de las secciones**: cada bloque en `src/sections/*.jsx`.
- **Reseñas**: `src/data/reviews.js`.
- **Textos legales**: `src/pages/legal/content.jsx`.
- **Title y meta description base**: `index.html` (las de cada página se
  generan con `useSeo` en `src/lib/seo.js`).

---

## 7. Cómo conectar los formularios

Los dos formularios (tasación en `TradeIn.jsx` y contacto en `Contact.jsx`)
validan en cliente y **simulan el envío**. Para hacerlo real, hay que sustituir
`simulateSubmit()` de `src/lib/forms.js` por una llamada real. Opciones:

1. **Netlify Forms**: añadir `data-netlify="true"` y un `name` al `<form>`,
   más un campo oculto `form-name`, y `fetch` en modo `POST` con
   `application/x-www-form-urlencoded`.
2. **Web3Forms**: `fetch("https://api.webforms.io/…", { method: "POST", … })`
   con la access key del cliente.
3. **Formspree**: `fetch("https://formspree.io/f/XXXX", { method: "POST", … })`.

En ambos casos queda también el botón **"Enviar por WhatsApp"**, que sí funciona
(abre wa.me con el mensaje ya escrito) y puede quedarse como alternativa.

---

## 8. Despliegue

- **Netlify**: `netlify.toml` incluido (build `npm run build`, publish `dist`,
  redirect SPA `/* → /index.html 200`).
- **Cloudflare Pages**: command `npm run build`, output `dist`; el archivo
  `public/_redirects` (que Vite copia a `dist`) aporta la misma regla SPA.
- **Vercel**: `vercel.json` con rewrites SPA (`/(.*) → /index.html` — Vercel
  no lee `netlify.toml` ni `_redirects`). Al importar el repo: rama `main`,
  preset Vite, Root Directory `./`.
- **Antes de publicar**: sustituir `https://billgarage.example` por el dominio
  real en `index.html`, `src/lib/site.js`, `public/sitemap.xml` y
  `public/robots.txt`.

---

## 9. Pendientes: TODO y EJEMPLO

### TODO — datos por confirmar con el cliente

- **`src/lib/site.js`**: dominio real (`url`), dirección exacta (`addressFull`),
  horario (`schedule`), URLs exactas de Instagram/TikTok, coordenadas del mapa.
  *Ya está el perfil de Wallapop* (`SITE.wallapop`, perfil **Bill G.**:
  <https://es.wallapop.com/user/erwanj-46555843>): se usa en el hero, en
  Opiniones, en Redes, en el footer y en el JSON-LD `sameAs`.
- **Garantía**: el sync detecta "12 MESES DE GARANTÍA" en las descripciones
  del cliente; confirmar con él si aplica a todo el stock.
- **Textos**: presentación del hero (`Hero.jsx`), plazo de valoración y
  documentación necesaria (`TradeIn.jsx`), garantía/ revisión previa /
  trámites / financiación (`WhyUs.jsx`), años de experiencia (`Stats.jsx`),
  quién contesta en el mensaje de éxito (`TradeIn.jsx`).
- **Fotos**: las del inventario llegan solas desde Wallapop. Falta crear
  `og.png` 1200×630. La imagen del hero (`public/hero.webp`) es provisional:
  sustituirla por una foto propia del taller.
- **Logo**: ✅ resuelto — la web usa el logo **a color** del cliente
  (`public/logo.png` + `public/favicon.png`, fondo transparente). Los SVG
  monocromos y `favicoin.png` quedan en `public/` sin uso (§4).
- **Legales** (`src/pages/legal/content.jsx`): nombre, NIF, domicilio y email
  del titular; finalidades del tratamiento; fecha de revisión. Revisar con un
  profesional antes de publicar.
- **SEO** (`index.html`, `sitemap.xml`, `robots.txt`): dominio real, horario y
  dirección en el JSON-LD, imagen Open Graph.
- **Cookies**: la web no usa cookies propias no esenciales (sin analítica ni
  publicidad). El iframe de Google Maps **sí** puede instalar cookies de
  tercero: valorar añadir aviso o cambiar a un mapa sin cookies
  (`src/pages/legal/content.jsx`).

### EJEMPLO — datos de relleno (ficticios)

- Los **coches ya no tienen datos de relleno**: el inventario entero es real
  y llega sincronizado desde Wallapop (ver §3).

---

## 10. Accesibilidad y rendimiento (resumen)

- HTML semántico (`header`, `main`, `section`, `article`, `footer`, `nav`),
  enlace "saltar al contenido", foco visible, `alt` descriptivos, etiquetas
  vinculadas en todos los campos y mensajes de error con `role="alert"`.
- Contraste AA: rojo de texto aclarado (`--color-accent-soft`) y rojo de error
  (`--color-danger`) sobre fondo oscuro.
- `prefers-reduced-motion` respetado (scroll, transiciones y animaciones).
- Imágenes WebP con `width`/`height` (sin saltos de layout), `loading="lazy"`
  y `decoding="async"`; solo subset `latin` de las fuentes.
