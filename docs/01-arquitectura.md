# 01 — Arquitectura: qué es, stack, comandos y estructura

## 1. Qué es y para qué sirve

**Bill Garage** es la web de un compraventa de coches de ocasión en
El Vendrell (Tarragona). Es un **prototipo de una sola página (SPA)** pensado
para:

- enseñar el **stock actual** (inventario real sincronizado desde Wallapop) con ficha detalle de cada uno,
- captar **tasaciones** ("entrega tu coche como parte del pago"),
- generar **contacto directo** (WhatsApp, teléfono, formulario),
- y dar **confianza** (valoraciones de Wallapop, ventas cerradas, mapa, redes).

Características del prototipo:

- **Sin backend, sin base de datos, sin servidor**: todo son archivos estáticos.
- Los datos viven en JS plano (`src/data/`) para poder cambiarlos en 1 minuto,
  y para poder enchufar un backend real más adelante sin reescribir la interfaz.
- El inventario se **sincroniza solo desde Wallapop** (cada 30 min; ver §5 y
  `docs/02-datos.md`): el cliente edita sus anuncios y la web lo refleja.
- Todo dato inventado de relleno está marcado con `// EJEMPLO` o `// TODO`.

---

## 2. Stack técnico y por qué

| Tecnología | Versión | Por qué |
|---|---|---|
| React | 19.1 | Componentes, hooks; versión actual (soporta `fetchPriority` nativo) |
| Vite | 7.3 | Arranque instantáneo y build rápido (~0,8 s) |
| Tailwind CSS | **4.x (CSS-first)** | Los tokens se definen en CSS con `@theme`, sin `tailwind.config.js` |
| React Router | 7.18 | Solo hace falta para la ruta de detalle de coche y las páginas legales |
| @fontsource | 5.x | Fuentes **locales** (sin CDNs de terceros ni flash de texto) |

Sin CSS-in-JS, sin librerías de componentes, sin iconos de terceros: los iconos
son SVGs propios (`src/components/Icons.jsx`).

**Alias de importación**: `@` apunta a `src/` (configurado en `vite.config.js`
y `jsconfig.json`), así que se escribe `import Button from "@/components/Button.jsx"`.

---

## 3. Ponerlo en marcha

```bash
npm install          # instala dependencias (una sola vez)
npm run dev          # servidor de desarrollo → http://localhost:5173
npm run build        # genera la versión de producción en dist/
npm run preview      # sirve dist/ en local para probar el build
npm run smoke        # test: compila 13 páginas en SSR y comprueba que no rompen
```

- Si el puerto 5173 está ocupado, Vite sube a 5174, 5175…
- `npm run smoke` es el **test de seguridad**: compila el proyecto en modo
  servidor y renderiza home, las 6 fichas de coche, las 3 páginas legales, el
  404 y el sistema de diseño. Si algo falla, el comando sale con error.
- El modo de desarrollo y el build de producción **no se comportan igual**:
  siempre hay que lanzar `npm run build` antes de darlo por bueno.

---

## 4. Estructura de carpetas

```
BillGarage/
├── AGENTS.md             ← contexto y reglas para asistentes de IA
├── README.md             ← guía rápida de uso
├── docs/                 ← esta documentación (por temas)
├── index.html            ← punto de entrada: meta SEO, JSON-LD, favicon, logo
├── netlify.toml          ← configuración de despliegue Netlify
├── vite.config.js        ← plugins (React + Tailwind) y alias "@"
├── public/               ← archivos que se sirven TAL CUAL en la raíz del dominio
│   ├── coches/             ← fotos antiguas de muestra (conservadas; el stock usa el CDN de Wallapop)
│   ├── hero.webp           ← foto de fondo del hero (670×444, 33 KB)
│   ├── logo.png            ← logo a color (cabecera y footer; originales: logo.svg, favicon.svg, favicoin.png)
│   ├── favicon.png         ← favicon (badge circular)
│   ├── sitemap.xml         ← mapa del sitio para Google
│   ├── robots.txt          ← instrucciones para los rastreadores
│   └── _redirects          ← redirección SPA para Cloudflare Pages
├── scripts/
│   └── smoke.jsx           ← test SSR (npm run smoke)
└── src/
    ├── main.jsx            ← arranca React y monta <App/>
    ├── App.jsx             ← Router + Header + Footer + botón WhatsApp + scroll
    ├── index.css           ← ★ TOKENS del diseño (colores, fuentes, utilidades)
    ├── components/         ← piezas reutilizables (ver 04-diseno.md)
    ├── sections/           ← bloques de la home (ver 03-pantallas.md)
    ├── pages/              ← páginas completas (Home, CarDetail, legal/, 404)
    ├── data/               ← ★ los datos: cars.js (adaptador), cars.generated.json (Wallapop), reviews.js
    └── lib/                ← ★ lógica: site.js, whatsapp.js, forms.js, seo.js
```

Los archivos marcados con ★ son los que importan para mantener la web.

---

## 5. Cómo fluye la información

Es la parte más importante: **la interfaz nunca "sabe" nada del negocio, solo
lee de los archivos de datos**.

```
  Wallapop (perfil público del cliente)
        │   scripts/sync-wallapop.mjs · Action cada 30 min
        ▼
        src/data/cars.generated.json ─┐   (inventario: ficha, fotos, precio)
        src/data/cars.overrides.json ─┼─► src/data/cars.js (adaptador)
        src/data/reviews.js ──────────┤
        src/lib/site.js ──────────────┼──►  componentes React  ──►  pantalla
        src/lib/whatsapp.js ──────────┤
        src/lib/forms.js ─────────────┘
```

Consecuencias prácticas:

- Cambiar un dato = cambiar **un archivo**, no buscar por todo el código.
- Añadir un coche = **subirlo en Wallapop**; la Action (≤30 min) lo trae y
  los filtros, el contador, las marcas del desplegable y el JSON-LD se
  **generan solos**.
- Sustituir por backend más adelante = exportar el mismo shape desde un módulo
  asíncrono (`fetchCars()`), sin tocar componentes.

Siguiente: [02-datos.md →](02-datos.md)
