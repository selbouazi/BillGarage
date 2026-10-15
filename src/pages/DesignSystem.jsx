import Container from "@/components/Container.jsx";
import Button from "@/components/Button.jsx";
import Badge from "@/components/Badge.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import { cars } from "@/data/cars.js";
import { waLink, carInquiryMessage, PHONE_DISPLAY } from "@/lib/whatsapp.js";

/**
 * Página de prueba del sistema de diseño (BLOQUE 1).
 * Muestra tokens, tipografías y componentes base con el tema aplicado.
 * Se sustituirá por la home real en el Bloque 2.
 */
function Swatch({ name, value, className }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-12 w-12 shrink-0 rounded-card border border-border ${className}`}
      />
      <div className="text-sm">
        <p className="font-semibold">{name}</p>
        <p className="font-mono text-text-muted">{value}</p>
      </div>
    </div>
  );
}

export default function DesignSystem() {
  const ejemplo = cars[0];

  return (
    <main id="main" className="min-h-screen bg-bg py-16">
      <Container>
        {/* ---------------- Tipografía ---------------- */}
        <header className="mb-16">
          <img src="/logo.svg" alt="Bill Garage" className="mb-6 h-16 w-auto" />
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Sistema de diseño · Bloque 1
          </p>
          <h1 className="text-5xl sm:text-6xl">
            Bill Garage <span className="italic text-accent">en línea</span>
          </h1>
          <p className="mt-4 max-w-2xl text-text-muted">
            Página de prueba: tokens de color, tipografías (Barlow Condensed +
            Inter), contenedor y componentes base. Contenido de ejemplo con{" "}
            <code className="text-accent">// EJEMPLO</code>.
          </p>
        </header>

        {/* ---------------- Tokens de color ---------------- */}
        <section className="mb-16">
          <SectionTitle eyebrow="Tokens" title="Colores" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <Swatch name="Fondo" value="#0a0a0a" className="bg-bg" />
            <Swatch name="Superficie" value="#141414" className="bg-surface" />
            <Swatch name="Superficie 2" value="#1c1c1c" className="bg-surface-2" />
            <Swatch name="Borde" value="#2a2a2a" className="bg-border" />
            <Swatch name="Acento" value="#e11d2e" className="bg-accent" />
            <Swatch name="Acento hover" value="#b31524" className="bg-accent-hover" />
            <Swatch name="Texto" value="#f5f5f5" className="bg-text" />
            <Swatch name="Texto atenuado" value="#a3a3a3" className="bg-text-muted" />
          </div>
        </section>

        {/* ---------------- Tipografías ---------------- */}
        <section className="mb-16 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Tipografía" title="Barlow Condensed" italic />
            <p className="font-display text-4xl uppercase">Títulos y titulares</p>
            <p className="font-display text-4xl uppercase italic text-accent">
              Cursiva como el logo
            </p>
            <p className="font-display text-2xl uppercase text-text-muted">
              Secundaria 24px
            </p>
          </div>
          <div>
            <SectionTitle eyebrow="Tipografía" title="Inter" />
            <p className="text-base">
              Texto corrido para párrafos, fichas y formularios. Inter 400.
            </p>
            <p className="mt-2 font-medium">Inter 500 — medio</p>
            <p className="mt-2 font-semibold">Inter 600 — semibold</p>
            <p className="mt-2 text-text-muted">
              Texto atenuado para descripciones y notas.
            </p>
          </div>
        </section>

        {/* ---------------- Botones ---------------- */}
        <section className="mb-16">
          <SectionTitle eyebrow="Componente" title="Button" />
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Ver coches</Button>
              <Button variant="secondary">Secundario</Button>
              <Button variant="whatsapp">Escribir por WhatsApp</Button>
              <Button variant="ghost">Fantasma</Button>
              <Button disabled>Deshabilitado</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button href={waLink(carInquiryMessage(ejemplo))} variant="whatsapp" size="md">
                wa.me enlace
              </Button>
            </div>
          </div>
        </section>

        {/* ---------------- Badges ---------------- */}
        <section className="mb-16">
          <SectionTitle eyebrow="Componente" title="Badge" />
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="accent">Destacado</Badge>
            <Badge tone="reservado">Reservado</Badge>
            <Badge tone="vendido">Vendido</Badge>
            <Badge tone="neutral">Neutro</Badge>
          </div>
        </section>

        {/* ---------------- SectionTitle ---------------- */}
        <section className="mb-16">
          <SectionTitle
            eyebrow="Componente"
            title="SectionTitle alineado"
          />
          <SectionTitle
            eyebrow="Componente"
            title="SectionTitle centrado"
            align="center"
            italic
          />
        </section>

        {/* ---------------- Datos + WhatsApp ---------------- */}
        <section className="mb-16">
          <SectionTitle eyebrow="Datos" title="Stock de coches" />
          <p className="mb-4 text-sm text-text-muted">
            {cars.length} coches cargados desde{" "}
            <code className="text-accent">src/data/cars.js</code>
          </p>
          <ul className="divide-y divide-border rounded-card border border-border bg-surface">
            {cars.map((car) => (
              <li
                key={car.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
              >
                <span>
                  <strong className="font-display text-lg uppercase">
                    {car.marca} {car.modelo}
                  </strong>{" "}
                  <span className="text-text-muted">
                    {car.año} · {car.km.toLocaleString("es-ES")} km ·{" "}
                    {car.combustible} · {car.cambio}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  {car.estado !== "disponible" && (
                    <Badge tone="reservado">Reservado</Badge>
                  )}
                  <strong className="text-lg">{car.precio.toLocaleString("es-ES")} €</strong>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-text-muted">
            Teléfono:{" "}
            <a
              className="text-accent underline underline-offset-4"
              href={waLink("Hola, me interesa saber más sobre vuestros coches.")}
            >
              {PHONE_DISPLAY}
            </a>{" "}
            →{" "}
            <code className="break-all">
              {waLink(carInquiryMessage(ejemplo))}
            </code>
          </p>
        </section>
      </Container>
    </main>
  );
}
