/**
 * Stock de coches — Bill Garage
 * ----------------------------------------------------------------------------
 * Fuente única de datos del inventario. Fácil de sustituir más adelante por
 * Google Sheets / Sanity / Supabase: basta con exportar el mismo array
 * desde un módulo asíncrono (ver TODO al final del archivo).
 *
 * REGLA: marca, modelo, año, precio y estado son datos REALES (los 6 coches
 * anunciados). Todo lo marcado con `// EJEMPLO` es dato de relleno pendiente
 * de confirmar con el cliente antes de publicar.
 * No se incluye matrícula por privacidad.
 */
export const cars = [
  {
    id: "citroen-c4-picasso-2007",
    marca: "Citroën",
    modelo: "C4 Picasso",
    version: "2.0 HDi 136cv Exclusive", // EJEMPLO
    año: 2007,
    km: 198000, // EJEMPLO
    combustible: "Diésel",
    cambio: "Manual", // EJEMPLO
    cv: 136, // EJEMPLO
    cc: 1997, // EJEMPLO
    carroceria: "Monovolumen", // EJEMPLO
    puertas: 5,
    plazas: 7, // EJEMPLO
    color: "Gris", // EJEMPLO
    etiqueta: "C", // EJEMPLO
    garantiaMeses: 12, // TODO confirmar con el cliente
    itvHasta: "2026-09", // EJEMPLO // opcional
    propietarios: 2, // EJEMPLO // opcional
    precio: 2600,
    estado: "disponible",
    destacado: false,
    // TODO: añadir más ángulos del coche (interior, atrás) cuando el cliente los facilite.
    fotos: ["/coches/citroen-c4-picasso-2007/1.webp"],
    equipamiento: ["Aire acondicionado", "Bluetooth", "Sensor de aparcamiento"], // EJEMPLO
    descripcion:
      "Monovolumen de 7 plazas, ideal para familia. Reparaciones al día y listo para circular.", // EJEMPLO
  },
  {
    id: "seat-leon-2013",
    marca: "Seat",
    modelo: "León",
    version: "1.6 TDI 105cv Reference", // EJEMPLO
    año: 2013,
    km: 156000, // EJEMPLO
    combustible: "Diésel",
    cambio: "Manual", // EJEMPLO
    cv: 105, // EJEMPLO
    cc: 1598, // EJEMPLO
    carroceria: "Compacto",
    puertas: 5,
    plazas: 5,
    color: "Negro", // EJEMPLO
    etiqueta: "B", // EJEMPLO
    garantiaMeses: 12, // TODO confirmar con el cliente
    itvHasta: "2027-01", // EJEMPLO // opcional
    propietarios: 1, // EJEMPLO // opcional
    precio: 5900,
    estado: "reservado",
    destacado: true,
    // TODO: añadir más ángulos del coche (interior, atrás) cuando el cliente los facilite.
    fotos: ["/coches/seat-leon-2013/1.webp"],
    equipamiento: ["Aire acondicionado", "Bluetooth", "Control de crucero"], // EJEMPLO
    descripcion:
      "Compacto robusto y económico de mantener. Momentáneamente reservado.", // EJEMPLO
  },
  {
    id: "volkswagen-golf-rline-2011",
    marca: "Volkswagen",
    modelo: "Golf",
    version: "R-Line 1.6 TDI 105cv", // EJEMPLO
    año: 2011,
    km: 172000, // EJEMPLO
    combustible: "Diésel",
    cambio: "Manual", // EJEMPLO
    cv: 105, // EJEMPLO
    cc: 1598, // EJEMPLO
    carroceria: "Compacto",
    puertas: 5,
    plazas: 5,
    color: "Azul", // EJEMPLO
    etiqueta: "B", // EJEMPLO
    garantiaMeses: 12, // TODO confirmar con el cliente
    itvHasta: "2026-11", // EJEMPLO // opcional
    propietarios: 2, // EJEMPLO // opcional
    precio: 5900,
    estado: "disponible",
    destacado: true,
    // TODO: añadir más ángulos del coche (interior, atrás) cuando el cliente los facilite.
    fotos: ["/coches/volkswagen-golf-rline-2011/1.webp"],
    equipamiento: ["Aire acondicionado climatizado", "Pantalla táctil", "Llantas de aleación"], // EJEMPLO
    descripcion:
      "Golf R-Line con equipamiento completo y buen estado de mantenimiento.", // EJEMPLO
  },
  {
    id: "seat-ibiza-2011",
    marca: "Seat",
    modelo: "Ibiza",
    version: "1.4 TDI 80cv",
    año: 2011,
    km: 148000, // EJEMPLO
    combustible: "Diésel",
    cambio: "Manual",
    cv: 80,
    cc: 1422,
    carroceria: "Utilitario",
    puertas: 5,
    plazas: 5,
    color: "Blanco", // EJEMPLO
    etiqueta: "B",
    garantiaMeses: 12, // TODO confirmar con el cliente
    itvHasta: "2027-03", // EJEMPLO // opcional
    propietarios: 2, // EJEMPLO // opcional
    precio: 3500,
    estado: "disponible",
    destacado: false,
    // TODO: añadir más ángulos del coche (interior, atrás) cuando el cliente los facilite.
    fotos: ["/coches/seat-ibiza-2011/1.webp"],
    equipamiento: ["Aire acondicionado", "Bluetooth"], // EJEMPLO
    descripcion:
      "Utilitario económico, ideal para ciudad. Consumo muy contenido.", // EJEMPLO
  },
  {
    id: "peugeot-208-2013",
    marca: "Peugeot",
    modelo: "208",
    version: "1.6 HDi 92cv Active", // EJEMPLO
    año: 2013,
    km: 134000, // EJEMPLO
    combustible: "Diésel",
    cambio: "Manual", // EJEMPLO
    cv: 92, // EJEMPLO
    cc: 1560, // EJEMPLO
    carroceria: "Utilitario",
    puertas: 5,
    plazas: 5,
    color: "Gris", // EJEMPLO
    etiqueta: "B", // EJEMPLO
    garantiaMeses: 12, // TODO confirmar con el cliente
    itvHasta: "2026-12", // EJEMPLO // opcional
    propietarios: 1, // EJEMPLO // opcional
    precio: 4900,
    estado: "disponible",
    destacado: false,
    // TODO: añadir más ángulos del coche (interior, atrás) cuando el cliente los facilite.
    fotos: ["/coches/peugeot-208-2013/1.webp"],
    equipamiento: ["Aire acondicionado", "Bluetooth", "Pantalla táctil"], // EJEMPLO
    descripcion:
      "Pequeña, ágil y muy eficiente. Perfecta para trayectos urbanos.", // EJEMPLO
  },
  {
    id: "opel-corsa-2012",
    marca: "Opel",
    modelo: "Corsa",
    version: "1.2 16v 85cv Cosmo", // EJEMPLO
    año: 2012,
    km: 118000, // EJEMPLO
    combustible: "Gasolina",
    cambio: "Manual", // EJEMPLO
    cv: 85, // EJEMPLO
    cc: 1229, // EJEMPLO
    carroceria: "Utilitario",
    puertas: 5,
    plazas: 5,
    color: "Rojo", // EJEMPLO
    etiqueta: "C", // EJEMPLO
    garantiaMeses: 12, // TODO confirmar con el cliente
    itvHasta: "2027-05", // EJEMPLO // opcional
    propietarios: 2, // EJEMPLO // opcional
    precio: 2950,
    estado: "disponible",
    destacado: false,
    // TODO: añadir más ángulos del coche (interior, atrás) cuando el cliente los facilite.
    fotos: ["/coches/opel-corsa-2012/1.webp"],
    equipamiento: ["Aire acondicionado", "Elevalunas eléctrico"], // EJEMPLO
    descripcion:
      "Corsa gasolina, sencilla y fiable, con poco mantenimiento.", // EJEMPLO
  },
];

/** Devuelve un coche por su slug. */
export function getCarById(id) {
  return cars.find((car) => car.id === id);
}

/** Coches visibles en el listado (los vendidos no se muestran). */
export function getAvailableCars() {
  return cars.filter((car) => car.estado !== "vendido");
}

// TODO: cuando haya backend, sustituir por:
//   export async function fetchCars() { ... }  → p. ej. Google Sheets / Supabase
// Manteniendo el MISMO shape de objeto para no tocar los componentes.
export default cars;
