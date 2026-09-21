import { useLayoutEffect, useRef, useState } from "react"
import { SECTIONS } from "../config/sections"
import { useActiveSection, useScrolled } from "../lib/hooks"
import { cx } from "../lib/cx"
import { BrandMark, TelegramButton } from "./ui"

const SECTION_IDS = SECTIONS.map((s) => s.id)

export function Navbar() {
  const scrolled = useScrolled()
  const active = useActiveSection(SECTION_IDS)
  const [pillRef, pill] = useActivePill(active)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* En móvil, al hacer scroll todo se agrupa en una sola barra glass */}
      <div
        className={cx(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full transition-[background-color,box-shadow,border-color] duration-500",
          "max-md:py-1.5 max-md:pr-1.5 max-md:pl-4",
          scrolled ? "max-md:glass-strong md:border md:border-transparent" : "border border-transparent",
        )}
      >
        <a
          href="#inicio"
          aria-label="Ir al inicio"
          className={cx(
            "flex items-center rounded-full transition-[background-color,box-shadow,border-color] duration-500 md:h-12 md:px-5",
            scrolled ? "md:glass-strong" : "border border-transparent",
          )}
        >
          <BrandMark />
        </a>

        {/* Menú tipo control segmentado de iOS */}
        <nav
          aria-label="Secciones"
          className={cx(
            "hidden rounded-full p-1 transition-[background-color,box-shadow,border-color] duration-500 md:block",
            scrolled ? "glass-strong" : "border border-transparent",
          )}
        >
          <div ref={pillRef} className="relative">
            <span
              aria-hidden="true"
              className={cx(
                "absolute inset-y-0 left-0 rounded-full bg-white shadow-[0_1px_2px_rgb(58_20_102/0.08),0_6px_16px_-6px_rgb(58_20_102/0.18)]",
                pill.ready && "transition-[translate,width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              )}
              style={{ width: pill.width, translate: `${pill.left}px 0` }}
            />
            <ul className="flex items-center">
              {SECTIONS.map((section) => {
                const isActive = active === section.id
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      data-section={section.id}
                      aria-current={isActive ? "true" : undefined}
                      className={cx(
                        "relative block rounded-full px-4 py-2 text-sm font-bold transition-colors",
                        isActive ? "text-ink" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {section.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        <TelegramButton size="sm" className="shrink-0">
          <span className="sm:hidden">Canal</span>
          <span className="hidden sm:inline">Canal de Telegram</span>
        </TelegramButton>
      </div>
    </header>
  )
}

/** Posición de la píldora blanca bajo el enlace activo (se desliza entre enlaces). */
function useActivePill(active: string) {
  const listRef = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false })

  useLayoutEffect(() => {
    const measure = () => {
      const link = listRef.current?.querySelector<HTMLElement>(`[data-section="${active}"]`)
      if (!link) return
      setPill((prev) => ({ left: link.offsetLeft, width: link.offsetWidth, ready: prev.width > 0 }))
    }
    measure()
    void document.fonts?.ready.then(measure)
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [active])

  return [listRef, pill] as const
}
