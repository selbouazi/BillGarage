/**
 * Smoke test SSR: comprueba que todas las páginas renderizan sin errores.
 * Uso: npx vite build --ssr scripts/smoke.jsx --outDir .smoke && node .smoke/smoke.js
 */
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header.jsx";
import Footer from "../src/components/Footer.jsx";
import WhatsAppFloat from "../src/components/WhatsAppFloat.jsx";
import Home from "../src/pages/Home.jsx";
import CarDetail from "../src/pages/CarDetail.jsx";
import NotFound from "../src/pages/NotFound.jsx";
import DesignSystem from "../src/pages/DesignSystem.jsx";
import { AvisoLegal, Privacidad, Cookies } from "../src/pages/legal/content.jsx";
import { cars } from "../src/data/cars.js";

function render(path, ui) {
  const html = renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Header />
      {ui}
      <Footer />
      <WhatsAppFloat />
    </MemoryRouter>
  );
  if (!html || html.length < 200) throw new Error(`Render vacío: ${path}`);
  return html.length;
}

const results = [];

const withRoutes = (path, routes) => (
  <MemoryRouter initialEntries={[path]}>
    <Routes>{routes}</Routes>
  </MemoryRouter>
);

results.push(["/ (home)", render("/", <Home />)]);
results.push(["/sistema-diseno", render("/sistema-diseno", <DesignSystem />)]);
results.push(["/aviso-legal", render("/aviso-legal", <AvisoLegal />)]);
results.push(["/politica-privacidad", render("/politica-privacidad", <Privacidad />)]);
results.push(["/politica-cookies", render("/politica-cookies", <Cookies />)]);
results.push(["/no-existe", render("/no-existe", <NotFound />)]);

for (const car of cars) {
  const html = renderToString(
    withRoutes(`/coches/${car.id}`, [
      <Route key="c" path="/coches/:id" element={<CarDetail />} />,
    ])
  );
  if (!html || html.length < 500) throw new Error(`Ficha vacía: ${car.id}`);
  results.push([`/coches/${car.id}`, html.length]);
}

const notFoundHtml = renderToString(
  withRoutes("/coches/que-no-existe", [
    <Route key="c" path="/coches/:id" element={<CarDetail />} />,
  ])
);
if (!notFoundHtml.includes("404")) throw new Error("El 404 de ficha no se muestra");
results.push(["/coches/que-no-existe (404)", notFoundHtml.length]);

console.log("✓ Smoke test SSR OK —", results.length, "páginas renderizadas");
results.forEach(([name, len]) => console.log(`  ${name}: ${len} bytes`));
