import { useMemo, useState } from "react";
import Container from "@/components/Container.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import CarCard from "@/components/CarCard.jsx";
import CarFilters from "@/components/CarFilters.jsx";
import Reveal from "@/components/Reveal.jsx";
import Button from "@/components/Button.jsx";
import { IconSearch } from "@/components/Icons.jsx";
import { getAvailableCars } from "@/data/cars.js";

const SORTERS = {
  "precio-asc": (a, b) => a.precio - b.precio,
  "precio-desc": (a, b) => b.precio - a.precio,
  "año-desc": (a, b) => b.año - a.año,
  "año-asc": (a, b) => a.año - b.año,
  "km-asc": (a, b) => a.km - b.km,
};

const unique = (arr) => [...new Set(arr)].sort((a, b) => String(a).localeCompare(String(b), "es"));

/** Sección "Nuestros coches": rejilla + filtros generados desde los datos. */
export default function Stock() {
  const available = useMemo(() => getAvailableCars(), []);

  // Opciones de los filtros derivadas de cars.js (nada escrito a mano)
  const options = useMemo(() => {
    const precios = available.map((c) => c.precio);
    const años = available.map((c) => c.año);
    return {
      marcas: unique(available.map((c) => c.marca)),
      combustibles: unique(available.map((c) => c.combustible)),
      cambios: unique(available.map((c) => c.cambio)),
      años: [...new Set(años)].sort((a, b) => b - a),
      precioMin: Math.min(...precios),
      precioMax: Math.max(...precios),
    };
  }, [available]);

  const [filters, setFilters] = useState({
    marca: "",
    combustible: "",
    cambio: "",
    precioMax: options.precioMax,
    añoMin: Math.min(...available.map((c) => c.año)),
    orden: "precio-asc",
  });

  const results = useMemo(() => {
    return available
      .filter(
        (c) =>
          (!filters.marca || c.marca === filters.marca) &&
          (!filters.combustible || c.combustible === filters.combustible) &&
          (!filters.cambio || c.cambio === filters.cambio) &&
          c.precio <= filters.precioMax &&
          c.año >= filters.añoMin
      )
      .sort(SORTERS[filters.orden]);
  }, [available, filters]);

  const resetAll = () =>
    setFilters({
      marca: "",
      combustible: "",
      cambio: "",
      precioMax: options.precioMax,
      añoMin: Math.min(...available.map((c) => c.año)),
      orden: "precio-asc",
    });

  return (
    <section id="coches" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Stock disponible"
            title="Nuestros coches"
            italic
          />
        </Reveal>

        <Reveal delay={60}>
          <CarFilters
            filters={filters}
            setFilters={setFilters}
            options={options}
            count={results.length}
            total={available.length}
          />
        </Reveal>

        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((car, i) => (
              <Reveal key={car.id} delay={(i % 3) * 70}>
                <CarCard car={car} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
            <IconSearch className="mx-auto h-10 w-10 text-accent-soft" />
            <h3 className="mt-4 text-2xl">Sin resultados</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
              Ningún coche coincide con los filtros seleccionados. Prueba a
              ampliar el precio máximo o a quitar alguna marca.
            </p>
            <div className="mt-6">
              <Button onClick={resetAll}>Limpiar filtros</Button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
