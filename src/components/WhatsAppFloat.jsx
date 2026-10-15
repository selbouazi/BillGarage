import { IconWhatsApp } from "@/components/Icons.jsx";
import { waLink } from "@/lib/whatsapp.js";

/**
 * Botón flotante de WhatsApp — visible en todas las pantallas.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={waLink("Hola, me interesa por saber más sobre vuestros coches.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a Bill Garage por WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-black shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-200 hover:scale-110 hover:bg-whatsapp-hover focus-visible:scale-110 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/30" aria-hidden="true" />
      <IconWhatsApp className="relative h-7 w-7" />
    </a>
  );
}
