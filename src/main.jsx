import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Tipografías locales vía @fontsource (sin CDNs externas).
// Solo subset "latin" para reducir peso (el español cubierto: latin incluye ñ, é, ü…).
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-600-italic.css";
import "@fontsource/barlow-condensed/latin-700-italic.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
