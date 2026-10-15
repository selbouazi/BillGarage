import Container from "@/components/Container.jsx";
import Button from "@/components/Button.jsx";
import Reveal from "@/components/Reveal.jsx";
import { IconWhatsApp, IconStar } from "@/components/Icons.jsx";
import { SITE } from "@/lib/site.js";
import { waLink } from "@/lib/whatsapp.js";

/**
 * Hero — pantalla casi completa con titular, dos CTAs y franja de confianza.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32">
      {/* Fondo: foto real del taller (public/hero.webp — Seat Ateca) */}
      <img
        src="/hero.webp"
        alt=""
        aria-hidden="true"
        width={670}
        height={444}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_50%] opacity-40"
      />
      {/* Fondo: degradado oscuro + destello rojo sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_60%_50%_at_75%_10%,rgba(225,29,46,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-bg/40 via-bg/70 to-bg"
      />
      {/* Rejilla fina */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <Container className="relative">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-2 rounded-pill border border-border bg-surface/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {SITE.city} · {SITE.province} — {SITE.zone}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-4xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Compra, vende o entrega tu coche{" "}
            <span className="italic text-accent-soft">como parte del pago</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            {/* // TODO: texto de presentación definitivo — confirmar con el cliente.
                Mientras, copy genérico sin promesas concretas. */}
            Coches de ocasión revisados y con trato directo en {SITE.city}.
            Compramos tu coche o te lo descontamos del que te llevas: un solo
            trámite para las dos cosas.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" href="#coches">
              Ver coches
            </Button>
            <Button
              variant="whatsapp"
              size="lg"
              href={waLink("Hola, me interesa por saber más sobre vuestros coches.")}
            >
              <IconWhatsApp className="h-5 w-5" />
              Escribir por WhatsApp
            </Button>
          </div>
        </Reveal>

        {/* Franja de confianza */}
        <Reveal delay={320}>
          <div className="mt-12 inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-card border border-border bg-surface/70 px-5 py-3.5 backdrop-blur-sm">
            <a
              href={SITE.wallapop}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-accent-soft"
            >
              <IconStar className="h-4 w-4 text-accent" />
              {SITE.rating.toLocaleString("es-ES")} en Wallapop
            </a>
            <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
            <span className="text-sm text-text-muted">
              +{SITE.salesCount} ventas
            </span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
            <span className="text-sm text-text-muted">{SITE.city}</span>
          </div>
        </Reveal>
      </Container>

      {/* Línea roja fina inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
    </section>
  );
}
