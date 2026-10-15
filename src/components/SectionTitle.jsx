/**
 * SectionTitle — título de sección con línea roja fina.
 * @param {"left"|"center"} align
 * @param {boolean} italic  Algunos títulos usan cursiva para recordar el logo.
 */
export default function SectionTitle({
  eyebrow,
  title,
  align = "left",
  italic = false,
  className = "",
}) {
  const centered = align === "center";

  return (
    <div className={`mb-8 sm:mb-12 ${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
          {eyebrow}
        </p>
      )}

      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl leading-none ${
          italic ? "italic" : ""
        }`}
      >
        {title}
      </h2>

      {/* Línea roja fina: elemento decorativo de separación */}
      <span
        aria-hidden="true"
        className={`mt-4 block h-0.5 w-16 bg-accent ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
