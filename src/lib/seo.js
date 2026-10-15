import { useEffect } from "react";
import { SITE } from "./site.js";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * SEO por página: título, meta description, Open Graph y JSON-LD dinámico.
 * Los metadatos base (y el JSON-LD del negocio) están en index.html (Bloque 8).
 */
export function useSeo({ title, description, jsonLd, type = "website" }) {
  // Serializamos el JSON-LD para que el efecto solo se re-ejecute si cambia
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    if (title) document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", SITE.url + window.location.pathname);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertLink("canonical", SITE.url + window.location.pathname);

    let script;
    if (jsonLdString) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = jsonLdString;
      document.head.appendChild(script);
    }
    return () => script?.remove();
  }, [title, description, type, jsonLdString]);
}
