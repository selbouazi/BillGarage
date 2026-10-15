import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import Reveal from "@/components/Reveal.jsx";
import Button from "@/components/Button.jsx";
import { IconPin, IconClock, IconPhone } from "@/components/Icons.jsx";
import { SITE } from "@/lib/site.js";

/** "Dónde estamos": mapa incrustado + datos de ubicación (Bloque 7). */
export default function Location() {
  return (
    <section aria-labelledby="ubicacion-title" className="border-t border-border bg-surface py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Visítanos" title="Dónde estamos" italic />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Mapa — TODO: sustituir la consulta por la dirección exacta cuando
              el cliente la confirme (SITE.mapEmbed / SITE.directions) */}
          <Reveal>
            <div className="overflow-hidden rounded-card border border-border bg-surface-2">
              <iframe
                src={SITE.mapEmbed}
                title={`Mapa de Bill Garage en ${SITE.zone}, ${SITE.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0 sm:h-96 lg:h-full lg:min-h-[24rem]"
              />
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="flex h-full flex-col justify-between rounded-card border border-border bg-surface-2 p-6 sm:p-8">
              <div>
                <h3 className="text-3xl">Bill Garage</h3>
                <p className="mt-1 text-sm uppercase tracking-widest text-accent-soft">
                  {SITE.tagline}
                </p>

                <ul className="mt-6 space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
                    <span>
                      <strong className="block font-semibold">Dirección</strong>
                      <span className="text-text-muted">
                        {SITE.addressFull || SITE.address}
                      </span>
                      <span className="block text-xs text-text-muted/80">
                        {/* TODO: dirección exacta (calle y número) */}
                        Dirección exacta por confirmar
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
                    <span>
                      <strong className="block font-semibold">Horario</strong>
                      <span className="text-text-muted">
                        {/* TODO: horario real del negocio */}
                        {SITE.schedule || "Por confirmar"}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
                    <span>
                      <strong className="block font-semibold">Teléfono</strong>
                      <a
                        href={`tel:${SITE.phoneTel}`}
                        className="text-text-muted transition-colors hover:text-text"
                      >
                        {SITE.phoneDisplay}
                      </a>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={SITE.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cómo llegar
                </Button>
                <Button variant="secondary" href={`tel:${SITE.phoneTel}`}>
                  Llamar
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
