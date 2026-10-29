import { WHATSAPP_PHONE, PHONE_DISPLAY, PHONE_TEL } from "./whatsapp.js";

/**
 * Datos del negocio — único punto de verdad.
 * Todo lo que el cliente pueda cambiar (horario, dirección, redes…) vive aquí.
 */
export const SITE = {
  name: "Bill Garage",
  tagline: "Compra y venta de coches",
  // TODO: dominio real de la web (usado en canonical, Open Graph y sitemap)
  url: "https://billgarage.example",
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  whatsappPhone: WHATSAPP_PHONE,

  // Ubicación (dato real: zona conocida, dirección exacta pendiente)
  city: "El Vendrell",
  province: "Tarragona",
  zone: "Zona La Papiola",
  // TODO: dirección completa (calle y número) — pendiente de confirmar
  address: "La Papiola, El Vendrell (Tarragona)",
  addressFull: "", // TODO: "Calle …, 00, 43700 El Vendrell, Tarragona"
  // TODO: horario real — pendiente de confirmar
  schedule: "", // Ej.: "Lun–Vie 9:00–14:00 y 16:00–19:00 · Sáb 10:00–14:00"

  // Redes — TODO: confirmar URLs exactas de Instagram y TikTok
  instagram: "https://www.instagram.com/bill.garage_/",
  instagramHandle: "@bill.garage_",
  tiktok: "https://www.tiktok.com/@bill.garage_",
  tiktokHandle: "@bill.garage_",
  // Dato real facilitado por el cliente (perfil Wallapop "Bill G.")
  // TODO(TEMPORAL): perfil de PRUEBA del propietario del repositorio.
  // Antes de publicar, volver al perfil del cliente: erwanj-46555843 ("Bill G.")
  // y regenerar con `npm run sync:wallapop`.
  wallapop: "https://es.wallapop.com/user/soulaimanee-434683562",
  wallapopHandle: "Soulaimanee",

  // Reputación (datos reales del negocio)
  rating: 4.9,
  reviewCount: 67,
  salesCount: 70,

  // Mapa — TODO: sustituir coordenadas/consulta por la dirección exacta
  mapEmbed:
    "https://maps.google.com/maps?q=La%20Papiola%2C%20El%20Vendrell%2C%20Tarragona&t=&z=15&ie=UTF8&iwloc=&output=embed",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=La%20Papiola%2C%20El%20Vendrell%2C%20Tarragona",
};

/** Navegación de la cabecera (anclas sobre la home). */
export const NAV_LINKS = [
  { href: "#coches", label: "Coches" },
  { href: "#entrega", label: "Entrega tu coche" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];
