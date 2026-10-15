import Container from "@/components/Container.jsx";
import Reveal from "@/components/Reveal.jsx";
import { SITE } from "@/lib/site.js";
import { getAvailableCars } from "@/data/cars.js";

const marcas = new Set(getAvailableCars().map((c) => c.marca)).size;

const STATS = [
  { value: `+${SITE.salesCount}`, label: "Ventas cerradas" },
  { value: `${SITE.rating.toLocaleString("es-ES")} ★`, label: `${SITE.reviewCount} valoraciones en Wallapop` },
  // TODO: añadir "años de experiencia" cuando el cliente confirme la cifra.
  // De momento, cifra derivada de los datos reales del stock.
  { value: `${marcas}`, label: "Marcas en stock ahora mismo" },
];

/** Franja de números (Bloque 6). */
export default function Stats() {
  return (
    <section aria-label="Cifras de Bill Garage" className="py-14 sm:py-16">
      <Container>
        <Reveal>
          <dl className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-surface px-6 py-8 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <p className="font-display text-5xl leading-none text-accent-soft">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
