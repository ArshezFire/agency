import { useEffect, useState } from "react"
import { Avatar, AvatarGroup, Chip } from "@heroui/react"
import { BadgeCheck, ChevronDown, ChevronRight, Flame, Sparkles } from "lucide-react"
import { site, telegramFor, type Model } from "../config/site"
import { cx } from "../lib/cx"
import { usePrefersReducedMotion } from "../lib/hooks"
import { Sparkle, TelegramLogo, TelegramPlane } from "../components/icons"
import { ModelPhoto } from "../components/ModelPhoto"
import { placeholderGradient } from "../lib/placeholder"
import { Reveal } from "../components/Reveal"
import { ArrowLink, TelegramButton } from "../components/ui"

export function Hero() {
  const [featured, ...others] = site.models
  const newest = others.find((m) => m.isNew) ?? others[0]
  const bigStat = site.stats[1]

  return (
    <section id="inicio" className="relative mx-auto max-w-7xl px-4 pt-24 pb-4 sm:px-6 sm:pt-28 sm:pb-16 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:pb-10">
      {/* Resplandor detrás del retrato */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 left-1/2 -z-10 size-[min(680px,120vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_79_167/0.28),transparent)] md:left-[70%] lg:left-1/2"
      />

      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-8 lg:grid-cols-[1.12fr_0.95fr_0.78fr] xl:gap-12">
        {/* ── Columna izquierda ── (en móvil sus bloques se intercalan con el retrato) */}
        <div className="contents md:flex md:flex-col md:gap-10 lg:gap-9">
          <Reveal className="order-1 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#agencia"
                className="glass-strong inline-flex h-9 items-center gap-2 rounded-full pr-3 pl-1.5 text-[13px] font-medium text-ink transition hover:bg-white/90"
              >
                <span className="grid size-6 place-items-center rounded-full bg-gradient-brand text-white">
                  <Sparkle className="size-3" />
                </span>
                Agencia oficial
                <ChevronRight className="size-3.5 text-ink-soft" />
              </a>
              <Chip className="glass-strong h-9 gap-1.5 rounded-full px-3 text-[13px] font-semibold text-ink">
                <span className="size-2 rounded-full bg-gradient-brand" />
                <Chip.Label>Solo +18</Chip.Label>
              </Chip>
            </div>

            <h1 className="font-display text-[3.4rem] leading-[0.92] tracking-[-0.015em] text-ink sm:text-7xl xl:text-[5.5rem]">
              Talento real, contenido{" "}
              <span className="whitespace-nowrap">
                <em className="text-gradient">exclusivo</em>
                <Sparkle gradient className="ml-3 inline-block size-[0.5em] align-[0.05em]" />
              </span>
            </h1>

            <p className="max-w-md text-[17px] leading-relaxed text-ink-soft">
              Representamos a creadoras de contenido verificadas. Descúbrelas aquí y accede a lo mejor de cada una
              en nuestro canal oficial de Telegram.
            </p>

            <div className="flex flex-wrap items-center gap-3 lg:hidden">
              <TelegramButton variant="gradient">Entrar al canal</TelegramButton>
              <a
                href="#modelos"
                className="glass-strong inline-flex h-13 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-ink"
              >
                Ver modelos
                <ChevronDown className="size-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="order-3">
            <TrustRow />
          </Reveal>

          <Reveal delay={0.22} className="order-4">
            <MiniStats />
          </Reveal>
        </div>

        {/* ── Centro: retrato destacado ── */}
        <Reveal delay={0.06} className="order-2 md:order-none">
          <FeaturedPortrait model={featured} />
        </Reveal>

        {/* ── Columna derecha (escritorio) ── */}
        <div className="hidden flex-col gap-9 lg:flex">
          <Reveal delay={0.16} className="glass rounded-[30px] p-2.5">
            <NewArrivalCard model={newest} index={site.models.indexOf(newest)} />
          </Reveal>

          <Reveal delay={0.26} className="flex flex-col gap-5">
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Contenido exclusivo, trato cercano y total discreción. Todo lo que buscas, en un solo canal.
            </p>
            <TelegramButton variant="gradient" className="self-start">
              Entrar al canal
            </TelegramButton>
            <div>
              <p className="font-display text-6xl leading-none text-ink">
                {bigStat.value}
                <span className="text-ink/25">+</span>
              </p>
              <p className="mt-1 text-sm text-ink-soft">{bigStat.label.toLowerCase()}</p>
            </div>
          </Reveal>

          <Reveal delay={0.36}>
            <ThumbStrip />
          </Reveal>
        </div>
      </div>

      <a
        href="#agencia"
        className="absolute right-6 bottom-2 hidden items-center gap-1.5 text-sm text-ink-soft transition hover:text-ink lg:flex"
      >
        Desliza
        <ChevronDown className="size-4 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */

function TrustRow() {
  const faces = site.models.slice(0, 4)
  return (
    <div className="flex items-center gap-5">
      <div>
        <p className="mb-2 text-xs font-medium text-ink-soft">Nuestras modelos</p>
        <AvatarGroup overlap="ring" className="[--avatar-group-overlap:0.7rem]">
          {faces.map((model, i) => (
            <Avatar key={model.name} className="size-11 rounded-full">
              {model.photo && <Avatar.Image src={model.photo} alt={model.name} />}
              <Avatar.Fallback
                className="font-display text-lg text-white italic"
                style={{ backgroundImage: placeholderGradient(i) }}
              >
                {model.name.charAt(0)}
              </Avatar.Fallback>
            </Avatar>
          ))}
          <AvatarGroup.Count className="size-11 rounded-full bg-white text-xs font-semibold text-ink">
            {site.stats[0].value}
          </AvatarGroup.Count>
        </AvatarGroup>
      </div>
      <span className="h-14 w-px bg-ink/10" />
      <div>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          <BadgeCheck className="size-4 text-brand-violet" />
          100% verificadas
        </p>
        <p className="mt-0.5 text-xs text-ink-soft">Perfiles reales y mayores de edad</p>
      </div>
    </div>
  )
}

function MiniStats() {
  const [first, , third] = site.stats
  return (
    <div className="w-full max-w-md">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Nuestra comunidad</p>
        <a href="#agencia" className="text-sm text-ink-soft transition hover:text-ink">
          Ver más
        </a>
      </div>
      <div className="grid grid-cols-2 items-end gap-3">
        {/* Tarjeta con pestaña, como la de "Recommended" de la referencia */}
        <div className="rounded-[26px] bg-linear-to-br from-brand-plum to-brand-violet p-1 pt-0 shadow-float">
          <p className="flex h-8 items-center gap-1.5 px-3 text-xs font-medium text-white/90">
            <Flame className="size-3.5" />
            Lo más buscado
          </p>
          <div className="rounded-[22px] bg-white/95 p-4">
            <p className="text-xs text-ink-soft">{first.label}</p>
            <p className="mt-1 text-[28px] leading-none font-semibold tracking-tight text-ink">{first.value}</p>
            <span className="mt-5 grid size-9 place-items-center rounded-full bg-canvas text-brand-violet ring-1 ring-ink/5">
              <BadgeCheck className="size-4" />
            </span>
          </div>
        </div>
        <div className="glass rounded-[26px] p-4">
          <p className="text-xs text-ink-soft">{third.label}</p>
          <p className="mt-1 text-[28px] leading-none font-semibold tracking-tight text-ink">{third.value}</p>
          <span className="mt-5 grid size-9 place-items-center rounded-full bg-white/80 text-brand-pink ring-1 ring-ink/5">
            <Sparkles className="size-4" />
          </span>
        </div>
      </div>
    </div>
  )
}

function FeaturedPortrait({ model }: { model: Model }) {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] shadow-float ring-1 ring-white/70 md:aspect-[3/4] lg:aspect-[10/14]">
        <ModelPhoto model={model} index={0} eager />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-black/30 to-transparent" />
        <div className="absolute top-6 left-6 text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.2)]">
          <p className="text-[22px] leading-tight font-medium tracking-tight">Modelo destacada</p>
          <p className="text-sm text-white/80">De la semana</p>
        </div>

        <div className="glass-photo absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 rounded-[28px] p-5">
          <div className="min-w-0">
            <p className="truncate text-[13px] text-ink-soft">{model.tagline}</p>
            <p className="mt-0.5 font-display text-[42px] leading-none text-ink">{model.name}</p>
            <p className="mt-1.5 text-[13px] text-ink-soft">Contenido nuevo cada día</p>
          </div>
          <ArrowLink href={telegramFor(model)} label={`Ver más de ${model.name} en Telegram`} />
        </div>
      </div>

      {/* Insignias flotantes */}
      <div className="glass-strong absolute top-[36%] -left-3 hidden animate-float items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 text-xs font-semibold text-ink sm:flex motion-reduce:animate-none">
        <span className="grid size-7 place-items-center rounded-full bg-emerald-500 text-white">
          <BadgeCheck className="size-4" />
        </span>
        Verificada
      </div>
      <div className="glass-strong absolute top-[14%] -right-3 hidden animate-float items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 text-xs font-semibold text-ink [animation-delay:-3.5s] sm:flex motion-reduce:animate-none">
        <TelegramLogo className="size-7" />
        Canal oficial
      </div>
    </div>
  )
}

function NewArrivalCard({ model, index }: { model: Model; index: number }) {
  return (
    <>
      <div className="relative aspect-[5/4] overflow-hidden rounded-[22px]">
        <ModelPhoto model={model} index={index} eager />
        <span className="glass-photo absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-ink">
          Nueva
        </span>
      </div>
      <div className="flex items-end justify-between gap-2 px-2.5 pt-3 pb-1.5">
        <div className="min-w-0">
          <p className="text-xs text-ink-soft">Recién llegada</p>
          <p className="truncate text-xl font-semibold tracking-tight text-ink">{model.name}</p>
        </div>
        <a
          href={telegramFor(model)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver a ${model.name} en Telegram`}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-white/80 text-[#229ed9] ring-1 ring-ink/5 transition hover:bg-white"
        >
          <TelegramPlane className="size-4" />
        </a>
      </div>
    </>
  )
}

/** Tira de miniaturas que va rotando, como el "EarPods X 1/4" de la referencia. */
function ThumbStrip() {
  const models = site.models
  const reduceMotion = usePrefersReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => setCurrent((c) => (c + 1) % models.length), 2800)
    return () => window.clearInterval(timer)
  }, [models.length, reduceMotion])

  const visible = [0, 1, 2].map((offset) => (current + offset) % models.length)

  return (
    <a
      href="#modelos"
      aria-label="Ver todas las modelos"
      className="glass flex items-center gap-2 rounded-[26px] p-2 pl-4 transition hover:bg-white/60"
    >
      <div className="mr-auto">
        <p className="text-sm font-semibold text-ink">Modelos</p>
        <p className="text-xs text-ink-soft tabular-nums">
          {current + 1}/{models.length}
        </p>
      </div>
      {visible.map((modelIndex, slot) => (
        <span
          key={slot}
          className={cx(
            "relative size-14 shrink-0 overflow-hidden rounded-[18px] ring-2",
            slot === 0 ? "ring-brand-pink" : "ring-white/70",
          )}
        >
          {/* la key hace que la miniatura entre con un fundido al cambiar */}
          <span
            key={modelIndex}
            className="absolute inset-0 animate-in duration-700 fade-in zoom-in-110 motion-reduce:animate-none"
            style={{ animationDelay: `${slot * 90}ms`, animationFillMode: "both" }}
          >
            <ModelPhoto model={models[modelIndex]} index={modelIndex} />
          </span>
        </span>
      ))}
    </a>
  )
}
