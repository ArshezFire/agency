import { site } from "../config/site"

export function Footer() {
  return (
    <footer className="px-4 pb-8 text-center text-xs font-semibold text-ink-soft sm:px-6">
      © {new Date().getFullYear()} {site.name}
    </footer>
  )
}
