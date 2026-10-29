import { Link } from "react-router-dom";
import Button from "@/components/Button.jsx";
import Badge from "@/components/Badge.jsx";
import {
  IconCalendar,
  IconGauge,
  IconFuel,
  IconGear,
  IconTag,
  IconWhatsApp,
} from "@/components/Icons.jsx";
import { waLink, carInquiryMessage } from "@/lib/whatsapp.js";

const SPECS = [
  { key: "año", Icon: IconCalendar, format: (c) => c.año },
  { key: "km", Icon: IconGauge, format: (c) => `${c.km.toLocaleString("es-ES")} km` },
  { key: "combustible", Icon: IconFuel, format: (c) => c.combustible },
  { key: "cambio", Icon: IconGear, format: (c) => c.cambio },
  { key: "cv", Icon: IconTag, format: (c) => `${c.cv} CV` },
];

/**
 * Tarjeta de coche para el listado.
 * Estado "reservado": atenúa y bloquea el botón principal de contacto.
 */
export default function CarCard({ car }) {
  const reservado = car.estado === "reservado";
  const titulo = `${car.marca} ${car.modelo} ${car.año}`;

  return (
    <article className="glow-hover group relative flex flex-col overflow-hidden rounded-card border border-border bg-surface">
      {/* Foto */}
      {/* Foto (las fotos del cliente son verticales 640×853: el recorte va
          desplazado hacia abajo para que el coche quede centrado en el 4:3) */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={car.fotos[0]}
          alt={`${titulo} — fotografía 1`}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-[center_57%] transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {car.destacado && <Badge tone="accent">Destacado</Badge>}
          {car.nuevo && <Badge tone="accent">Nuevo</Badge>}
          {reservado && <Badge tone="reservado">Reservado</Badge>}
        </div>
        <span className="absolute bottom-3 right-3 rounded-pill border border-border bg-bg/85 px-3.5 py-1 font-display text-2xl font-bold tracking-wide backdrop-blur-sm sm:text-3xl">
          {car.precio.toLocaleString("es-ES")} €
        </span>
      </div>

      {/* Datos */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl leading-tight">
          <Link
            to={`/coches/${car.id}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent-soft"
          >
            {car.marca} {car.modelo}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-text-muted">{car.version}</p>

        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-text-muted">
          {SPECS.map(({ key, Icon, format }) => (
            <li key={key} className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-accent-soft/80" />
              {format(car)}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
          <Button as={Link} to={`/coches/${car.id}`} variant="secondary" size="sm" className="flex-1">
            Ver detalles
          </Button>

          {reservado ? (
            <span
              className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-card border border-border bg-surface-2 px-3.5 py-2 text-sm font-semibold text-text-muted opacity-50"
              title="Coche reservado: contacta con nosotros para saber más"
            >
              <IconWhatsApp className="h-4 w-4" />
              Reservado
            </span>
          ) : (
            <Button
              variant="whatsapp"
              size="sm"
              className="flex-1"
              href={waLink(carInquiryMessage(car))}
            >
              <IconWhatsApp className="h-4 w-4" />
              WhatsApp
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
