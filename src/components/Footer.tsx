import { site } from "../config/site"
import { SECTIONS } from "../config/sections"
import { BrandMark } from "./ui"

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
      <div className="glass flex flex-col gap-6 rounded-[32px] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <BrandMark />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Agencia de talento para creadoras de contenido. Sitio exclusivo para mayores de 18 años.
          </p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink-soft">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="transition hover:text-ink">
                  {section.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.telegram.channel} target="_blank" rel="noopener noreferrer" className="transition hover:text-ink">
                {site.telegram.handle}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mt-6 px-2 text-center text-xs leading-relaxed text-ink-soft">
        © {new Date().getFullYear()} {site.name}. Todas nuestras modelos son mayores de edad y están verificadas.
      </p>
    </footer>
  )
}
