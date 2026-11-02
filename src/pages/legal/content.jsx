import LegalLayout from "./LegalLayout.jsx";
import { SITE, LEGAL } from "@/lib/site.js";

/**
 * Textos legales (LSSI-CE, RGPD/LOPDGDD y TRLGDCU).
 *
 * Los datos del titular están centralizados en `src/lib/site.js` (LEGAL y
 * SITE.email): mientras falten se muestran como "[pendiente]" y LegalLayout
 * enseña un aviso de plantilla (LEGAL_READY = false).
 * TODO: revisar el conjunto con un profesional antes de publicar.
 */

function Pending() {
  return <span className="text-accent-soft">[pendiente de confirmar]</span>;
}

function Dato({ value }) {
  return value ? <>{value}</> : <Pending />;
}

function Enlace({ to, children }) {
  return (
    <a href={to} className="text-accent-soft underline-offset-2 hover:underline">
      {children}
    </a>
  );
}

export function AvisoLegal() {
  return (
    <LegalLayout
      title="Aviso legal"
      description="Aviso legal de la web de Bill Garage, compra y venta de coches en El Vendrell."
    >
      <h2>1. Datos identificativos</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
        servicios de la sociedad de la información y de comercio electrónico
        (LSSI-CE), se informa:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Titular:</strong> <Dato value={LEGAL.titular} />
        </li>
        <li>
          <strong>NIF/CIF:</strong> <Dato value={LEGAL.nif} />
        </li>
        <li>
          <strong>Domicilio:</strong> <Dato value={LEGAL.domicilio} />
        </li>
        <li>
          <strong>Email:</strong> <Dato value={SITE.email} />
        </li>
        <li>
          <strong>Teléfono:</strong> {SITE.phoneDisplay}
        </li>
        <li>
          <strong>Nombre comercial:</strong> Bill Garage
        </li>
        <li>
          <strong>Actividad:</strong> compraventa de vehículos de ocasión
        </li>
      </ul>

      <h2>2. Objeto y condiciones de uso</h2>
      <p>
        Esta web tiene carácter informativo: presenta la actividad del titular y
        el stock de vehículos disponibles. El acceso y la navegación son
        gratuitos y atribuyen la condición de usuario, que se compromete a
        utilizar el sitio de forma lícita, sin dañar los sistemas, los contenidos
        o los derechos de terceros.
      </p>

      <h2>3. Propiedad intelectual e industrial</h2>
      <p>
        Los textos, el diseño, el logotipo y las fotografías de los vehículos son
        titularidad del titular de la web o se utilizan con autorización. Queda
        prohibida su reproducción, distribución o transformación sin permiso
        previo y por escrito.
      </p>

      <h2>4. Información sobre los vehículos</h2>
      <p>
        Los datos de cada vehículo (kilometraje, estado, equipamiento y precio)
        se ofrecen a título informativo y están sujetos a disponibilidad. La web
        no constituye una oferta contractual vinculante: la información y las
        condiciones definitivas se facilitan antes de formalizar la compraventa.
      </p>
      {/* TODO: confirmar si los precios incluyen IVA/REBU y si aplica garantía
          comercial adicional a todo el stock. */}

      <h2>5. Enlaces y servicios de terceros</h2>
      <p>
        La web incluye enlaces y contenidos de terceros (el perfil de Wallapop,
        WhatsApp y Google Maps). Sus condiciones y políticas de privacidad son
        responsabilidad de sus respectivos titulares; no controlamos sus
        contenidos ni su disponibilidad.
      </p>

      <h2>6. Protección de datos</h2>
      <p>
        El tratamiento de los datos personales se describe en la{" "}
        <Enlace to="/politica-privacidad">política de privacidad</Enlace>.
      </p>

      <h2>7. Garantías y atención al cliente</h2>
      <p>
        Los vehículos vendidos a consumidores cuentan con la garantía legal de
        conformidad prevista en el texto refundido de la Ley General para la
        Defensa de los Consumidores y Usuarios. En los vehículos de segunda mano
        puede pactarse por escrito una reducción de plazo, que en ningún caso
        será inferior a un año.
      </p>
      <p>
        El titular dispone de hojas de reclamaciones a disposición de los
        consumidores. Para cualquier controversia, el consumidor puede acudir a
        las vías de resolución de conflictos previstas en la ley.{" "}
        {/* TODO: indicar si el titular está adherido a la Junta Arbitral de Consumo */}
      </p>

      <h2>8. Legislación aplicable</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Cuando el usuario
        tenga la condición de consumidor, serán competentes los juzgados de su
        domicilio.
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
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Titular:</strong> <Dato value={LEGAL.titular} />
        </li>
        <li>
          <strong>NIF/CIF:</strong> <Dato value={LEGAL.nif} />
        </li>
        <li>
          <strong>Domicilio:</strong> <Dato value={LEGAL.domicilio} />
        </li>
        <li>
          <strong>Email de contacto:</strong> <Dato value={SITE.email} />
        </li>
        <li>
          <strong>Teléfono:</strong> {SITE.phoneDisplay}
        </li>
      </ul>

      <h2>2. Datos que tratamos</h2>
      <p>
        Tratamos únicamente los datos que nos facilitas voluntariamente:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Formularios de la web:</strong> nombre, teléfono, email y, en
          la valoración de tu coche, marca, modelo, año, kilómetros y
          combustible.
        </li>
        <li>
          <strong>WhatsApp o teléfono:</strong> los datos que incluyas en tu
          mensaje.
        </li>
      </ul>
      <p>
        No elaboramos perfiles ni tomamos decisiones automatizadas con efectos
        jurídicos sobre ti.
      </p>

      <h2>3. Finalidades y bases jurídicas</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Responder a tus consultas y valorar tu vehículo:</strong>{" "}
          consentimiento y medidas precontractuales a tu petición (art. 6.1.a y
          6.1.b RGPD).
        </li>
        <li>
          <strong>Gestionar la compraventa, la garantía y las obligaciones
          fiscales y contables:</strong> ejecución de un contrato y cumplimiento
          de una obligación legal (art. 6.1.b y 6.1.c RGPD).
        </li>
        <li>
          <strong>Atender reclamaciones:</strong> interés legítimo y
          obligaciones legales.
        </li>
      </ul>
      <p>
        No utilizamos tus datos para enviarte comunicaciones comerciales sin tu
        consentimiento previo.
      </p>

      <h2>4. Conservación</h2>
      <p>
        Conservamos los datos mientras dure la relación comercial y, después,
        durante los plazos legales aplicables (por ejemplo, los fiscales y
        contables). Las consultas que no deriven en una operación se conservan
        durante el tiempo necesario para atenderlas y, como máximo, un año.
      </p>

      <h2>5. Destinatarios y encargados</h2>
      <p>
        No cedemos tus datos a terceros salvo obligación legal. Para prestar el
        servicio utilizamos proveedores que actúan como encargados del
        tratamiento con contrato conforme al artículo 28 del RGPD:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Alojamiento web</strong> (proveedor de hosting del sitio).
        </li>
        <li>
          <strong>Gestión de formularios y correo electrónico</strong> (cuando se
          activen los formularios, el proveedor que gestiona su envío).
        </li>
        <li>
          <strong>WhatsApp</strong> (Meta Platforms), si decides escribirnos por
          ese canal.
        </li>
        <li>
          <strong>Google</strong>, solo si pulsas «Ver mapa» y aceptas cargar el
          mapa incrustado.
        </li>
      </ul>
      <p>
        También podremos comunicar datos a administraciones públicas, juzgados o
        fuerzas de seguridad cuando exista una obligación legal.
      </p>

      <h2>6. Transferencias internacionales</h2>
      <p>
        Algunos proveedores tecnológicos pueden estar ubicados fuera del Espacio
        Económico Europeo. En tal caso, las transferencias se amparan en
        decisiones de adecuación de la Comisión Europea o en cláusulas
        contractuales tipo aprobadas por ella.
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Puedes ejercer los derechos de acceso, rectificación, supresión,
        oposición, limitación y portabilidad escribiendo a{" "}
        <strong>
          <Dato value={SITE.email} />
        </strong>
        , indicando el derecho que ejercitas y adjuntando copia de un documento
        que te identifique. También puedes presentar una reclamación ante la
        Agencia Española de Protección de Datos (AEPD), en{" "}
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-soft underline-offset-2 hover:underline"
        >
          www.aepd.es
        </a>
        .
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger los
        datos frente a accesos no autorizados, pérdida o alteración. La web se
        sirve mediante conexión cifrada (HTTPS).
      </p>

      <h2>9. Menores de edad</h2>
      <p>
        La web no se dirige a menores de 14 años y no recogemos conscientemente
        datos de menores sin la autorización de sus padres o tutores.
      </p>

      <h2>10. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política si cambian los servicios utilizados o la
        normativa aplicable. La versión vigente es la publicada en esta página.
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

      <h2>2. Cookies que utiliza esta web</h2>
      <p>
        <strong>Ninguna.</strong> Esta web es un sitio estático que no utiliza
        cookies propias ni de terceros, no hace analítica, no muestra publicidad
        y no perfila a los visitantes.
      </p>

      <h2>3. Contenidos de terceros que se cargan solo si los pides</h2>
      <p>
        En la sección «Dónde estamos» hay un mapa de Google que{" "}
        <strong>no se carga al abrir la página</strong>: permanece oculto hasta
        que pulsas «Ver mapa». Si decides cargarlo, Google puede instalar cookies
        o acceder a datos técnicos de tu navegador conforme a su propia política
        de privacidad. Antes de pulsar, no se envía ninguna petición a Google.
      </p>
      <p>
        Algo equivalente ocurre con los enlaces a WhatsApp o Wallapop: solo
        salimos de esta web si pulsas en ellos, y a partir de ese momento se
        aplican sus condiciones.
      </p>

      <h2>4. Cómo gestionarlas</h2>
      <p>
        Puedes permitir, bloquear o eliminar las cookies instaladas en tu
        navegador desde su menú de configuración. Consulta la ayuda de tu
        navegador para más detalles.
      </p>

      <h2>5. Actualizaciones</h2>
      <p>
        Esta política puede modificarse si cambian los servicios utilizados en la
        web. Si en el futuro se añade analítica o publicidad, se informará y se
        solicitará el consentimiento previo cuando sea necesario.
      </p>
    </LegalLayout>
  );
}
