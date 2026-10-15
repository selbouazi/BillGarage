# docs/ — Documentación del proyecto Bill Garage

Documentación partida por temas, pensada tanto para **personas** como para
**asistentes de IA** (que así no tienen que leer el código entero cada vez).

Si es tu primera vez aquí, empieza por [`../AGENTS.md`](../AGENTS.md)
(contexto general, reglas y comandos) o por [`01-arquitectura.md`](01-arquitectura.md).

---

## Índice

| Documento | Contenido | Léelo cuando… |
|---|---|---|
| [`01-arquitectura.md`](01-arquitectura.md) | Qué es, stack, comandos, estructura de carpetas, flujo de datos | quieras entender cómo está montado |
| [`02-datos.md`](02-datos.md) | Inventario de coches, datos del negocio, reseñas y **qué es real vs. inventado** | vayas a añadir/editar datos o respondas "¿esto es real?" |
| [`03-pantallas.md`](03-pantallas.md) | Rutas, la home bloque a bloque, filtros, ficha de coche, legales, 404 | vayas a tocar la estructura o el contenido visual |
| [`04-diseno.md`](04-diseno.md) | Tokens, tipografías, componentes base, responsive, accesibilidad y rendimiento | vayas a cambiar colores, tipografías o estilos |
| [`05-integraciones.md`](05-integraciones.md) | Formularios, WhatsApp, fotos de coches y SEO | vayas a conectar un formulario o cambiar imágenes/meta |
| [`06-despliegue-y-tareas.md`](06-despliegue-y-tareas.md) | Git, Netlify/Cloudflare, recetas rápidas y pendientes | vayas a publicar o a hacer un cambio típico |

Documentos hermanos en la raíz:

- [`../README.md`](../README.md) — guía rápida de uso (comandos, edición básica, pendientes §9).
- [`../AGENTS.md`](../AGENTS.md) — contexto y reglas para agentes de IA.

---

## Convenciones de esta documentación

- La **fuente de verdad es el código**: si un documento y el código discrepan,
  manda el código y corrige el documento.
- `// TODO` = dato pendiente de confirmar con el cliente.
  `// EJEMPLO` = dato de relleno **ficticio** para el prototipo.
- Rutas relativas entre documentos (`01-arquitectura.md`, `../README.md`) para
  que funcionen igual en GitHub y en local.
