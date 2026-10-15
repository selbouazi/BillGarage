/**
 * Lógica y estilos compartidos de los formularios (sin backend).
 */

export const LABEL_CLS = "mb-1.5 block text-sm font-medium text-text";
export const INPUT_CLS =
  "w-full rounded-card border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text " +
  "placeholder:text-text-muted/70 transition-colors duration-200 " +
  "focus:border-accent focus:outline-none aria-[invalid=true]:border-danger";
export const ERROR_CLS = "mt-1.5 text-sm text-danger";

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Teléfono español: 9 dígitos, con o sin espacios, prefijo opcional. */
export function isPhone(value) {
  const digits = value.replace(/[\s.-]/g, "").replace(/^\+34/, "");
  return /^9\d{8}$|^\d{9}$/.test(digits);
}

/**
 * Valida el formulario de tasación (Bloque 5).
 * @returns {Object} errores por campo (objeto vacío si todo es válido)
 */
export function validateTradeIn(v) {
  const e = {};
  if (!v.nombre.trim()) e.nombre = "Indica tu nombre.";
  if (!v.telefono.trim()) e.telefono = "Indica tu teléfono.";
  else if (!isPhone(v.telefono)) e.telefono = "Introduce un teléfono válido (9 dígitos).";
  if (!v.marca.trim()) e.marca = "Indica la marca.";
  if (!v.modelo.trim()) e.modelo = "Indica el modelo.";
  const year = Number(v.año);
  const thisYear = new Date().getFullYear();
  if (!v.año) e.año = "Indica el año.";
  else if (!Number.isInteger(year) || year < 1950 || year > thisYear + 1)
    e.año = `Introduce un año entre 1950 y ${thisYear + 1}.`;
  if (!v.km) e.km = "Indica los kilómetros.";
  else if (Number(v.km) < 0 || Number.isNaN(Number(v.km))) e.km = "Kilometraje no válido.";
  if (!v.combustible) e.combustible = "Selecciona el combustible.";
  if (!v.privacidad) e.privacidad = "Debes aceptar la política de privacidad.";
  return e;
}

/** Valida el formulario de contacto (Bloque 7). */
export function validateContact(v) {
  const e = {};
  if (!v.nombre.trim()) e.nombre = "Indica tu nombre.";
  if (!v.contacto.trim()) e.contacto = "Indica tu email o teléfono.";
  else if (!isEmail(v.contacto) && !isPhone(v.contacto))
    e.contacto = "Introduce un email o un teléfono válidos.";
  if (!v.mensaje.trim()) e.mensaje = "Escribe un mensaje.";
  else if (v.mensaje.trim().length < 10) e.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  return e;
}

/**
 * Envío simulado (sin backend).
 * TODO: sustituir por el servicio real — p. ej.:
 *   - Netlify Forms (agregar atributos data-netlify al <form>)
 *   - Web3Forms (POST a https://api.webforms.io/... con access key)
 *   - Formspree (POST a https://formspree.io/f/XXXX)
 * Mientras tanto, resuelve tras un breve delay para mostrar estados de carga.
 */
export function simulateSubmit({ delay = 900, forceError = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceError) reject(new Error("Error simulado"));
      else resolve({ ok: true });
    }, delay);
  });
}
