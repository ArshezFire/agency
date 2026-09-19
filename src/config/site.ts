// ─────────────────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN DEL SITIO
//  Todo lo que vas a querer cambiar está aquí: nombre, links de Telegram,
//  cifras y modelos. No hace falta tocar los componentes.
// ─────────────────────────────────────────────────────────────────────────────

export type Model = {
  /** Nombre artístico. */
  name: string
  /** Frase corta que aparece bajo el nombre. */
  tagline: string
  /** Etiquetas cortas (2 como máximo queda mejor). */
  tags: string[]
  /**
   * Foto de la modelo. Guárdala en `public/models/` y pon aquí la ruta,
   * p. ej. "/models/valentina.jpg". Vertical (3:4 o 4:5) queda mejor.
   * Si lo dejas vacío se muestra un degradado con su inicial.
   */
  photo?: string
  /** Link de Telegram propio de la modelo. Vacío = usa el canal principal. */
  telegram?: string
  /** Muestra la etiqueta "Nueva". */
  isNew?: boolean
}

type Stat = { value: string; label: string }

type SiteConfig = {
  name: string
  seo: { title: string; description: string }
  telegram: { channel: string; handle: string }
  /** Ventana de confirmación +18 al entrar a la web. */
  ageGate: boolean
  /** [0] y [2] van en las tarjetitas del hero, [1] es la cifra grande. */
  stats: [Stat, Stat, Stat]
  categories: string[]
  /** La primera es la "destacada" del hero. */
  models: Model[]
}

export const site: SiteConfig = {
  name: "Arshez",

  seo: {
    title: "Agencia de modelos",
    description:
      "Agencia de talento para creadoras de contenido verificadas. Conoce a nuestras modelos y únete a nuestro canal oficial de Telegram.",
  },

  // ⚠️ CAMBIA ESTOS LINKS por los de tu canal antes de publicar.
  telegram: {
    channel: "https://t.me/TU_CANAL",
    handle: "@TU_CANAL",
  },

  ageGate: true,

  // ⚠️ Pon tus cifras reales.
  stats: [
    { value: "50+", label: "Modelos verificadas" },
    { value: "120K", label: "Fans en la comunidad" },
    { value: "24/7", label: "Contenido nuevo" },
  ],

  categories: ["Fitness", "Cosplay", "Lifestyle", "Gamer", "Latinas", "Arte", "Baile", "Moda", "Viajes"],

  models: [
    { name: "Valentina", tagline: "Fitness & lifestyle", tags: ["Fitness", "Lifestyle"] },
    { name: "Camila", tagline: "Cosplay y gaming", tags: ["Cosplay", "Gamer"], isNew: true },
    { name: "Isabella", tagline: "Moda y glamour", tags: ["Moda", "Glamour"] },
    { name: "Luna", tagline: "Arte y fotografía", tags: ["Arte", "Foto"], isNew: true },
    { name: "Sofía", tagline: "Baile y música", tags: ["Baile", "Música"] },
    { name: "Mía", tagline: "Viajes y aventura", tags: ["Viajes", "Lifestyle"] },
  ],
}

/** Link de Telegram de una modelo (o el canal principal si no tiene). */
export const telegramFor = (model: Model) => model.telegram || site.telegram.channel
