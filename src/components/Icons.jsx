/**
 * Iconos SVG en línea (sin librerías). Todos usan currentColor.
 */
const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Stroke({ className = "", children }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...STROKE}>
      {children}
    </svg>
  );
}

function Fill({ className = "", viewBox = "0 0 24 24", children }) {
  return (
    <svg viewBox={viewBox} className={className} fill="currentColor" aria-hidden="true">
      {children}
    </svg>
  );
}

export const IconWhatsApp = ({ className }) => (
  <Fill className={className}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.67.15-.2.3-.77.97-.95 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.18-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.02-1.03 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.7.62.7.23 1.35.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.04 6.98 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.89 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42" />
  </Fill>
);

export const IconInstagram = ({ className }) => (
  <Stroke className={className}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </Stroke>
);

export const IconTikTok = ({ className }) => (
  <Fill className={className}>
    <path d="M16.6 2h-3.1v13.6a2.6 2.6 0 1 1-2.2-2.57V9.8a5.85 5.85 0 1 0 5.3 5.83V9.07a6.9 6.9 0 0 0 4.05 1.3V7.2a3.95 3.95 0 0 1-2.9-1.35A4.05 4.05 0 0 1 16.6 3.1V2Z" />
  </Fill>
);

export const IconStar = ({ className, filled = true }) => (
  <Fill className={className}>
    <path
      d="M12 2.6l2.7 5.75 6.1.63-4.55 4.15 1.27 6.02L12 16.26 6.48 19.15l1.27-6.02L3.2 8.98l6.1-.63z"
      opacity={filled ? 1 : 0.35}
    />
  </Fill>
);

export const IconPhone = ({ className }) => (
  <Stroke className={className}>
    <path d="M6.5 3h3l1.5 4-2 1.4a12.5 12.5 0 0 0 6.6 6.6L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5C10.3 19.5 4.5 13.7 4 5.7A2.5 2.5 0 0 1 6.5 3Z" />
  </Stroke>
);

export const IconMenu = ({ className }) => (
  <Stroke className={className} >
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);

export const IconClose = ({ className }) => (
  <Stroke className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Stroke>
);

export const IconChevronLeft = ({ className }) => (
  <Stroke className={className}>
    <path d="M15 5l-7 7 7 7" />
  </Stroke>
);

export const IconChevronRight = ({ className }) => (
  <Stroke className={className}>
    <path d="M9 5l7 7-7 7" />
  </Stroke>
);

export const IconCheck = ({ className }) => (
  <Stroke className={className}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Stroke>
);

export const IconPin = ({ className }) => (
  <Stroke className={className}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Stroke>
);

export const IconClock = ({ className }) => (
  <Stroke className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.5l3.5 2" />
  </Stroke>
);

export const IconChat = ({ className }) => (
  <Stroke className={className}>
    <path d="M21 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 3v-4.4A7.5 7.5 0 0 1 11.5 4h2A7.5 7.5 0 0 1 21 11.5Z" />
  </Stroke>
);

export const IconSwap = ({ className }) => (
  <Stroke className={className}>
    <path d="M4 8h13l-3-3M20 16H7l3 3" />
  </Stroke>
);

export const IconShield = ({ className }) => (
  <Stroke className={className}>
    <path d="M12 2.8 19.5 5.5v6c0 4.6-3.2 8.3-7.5 9.7-4.3-1.4-7.5-5.1-7.5-9.7v-6Z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </Stroke>
);

export const IconDoc = ({ className }) => (
  <Stroke className={className}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </Stroke>
);

export const IconSearch = ({ className }) => (
  <Stroke className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M16.5 16.5 21 21" />
  </Stroke>
);

export const IconGauge = ({ className }) => (
  <Stroke className={className}>
    <path d="M4.5 17a8.5 8.5 0 1 1 15 0" />
    <path d="M12 13.5 15.5 10" />
    <circle cx="12" cy="14.5" r="1.4" />
  </Stroke>
);

export const IconFuel = ({ className }) => (
  <Stroke className={className}>
    <path d="M5 20V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15M4 20h11M6.5 8.5h6" />
    <path d="M14 10h2.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 0 3 0V9l-2.5-2.5" />
  </Stroke>
);

export const IconGear = ({ className }) => (
  <Stroke className={className}>
    <path d="M6 4v16M18 4v16M6 8h6M12 16h6" />
    <circle cx="6" cy="4" r="1.6" />
    <circle cx="18" cy="4" r="1.6" />
    <circle cx="6" cy="20" r="1.6" />
    <circle cx="18" cy="20" r="1.6" />
  </Stroke>
);

export const IconCalendar = ({ className }) => (
  <Stroke className={className}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Stroke>
);

export const IconTag = ({ className }) => (
  <Stroke className={className}>
    <path d="M3.5 11.5V4.5a1 1 0 0 1 1-1h7l9 9-8 8Z" />
    <circle cx="8" cy="8" r="1.4" />
  </Stroke>
);
