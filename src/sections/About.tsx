import type { ReactNode } from "react"
import { BadgeCheck, Crown, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react"
import { site } from "../config/site"
import { cx } from "../lib/cx"
import { ModelPhoto } from "../components/ModelPhoto"
import { placeholderGradient } from "../lib/placeholder"
import { Reveal } from "../components/Reveal"
import { Eyebrow } from "../components/ui"

export function About() {
  return (
    <section id="agencia" className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
      {/* Cabecera editorial con el nombre gigante relleno de fotos */}
      <Reveal className="glass rounded-[36px] p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between px-1 pb-4 text-xs font-medium text-ink-soft sm:px-2 sm:pb-6 sm:text-sm">
          <span>(01) La agencia</span>
          <span className="hidden sm:inline">Talento</span>
          <span className="hidden sm:inline">Confianza</span>
          <span>Discreción</span>
        </div>

        <Wordmark />

        <div className="mt-6 flex flex-col gap-4 px-1 sm:mt-8 sm:px-2 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-[2.6rem] leading-[1] font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
            Creadoras que te van a <em className="text-gradient font-display font-normal tracking-normal">encantar.</em>
          </h2>
          <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft md:text-right">
            Somos una agencia de talento que gestiona, cuida e impulsa a creadoras de contenido independientes.
          </p>
        </div>
      </Reveal>

      {/* Bento */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BentoCard className="flex flex-col sm:col-span-2 lg:row-span-2" delay={0}>
          <IconTile>
            <Crown className="size-5" />
          </IconTile>
          <h3 className="mt-5 max-w-md text-2xl leading-tight font-semibold tracking-tight text-ink sm:text-[28px]">
            El puente entre las creadoras y sus fans
          </h3>
          <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">
            Gestionamos la carrera de creadoras de contenido independientes: estrategia, imagen y seguridad. Tú solo
            eliges a tu favorita; nosotros nos aseguramos de que llegues a ella por el canal oficial.
          </p>
          <PhotoFan />
        </BentoCard>

        <BentoCard delay={0.08}>
          <IconTile>
            <ShieldCheck className="size-5" />
          </IconTile>
          <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">Perfiles verificados</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            Cada modelo pasa por verificación de identidad y edad. Solo perfiles reales, siempre mayores de 18.
          </p>
        </BentoCard>

        <BentoCard delay={0.14}>
          <IconTile>
            <LockKeyhole className="size-5" />
          </IconTile>
          <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">Privacidad total</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            No te pedimos datos ni registros. Entras a nuestro canal de Telegram y listo.
          </p>
        </BentoCard>

        <BentoCard className="flex flex-col justify-between gap-6 sm:col-span-2" delay={0.2}>
          <div className="flex items-start gap-4">
            <IconTile>
              <Sparkles className="size-5" />
            </IconTile>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-ink">Contenido nuevo cada día</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                Adelantos, publicaciones y novedades de nuestras modelos, todos los días de la semana.
              </p>
            </div>
          </div>
          <WeekStrip />
        </BentoCard>

        <BentoCard className="sm:col-span-2 lg:col-span-3" delay={0.1}>
          <Eyebrow>Cómo funciona</Eyebrow>
          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex items-start gap-4 rounded-[24px] bg-white/60 p-5 ring-1 ring-white sm:block"
              >
                <span className="text-gradient font-display text-4xl leading-none italic sm:text-5xl">0{i + 1}</span>
                <div className="sm:mt-4">
                  <h4 className="font-semibold text-ink">{step.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </BentoCard>

        <BentoCard className="flex flex-col overflow-hidden sm:col-span-2 lg:col-span-1" delay={0.18}>
          <Eyebrow>Categorías</Eyebrow>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">Para todos los gustos</h3>
          <div className="-mx-6 mt-6 flex flex-1 flex-col justify-center gap-2.5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] sm:-mx-7">
            <Marquee items={site.categories} />
            <Marquee items={[...site.categories].reverse()} reverse />
            <Marquee items={[...site.categories.slice(4), ...site.categories.slice(0, 4)]} />
          </div>
        </BentoCard>
      </div>
    </section>
  )
}

const STEPS = [
  { title: "Explora", text: "Conoce a nuestras modelos en la galería de abajo." },
  { title: "Elige", text: "Quédate con la que más te guste (o con todas)." },
  { title: "Únete", text: "Entra a nuestro canal de Telegram y no te pierdas nada." },
]

/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * El nombre de la agencia en letras gigantes; cada letra se rellena con la foto
 * de una modelo (o su degradado mientras no haya foto).
 */
function Wordmark() {
  const letters = Array.from(site.name.toUpperCase())
  return (
    <div className="@container">
      <p
        role="img"
        aria-label={site.name}
        className="flex justify-between font-poster leading-[0.84] select-none"
        style={{ fontSize: `calc(100cqw / ${Math.max(letters.length, 3) * 0.5})` }}
      >
        {letters.map((letter, i) => {
          const model = site.models[i % site.models.length]
          return (
            <span
              key={i}
              aria-hidden="true"
              className="bg-cover bg-center bg-clip-text text-transparent [-webkit-text-fill-color:transparent]"
              style={{ backgroundImage: model.photo ? `url("${model.photo}")` : placeholderGradient(i) }}
            >
              {letter}
            </span>
          )
        })}
      </p>
    </div>
  )
}

function BentoCard({ children, className, delay }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={cx("glass rounded-[32px] p-6 sm:p-7", className)}>
      {children}
    </Reveal>
  )
}

/** Icono en un "squircle" con degradado, como un icono de app de iOS. */
function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-[16px] bg-gradient-brand text-white shadow-glow ring-1 ring-white/40 ring-inset">
      {children}
    </span>
  )
}

function PhotoFan() {
  const picks = site.models.slice(0, 3)
  const placement = [
    "-translate-x-[58%] -rotate-[9deg] group-hover:-translate-x-[72%] group-hover:-rotate-[13deg]",
    "z-10 -translate-y-2 group-hover:-translate-y-5",
    "translate-x-[58%] rotate-[9deg] group-hover:translate-x-[72%] group-hover:rotate-[13deg]",
  ]
  return (
    <div className="group relative mt-auto flex h-52 shrink-0 items-end justify-center pt-10 sm:h-72">
      {picks.map((model, i) => (
        <div
          key={model.name}
          className={cx(
            "absolute bottom-0 aspect-[3/4] w-[38%] max-w-[190px] sm:w-[34%] overflow-hidden rounded-[24px] shadow-float ring-4 ring-white/80 transition-[translate,rotate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            placement[i],
          )}
        >
          <ModelPhoto model={model} index={i} />
        </div>
      ))}
      <span className="glass-strong absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full py-1.5 pr-3.5 pl-1.5 text-xs font-semibold whitespace-nowrap text-ink">
        <span className="grid size-6 place-items-center rounded-full bg-emerald-500 text-white">
          <BadgeCheck className="size-3.5" />
        </span>
        {site.stats[0].value} modelos verificadas
      </span>
    </div>
  )
}

function WeekStrip() {
  const days = ["L", "M", "X", "J", "V", "S", "D"]
  return (
    <div className="flex items-center justify-between gap-1.5 rounded-[22px] bg-white/60 p-2 ring-1 ring-white sm:gap-2">
      {days.map((day) => (
        <span
          key={day}
          className="grid aspect-square w-full max-w-11 place-items-center rounded-full bg-gradient-brand text-xs font-semibold text-white shadow-glow"
        >
          {day}
        </span>
      ))}
    </div>
  )
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const group = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-2 pr-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-white/75 px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-ink ring-1 ring-white"
        >
          {item}
        </li>
      ))}
    </ul>
  )
  return (
    <div
      className={cx(
        "flex w-max motion-reduce:animate-none",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
    >
      {group(false)}
      {group(true)}
    </div>
  )
}
