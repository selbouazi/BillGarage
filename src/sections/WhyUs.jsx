import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import Reveal from "@/components/Reveal.jsx";
import { IconChat, IconSwap, IconShield, IconDoc } from "@/components/Icons.jsx";

const REASONS = [
  {
    Icon: IconChat,
    title: "Trato directo",
    text: "Hablas con quien se ocupa de tu coche, sin intermediarios ni respuestas automáticas. Resolvemos dudas por teléfono o WhatsApp.",
  },
  {
    Icon: IconSwap,
    title: "Tu coche, parte del pago",
    text: "Entregas tu vehículo y lo valoramos para descontarlo del precio del coche que te llevas. Un solo trámite para las dos cosas.",
  },
  {
    Icon: IconShield,
    title: "Revisión y garantía",
    // TODO: confirmar con el cliente QUÉ revisión se hace y QUÉ garantía se
    // ofrece (duración y alcance) antes de concretarlo en la web.
    text: "Cada coche pasa por revisión antes de salir a la venta. Te contamos el detalle de la cobertura de cada uno.",
  },
  {
    Icon: IconDoc,
    title: "Trámites y financiación",
    // TODO: confirmar si se gestiona la transferencia/ITV y si hay
    // financiación disponible antes de publicarlo.
    text: "Te acompañamos en los papeles del cambio de titularidad y estudiamos opciones de pago a medida.",
  },
];

/** Bloque "Por qué comprar con Bill Garage" (Bloque 6). */
export default function WhyUs() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Por qué elegirnos"
            title="Comprar con Bill Garage"
            italic
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80}>
              <article className="glow-hover h-full rounded-card border border-border bg-surface p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-card border border-accent/30 bg-accent/10 text-accent-soft">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
