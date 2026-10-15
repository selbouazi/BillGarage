const TONES = {
  // Etiqueta genérica con acento rojo (destacado, nuevo…)
  accent: "bg-accent/15 text-accent border-accent/40",
  // Estado reservado
  reservado: "bg-reservado/15 text-reservado border-reservado/40",
  // Estado vendido (atenuado)
  vendido: "bg-white/5 text-text-muted border-border",
  // Neutro
  neutral: "bg-surface-2 text-text-muted border-border",
};

/**
 * Badge — etiqueta compacta para estados y sellos.
 * @param {"accent"|"reservado"|"vendido"|"neutral"} tone
 */
export default function Badge({ tone = "neutral", className = "", children }) {
  const toneClass = TONES[tone] ?? TONES.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
