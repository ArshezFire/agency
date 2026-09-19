# Arshez — Landing de la agencia

Landing de una sola página, estilo **bento + glass tipo iOS**, que presenta la agencia y lleva a los visitantes al canal de Telegram.

**Stack:** React 19 · Vite · TypeScript · [HeroUI v3](https://heroui.com) · Tailwind CSS v4 · Embla Carousel

## Secciones

1. **Hero**: titular, modelo destacada, la modelo más nueva, cifras y botón al canal.
2. **Agencia**: el nombre en letras gigantes rellenas con las fotos de las modelos, más un bento con la información de confianza.
3. **Modelos**: carrusel con las modelos (se desliza solo, con flechas y puntos).
4. **Telegram**: llamada a la acción final más accesos directos por modelo.

Al entrar aparece un aviso de mayoría de edad (+18). El navegador lo recuerda después de aceptarlo.

## Editar el contenido

Todo está en **`src/config/site.ts`**:

| Qué | Dónde |
| --- | --- |
| Nombre de la agencia (logo, título de la pestaña, letras gigantes) | `name` |
| Título y descripción para Google | `seo` |
| **Link del canal de Telegram** ⚠️ | `telegram.channel` y `telegram.handle` |
| Cifras (modelos, fans, contenido) | `stats` |
| Categorías de la cinta animada | `categories` |
| Modelos (la primera es la destacada del hero) | `models` |
| Activar o desactivar el aviso +18 | `ageGate` |

### Fotos de las modelos

1. Guarda las fotos en `public/models/` (por ejemplo `public/models/valentina.jpg`).
2. En `site.ts`, pon la ruta en la modelo: `photo: "/models/valentina.jpg"`.

Quedan mejor verticales (3:4 o 4:5) y en `.jpg` o `.webp` de menos de 300 KB. Mientras una modelo no tenga foto, se muestra un degradado con su inicial.

Cada modelo puede tener su propio link en `telegram`. Si lo dejas vacío, se usa el canal principal.

### Colores y estilo

Los colores de la marca, las tipografías y los estilos glass (`glass`, `glass-strong`, `glass-photo`, `glass-dark`) están al principio de `src/index.css`.

Si usas otro componente de HeroUI, importa también su CSS en `src/index.css` (`@import "@heroui/styles/components/<nombre>.css" layer(components);`). Solo se cargan los estilos de los componentes que se usan.

## Desarrollo

```bash
npm install
npm run dev
```

Otros comandos: `npm run build` (compila en `dist/`), `npm run preview` (sirve esa compilación) y `npm run lint`.

## Publicar gratis en Vercel

1. Sube el proyecto a GitHub (repositorio `ArshezFire/agency`).
2. En [vercel.com](https://vercel.com), entra con GitHub y elige **Add New… → Project**.
3. Importa el repositorio. Vercel reconoce Vite solo (build `npm run build`, salida `dist`). Pulsa **Deploy**.

Cada `git push` a `main` vuelve a publicar la web automáticamente. El dominio propio se añade en **Settings → Domains**.
