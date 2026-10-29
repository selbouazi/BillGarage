# 02 — Datos: inventario, negocio y qué es real vs. inventado

> Documento clave para contestar "¿este dato es real?" y para editar la
> información sin romper nada. Regla general: **no inventar datos de negocio**;
> lo no confirmado va con `// TODO` o `// EJEMPLO`.

---

## 1. Inventario — sincronizado desde Wallapop

**El inventario ya no se edita a mano.** `scripts/sync-wallapop.mjs` lee el
perfil **público** del cliente (<https://es.wallapop.com/user/erwanj-46555843>)
y escribe `src/data/cars.generated.json`. La Action
`.github/workflows/sync-wallapop.yml` lo ejecuta **cada 5 minutos**, solo
commitea (y por tanto Vercel redespliega) **si el inventario cambió**, y deja
la web en el último snapshot si Wallapop falla.

| Fichero | Quién lo toca | Qué lleva |
|---|---|---|
| `src/data/cars.generated.json` | **La sincronización** (jamás a mano) | Los coches con sus campos estructurados de Wallapop, fotos en CDN (W1024) y descripción limpia |
| `src/data/cars.overrides.json` | Tú (manual) | Ajustes puntuales por `id` (slug) que Wallapop no recoge, p. ej. `{"id":"…", "estado":"vendido"}` |
| `src/data/cars.js` | No se edita | Adaptador: generado + overrides. Exporta `cars`, `getCarById`, `getAvailableCars` con las mismas firmas de siempre |

Qué sale de Wallapop (datos **estructurados**, sin parsear texto):
`marca`, `modelo`, `version`, `año`, `km`, `combustible`, `cambio`, `cv`,
`carroceria`, `puertas`, `plazas`, `etiqueta` (DGT), `precio`, `estado`
(`isReserved` de Wallapop), todas las `fotos` y la `descripcion` (recortando
el bloque de palabras clave SEO que el cliente pega al final). Además el
sincronizador **extrae de la descripción**: equipamiento (lista de "- "),
`itvHasta` ("ITV Mayo 2027" → `2027-05`), `propietarios` y `garantiaMeses`
(cuando escribe "12 MESES DE GARANTÍA").

```js
// Ejemplo real de un registro generado:
{
  id: "seat-leon-2010-1314455574",   // ← es la URL: /coches/seat-leon-2010-…
  wallapopId: "pzpknyn8lkj3",
  wallapopUrl: "https://es.wallapop.com/item/seat-leon-2010-1314455574",
  marca: "SEAT", modelo: "Leon", año: 2010, km: 248000,
  combustible: "Gasolina", cambio: "Manual", cv: 102,
  etiqueta: "C", precio: 3300, estado: "disponible", destacado: true,
  fotos: ["https://cdn.wallapop.com/…?pictureSize=W1024", …],
  equipamiento: ["Volante multifuncion", …],
  descripcion: "Se vende Seat Leon …",
  …
}
```

> Para ver el inventario actual: el fichero generado o el perfil de Wallapop
> (hoy, octubre de 2026, **9 coches**). La antigua tabla de los 6 coches de
> muestra ya no existe: esos anuncios ya no están en Wallapop.

**Reglas de seguridad del sync** (están en el script): perfil con **0
anuncios → no escribe nada** (nunca se vacía la web); ficha que falla o no
valida → se conserva la versión anterior; error → exit 1 sin tocar el fichero
y GitHub avisa por email.

Helpers exportados por `cars.js`:

- `getCarById(id)` → devuelve el coche para la página de detalle.
- `getAvailableCars()` → **filtra los coches `vendido`** (no se muestran).

> **Regla de oro**: para añadir/editar/quitar un coche **se toca Wallapop**,
> nunca la web. Los filtros, el contador, las marcas, las fotos y el JSON-LD
> se generan solos a partir de los datos.

### Estados

- `disponible` → se muestra y el botón de WhatsApp está activo.
- `reservado` → llega del **campo "reservado" de Wallapop**; se muestra con
  etiqueta ámbar y **bloquea** el botón principal.
- `vendido` → **no se muestra**. En Wallapop, vender/borrar el anuncio lo
  elimina de la web en ≤5 min; para forzarlo sin borrar el anuncio, usar un
  override en `cars.overrides.json`.

### Ejecutar la sincronización a mano

```bash
npm run sync:wallapop   # 1 petición al perfil; fichas solo si hay cambios
```

---

## 2. `src/lib/site.js` — los datos del negocio

Único punto donde vive la información de la empresa: se cambia aquí y se
propaga a toda la web.

| Campo | Valor actual | Aparece en |
|---|---|---|
| `phoneDisplay` / `phoneTel` | 612 276 847 | footer, contacto, WhatsApp |
| `whatsappPhone` | 34612276847 | todos los botones verdes |
| `instagram` / `instagramHandle` | @bill.garage_ | footer, sección Redes |
| `tiktok` / `tiktokHandle` | @bill.garage_ | footer, sección Redes |
| `wallapop` / `wallapopHandle` | es.wallapop.com/user/erwanj-46555843 (**Bill G.**) | hero, opiniones, redes, footer, JSON-LD |
| `rating` / `reviewCount` / `salesCount` | 4,9 · 67 · 70 | hero, opiniones, estadísticas |
| `city` / `province` / `zone` | El Vendrell · Tarragona · Zona La Papiola | hero, contacto, mapa |
| `mapEmbed` / `directions` | búsqueda de Google Maps | sección "Dónde estamos" |
| `url` | **`https://billgarage.example`** ← TODO | canonical, Open Graph, sitemap |
| `schedule` | **vacío** ← TODO | contacto y mapa muestran "Por confirmar" |
| `address` / `addressFull` | zona aproximada ← TODO dirección exacta | contacto, JSON-LD |

---

## 3. `src/data/reviews.js` — las reseñas

Tres objetos `{ autor, estrellas, texto, fecha }` con **reseñas reales de
Wallapop**, aportadas por el cliente en octubre de 2026 con permiso de
publicación. Las cifras 4,9★ y 67 también son reales. Para añadir una nueva:
copiar el texto tal cual con su autor y fecha relativa ("Hace 1 mes").

---

## 4. Real vs. inventado (resumen para la demo)

| Real (dato del cliente) | Inventado / TODO |
|---|---|
| Inventario completo sincronizado de Wallapop: marca, modelo, versión, año, km, motor, cambio, CV, etiqueta, carrocería, puertas, plazas, precio, estado, fotos, descripción, equipamiento, ITV, garantía | — |
| Teléfono, Instagram, TikTok, Wallapop | Dominio, dirección exacta, horario |
| 4,9★ · 67 valoraciones · +70 ventas · 3 reseñas reales de Wallapop | — |
| Logo y favicon | Textos legales (nombre, NIF, domicilio) |

---

## 5. Cómo cambiar un dato (receta)

| Quiero… | Archivo / acción |
|---|---|
| Añadir / editar / quitar un coche | **En Wallapop** (llega a la web en ≤5 min, o ya con `npm run sync:wallapop`) |
| Marcar un coche como reservado | Botón "reservado" de Wallapop (o override `estado`) |
| Marcar un coche como vendido sin borrar el anuncio | `src/data/cars.overrides.json` → `{"id": "…", "estado": "vendido"}` |
| Cambiar teléfono, redes, cifras, horario, dominio | `src/lib/site.js` |
| Cambiar las reseñas | `src/data/reviews.js` |

Validación: `npm run build && npm run smoke`.

Anterior: [← 01-arquitectura.md](01-arquitectura.md) ·
Siguiente: [03-pantallas.md →](03-pantallas.md)
