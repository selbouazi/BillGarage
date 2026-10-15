import { Link } from "react-router-dom";
import Container from "@/components/Container.jsx";
import { IconInstagram, IconTikTok, IconWhatsApp, IconPhone, IconPin, IconTag } from "@/components/Icons.jsx";
import { NAV_LINKS, SITE } from "@/lib/site.js";
import { waLink } from "@/lib/whatsapp.js";

const LEGAL_LINKS = [
  { to: "/aviso-legal", label: "Aviso legal" },
  { to: "/politica-privacidad", label: "Política de privacidad" },
  { to: "/politica-cookies", label: "Política de cookies" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div>
          {/* Logo del cliente (public/logo.svg) */}
          <img
            src="/logo.svg"
            alt="Bill Garage — compra y venta de coches"
            className="mb-4 h-12 w-auto"
          />
          <p className="text-sm text-text-muted">
            Compra y venta de coches de ocasión en {SITE.city}. Entrega tu coche
            como parte del pago.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${SITE.instagramHandle} (nueva pestaña)`}
              className="rounded-card border border-border bg-surface-2 p-2.5 text-text-muted transition-colors hover:border-accent/60 hover:text-accent-soft"
            >
              <IconInstagram className="h-5 w-5" />
            </a>
            <a
              href={SITE.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`TikTok ${SITE.tiktokHandle} (nueva pestaña)`}
              className="rounded-card border border-border bg-surface-2 p-2.5 text-text-muted transition-colors hover:border-accent/60 hover:text-accent-soft"
            >
              <IconTikTok className="h-5 w-5" />
            </a>
            <a
              href={SITE.wallapop}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Wallapop ${SITE.wallapopHandle} (nueva pestaña)`}
              className="rounded-card border border-border bg-surface-2 p-2.5 text-text-muted transition-colors hover:border-accent/60 hover:text-accent-soft"
            >
              <IconTag className="h-5 w-5" />
            </a>
            <a
              href={waLink("Hola, me interesa por saber más sobre vuestros coches.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Bill Garage (nueva pestaña)"
              className="rounded-card border border-border bg-surface-2 p-2.5 text-text-muted transition-colors hover:border-whatsapp/60 hover:text-whatsapp"
            >
              <IconWhatsApp className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <nav aria-label="Enlaces rápidos">
          <h2 className="mb-4 text-lg">Navegación</h2>
          <ul className="space-y-2.5 text-sm">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  to={`/${item.href}`}
                  className="text-text-muted transition-colors hover:text-accent-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <h2 className="mb-4 text-lg">Contacto</h2>
          <ul className="space-y-3 text-sm text-text-muted">
            <li className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
              {/* TODO: dirección exacta */}
              {SITE.address}
            </li>
            {/* TODO: horario real */}
            <li className="text-text-muted/80">Horario: por confirmar</li>
            <li>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="flex items-center gap-2.5 transition-colors hover:text-text"
              >
                <IconPhone className="h-4 w-4 shrink-0 text-accent-soft" />
                {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="mb-4 text-lg">Legal</h2>
          <ul className="space-y-2.5 text-sm">
            {LEGAL_LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-text-muted transition-colors hover:text-accent-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-text-muted sm:flex-row">
          <p>
            © {year} {SITE.name} — {SITE.tagline}
          </p>
          {/* TODO: datos del titular (denominación, NIF, domicilio) en el aviso legal */}
          <p>El Vendrell, Tarragona · Prototipo web</p>
        </Container>
      </div>
    </footer>
  );
}
