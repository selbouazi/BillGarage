# 05 — Integraciones: formularios, WhatsApp, fotos y SEO

## 1. Formularios (2 en la web)

Hay **dos formularios** — tasación (`src/sections/TradeIn.jsx`) y contacto
(`src/sections/Contact.jsx`) — y funcionan igual:

```
rellenar → validación en cliente → estado "loading" → éxito / error
```

1. **Validación** (`src/lib/forms.js`): teléfono español de 9 dígitos, email
   con formato, año entre 1950 y el siguiente, km ≥ 0, obligatorios, checkbox
   de privacidad. Los errores aparecen bajo el campo en rojo, con
   `aria-invalid` y `role="alert"`, y el foco salta al primer campo con error.
   - `validateTradeIn(v)` → errores del formulario de tasación.
   - `validateContact(v)` → errores del formulario de contacto.
2. **Envío simulado**: `simulateSubmit()` **espera 0,9 s y devuelve éxito**.
   Es simulado a propósito (prototipo sin backend): **los datos NO llegan a
   ningún sitio**. El punto exacto a sustituir está marcado con
   `// TODO: aquí conectar el backend real del formulario`.
3. **Alternativa real**: el botón verde de WhatsApp (ver §2).

### Cómo conectar un formulario real (cuando toque)

Único punto de cambio: `src/lib/forms.js → simulateSubmit()`
(y el `// TODO` del manejador en `TradeIn.jsx` / `Contact.jsx`).

| Servicio | Cómo | Ventaja |
|---|---|---|
| **Web3Forms** | `fetch` POST JSON a `https://api.web3forms.com/submit` con `access_key` | Funciona en cualquier hosting; llega a un correo |
| **Formspree** | `fetch` POST a `https://formspree.io/f/XXXX` | Similar, formulario ya creado en su web |
| **Netlify Forms** | atributos `data-netlify` en el `<form>` | Sin código extra, solo si se publica en Netlify |

La lista de pendientes viva está en [`../README.md` §9](../README.md).

> Pendiente conocida: el campo "comentarios" del formulario de tasación **no se
> incluye** hoy en el mensaje de WhatsApp generado (`valuationMessage()`).

---

## 2. WhatsApp (canal de contacto real)

`src/lib/whatsapp.js` construye los enlaces sin dependencias:

```js
waLink("mensaje")            // → https://wa.me/34612276847?text=mensaje
carInquiryMessage(car)       // "Hola, me interesa el Seat León 2013…"
valuationMessage(values)     // "Hola, me gustaría una valoración…: Marca… Modelo…"
```

- Teléfono de negocio: **612 276 847** (`WHSAPP_PHONE = "34612276847"`).
- Aparece en: botón flotante (todas las páginas), hero, ficha de coche,
  tasación, contacto y footer.
- El verde `#25d366` es la **única excepción** al rojo único de la marca.

---

## 3. Fotos y assets

- **Stock**: 6 fotos reales, verticales (640×853), en
  `public/coches/<id>/1.webp`. Los marcos son 4:3, así que usan
  `object-[center_57%]` en `CarCard` y `CarDetail` para que el coche quede
  centrado en el recorte.
- **Hero**: `public/hero.webp` (670×444, 33 KB), al 40 % de opacidad debajo de
  un degradado oscuro → el texto blanco mantiene ~13:1 de contraste.
- **Para añadir más ángulos**: subir `2.webp`, `3.webp` y añadirlos al array
  `fotos` del coche (ver [02-datos.md](02-datos.md)). La galería se adapta sola:
  con 1 foto no muestra flechas ni contador.
- **Logo/favicon**: `public/logo.svg` y `public/favicon.svg` (del cliente).
  ⚠️ Son trazados en **negro puro**: sobre `#0a0a0a` puede quedar poco
  visible; comprobarlo siempre que se cambie el header/footer.
- El antiguo generador de placeholders fue **eliminado** (junto a `sharp`):
  las 6 fichas tienen foto real.

---

## 4. SEO y datos estructurados

- **`index.html`**: título, descripción, canonical, Open Graph, Twitter Card,
  `theme-color`, favicon y logo.
- **JSON-LD** `AutoDealer` (hereda de `LocalBusiness`) con nombre, teléfono,
  dirección aproximada, `aggregateRating` (4,9/67) y `sameAs`
  (Instagram, TikTok, **Wallapop**). Cada coche añade su propio `Car` desde
  `CarDetail.jsx` (helper en `src/lib/seo.js`).
- **`public/sitemap.xml`** y **`public/robots.txt`** listan las páginas.
- ⚠️ Todo apunta al dominio ficticio `https://billgarage.example`:
  **hay que sustituirlo** en `index.html`, `src/lib/site.js`,
  `public/sitemap.xml` y `public/robots.txt` antes de publicar.
- Falta crear la imagen `og.png` (1200×630) para las tarjetas de compartir.

Anterior: [← 04-diseno.md](04-diseno.md) ·
Siguiente: [06-despliegue-y-tareas.md →](06-despliegue-y-tareas.md)
