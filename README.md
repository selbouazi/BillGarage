# Bill Garage — Prototipo web

Web de una sola página (SPA) para **Bill Garage**, compra y venta de coches de
ocasión en El Vendrell (Tarragona). Prototipo estático, sin backend, para
enseñar al cliente y cerrar el proyecto.

- **Stack**: React 19 + Vite 7 + Tailwind CSS 4 + React Router 7
- **Tipografías**: Barlow Condensed (títulos, cursiva como el logo) + Inter
  (texto), cargadas con `@fontsource` — sin CDNs externas
- **Datos**: `src/data/cars.js` (fácil de sustituir por Google Sheets / Sanity /
  Supabase)
- **Despliegue**: Netlify o Cloudflare Pages (regla SPA incluida)
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
  logo.svg                ← logo del cliente (cabecera y footer, ver §4)
  favicon.svg             ← favicon del cliente
  sitemap.xml, robots.txt, _redirects
scripts/
  smoke.jsx                   ← test SSR (npm run smoke)
src/
  components/   Button, Badge, SectionTitle, Container, Header, Footer,
                CarCard, CarFilters, Field, Reveal, Icons, WhatsAppFloat
  sections/     Hero, Stock, TradeIn, WhyUs, Reviews, Stats, Social,
                Location, Contact
  pages/        Home, CarDetail, NotFound, DesignSystem, legal/
  data/         cars.js, reviews.js
  lib/          site.js (datos del negocio), whatsapp.js, forms.js, seo.js
  index.css     ← TOKENS del diseño (colores, tipografías, utilidades)
```

---

## 3. Cómo editar los coches (`src/data/cars.js`)

Añadir un coche = añadir un objeto al array `cars`:

```js
{
  id: "seat-ibiza-2011",        // slug único (usado en la URL /coches/slug)
  marca: "Seat",
  modelo: "Ibiza",
  version: "1.4 TDI 80cv",
  año: 2011,
  km: 148000,
  combustible: "Diésel",        // Gasolina | Diésel | Híbrido | Eléctrico | GLP
  cambio: "Manual",             // Manual | Automático
  cv: 80,
  cc: 1422,
  carroceria: "Utilitario",
  puertas: 5,
  plazas: 5,
  color: "Blanco",
  etiqueta: "B",                // 0 | ECO | B | C
  garantiaMeses: 12,            // TODO confirmar
  itvHasta: "2027-03",          // opcional
  propietarios: 2,              // opcional
  precio: 3500,
  estado: "disponible",         // disponible | reservado | vendido
  destacado: false,
  nuevo: false,                 // opcional → muestra la etiqueta "Nuevo"
  fotos: ["/coches/seat-ibiza-2011/1.webp", …],
  equipamiento: ["Aire acondicionado", "Bluetooth"],
  descripcion: "Texto libre."
}
```

Notas:

- **Sin matrícula** (privacidad).
- Los **filtros del listado se generan solos** a partir de los datos: no hay
  que tocar nada al añadir un coche.
- Los coches con `estado: "vendido"` **no se muestran**; `"reservado"` bloquea
  el botón principal de WhatsApp.
- **Fotos**: se colocan en `public/coches/<id>/` como `1.webp`, `2.webp`…
  (WebP). Las del cliente son **verticales 640×853**: los marcos usan `aspect-[4/3]`
  con recorte `object-[center_57%]` para que el coche quede centrado.
  Ahora **los 6 coches tienen foto real** (1 foto cada uno); si añades más ángulos,
  basta con subir `2.webp`, `3.webp` y añadirlos al array `fotos` (la galería
  se adapta sola: con 1 foto no muestra flechas ni contador).

---

## 4. Cómo cambiar el logo

- **`public/logo.svg`** → logo de la cabecera y el footer.
- **`public/favicon.svg`** → icono de pestaña.
- Referencias en el código: `src/components/Header.jsx`,
  `src/components/Footer.jsx` y `src/pages/DesignSystem.jsx` (buscar `logo.svg`).
- Los originales en PNG que entregó el cliente ya **no están en el proyecto**
  (limpieza): las copias definitivas son los dos SVG de `public/`.
- Para cambiar de formato: sustituye el archivo en `public/` y actualiza la
  ruta en los 3 componentes. Si el nuevo logo es oscuro, acordar versión clara
  porque el fondo de la web es `#0a0a0a` (los SVG actuales son trazados en
  negro puro, ver §9).

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
- **`src/data/cars.js`**: `garantiaMeses` de cada coche.
- **Textos**: presentación del hero (`Hero.jsx`), plazo de valoración y
  documentación necesaria (`TradeIn.jsx`), garantía/ revisión previa /
  trámites / financiación (`WhyUs.jsx`), años de experiencia (`Stats.jsx`),
  quién contesta en el mensaje de éxito (`TradeIn.jsx`).
- **Fotos**: añadir más ángulos de los 6 coches (interior, atrás); crear también
  `og.png` 1200×630. La imagen del hero (`public/hero.webp`)
  es provisional: sustituirla por una foto propia del taller.
- **Logo**: ya entregado por el cliente (`public/logo.svg` y
  `public/favicon.svg`); queda confirmar que se distingue bien sobre el fondo
  oscuro (§4).
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

- `src/data/cars.js`: versión, km, cambio, cv, cc, carrocería, plazas, color,
  etiqueta, ITV, propietarios, equipamiento y descripción de los 6 coches
  (marca, modelo, año, precio y estado **sí son reales**).

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
