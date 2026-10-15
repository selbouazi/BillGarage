/**
 * Utilidades de WhatsApp — enlaces wa.me con mensaje prellenado.
 * Sin dependencias: solo construcción de URL.
 */

/** Teléfono en formato internacional sin "+" (dato real del negocio). */
export const WHATSAPP_PHONE = "34612276847";
export const PHONE_DISPLAY = "612 276 847";
export const PHONE_TEL = "+34612276847";

/**
 * Genera un enlace wa.me con el mensaje prellenado.
 * @param {string} message Mensaje (si lleva newlines se convierten en %0A)
 * @param {string} [phone] Teléfono en formato internacional
 * @returns {string} https://wa.me/34612276847?text=...
 */
export function waLink(message = "", phone = WHATSAPP_PHONE) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}${text ? `?text=${text}` : ""}`;
}

/**
 * Mensaje estándar de consulta a un coche.
 * Ej.: "Hola, me interesa el Seat León 2013"
 */
export function carInquiryMessage(car) {
  if (!car) return "Hola, me interesa por saber más sobre vuestros coches.";
  const titulo = `${car.marca} ${car.modelo} ${car.año}`.trim();
  return `Hola, me interesa el ${titulo}. ¿Sigue disponible?`;
}

/** Mensaje para la tasación de un coche usado (Bloque 5). */
export function valuationMessage({
  marca,
  modelo,
  año,
  km,
  combustible,
  comentarios,
} = {}) {
  const partes = [
    "Hola, me gustaría una valoración de mi coche:",
    marca && `Marca: ${marca}`,
    modelo && `Modelo: ${modelo}`,
    año && `Año: ${año}`,
    km && `Kilometraje: ${km}`,
    combustible && `Combustible: ${combustible}`,
    comentarios && `Comentarios: ${comentarios}`,
  ].filter(Boolean);
  return partes.join("\n");
}
