# Pasarela de Cloudflare (Worker) para el sync de Wallapop

**Esto ya está desplegado y en uso.** No entra en el build de la web, pero el
sync de la CI depende de ello: si el Worker desaparece, la Action vuelve a
recibir `403`.

## Por qué existe

`es.wallapop.com` responde **403** a las IP de centro de datos de EE. UU.
(los runners de GitHub), incluso con un Chromium real y cabeceras de navegador.
Medido en la práctica:

| Origen de la petición | Resultado |
|---|---|
| Orange España, residencial (Barcelona) | `200` + `__NEXT_DATA__` |
| Cloudflare Worker en Madrid (AS13335) | `200` + `__NEXT_DATA__`, `cf-ray: …-MAD` |
| GitHub Actions (`ubuntu-latest`, EE. UU.) | `403` |

Por eso la Action no pide el perfil directamente: se lo pide al Worker, que
sí entra con una IP aceptada. Mismo HTML, mismo contrato, mismo `git diff`.

## Cómo está montado

| Pieza | Valor |
|---|---|
| Worker | `billgarage-wallapop` |
| URL | `https://billgarage-wallapop.selbouazi.workers.dev` |
| Código | `worker.js` (este directorio) |
| Rutas | `/user/<handle>`, `/item/<slug>` y `/__diag` |
| Auth | `?k=<TOKEN>`; sin token, `401`. `/__diag` es público a propósito |
| Secreto en GitHub | `WALLAPOP_BASE` = URL · `WALLAPOP_BASE_TOKEN` = el `TOKEN` del Worker |
| Coste | 0 € (free tier: 100.000 req/día; el sync hace ~24/día) |

El `TOKEN` vive en el código del Worker (Cloudflare) y en los secretos del
repo. **No lo escribas en la web ni en el JSON.**

## Comprobar que sigue vivo

```
https://billgarage-wallapop.selbouazi.workers.dev/__diag
```

Debe devolver dos `probes` con `"status": 200` y `"hasNextData": true`. Si ves
`403`, `429` o `200` con `hasNextData: false`, la pasarela está tocada: mira
`colonel`/`headers` (`cf-mitigated`) y, si hace falta, recrea el Worker (abajo).

## Recrearlo desde cero (10 minutos)

1. <https://dash.cloudflare.com> → **Workers & Pages → Create → Start with
   Hello World!** → nombre `billgarage-wallapop` → **Deploy**.
   - No usar "Connect GitHub", ni "Upload your static files", ni "Pages": Pages
     sirve estáticos y no ejecuta `fetch`.
   - Dejar **Cloudflare Access desactivado** (si no, `/__diag` pide login).
2. **Edit code** → borrar todo → pegar `worker.js` → poner un `TOKEN` nuevo →
   **Deploy**.
3. Actualizar los secretos del repo si cambia la URL o el token, y lanzar
   *Run workflow* para comprobarlo.

Por CLI, si se prefiere:

```bash
npx wrangler deploy --config experiments/wallapop-proxy/wrangler.toml
```

## Diagnóstico

`/__diag` devuelve:

- `colo` / `paisPeticion`: centro de datos de Cloudflare que atendió la petición.
- `egress`: IP, ASN y país vistos por Wallapop.
- `probes[]`: por cada URL, `status`, `headers` (`server`, `cf-ray`,
  `cf-mitigated`), `bytes`, `hasNextData` y las primeras letras del cuerpo.

| Resultado | Significado |
|---|---|
| `200` + `hasNextData: true` | Correcto |
| `200` + `hasNextData: false` | Challenge servido con 200 → bloqueo |
| `403` con `cf-mitigated` | Cloudflare nos corta la IP |
| `403`/`429` sin `cf-mitigated` | WAF de Wallapop |
| `522`/`525` | No llega al origen |

## Si el Worker deja de funcionar para siempre

El script **no depende** de él para funcionar en local: sin `WALLAPOP_BASE`
usa el fetch directo. Planes de respaldo, en orden:

1. Recrear el Worker (arriba) y actualizar el secreto.
2. Mover el Worker a otro proveedor con salida europea (Deno Deploy, etc.):
   el script solo necesita una URL que devuelva el HTML.
3. Ejecutar `npm run sync:wallapop` en un equipo con IP residencial y hacer
   `git push` a `integracion` (la Action valida y publica).

## Descartado antes de llegar aquí

- Proxies públicos (allorigins, codetabs, corsproxy…): 401/403/522.
- Playwright/Chromium en el runner: también 403 (el bloqueo es por IP).
- Proxies residenciales de pago: funcionarían, pero el Worker es gratis.
- Self-hosted runner en repo público: riesgo de ejecución de código ajeno.
