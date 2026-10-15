# 03 — Pantallas: rutas, la home bloque a bloque y páginas

## 1. Rutas (`src/App.jsx`)

```
/                       → Home (la SPA completa)
/coches/:id             → ficha de coche (id = slug del coche)
/aviso-legal            → página legal
/politica-privacidad    → página legal
/politica-cookies       → página legal
/sistema-diseno         → revisión interna de diseño (no enlazada en el menú)
*                       → 404 (NotFound.jsx)
```

**Qué pasa al navegar:**

- `ScrollManager`: al cambiar de ruta, scroll al principio; si hay ancla
  (`#coches`, `#entrega`…), scroll suave. Ambos respetan
  `prefers-reduced-motion`.
- El menú del `Header` son **anclas** sobre la home, no rutas: desde una ficha
  de coche, pulsar "Coches" vuelve a `/#coches`.
- Como es una SPA, al refrescar en una ruta profunda el servidor debe devolver
  siempre `index.html`: lo hacen `netlify.toml` y `public/_redirects`
  (ver [06-despliegue-y-tareas.md](06-despliegue-y-tareas.md)).
- `Header` fijo: se encoge con fondo translúcido al hacer scroll; en móvil,
  menú hamburguesa con overlay. `WhatsAppFloat` aparece en todas las páginas.

---

## 2. La home, bloque a bloque (`src/pages/Home.jsx`)

Orden exacto de las 9 secciones:

| # | Sección (archivo) | Qué hace | Elemento clave |
|---|---|---|---|
| 1 | **Hero** (`Hero.jsx`) | Titular + 2 CTAs + franja de confianza | Foto de fondo a 40 % de opacidad; "4,9 en Wallapop" es enlace al perfil |
| 2 | **Stock** (`Stock.jsx`) | Listado de coches + filtros | Filtros generados de los datos |
| 3 | **Entrega tu coche** (`TradeIn.jsx`) | Formulario de tasación (el gancho comercial) | Validación + envío simulado + botón WhatsApp |
| 4 | **Por qué nosotros** (`WhyUs.jsx`) | 4 tarjetas: trato directo, parte del pago, revisión y garantía, trámites y financiación | Iconos propios |
| 5 | **Opiniones** (`Reviews.jsx`) | Cifra 4,9★ + botón "Ver perfil en Wallapop" + 3 reseñas | Reseñas **reales** de Wallapop |
| 6 | **Estadísticas** (`Stats.jsx`) | +70 ventas · 4,9★/67 valoraciones · marcas en stock | La 3ª cifra se **calcula** de `cars.js` |
| 7 | **Redes** (`Social.jsx`) | 3 tarjetas: Instagram, TikTok, Wallapop | Todas abren en pestaña nueva |
| 8 | **Dónde estamos** (`Location.jsx`) | iframe de Google Maps + horario + "cómo llegar" | El horario saldrá cuando `SITE.schedule` tenga valor |
| 9 | **Contacto** (`Contact.jsx`) | Formulario + tarjetas de teléfono, WhatsApp y horario | Validación + envío simulado |

Para añadir una sección: crear el archivo en `src/sections/` y montarlo en el
orden que quieras dentro de `Home.jsx`.

---

## 3. Filtros del listado (`src/components/CarFilters.jsx`)

Se generan a partir de los datos: **marca, combustible, cambio, año mínimo,
precio máximo (deslizador)** y **5 órdenes** (precio ↑↓, año ↑↓, km ↑).
Muestran el contador "X de Y" con `aria-live` y el botón "Limpiar filtros"
solo aparece cuando hay algún filtro activo.

La lógica de filtrado vive en `src/sections/Stock.jsx`; las opciones de los
desplegables se derivan de los propios coches.

---

## 4. Ficha de coche (`src/pages/CarDetail.jsx`, ruta `/coches/:id`)

1. Migas de navegación → 2. galería → 3. descripción → 4. ficha técnica →
5. equipamiento → 6. CTA WhatsApp con el coche ya nombrado → 7. coches relacionados.

- **Galería**: con **1 foto** no muestra nada extra; con varias, muestra
  flechas, contador, miniaturas, cambio con **teclado** (← →) y **swipe** táctil.
- Si la imagen falla, aparece "Foto no disponible" (no se rompe el diseño).
- Genera **JSON-LD del vehículo** (schema.org `Car`) para SEO.
- Si el `id` no existe → mensaje de "coche no encontrado" con enlace al stock.
- El botón de WhatsApp usa `carInquiryMessage(car)`: *"Hola, me interesa el
  Seat León 2013. ¿Sigue disponible?"*.

---

## 5. Páginas legales (`src/pages/legal/`)

`/aviso-legal`, `/politica-privacidad` y `/politica-cookies`, montadas sobre un
`LegalLayout` común (cabecera, contenido, fecha de revisión).

**Son plantillas con un aviso visible de "texto orientativo"**: hay que
completarlas con el asesor legal y los datos reales del titular (nombre, NIF,
domicilio, email) en `src/pages/legal/content.jsx`.

---

## 6. Extras

- `/sistema-diseno` (`src/pages/DesignSystem.jsx`): página interna con todos
  los tokens, botones, badges, campos e iconos. Sirve para revisar el diseño
  sin buscar en el código. **No está enlazada en el menú** (se llega escribiendo
  la URL).
- Cualquier otra URL → `NotFound.jsx` (404) con enlace de vuelta al inicio.

Anterior: [← 02-datos.md](02-datos.md) ·
Siguiente: [04-diseno.md →](04-diseno.md)
