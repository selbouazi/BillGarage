import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import { useSeo } from "@/lib/seo.js";

/** Contenedor compartido de las páginas legales (Bloque 8). */
export default function LegalLayout({ title, description, children }) {
  useSeo({ title: `${title} — Bill Garage`, description });

  return (
    <main id="main" className="pb-20 pt-24 sm:pt-28">
      <Container className="max-w-3xl">
        <SectionTitle eyebrow="Legal" title={title} italic />

        {/* Aviso visible: son textos de plantilla */}
        <div
          role="note"
          className="mb-8 rounded-card border border-accent/40 bg-accent/10 p-4 text-sm"
        >
          <strong className="font-semibold text-accent-soft">
            Texto orientativo:
          </strong>{" "}
          esta página es una plantilla para el prototipo y debe ser revisada por
          un profesional (abogado/graduado en Derecho) antes de publicarse. Los
          datos del titular están pendientes.
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-text-muted [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-text [&_strong]:text-text">
          {children}
        </div>
      </Container>
    </main>
  );
}
