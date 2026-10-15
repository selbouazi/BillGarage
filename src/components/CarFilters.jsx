import Button from "@/components/Button.jsx";
import { INPUT_CLS, LABEL_CLS } from "@/lib/forms.js";

const ORDERS = [
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "año-desc", label: "Año: más nuevos" },
  { value: "año-asc", label: "Año: más antiguos" },
  { value: "km-asc", label: "Kilometrajes: menores" },
];

function Select({ id, label, value, onChange, children }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLS}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLS}
      >
        {children}
      </select>
    </div>
  );
}

/**
 * Filtros del listado. Las opciones se derivan de los datos de cars.js.
 */
export default function CarFilters({ filters, setFilters, options, count, total }) {
  const set = (key) => (value) => setFilters((f) => ({ ...f, [key]: value }));

  const isDirty =
    filters.marca !== "" ||
    filters.combustible !== "" ||
    filters.cambio !== "" ||
    filters.precioMax < options.precioMax ||
    filters.añoMin > options.añoMin ||
    filters.orden !== "precio-asc";

  const reset = () =>
    setFilters({
      marca: "",
      combustible: "",
      cambio: "",
      precioMax: options.precioMax,
      añoMin: options.añoMin,
      orden: "precio-asc",
    });

  return (
    <div className="mb-8 rounded-card border border-border bg-surface p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Select id="f-marca" label="Marca" value={filters.marca} onChange={set("marca")}>
          <option value="">Todas</option>
          {options.marcas.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>

        <Select
          id="f-combustible"
          label="Combustible"
          value={filters.combustible}
          onChange={set("combustible")}
        >
          <option value="">Todos</option>
          {options.combustibles.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        <Select id="f-cambio" label="Cambio" value={filters.cambio} onChange={set("cambio")}>
          <option value="">Todos</option>
          {options.cambios.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        <Select id="f-año" label="Año mínimo" value={filters.añoMin} onChange={(v) => set("añoMin")(Number(v))}>
          {options.años.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </Select>

        <div className="col-span-2 lg:col-span-2">
          <label htmlFor="f-precio" className={LABEL_CLS}>
            Precio máximo:{" "}
            <span className="font-display text-lg text-accent-soft">
              {filters.precioMax.toLocaleString("es-ES")} €
            </span>
          </label>
          <input
            id="f-precio"
            type="range"
            min={options.precioMin}
            max={options.precioMax}
            step={50}
            value={filters.precioMax}
            onChange={(e) => set("precioMax")(Number(e.target.value))}
            className="mt-2 w-full accent-accent"
          />
          <div className="mt-1 flex justify-between text-xs text-text-muted">
            <span>{options.precioMin.toLocaleString("es-ES")} €</span>
            <span>{options.precioMax.toLocaleString("es-ES")} €</span>
          </div>
        </div>

        <Select id="f-orden" label="Ordenar por" value={filters.orden} onChange={set("orden")}>
          {ORDERS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>

        <div className="flex items-end">
          <p aria-live="polite" className="text-sm text-text-muted">
            <strong className="font-display text-2xl text-text">{count}</strong>
            <span className="ml-1.5">
              {count === 1 ? "coche" : "coches"} de {total}
            </span>
          </p>
        </div>
      </div>

      {isDirty && (
        <div className="mt-4 border-t border-border pt-4">
          <Button variant="ghost" size="sm" onClick={reset}>
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
