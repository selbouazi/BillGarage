/**
 * Container — contenedor centrado con padding horizontal consistente.
 * Único sitio donde se define el ancho máximo del sitio.
 */
export default function Container({ as: Tag = "div", className = "", children, ...props }) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </Tag>
  );
}
