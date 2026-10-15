import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import WhatsAppFloat from "@/components/WhatsAppFloat.jsx";
import Home from "@/pages/Home.jsx";
import CarDetail from "@/pages/CarDetail.jsx";
import NotFound from "@/pages/NotFound.jsx";
import DesignSystem from "@/pages/DesignSystem.jsx";
import { AvisoLegal, Privacidad, Cookies } from "@/pages/legal/content.jsx";

/**
 * Scroll: arriba en rutas nuevas; suave al ancla (#coches, #entrega…).
 * Se salta el scroll si la animación está reducida por accesibilidad.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hash) {
      const id = hash.slice(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }, 70);
      return () => clearTimeout(timer);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-card focus:border focus:border-accent focus:bg-surface focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coches/:id" element={<CarDetail />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<Privacidad />} />
        <Route path="/politica-cookies" element={<Cookies />} />
        <Route path="/sistema-diseno" element={<DesignSystem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </BrowserRouter>
  );
}
