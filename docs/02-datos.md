# 02 — Datos: inventario, negocio y qué es real vs. inventado

> Documento clave para contestar "¿este dato es real?" y para editar la
> información sin romper nada. Regla general: **no inventar datos de negocio**;
> lo no confirmado va con `// TODO` o `// EJEMPLO`.

---

## 1. `src/data/cars.js` — el inventario

Un array de objetos; cada objeto es un coche. Campos comunes a todos:
`marca`, `modelo`, `año`, `precio`, `estado`, `combustible`, `puertas`,
`carrocería` y `fotos`. El resto (versión, km, cv, cc, color, equipamiento,
garantía, ITV…) van marcados con `// EJEMPLO` cuando son de relleno.

```js
{
  id: "seat-leon-2013",              // ← es la URL: /coches/seat-leon-2013
  marca: "Seat",
  modelo: "León",
  año: 2013,
  precio: 5900,
  estado: "reservado",               // disponible | reservado | vendido
  destacado: true,                   // muestra la etiqueta "Destacado"
  fotos: ["/coches/seat-leon-2013/1.webp"],
  ...
}
```

**Los 6 coches del stock** (marca · modelo · año · precio · estado — datos reales):

| Coche | Año | Precio | Estado |
|---|---|---|---|
| Citroën C4 Picasso | 2007 | 2.600 € | disponible |
| Seat León | 2013 | 5.900 € | **reservado** |
| Volkswagen Golf R-Line | 2011 | 5.900 € | disponible |
| Seat Ibiza | 2011 | 3.500 € | disponible |
| Peugeot 208 | 2013 | 4.900 € | disponible |
| Opel Corsa | 2012 | 2.950 € | disponible |

Helpers exportados:

- `getCarById(id)` → devuelve el coche para la página de detalle.
- `getAvailableCars()` → **filtra los coches `vendido`** (no se muestran).

> **Regla de oro**: al añadir un coche **no hay que tocar ningún componente**.
> Los filtros, el contador, las marcas y el JSON-LD se generan solos.
> Único paso extra: subir su foto a `public/coches/<id>/1.webp`.

### Estados

- `disponible` → se muestra y el botón de WhatsApp está activo.
- `reservado` → se muestra con etiqueta ámbar y **bloquea** el botón principal.
- `vendido` → **no se muestra** en el listado (ni en los relacionados).

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
| Los 6 coches: marca, modelo, año, precio, estado | km, versión, color, equipamiento, garantía, ITV |
| Fotos reales de los 6 coches y del hero | Descripciones de cada coche |
| Teléfono, Instagram, TikTok, Wallapop | Dominio, dirección exacta, horario |
| 4,9★ · 67 valoraciones · +70 ventas · 3 reseñas reales de Wallapop | — |
| Logo y favicon | Textos legales (nombre, NIF, domicilio) |

---

## 5. Cómo cambiar un dato (receta)

| Quiero… | Archivo |
|---|---|
| Añadir / editar / quitar un coche | `src/data/cars.js` (+ foto en `public/coches/<id>/`) |
| Marcar un coche como vendido | `estado: "vendido"` |
| Cambiar teléfono, redes, cifras, horario, dominio | `src/lib/site.js` |
| Cambiar las reseñas | `src/data/reviews.js` |

Validación: `npm run build && npm run smoke`.

Anterior: [← 01-arquitectura.md](01-arquitectura.md) ·
Siguiente: [03-pantallas.md →](03-pantallas.md)
