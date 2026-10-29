/**
 * Stock de coches — Bill Garage
 * ----------------------------------------------------------------------------
 * Este fichero YA NO se edita a mano: es el adaptador del inventario
 * sincronizado desde el perfil público de Wallapop del cliente.
 *
 *   src/data/cars.generated.json  → lo escribe scripts/sync-wallapop.mjs
 *                                   (Action: .github/workflows/sync-wallapop.yml)
 *   src/data/cars.overrides.json  → ajustes MANUALES por id de Wallapop, para
 *                                   campos que Wallapop no recoge (p. ej.
 *                                   marcar "vendido" a mano). Se superponen
 *                                   sobre lo generado. Borrar un coche de
 *                                   Wallapop lo elimina de la web igualmente.
 *
 * Para cambiar coches: se cambia en Wallapop, no aquí. Los componentes solo
 * importan `cars`, `getCarById` y `getAvailableCars` — mismas firmas de siempre.
 * Los datos NO inventados del cliente (matrículas) siguen sin incluirse.
 */
import generated from "./cars.generated.json";
import overrides from "./cars.overrides.json";

const overridesById = new Map(overrides.map((o) => [o.id, o]));

/** Inventario: datos sincronizados + ajustes manuales encima. */
export const cars = generated.cars.map((car) => ({
  ...car,
  ...(overridesById.get(car.id) ?? {}),
}));

/** Devuelve un coche por su slug. */
export function getCarById(id) {
  return cars.find((car) => car.id === id);
}

/** Coches visibles en el listado (los vendidos no se muestran). */
export function getAvailableCars() {
  return cars.filter((car) => car.estado !== "vendido");
}

export default cars;
