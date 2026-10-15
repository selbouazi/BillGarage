const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-card transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const VARIANTS = {
  // Botón principal: rojo del logo
  primary:
    "bg-accent text-white hover:bg-accent-hover active:bg-accent-hover",
  // Secundario: borde sutil sobre superficie
  secondary:
    "bg-surface-2 text-text border border-border hover:border-accent/60 hover:text-accent",
  // WhatsApp: color de marca (única excepción al acento rojo)
  whatsapp:
    "bg-whatsapp text-black hover:bg-whatsapp-hover font-bold",
  // Fantasma: solo texto, para acciones discretas
  ghost:
    "bg-transparent text-text-muted hover:text-text",
};

const SIZES = {
  sm: "text-sm px-3.5 py-2",
  md: "text-sm sm:text-base px-5 py-2.5",
  lg: "text-base sm:text-lg px-6 py-3",
};

/**
 * Button — botón reutilizable.
 * @param {"primary"|"secondary"|"whatsapp"|"ghost"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {string} [href]  Si se pasa, renderiza un <a> en lugar de <button>.
 * @param {React.ElementType} [as] Elemento forzado (ej. Link de React Router).
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  as,
  className = "",
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${SIZES[size] ?? SIZES.md} ${className}`;

  if (as) {
    const Tag = as;
    return (
      <Tag className={classes} href={href} {...props}>
        {children}
      </Tag>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
