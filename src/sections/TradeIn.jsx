import { useState } from "react";
import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import Button from "@/components/Button.jsx";
import Reveal from "@/components/Reveal.jsx";
import Field, { fieldAria } from "@/components/Field.jsx";
import { IconWhatsApp, IconCheck, IconChat, IconSwap, IconTag } from "@/components/Icons.jsx";
import { INPUT_CLS, validateTradeIn, simulateSubmit } from "@/lib/forms.js";
import { waLink, valuationMessage } from "@/lib/whatsapp.js";

const STEPS = [
  {
    Icon: IconChat,
    n: "01",
    title: "Cuéntanos tu coche",
    text: "Rellena el formulario o escríbenos por WhatsApp con la marca, el modelo, el año y los kilómetros.",
  },
  {
    Icon: IconTag,
    n: "02",
    title: "Te damos una valoración",
    // TODO: confirmar plazo de respuesta y metodología de tasación.
    text: "Estudiamos tu coche y te proponemos un precio claro, sin compromiso por tu parte.",
  },
  {
    Icon: IconSwap,
    n: "03",
    title: "Entrega como parte del pago",
    // TODO: confirmar documentación necesaria y si se acepta cualquier estado del coche.
    text: "Entregas tu coche y descontamos su valor del precio del que te llevas. Un solo trámite.",
  },
];

const INITIAL = {
  nombre: "",
  telefono: "",
  marca: "",
  modelo: "",
  año: "",
  km: "",
  combustible: "",
  comentarios: "",
  privacidad: false,
};

const COMBUSTIBLES = ["Gasolina", "Diésel", "Híbrido", "Eléctrico", "GLP"];

/**
 * Sección "Entrega tu coche" — el gancho comercial (Bloque 5).
 * Formulario sin backend: envío simulado + alternativa por WhatsApp.
 */
export default function TradeIn() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const update = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validateTradeIn(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`ti-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus("loading");
    try {
      // TODO: aquí conectar el backend real del formulario
      // (Web3Forms / Formspree / Netlify Forms — ver src/lib/forms.js)
      await simulateSubmit();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const waHref = waLink(valuationMessage(values));

  if (status === "success") {
    return (
      <section id="entrega" className="scroll-mt-24 border-y border-border bg-surface py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl rounded-card border border-border bg-surface-2 p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp">
              <IconCheck className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-3xl">¡Solicitud enviada!</h2>
            <p className="mt-3 text-text-muted">
              Hemos recibido tus datos, {/* TODO: nombre/empresa real de quién contesta */}
              te contactaremos lo antes posible para valorar tu coche.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="whatsapp" href={waHref}>
                <IconWhatsApp className="h-5 w-5" />
                Enviar también por WhatsApp
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setValues(INITIAL);
                  setStatus("idle");
                }}
              >
                Enviar otra solicitud
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="entrega" className="scroll-mt-24 border-y border-border bg-surface py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Tu coche cuenta"
            title="Entrega tu coche como parte del pago"
            italic
          />
        </Reveal>

        {/* 3 pasos */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map(({ Icon, n, title, text }, i) => (
            <Reveal key={n} delay={i * 90}>
              <div className="relative h-full rounded-card border border-border bg-surface-2 p-6 glow-hover">
                <span className="absolute right-5 top-4 font-display text-4xl text-accent/25">
                  {n}
                </span>
                <Icon className="h-7 w-7 text-accent-soft" />
                <h3 className="mt-4 text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{text}</p>
                <span aria-hidden="true" className="mt-5 block h-0.5 w-12 bg-accent/70" />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Formulario */}
          <Reveal>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-card border border-border bg-surface-2 p-6 sm:p-8"
            >
              <h3 className="text-2xl">Pide tu valoración</h3>
              <p className="mt-1.5 text-sm text-text-muted">
                Rellena los datos y te respondemos con una propuesta. Campos con{" "}
                <span className="text-accent-soft">*</span> obligatorios.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field id="ti-nombre" label="Nombre" required error={errors.nombre}>
                  <input
                    id="ti-nombre"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    value={values.nombre}
                    onChange={update("nombre")}
                    className={INPUT_CLS}
                    {...fieldAria("ti-nombre", errors.nombre)}
                  />
                </Field>

                <Field id="ti-telefono" label="Teléfono" required error={errors.telefono}>
                  <input
                    id="ti-telefono"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="600 000 000"
                    value={values.telefono}
                    onChange={update("telefono")}
                    className={INPUT_CLS}
                    {...fieldAria("ti-telefono", errors.telefono)}
                  />
                </Field>

                <Field id="ti-marca" label="Marca" required error={errors.marca}>
                  <input
                    id="ti-marca"
                    type="text"
                    placeholder="Seat"
                    value={values.marca}
                    onChange={update("marca")}
                    className={INPUT_CLS}
                    {...fieldAria("ti-marca", errors.marca)}
                  />
                </Field>

                <Field id="ti-modelo" label="Modelo" required error={errors.modelo}>
                  <input
                    id="ti-modelo"
                    type="text"
                    placeholder="León"
                    value={values.modelo}
                    onChange={update("modelo")}
                    className={INPUT_CLS}
                    {...fieldAria("ti-modelo", errors.modelo)}
                  />
                </Field>

                <Field id="ti-año" label="Año" required error={errors.año}>
                  <input
                    id="ti-año"
                    type="number"
                    inputMode="numeric"
                    min="1950"
                    placeholder="2015"
                    value={values.año}
                    onChange={update("año")}
                    className={INPUT_CLS}
                    {...fieldAria("ti-año", errors.año)}
                  />
                </Field>

                <Field id="ti-km" label="Kilómetros" required error={errors.km}>
                  <input
                    id="ti-km"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    placeholder="120000"
                    value={values.km}
                    onChange={update("km")}
                    className={INPUT_CLS}
                    {...fieldAria("ti-km", errors.km)}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    id="ti-combustible"
                    label="Combustible"
                    required
                    error={errors.combustible}
                  >
                    <select
                      id="ti-combustible"
                      value={values.combustible}
                      onChange={update("combustible")}
                      className={INPUT_CLS}
                      {...fieldAria("ti-combustible", errors.combustible)}
                    >
                      <option value="">Selecciona…</option>
                      {COMBUSTIBLES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field
                    id="ti-comentarios"
                    label="Comentarios"
                    hint="Estado del coche, extras, incidencias… (opcional)"
                  >
                    <textarea
                      id="ti-comentarios"
                      rows={4}
                      value={values.comentarios}
                      onChange={update("comentarios")}
                      className={INPUT_CLS}
                      placeholder="Cuéntanos cualquier detalle que consideres importante"
                    />
                  </Field>
                </div>
              </div>

              {/* Privacidad */}
              <div className="mt-5">
                <label
                  htmlFor="ti-privacidad"
                  className="flex items-start gap-3 text-sm text-text-muted"
                >
                  <input
                    id="ti-privacidad"
                    type="checkbox"
                    checked={values.privacidad}
                    onChange={update("privacidad")}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                    {...fieldAria("ti-privacidad", errors.privacidad)}
                  />
                  <span>
                    He leído y acepto la{" "}
                    <a
                      href="/politica-privacidad"
                      className="text-accent-soft underline underline-offset-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      política de privacidad
                    </a>
                    . {/* TODO: confirmar responsable y finalidad del tratamiento */}
                  </span>
                </label>
                {errors.privacidad && (
                  <p id="ti-privacidad-error" role="alert" className="mt-1.5 text-sm text-danger">
                    {errors.privacidad}
                  </p>
                )}
              </div>

              {status === "error" && (
                <div
                  role="alert"
                  className="mt-5 rounded-card border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
                >
                  No hemos podido enviar la solicitud. Inténtalo de nuevo o
                  escríbenos directamente por WhatsApp.
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button type="submit" size="lg" disabled={status === "loading"}>
                  {status === "loading" ? "Enviando…" : "Pedir valoración"}
                </Button>
                <Button variant="whatsapp" size="lg" href={waHref}>
                  <IconWhatsApp className="h-5 w-5" />
                  Enviar por WhatsApp
                </Button>
              </div>
            </form>
          </Reveal>

          {/* Lateral */}
          <Reveal delay={90}>
            <aside className="h-full rounded-card border border-border bg-surface-2 p-6 sm:p-8">
              <h3 className="text-2xl">¿Prefieres hablar?</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Si te va más rápido, escríbenos y te contestamos con los mismos
                datos que rellenarías aquí.{" "}
                {/* TODO: horario de atención real */}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Button variant="whatsapp" href={waLink(valuationMessage(values))}>
                  <IconWhatsApp className="h-5 w-5" />
                  WhatsApp directo
                </Button>
                <Button variant="secondary" href="tel:+34612276847">
                  Llamar al 612 276 847
                </Button>
              </div>

              <span
                aria-hidden="true"
                className="my-6 block h-px w-full bg-gradient-to-r from-accent/60 to-transparent"
              />

              <ul className="space-y-3 text-sm text-text-muted">
                <li className="flex gap-2.5">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                  Sin compromiso: valorar no te obliga a vender.
                </li>
                <li className="flex gap-2.5">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                  Aceptamos tu coche como parte del pago.
                  {/* TODO: confirmar si se aceptan coches en cualquier estado */}
                </li>
                <li className="flex gap-2.5">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                  Te acompañamos en el cambio de titularidad.{" "}
                  {/* TODO: confirmar gestión de papeles */}
                </li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
