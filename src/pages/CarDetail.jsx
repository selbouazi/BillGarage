import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "@/components/Container.jsx";
import Button from "@/components/Button.jsx";
import Badge from "@/components/Badge.jsx";
import CarCard from "@/components/CarCard.jsx";
import Reveal from "@/components/Reveal.jsx";
import {
  IconWhatsApp,
  IconPhone,
  IconTag,
  IconChevronLeft,
  IconChevronRight,
} from "@/components/Icons.jsx";
import { getCarById, getAvailableCars } from "@/data/cars.js";
import { waLink, carInquiryMessage, PHONE_DISPLAY, PHONE_TEL } from "@/lib/whatsapp.js";
import { useSeo } from "@/lib/seo.js";
import { SITE } from "@/lib/site.js";
import NotFound from "./NotFound.jsx";

const STATE_LABEL = {
  disponible: { tone: "accent", text: "Disponible" },
  reservado: { tone: "reservado", text: "Reservado" },
  vendido: { tone: "vendido", text: "Vendido" },
};

/** Ficha técnica — pares etiqueta/valor. */
function specsOf(car) {
  return [
    ["Marca", car.marca],
    ["Modelo", car.modelo],
    ["Versión", car.version],
    ["Año", car.año],
    ["Kilómetros", `${car.km.toLocaleString("es-ES")} km`],
    ["Combustible", car.combustible],
    ["Cambio", car.cambio],
    ["Potencia", `${car.cv} CV`],
    ["Cilindrada", `${car.cc} cm³`],
    ["Carrocería", car.carroceria],
    ["Puertas", car.puertas],
    ["Plazas", car.plazas],
    ["Color", car.color],
    ["Etiqueta ambiental", car.etiqueta],
    ...(car.propietarios ? [["Propietarios", car.propietarios]] : []),
    ...(car.itvHasta ? [["ITV hasta", car.itvHasta]] : []),
    // TODO: garantiaMeses → mostrar solo cuando el cliente confirme la garantía
  ];
}

/** Ficha completa del coche: galería, técnica, descripción y relacionados. */
export default function CarDetail() {
  const { id } = useParams();
  const car = getCarById(id);
  const [index, setIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const touchX = useRef(null);

  const jsonLd = car
    ? {
        "@context": "https://schema.org",
        "@type": "Vehicle",
        name: `${car.marca} ${car.modelo} ${car.version} ${car.año}`,
        brand: { "@type": "Brand", name: car.marca },
        model: car.modelo,
        vehicleModelDate: String(car.año),
        mileageFromOdometer: { "@type": "QuantitativeValue", value: car.km, unitCode: "KMT" },
        fuelType: car.combustible,
        vehicleTransmission: car.cambio,
        vehicleEngine: { "@type": "EngineSpecification", enginePower: { "@type": "QuantitativeValue", value: car.cv, unitCode: "N12" } },
        image: car.fotos.map((f) => SITE.url + f),
        url: `${SITE.url}/coches/${car.id}`,
        offers: {
          "@type": "Offer",
          price: car.precio,
          priceCurrency: "EUR",
          // TODO: dominio real (SITE.url)
          url: `${SITE.url}/coches/${car.id}`,
          availability:
            car.estado === "disponible"
              ? "https://schema.org/InStock"
              : "https://schema.org/PreOrder",
        },
      }
    : null;

  useSeo({
    title: car
      ? `${car.marca} ${car.modelo} ${car.año} — ${car.precio.toLocaleString("es-ES")} € | Bill Garage`
      : "Coche no encontrado — Bill Garage",
    description: car
      ? `${car.marca} ${car.modelo} ${car.version}, ${car.año}, ${car.km.toLocaleString("es-ES")} km, ${car.combustible}. ${car.precio.toLocaleString("es-ES")} € en Bill Garage, ${SITE.city}.`
      : "El coche que buscas no está disponible.",
    type: "article",
    jsonLd,
  });

  // Reinicia la galería al cambiar de coche
  useEffect(() => {
    setIndex(0);
    setImgFailed(false);
  }, [id]);

  if (!car) return <NotFound />;

  const reservado = car.estado === "reservado";
  const estado = STATE_LABEL[car.estado] ?? STATE_LABEL.disponible;
  const fotos = car.fotos;
  const go = (dir) => setIndex((i) => (i + dir + fotos.length) % fotos.length);

  // "Otros coches": primero los de precio parecido
  const relacionados = getAvailableCars()
    .filter((c) => c.id !== car.id)
    .sort((a, b) => Math.abs(a.precio - car.precio) - Math.abs(b.precio - car.precio))
    .slice(0, 3);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 45) go(delta > 0 ? -1 : 1);
    touchX.current = null;
  };

  return (
    <main id="main" className="pb-10 pt-24 sm:pt-28">
      <Container>
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-6 text-sm text-text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="transition-colors hover:text-text">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/#coches" className="transition-colors hover:text-text">
                Coches
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text">
              {car.marca} {car.modelo} {car.año}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Izquierda: galería + descripción */}
          <div>
            <Reveal>
              <figure
                className="overflow-hidden rounded-card border border-border bg-surface-2"
                tabIndex={0}
                onKeyDown={onKeyDown}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                aria-label={`Galería de ${car.marca} ${car.modelo}. Usa las flechas del teclado para cambiar de foto.`}
              >
                <div className="relative aspect-[4/3] bg-bg">
                  {imgFailed ? (
                    <div className="flex h-full items-center justify-center text-sm text-text-muted">
                      {/* TODO: sustituir por fotos reales del coche */}
                      Foto no disponible
                    </div>
                  ) : (
                    <img
                      src={fotos[index]}
                      alt={`${car.marca} ${car.modelo} ${car.año} — fotografía ${index + 1} de ${fotos.length}`}
                      width={1200}
                      height={900}
                      onError={() => setImgFailed(true)}
                      className="h-full w-full object-cover object-[center_57%]"
                    />
                  )}

                  {fotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Foto anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-bg/80 p-2.5 text-text backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent-soft"
                      >
                        <IconChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Foto siguiente"
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-bg/80 p-2.5 text-text backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent-soft"
                      >
                        <IconChevronRight className="h-5 w-5" />
                      </button>
                      <span className="absolute bottom-3 left-3 rounded-pill border border-border bg-bg/80 px-3 py-1 text-xs text-text-muted backdrop-blur-sm">
                        {index + 1} / {fotos.length}
                      </span>
                    </>
                  )}
                </div>

                {fotos.length > 1 && (
                  <figcaption className="flex gap-2 border-t border-border p-3">
                    {fotos.map((foto, i) => (
                      <button
                        key={foto}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Ver fotografía ${i + 1}`}
                        aria-current={i === index}
                        className={`h-16 w-20 shrink-0 overflow-hidden rounded-card border transition-all sm:h-20 sm:w-24 ${
                          i === index
                            ? "border-accent opacity-100"
                            : "border-border opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={foto}
                          alt=""
                          width={1200}
                          height={900}
                          loading="lazy"
                          className="h-full w-full object-cover object-[center_57%]"
                        />
                      </button>
                    ))}
                  </figcaption>
                )}
              </figure>
            </Reveal>

            {/* Descripción */}
            <Reveal delay={60}>
              <section className="mt-8" aria-labelledby="desc-title">
                <h2 id="desc-title" className="text-3xl">
                  Descripción
                </h2>
                <span aria-hidden="true" className="mt-3 block h-0.5 w-14 bg-accent" />
                <p className="mt-4 leading-relaxed text-text-muted">{car.descripcion}</p>
              </section>
            </Reveal>

            {/* Ficha técnica */}
            <Reveal delay={90}>
              <section className="mt-10" aria-labelledby="ficha-title">
                <h2 id="ficha-title" className="text-3xl">
                  Ficha técnica
                </h2>
                <span aria-hidden="true" className="mt-3 block h-0.5 w-14 bg-accent" />
                <dl className="mt-5 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
                  {specsOf(car).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 bg-surface px-4 py-3 text-sm"
                    >
                      <dt className="text-text-muted">{label}</dt>
                      <dd className="font-semibold">
                        {label === "Etiqueta ambiental" ? (
                          <Badge tone="neutral">{value}</Badge>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>

            {/* Equipamiento */}
            {car.equipamiento?.length > 0 && (
              <Reveal delay={120}>
                <section className="mt-10" aria-labelledby="equip-title">
                  <h2 id="equip-title" className="text-3xl">
                    Equipamiento
                  </h2>
                  <span aria-hidden="true" className="mt-3 block h-0.5 w-14 bg-accent" />
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {car.equipamiento.map((item) => (
                      <li
                        key={item}
                        className="rounded-pill border border-border bg-surface-2 px-4 py-1.5 text-sm text-text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}
          </div>

          {/* Derecha: panel de compra (sticky) */}
          <div>
            <Reveal delay={60}>
              <aside className="rounded-card border border-border bg-surface p-6 lg:sticky lg:top-28">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={estado.tone}>{estado.text}</Badge>
                  {car.destacado && <Badge tone="accent">Destacado</Badge>}
                </div>

                <h1 className="mt-3 text-4xl sm:text-5xl">
                  {car.marca} {car.modelo}
                </h1>
                <p className="mt-1 text-text-muted">
                  {car.version} · {car.año}
                </p>

                <p className="mt-5 font-display text-5xl leading-none text-accent-soft sm:text-6xl">
                  {car.precio.toLocaleString("es-ES")} €
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  {reservado ? (
                    <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-card border border-border bg-surface-2 px-5 py-3 font-semibold text-text-muted opacity-50">
                      <IconWhatsApp className="h-5 w-5" />
                      Coche reservado
                    </span>
                  ) : (
                    <Button
                      variant="whatsapp"
                      size="lg"
                      href={waLink(carInquiryMessage(car))}
                    >
                      <IconWhatsApp className="h-5 w-5" />
                      Preguntar por WhatsApp
                    </Button>
                  )}
                  <Button variant="secondary" size="lg" href={`tel:${PHONE_TEL}`}>
                    <IconPhone className="h-5 w-5" />
                    Llamar al {PHONE_DISPLAY}
                  </Button>
                  <Button size="lg" as={Link} to="/#entrega">
                    <IconTag className="h-5 w-5" />
                    Tasar mi coche
                  </Button>
                </div>

                <span
                  aria-hidden="true"
                  className="my-6 block h-px w-full bg-gradient-to-r from-accent/60 to-transparent"
                />

                <ul className="space-y-2.5 text-sm text-text-muted">
                  <li>Entrega de tu coche como parte del pago</li>
                  {/* TODO: confirmar garantía concretando meses y alcance */}
                  <li>Garantía: consultar por WhatsApp</li>
                  <li>{SITE.address}</li>
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <section className="mt-16 border-t border-border pt-12" aria-labelledby="relacionados-title">
            <h2 id="relacionados-title" className="text-3xl sm:text-4xl">
              Otros coches que te pueden interesar
            </h2>
            <span aria-hidden="true" className="mt-3 mb-8 block h-0.5 w-14 bg-accent" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
