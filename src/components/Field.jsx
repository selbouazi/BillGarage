import { LABEL_CLS, ERROR_CLS } from "@/lib/forms.js";

/**
 * Field — envolvente accesible de campo de formulario:
 * etiqueta vinculada, marca de obligatorio y mensaje de error con aria.
 */
export default function Field({ id, label, error, required = false, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLS}>
        {label}
        {required && <span className="text-accent-soft"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className={ERROR_CLS}>
          {error}
        </p>
      )}
    </div>
  );
}

/** Props a pasar al input/select/textarea para accesibilidad. */
export function fieldAria(id, error) {
  return {
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}
