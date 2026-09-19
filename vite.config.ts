import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { site } from "./src/config/site.ts"

/** Rellena el <title> y las metas de index.html con los datos de site.ts. */
function siteMeta(): Plugin {
  const escape = (text: string) =>
    text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

  return {
    name: "site-meta",
    transformIndexHtml: (html) =>
      html
        .replaceAll("%SITE_NAME%", escape(site.name))
        .replaceAll("%SITE_TITLE%", escape(site.seo.title))
        .replaceAll("%SITE_DESCRIPTION%", escape(site.seo.description)),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
})
