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
  },
  {
    name: "TikTok",
    handle: SITE.tiktokHandle,
    href: SITE.tiktok,
    Icon: IconTikTok,
    // TODO: confirmar URL exacta del perfil con el cliente
  },
  {
    name: "Wallapop",
    handle: SITE.wallapopHandle,
    href: SITE.wallapop,
    Icon: IconTag,
    // Dato real del cliente
  },
];

/** Bloque de redes sociales (Bloque 7). Las3 tarjetas siempre en fila. */
export default function Social() {
  return (
    <section aria-label="Redes sociales" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Redes" title="Síguenos" align="center" italic />
        </Reveal>

        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-3 sm:gap-6">
          {NETWORKS.map(({ name, handle, href, Icon }, i) => (
            <Reveal key={name} delay={i * 90}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-hover group flex h-full flex-col items-center rounded-card border border-border bg-surface p-4 text-center sm:items-start sm:p-6 sm:text-left"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-card border border-border bg-surface-2 text-text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent-soft sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <h3 className="mt-3 text-sm sm:mt-4 sm:text-2xl">{name}</h3>
                <p className="mt-1 break-words text-xs font-medium text-accent-soft sm:text-sm">
                  {handle}
                </p>
                <span className="mt-3 text-xs font-semibold text-text-muted transition-colors group-hover:text-text sm:mt-4 sm:text-sm">
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
