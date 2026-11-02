import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import { useSeo } from "@/lib/seo.js";
import { LEGAL, LEGAL_READY } from "@/lib/site.js";

/**
 * Contenedor compartido de las páginas legales (Bloque 8).
 * El aviso de plantilla desaparece solo cuando `LEGAL_READY` es true, es decir,
 * cuando `site.js` tiene titular, NIF, domicilio y email (ver docs/05 §6).
 */
export default function LegalLayout({ title, description, children }) {
  useSeo({ title: `${title} — Bill Garage`, description });

  return (
    <main id="main" className="pb-20 pt-24 sm:pt-28">
      <Container className="max-w-3xl">
        <SectionTitle eyebrow="Legal" title={title} italic />

        {!LEGAL_READY && (
          <div
            role="note"
            className="mb-8 rounded-card border border-accent/40 bg-accent/10 p-4 text-sm"
          >
            <strong className="font-semibold text-accent-soft">
              Texto orientativo:
            </strong>{" "}
            faltan los datos del titular (nombre, NIF, domicilio y email) y la
            revisión de un profesional antes de publicar.
          </div>
        )}

        <div className="space-y-8 text-sm leading-relaxed text-text-muted [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-text [&_strong]:text-text">
          {children}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-text-muted/80">
          Última actualización:{" "}
          {LEGAL.updated || "pendiente de confirmar"}
        </p>
      </Container>
    </main>
  );
}
