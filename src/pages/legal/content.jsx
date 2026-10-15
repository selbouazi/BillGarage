import LegalLayout from "./LegalLayout.jsx";
import { SITE } from "@/lib/site.js";

/**
 * Textos legales de plantilla.
 * TODOS los datos del titular están pendientes → marcarlos con TODO.
 */

export function AvisoLegal() {
  return (
    <LegalLayout
      title="Aviso legal"
      description="Aviso legal de la web de Bill Garage, compra y venta de coches en El Vendrell."
    >
      <h2>1. Datos identificativos</h2>
      <p>
        {/* TODO: completar con los datos reales del titular */}
        <strong>Titular:</strong> [NOMBRE Y APELLIDOS / DENOMINACIÓN — TODO]
        <br />
        <strong>NIF/CIF:</strong> [NIF — TODO]
        <br />
        <strong>Domicilio:</strong> [DIRECCIÓN COMPLETA — TODO], El Vendrell
        (Tarragona)
        <br />
        <strong>Teléfono:</strong> {SITE.phoneDisplay}
        <br />
        <strong>Email:</strong> [EMAIL — TODO]
        <br />
        <strong>Actividad:</strong> Compra y venta de vehículos de ocasión
      </p>

      <h2>2. Objeto</h2>
      <p>
        El presente aviso legal regula el acceso, navegación y uso de esta web,
        cuya finalidad es presentar la actividad de Bill Garage y el stock de
        vehículos disponibles. La navegación por la web implica la aceptación de
        estas condiciones.
      </p>

      <h2>3. Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos de la web (textos, fotografías, logotipo y diseño) son
        titularidad de Bill Garage o de terceros que han autorizado su uso. No
        se permite su reproducción sin autorización previa.{" "}
        {/* TODO: confirmar titularidad de las fotografías de los coches */}
      </p>

      <h2>4. Responsabilidad</h2>
      <p>
        Bill Garage procura que la información publicada sea correcta y esté
        actualizada, pero los datos de cada vehículo (kilometraje, estado,
        equipamiento) pueden variar; la información definitiva es la que se
        facilita en el proceso de compraventa.{" "}
        {/* TODO: revisar redacción con el profesional */}
      </p>

      <h2>5. Legislación aplicable</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Para cualquier
        controversia serán competentes los juzgados del lugar del domicilio del
        consumidor.
      </p>
    </LegalLayout>
  );
}

export function Privacidad() {
  return (
    <LegalLayout
      title="Política de privacidad"
      description="Cómo tratamos tus datos personales en Bill Garage."
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        {/* TODO: completar responsable, NIF, dirección y email de contacto */}
        <strong>[NOMBRE DEL RESPONSABLE — TODO]</strong>, NIF [— TODO], con
        domicilio en [— TODO], El Vendrell (Tarragona). Teléfono:{" "}
        {SITE.phoneDisplay}.
      </p>

      <h2>2. Datos que recogemos</h2>
      <p>
        Únicamente los que nos facilitas voluntariamente a través de los
        formularios de la web (nombre, teléfono, email, datos del vehículo) o
        cuando nos escribes por WhatsApp o teléfono.
      </p>

      <h2>3. Finalidad y base legal</h2>
      <p>
        Tratamos tus datos para responder a tus consultas, elaborar
        valoraciones de vehículos y gestionar la relación comercial. La base
        legal es tu consentimiento y la aplicación de medidas precontractuales
        a tu petición. {/* TODO: confirmar finalidades exactas */}
      </p>

      <h2>4. Conservación y destinatarios</h2>
      <p>
        Conservamos tus datos mientras dure la relación y los plazos legales
        exigibles. No cedemos datos a terceros salvo obligación legal.{" "}
        {/* TODO: indicar si se usan herramientas de terceros (email, CRM) */}
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes ejercer los derechos de acceso, rectificación, supresión,
        oposición, limitación y portabilidad enviando un mensaje a nuestros
        canales de contacto, adjuntando copia de un documento identificativo.
        Asimismo puedes presentar reclamación ante la AEPD.
      </p>
    </LegalLayout>
  );
}

export function Cookies() {
  return (
    <LegalLayout
      title="Política de cookies"
      description="Información sobre el uso de cookies en la web de Bill Garage."
    >
      <h2>1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu
        navegador para recordar información sobre tu visita.
      </p>

      <h2>2. Qué cookies usa esta web</h2>
      <p>
        Esta web es un sitio estático <strong>sin analítica, sin publicidad y
        sin cookies propias no esenciales</strong>. Solo se usan recursos
        técnicos necesarios para mostrar la página.
      </p>
      <p>
        {/* TODO: el mapa de Google Maps incrustado puede instalar cookies de
            tercero. Confirmar con el cliente si queremos:
            a) añadir aviso/consentimiento, o
            b) sustituir por un mapa sin cookies (fachada "clic para cargar"). */}
        Excepción: el mapa de ubicación está incrustado desde Google Maps, que
        puede instalar cookies de terceros con finalidad de preferencias. Si se
        mantiene, deberá valorarse incluir un aviso de cookies al respecto.
      </p>

      <h2>3. Cómo gestionarlas</h2>
      <p>
        Puedes permitir, bloquear o eliminar las cookies instaladas en tu
        navegador desde su menú de configuración. Consulta la ayuda de tu
        navegador para más detalles.
      </p>

      <h2>4. Actualizaciones</h2>
      <p>
        Esta política puede modificarse si cambian los servicios utilizados en
        la web. {/* TODO: fecha de última revisión */}
      </p>
    </LegalLayout>
  );
}
