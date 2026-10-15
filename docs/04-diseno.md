# 04 — Diseño: tokens, componentes, accesibilidad y rendimiento

## 1. Tokens (todo en `src/index.css`, bloque `@theme`)

Tailwind v4 lee estos nombres y genera las utilidades (`bg-surface`,
`text-accent`, `rounded-card`…). **No hay valores sueltos en los componentes.**

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Fondo |
| `--color-surface` / `surface-2` | `#141414` / `#1c1c1c` | Tarjetas |
| `--color-border` | `#2a2a2a` | Bordes |
| `--color-text` / `text-muted` | `#f5f5f5` / `#a3a3a3` | Texto |
| `--color-accent` / `accent-hover` | `#e11d2e` / `#b31524` | Único acento: rojo del logo |
| `--color-accent-soft` | `#ff4d5a` | Rojo **para texto** (contraste AA) |
| `--color-danger` | `#f87171` | Errores de formulario |
| `--color-whatsapp` | `#25d366` | Única excepción de marca (botones verdes) |
| `--color-reservado` / `vendido` | `#d97706` / `#525252` | Estados del coche |
| `--font-display` | Barlow Condensed | Títulos (con **cursiva** como el logo) |
| `--font-sans` | Inter | Texto |
| `--radius-card` / `--radius-pill` | 0.75rem / 9999px | Esquinas |

Utilidades propias definidas en el mismo archivo: `.reveal` (aparición
animada al entrar en pantalla) y `.glow-hover` (resplandor rojo al pasar el
ratón sobre tarjetas/botones).

**Regla**: para cambiar un color se edita el token aquí, nunca se pega un
`#hex` en un componente. Excepción admitida: degradados/SVG decorativos
ya existentes (silueta, líneas rojas).

---

## 2. Tipografías

- **Barlow Condensed** (`font-display`) → titulares, cursiva como guiño al logo.
- **Inter** (`font-sans`) → texto.
- Ambas se importan con `@fontsource` en `src/index.css`: **sin CDNs**,
  sin petición externa ni flash de texto (woff2 + woff locales).

---

## 3. Componentes base (`src/components/`)

| Componente | Qué hace |
|---|---|
| `Button` | Variantes `primary` / `secondary` / `whatsapp` / `ghost`, tamaños `sm` / `lg`, acepta `href` o `type="submit"` |
| `Badge` | Etiquetas: `disponible` (verde), `reservado` (ámbar), `vendido` (gris), `accent` (rojo: "Destacado", "Nuevo") |
| `SectionTitle` | Antetítulo (eyebrow) + título + guion rojo; `italic` para cursiva |
| `Container` | Contenedor centrado con padding consistente |
| `Field` | Input/textarea/select con etiqueta + exporta `fieldAria()` para accesibilidad |
| `Reveal` | Animación de aparición (respetando `prefers-reduced-motion`) |
| `Icons` | Todos los iconos en SVG propio (WhatsApp, estrella, chevrons, Instagram, TikTok…) |
| `WhatsAppFloat` | Botón flotante fijo, presente en todas las páginas |

La página interna **`/sistema-diseno`** muestra todas las piezas en vivo.

---

## 4. Responsive y movimiento

- **Mobile-first**: se diseña para 360/390 px y se sube a 768, 1024 y 1440.
- Breakpoints usados: `sm` (640), `md` (768), `lg` (1024), `xl` (1280).
- Todas las animaciones (`Reveal`, transiciones, scroll suave) **se desactivan
  si el sistema pide `prefers-reduced-motion`** (comprobado en `ScrollManager`
  y en `Reveal`).

---

## 5. Accesibilidad (lo que ya está hecho — no romper)

- Enlace **"Saltar al contenido"** visible al enfocar con teclado (en `App.jsx`).
- Navegación completa por **teclado**: galería con ← →, menú, formularios.
- `aria-label` en todos los enlaces e iconos sin texto visible; `aria-hidden`
  en decorativos.
- Formularios: etiquetas asociadas (`htmlFor`/`id`), `aria-invalid`, mensajes
  con `role="alert"`, foco automático al primer error, `aria-live` en el
  contador de filtros.
- Contraste **AA** garantizado en los casos de riesgo mediante tokens
  aclarados (`accent-soft`, `danger`, `whatsapp`).
- Imágenes decorativas con `alt=""`.

---

## 6. Rendimiento

- **Fuentes locales** (@fontsource): sin CDNs, sin flash de texto.
- **Imágenes WebP** con `width`/`height` (evita saltos de diseño) y
  `loading="lazy"` en todo lo que no es el hero; el hero usa
  `fetchPriority="high"` y se sirve en `public/` (sin procesar en runtime).
- **Build actual**: CSS ≈ 40,8 kB (7,9 kB gzip) · JS ≈ 337 kB (103 kB gzip).
- Sin librerías pesadas: el mayor peso es React + React Router.
- Caché inmutable de 1 año para `/assets/*` (cabeceras en `netlify.toml`).
- Transiciones cortas (200–500 ms) y `decoding="async"` en imágenes.

Anterior: [← 03-pantallas.md](03-pantallas.md) ·
Siguiente: [05-integraciones.md →](05-integraciones.md)
