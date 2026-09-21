import { ArrowUpRight, Check } from "lucide-react"
import { site, telegramFor } from "../config/site"
import { ModelPhoto } from "../components/ModelPhoto"
import { Reveal } from "../components/Reveal"
import { ArrowLink, Eyebrow, TelegramButton } from "../components/ui"

export function TelegramCTA() {
  return (
    <section id="telegram" className="relative mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 sm:pt-20 sm:pb-12 lg:pt-28 lg:pb-14">
      {/* Manchas de color para que el cristal luzca */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 -left-20 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgb(255_79_167/0.32),transparent)]" />
        <div className="absolute right-0 bottom-0 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(123_63_228/0.28),transparent)]" />
      </div>

      <Reveal className="glass relative rounded-[40px] p-6 sm:p-10 lg:p-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <Eyebrow>Canal oficial</Eyebrow>
            <h2 className="mt-5 text-[2.4rem] leading-[1.02] font-black tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4rem]">
              ¿Quieres ver más de la modelo que te <span className="text-gradient">gustó</span>?
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed font-medium text-ink-soft">
              ¡Entra a nuestro canal de Telegram! Adelantos, novedades y acceso directo a todas nuestras modelos, en
              un solo lugar.
            </p>

            <div className="mt-9 flex flex-col items-start gap-5">
              <TelegramButton size="lg">
                <span className="sm:hidden">Entrar al canal</span>
                <span className="hidden sm:inline">Entrar al canal de Telegram</span>
              </TelegramButton>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-ink-soft">
                {["Canal oficial", "Gratis", "Solo +18"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="size-4 text-brand-violet" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CtaVisual />
        </div>
      </Reveal>

      {/* Acceso directo a cada modelo */}
      <Reveal delay={0.1} className="glass mt-4 rounded-[32px] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="shrink-0">
            <p className="font-black text-ink">¿Ya tienes favorita?</p>
            <p className="text-sm font-medium text-ink-soft">Encuéntrala directamente en el canal.</p>
          </div>
          {/* En móvil es una fila que se desliza; en escritorio se reparte en varias líneas */}
          <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 lg:justify-end">
            {site.models.map((model, i) => (
              <li key={model.name} className="shrink-0">
                <a
                  href={telegramFor(model)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-white/70 py-1.5 pr-3 pl-1.5 text-sm font-bold text-ink ring-1 ring-white transition hover:bg-white hover:shadow-[0_8px_20px_-10px_rgb(123_63_228/0.45)]"
                >
                  <span className="relative size-8 overflow-hidden rounded-full">
                    <ModelPhoto model={model} index={i} />
                  </span>
                  {model.name}
                  <ArrowUpRight className="size-3.5 text-ink-soft transition-transform group-hover:rotate-45" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

/** Composición de la derecha: foto + tarjeta glass "Explora el canal" + notificación estilo iOS. */
function CtaVisual() {
  const index = Math.min(3, site.models.length - 1)
  const model = site.models[index]

  return (
    <div className="relative mx-auto hidden w-full max-w-[380px] sm:block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-float ring-1 ring-white/70">
        <ModelPhoto model={model} index={index} />
        <div className="glass-dark absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-[26px] p-4 pl-5 text-white">
          <p className="text-sm leading-snug font-black tracking-[0.08em] uppercase">
            Explora
            <br />
            el canal
          </p>
          <ArrowLink href={site.telegram.channel} label="Abrir el canal de Telegram" />
        </div>
      </div>

      {/* Notificación estilo iOS */}
      <div className="glass-strong absolute top-[12%] -right-3 hidden w-60 animate-float items-center gap-3 rounded-[22px] p-3 [animation-delay:-2.5s] sm:flex sm:-right-10 motion-reduce:animate-none">
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
          <ModelPhoto model={model} index={index} />
        </span>
        <div className="min-w-0">
          <p className="flex items-center justify-between gap-2 text-xs font-extrabold text-ink">
            {model.name}
            <span className="font-semibold text-ink-soft">ahora</span>
          </p>
          <p className="truncate text-xs font-medium text-ink-soft">Subió contenido nuevo</p>
        </div>
      </div>
    </div>
  )
}
