import { Check } from "lucide-react"
import { site, telegramFor } from "../config/site"
import { TelegramLogo, TelegramPlane } from "../components/icons"
import { ModelPhoto } from "../components/ModelPhoto"
import { Reveal } from "../components/Reveal"
import { ArrowLink, Eyebrow, TelegramButton } from "../components/ui"

export function TelegramCTA() {
  return (
    <section id="telegram" className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
      {/* Manchas de color para que el cristal luzca */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 -left-20 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgb(255_79_167/0.32),transparent)]" />
        <div className="absolute right-0 bottom-0 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(123_63_228/0.28),transparent)]" />
      </div>

      <Reveal className="glass relative rounded-[40px] p-6 sm:p-10 lg:p-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow>(03) Canal oficial</Eyebrow>
            <h2 className="mt-5 font-display text-[2.9rem] leading-[0.95] text-ink sm:text-6xl lg:text-[4.6rem]">
              ¿Quieres ver más de la modelo que te <em className="text-gradient">gustó</em>?
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              ¡Entra a nuestro canal de Telegram! Adelantos, novedades y acceso directo a todas nuestras modelos, en
              un solo lugar.
            </p>

            <div className="mt-9 flex flex-col items-start gap-5">
              <TelegramButton size="lg">
                <span className="sm:hidden">Entrar al canal</span>
                <span className="hidden sm:inline">Entrar al canal de Telegram</span>
              </TelegramButton>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
                {["Canal oficial", "Gratis", "Solo +18"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="size-4 text-brand-violet" />
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
            <p className="font-semibold text-ink">¿Ya tienes favorita?</p>
            <p className="text-sm text-ink-soft">Encuéntrala directamente en Telegram.</p>
          </div>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {site.models.map((model, i) => (
              <li key={model.name}>
                <a
                  href={telegramFor(model)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/70 py-1.5 pr-3.5 pl-1.5 text-sm font-medium text-ink ring-1 ring-white transition hover:bg-white hover:shadow-[0_8px_20px_-10px_rgb(123_63_228/0.45)]"
                >
                  <span className="relative size-8 overflow-hidden rounded-full">
                    <ModelPhoto model={model} index={i} initial={false} />
                  </span>
                  {model.name}
                  <TelegramPlane className="size-3.5 text-[#229ed9]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

/** Composición de la derecha: foto + tarjeta glass "Explorar el canal" + notificación estilo iOS. */
function CtaVisual() {
  const index = Math.min(2, site.models.length - 1)
  const model = site.models[index]

  return (
    <div className="relative mx-auto w-full max-w-[320px] pt-6 sm:max-w-[380px] lg:pt-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-float ring-1 ring-white/70">
        <ModelPhoto model={model} index={index} />
        <div className="glass-dark absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-[26px] p-4 pl-5 text-white">
          <p className="text-sm leading-snug font-semibold tracking-[0.08em] uppercase">
            Explora
            <br />
            el canal
          </p>
          <ArrowLink href={site.telegram.channel} label="Abrir el canal de Telegram" />
        </div>
      </div>

      {/* Icono de Telegram flotante */}
      <div className="glass-strong absolute top-0 -left-3 grid size-24 animate-float place-items-center rounded-[30px] sm:-left-8 lg:-top-8 motion-reduce:animate-none">
        <span
          aria-hidden="true"
          className="absolute inset-3 animate-ping-slow rounded-full bg-[#2aabee]/25 motion-reduce:hidden"
        />
        <TelegramLogo className="relative size-14 drop-shadow-[0_8px_16px_rgb(0_125_187/0.4)]" />
      </div>

      {/* Notificación estilo iOS */}
      <div className="glass-strong absolute top-[18%] -right-3 hidden w-60 animate-float items-center gap-3 rounded-[22px] p-3 [animation-delay:-2.5s] sm:flex sm:-right-10 motion-reduce:animate-none">
        <TelegramLogo className="size-10 shrink-0" />
        <div className="min-w-0">
          <p className="flex items-center justify-between gap-2 text-xs font-semibold text-ink">
            {site.name} · Canal
            <span className="font-normal text-ink-soft">ahora</span>
          </p>
          <p className="truncate text-xs text-ink-soft">Nuevo contenido de {model.name} ✨</p>
        </div>
      </div>
    </div>
  )
}
