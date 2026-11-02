import { useState } from "react";
import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import Reveal from "@/components/Reveal.jsx";
import Button from "@/components/Button.jsx";
import { IconPin, IconClock, IconPhone } from "@/components/Icons.jsx";
import { SITE } from "@/lib/site.js";

/**
 * "Dónde estamos": mapa + datos de ubicación (Bloque 7).
 *
 * El mapa se carga SOLO al pulsar "Ver mapa" (patrón "clic para cargar"): así
 * la página no instala cookies de Google y la política de cookies puede decir
 * la verdad (sin cookies). Ver docs/05 §4.
 */
export default function Location() {
  const [mapLoaded, setMapLoaded] = useState(false);

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
            <div className="h-72 overflow-hidden rounded-card border border-border bg-surface-2 sm:h-96 lg:h-full lg:min-h-[24rem]">
              {mapLoaded ? (
                <iframe
                  src={SITE.mapEmbed}
                  title={`Mapa de Bill Garage en ${SITE.zone}, ${SITE.city}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="group flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center transition-colors hover:bg-surface"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-accent-soft transition-colors group-hover:border-accent/60">
                    <IconPin className="h-7 w-7" />
                  </span>
                  <span className="text-lg font-semibold text-text">Ver mapa</span>
                  <span className="max-w-xs text-sm text-text-muted">
                    {SITE.zone}, {SITE.city} ({SITE.province})
                  </span>
                  <span className="max-w-xs text-xs text-text-muted/80">
                    El mapa se carga desde Google Maps solo cuando lo pides.
                  </span>
                </button>
              )}
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
