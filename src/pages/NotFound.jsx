import Container from "@/components/Container.jsx";
import Button from "@/components/Button.jsx";
import { IconSearch, IconWhatsApp } from "@/components/Icons.jsx";
import { useSeo } from "@/lib/seo.js";
import { waLink } from "@/lib/whatsapp.js";

/** Página 404. */
export default function NotFound() {
  useSeo({
    title: "Página no encontrada — Bill Garage",
    description: "La página que buscas no existe.",
  });

  return (
    <main id="main" className="flex min-h-[70svh] items-center py-32">
      <Container className="text-center">
        <IconSearch className="mx-auto h-12 w-12 text-accent-soft" />
        <h1 className="mt-5 text-5xl">404 — Página no encontrada</h1>
        <p className="mx-auto mt-3 max-w-md text-text-muted">
          El coche o la página que buscas ya no está disponible.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Ver el stock</Button>
          <Button
            variant="whatsapp"
            href={waLink("Hola, me interesa por saber más sobre vuestros coches.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </Button>
        </div>
      </Container>
    </main>
  );
}
