import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "@/components/Container.jsx";
import Button from "@/components/Button.jsx";
import { IconWhatsApp, IconMenu, IconClose } from "@/components/Icons.jsx";
import { NAV_LINKS, SITE } from "@/lib/site.js";
import { waLink } from "@/lib/whatsapp.js";

/** Enlace de ancla que funciona igual estando en la home u otra página. */
function NavAnchor({ href, className, onClick, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const target = pathname === "/" ? href : `/${href}`;

  return (
    <a
      href={target}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(target);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

/**
 * Header fijo: transparente arriba, con fondo y borde al hacer scroll.
 * Menú hamburguesa en móvil.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al cambiar de página/ancla y bloquea el scroll del body
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/90 py-2 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <Container className="flex items-center justify-between gap-4">
        {/* Logo del cliente (public/logo.svg) */}
        <Link to="/" aria-label="Bill Garage — ir al inicio" className="shrink-0">
          <img src="/logo.svg" alt="Bill Garage — compra y venta de coches" className="h-9 w-auto sm:h-10" />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((item) => (
            <NavAnchor
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              {item.label}
            </NavAnchor>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            variant="whatsapp"
            size="sm"
            href={waLink("Hola, me interesa por saber más sobre vuestros coches.")}
          >
            <IconWhatsApp className="h-4 w-4" />
            {SITE.phoneDisplay}
          </Button>
        </div>

        <button
          type="button"
          className="rounded-card border border-border bg-surface-2 p-2.5 text-text lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Menú móvil */}
      {open && (
        <div
          id="menu-movil"
          className="menu-in absolute inset-x-0 top-full border-b border-border bg-surface lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((item) => (
              <NavAnchor
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-card px-3 py-3 font-display text-xl uppercase text-text transition-colors hover:bg-surface-2"
              >
                {item.label}
              </NavAnchor>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <Button
                variant="whatsapp"
                href={waLink("Hola, me interesa por saber más sobre vuestros coches.")}
              >
                <IconWhatsApp className="h-5 w-5" />
                Escríbenos por WhatsApp
              </Button>
              <Button variant="secondary" href={`tel:${SITE.phoneTel}`}>
                Llamar al {SITE.phoneDisplay}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
