import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import Reveal from "@/components/Reveal.jsx";
import { IconInstagram, IconTikTok, IconTag } from "@/components/Icons.jsx";
import { SITE } from "@/lib/site.js";

const NETWORKS = [
  {
    name: "Instagram",
    handle: SITE.instagramHandle,
    href: SITE.instagram,
    Icon: IconInstagram,
    // TODO: confirmar URL exacta del perfil con el cliente
    text: "Novedades, coches recién llegados y ventas cerradas.",
  },
  {
    name: "TikTok",
    handle: SITE.tiktokHandle,
    href: SITE.tiktok,
    Icon: IconTikTok,
    // TODO: confirmar URL exacta del perfil con el cliente
    text: "Recorridos rápidos por los coches del stock.",
  },
  {
    name: "Wallapop",
    handle: SITE.wallapopHandle,
    href: SITE.wallapop,
    Icon: IconTag,
    // Dato real del cliente
    text: "Todo nuestro stock publicado y las valoraciones de los clientes.",
  },
];

/** Bloque de redes sociales (Bloque 7). */
export default function Social() {
  return (
    <section aria-label="Redes sociales" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Redes" title="Síguenos" align="center" italic />
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {NETWORKS.map(({ name, handle, href, Icon, text }, i) => (
            <Reveal key={name} delay={i * 90}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-hover group flex h-full flex-col items-start rounded-card border border-border bg-surface p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-card border border-border bg-surface-2 text-text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent-soft">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-2xl">{name}</h3>
                <p className="mt-1 font-medium text-accent-soft">{handle}</p>
                <p className="mt-2 text-sm text-text-muted">{text}</p>
                <span className="mt-4 text-sm font-semibold text-text-muted transition-colors group-hover:text-text">
                  Abrir perfil →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
