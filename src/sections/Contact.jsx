import { useState } from "react";
import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import Reveal from "@/components/Reveal.jsx";
import Button from "@/components/Button.jsx";
import Field, { fieldAria } from "@/components/Field.jsx";
import { IconWhatsApp, IconPhone, IconCheck, IconChat } from "@/components/Icons.jsx";
import { INPUT_CLS, validateContact, simulateSubmit } from "@/lib/forms.js";
import { waLink } from "@/lib/whatsapp.js";
import { SITE } from "@/lib/site.js";

const INITIAL = { nombre: "", contacto: "", mensaje: "" };

/** Formulario de contacto + vías directas (Bloque 7). */
export default function Contact() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`ct-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      // TODO: conectar aquí el mismo servicio que el formulario de tasación
      // (Web3Forms / Formspree / Netlify Forms — ver src/lib/forms.js)
      await simulateSubmit();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const waHref = waLink(
    `Hola, soy ${values.nombre || ""}. ${values.mensaje || ""}`.trim()
  );

  return (
    <section id="contacto" className="scroll-mt-24 border-t border-border py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Contacto" title="Hablemos" italic />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Vías directas */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <a
                href={waLink("Hola, me interesa por saber más sobre vuestros coches.")}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-hover group flex items-start gap-4 rounded-card border border-border bg-surface p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-whatsapp/15 text-whatsapp">
                  <IconWhatsApp className="h-6 w-6" />
                </span>
                <span>
                  <strong className="block font-semibold transition-colors group-hover:text-whatsapp">
                    WhatsApp
                  </strong>
                  <span className="text-sm text-text-muted">
                    Respuesta rápida al {SITE.phoneDisplay}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${SITE.phoneTel}`}
                className="glow-hover group flex items-start gap-4 rounded-card border border-border bg-surface p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-accent/30 bg-accent/10 text-accent-soft">
                  <IconPhone className="h-6 w-6" />
                </span>
                <span>
                  <strong className="block font-semibold transition-colors group-hover:text-accent-soft">
                    Llámanos
                  </strong>
                  <span className="text-sm text-text-muted">{SITE.phoneDisplay}</span>
                </span>
              </a>

              <div className="flex items-start gap-4 rounded-card border border-border bg-surface p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-border bg-surface-2 text-text-muted">
                  <IconChat className="h-6 w-6" />
                </span>
                <span>
                  <strong className="block font-semibold">En persona</strong>
                  <span className="text-sm text-text-muted">
                    {SITE.address}
                    {/* TODO: horario y dirección exacta */}
                    <br />
                    Horario: {SITE.schedule || "por confirmar"}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={90}>
            {status === "success" ? (
              <div className="flex h-full flex-col items-start justify-center rounded-card border border-border bg-surface p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp">
                  <IconCheck className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-3xl">Mensaje enviado</h3>
                <p className="mt-3 text-text-muted">
                  Gracias, {values.nombre}. Te responderemos lo antes posible.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button variant="whatsapp" href={waHref}>
                    <IconWhatsApp className="h-5 w-5" />
                    Continuar por WhatsApp
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setValues(INITIAL);
                      setStatus("idle");
                    }}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-card border border-border bg-surface p-6 sm:p-8"
              >
                <div className="grid gap-5">
                  <Field id="ct-nombre" label="Nombre" required error={errors.nombre}>
                    <input
                      id="ct-nombre"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      value={values.nombre}
                      onChange={update("nombre")}
                      className={INPUT_CLS}
                      {...fieldAria("ct-nombre", errors.nombre)}
                    />
                  </Field>

                  <Field
                    id="ct-contacto"
                    label="Email o teléfono"
                    required
                    error={errors.contacto}
                    hint="Para poder responderte"
                  >
                    <input
                      id="ct-contacto"
                      type="text"
                      autoComplete="email"
                      placeholder="tu@email.com o 600 000 000"
                      value={values.contacto}
                      onChange={update("contacto")}
                      className={INPUT_CLS}
                      {...fieldAria("ct-contacto", errors.contacto)}
                    />
                  </Field>

                  <Field id="ct-mensaje" label="Mensaje" required error={errors.mensaje}>
                    <textarea
                      id="ct-mensaje"
                      rows={5}
                      placeholder="¿En qué podemos ayudarte?"
                      value={values.mensaje}
                      onChange={update("mensaje")}
                      className={INPUT_CLS}
                      {...fieldAria("ct-mensaje", errors.mensaje)}
                    />
                  </Field>
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="mt-5 rounded-card border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
                  >
                    No hemos podido enviar el mensaje. Inténtalo de nuevo o
                    escríbenos por WhatsApp.
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" size="lg" disabled={status === "loading"}>
                    {status === "loading" ? "Enviando…" : "Enviar mensaje"}
                  </Button>
                  <Button variant="whatsapp" size="lg" href={waHref}>
                    <IconWhatsApp className="h-5 w-5" />
                    Por WhatsApp
                  </Button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
