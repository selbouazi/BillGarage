import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import Reveal from "@/components/Reveal.jsx";
import Button from "@/components/Button.jsx";
import { IconStar } from "@/components/Icons.jsx";
import { reviews } from "@/data/reviews.js";
import { SITE } from "@/lib/site.js";

function Stars({ n }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar
          key={i}
          filled={i < n}
          className={`h-4 w-4 ${i < n ? "text-accent" : "text-text-muted/40"}`}
        />
      ))}
    </span>
  );
}

/** Opiniones (Bloque 6). Resumen de reputación + tarjetas. */
export default function Reviews() {
  return (
    <section id="opiniones" className="scroll-mt-24 border-y border-border bg-surface py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Opiniones" title="Lo que dicen de nosotros" italic />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          {/* Resumen de reputación */}
          <Reveal>
            <div className="glow-hover h-full rounded-card border border-border bg-surface-2 p-6 sm:p-8">
              <p className="font-display text-6xl leading-none">
                {SITE.rating.toLocaleString("es-ES")}
                <span className="text-accent"> ★</span>
              </p>
              <p className="mt-3 text-sm text-text-muted">
                {SITE.reviewCount} valoraciones en Wallapop Pro
              </p>
              <span
                aria-hidden="true"
                className="my-5 block h-px w-full bg-gradient-to-r from-accent/60 to-transparent"
              />
              <p className="text-sm text-text-muted">
                Más de {SITE.salesCount} ventas cerradas.{" "}
                {/* TODO: añadir años de experiencia cuando el cliente lo confirme */}
              </p>
              <div className="mt-6">
                <Button
                  variant="secondary"
                  size="sm"
                  href={SITE.wallapop}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver perfil en Wallapop
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Tarjetas de reseñas */}
          <div className="grid gap-6 sm:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 90}>
                <figure className="glow-hover flex h-full flex-col rounded-card border border-border bg-surface-2 p-6">
                  <Stars n={r.estrellas} />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">
                    “{r.texto}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-border pt-4 text-sm">
                    <strong className="font-semibold">{r.autor}</strong>
                    <span className="ml-2 text-text-muted">{r.fecha}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        {/* TODO: PEDIR PERMISO AL CLIENTE para reproducir reseñas reales de
            Wallapop (autores, textos y fotos) antes de publicar.
            Las tarjetas de arriba son EJEMPLO. */}
      </Container>
    </section>
  );
}
