import type { ReactNode } from "react"
import { ArrowUpRight, BadgeCheck, CalendarHeart, Crown, LockKeyhole, ShieldCheck } from "lucide-react"
import { site, telegramFor } from "../config/site"
import { cx } from "../lib/cx"
import { ModelPhoto } from "../components/ModelPhoto"
import { Reveal } from "../components/Reveal"
import { Eyebrow } from "../components/ui"

// Relleno del nombre gigante mientras la modelo destacada no tenga foto.
const SPOTLIGHT_PLACEHOLDER =
  "radial-gradient(55% 90% at 12% 18%, rgb(255 190 225 / 0.95), transparent 62%), radial-gradient(45% 80% at 88% 85%, #ff4fa7, transparent 70%), linear-gradient(115deg, #2b0d4a 0%, #6d28d9 36%, #c54ad0 62%, #3a1466 100%)"

export function About() {
  const { spotlight } = site
  return (
    <section id="agencia" className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
      {/* Modelo destacada: su nombre gigante relleno con su foto */}
      <Reveal className="glass rounded-[36px] p-4 sm:p-6 lg:p-8">
        <SpotlightName name={spotlight.name} photo={spotlight.photo} />

        <div className="mt-6 flex flex-col gap-5 px-1 sm:mt-8 sm:px-2 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Modelo destacada</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-[2.4rem] leading-[1.02] font-black tracking-[-0.035em] text-ink sm:text-6xl">
              La favorita de nuestra <span className="text-gradient">comunidad.</span>
            </h2>
          </div>
          <div className="flex max-w-xs flex-col items-start gap-4 md:items-end md:text-right">
            <p className="text-[15px] leading-relaxed font-medium text-ink-soft">{spotlight.text}</p>
            <a
              href={telegramFor(spotlight)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink pr-2 pl-5 text-sm font-extrabold text-white transition hover:bg-brand-plum"
            >
              Ver más de {spotlight.name}
              <span className="grid size-8 place-items-center rounded-full bg-white/15">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </Reveal>

      {/* Bento */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BentoCard className="flex flex-col sm:col-span-2 lg:row-span-2" delay={0}>
          <IconTile>
            <Crown className="size-5" />
          </IconTile>
          <h3 className="mt-5 max-w-md text-2xl leading-tight font-black tracking-tight text-ink sm:text-[28px]">
            El puente entre las creadoras y sus fans
          </h3>
          <p className="mt-3 max-w-lg leading-relaxed font-medium text-ink-soft">
            Gestionamos la carrera de creadoras de contenido independientes: estrategia, imagen y seguridad. Tú solo
            eliges a tu favorita; nosotros nos aseguramos de que llegues a ella por el canal oficial.
          </p>
          <PhotoFan />
        </BentoCard>

        <BentoCard delay={0.08}>
          <IconTile>
            <ShieldCheck className="size-5" />
          </IconTile>
          <h3 className="mt-5 text-lg font-black tracking-tight text-ink">Perfiles verificados</h3>
          <p className="mt-2 text-[15px] leading-relaxed font-medium text-ink-soft">
            Cada modelo pasa por verificación de identidad y edad. Solo perfiles reales, siempre mayores de 18.
          </p>
        </BentoCard>

        <BentoCard delay={0.14}>
          <IconTile>
            <LockKeyhole className="size-5" />
          </IconTile>
          <h3 className="mt-5 text-lg font-black tracking-tight text-ink">Privacidad total</h3>
          <p className="mt-2 text-[15px] leading-relaxed font-medium text-ink-soft">
            No te pedimos datos ni registros. Entras a nuestro canal de Telegram y listo.
          </p>
        </BentoCard>

        <BentoCard className="flex flex-col justify-between gap-6 sm:col-span-2" delay={0.2}>
          <div className="flex items-start gap-4">
            <IconTile>
              <CalendarHeart className="size-5" />
            </IconTile>
            <div>
              <h3 className="text-lg font-black tracking-tight text-ink">Contenido nuevo cada día</h3>
              <p className="mt-1 text-[15px] leading-relaxed font-medium text-ink-soft">
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
                <span className="text-gradient text-4xl leading-none font-black tracking-tight sm:text-5xl">
                  0{i + 1}
                </span>
                <div className="sm:mt-4">
                  <h4 className="font-black text-ink">{step.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed font-medium text-ink-soft">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </BentoCard>

        <BentoCard className="flex flex-col overflow-hidden sm:col-span-2 lg:col-span-1" delay={0.18}>
          <Eyebrow>Categorías</Eyebrow>
          <h3 className="mt-3 text-lg font-black tracking-tight text-ink">Para todos los gustos</h3>
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

/** Nombre en letras gigantes con una sola foto de fondo recortada por las letras. */
function SpotlightName({ name, photo }: { name: string; photo?: string }) {
  const letters = Array.from(name.toUpperCase())
  return (
    <div className="@container">
      <p
        role="img"
        aria-label={name}
        className="flex justify-between bg-cover bg-center bg-clip-text font-poster leading-[0.84] text-transparent select-none [-webkit-text-fill-color:transparent]"
        style={{
          fontSize: `calc(100cqw / ${Math.max(letters.length, 3) * 0.5})`,
          backgroundImage: photo ? `url("${photo}")` : SPOTLIGHT_PLACEHOLDER,
        }}
      >
        {letters.map((letter, i) => (
          <span key={i} aria-hidden="true">
            {letter}
          </span>
        ))}
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
            "absolute bottom-0 aspect-[3/4] w-[38%] max-w-[190px] overflow-hidden rounded-[24px] shadow-float ring-4 ring-white/80 transition-[translate,rotate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:w-[34%]",
            placement[i],
          )}
        >
          <ModelPhoto model={model} index={i} />
        </div>
      ))}
      <span className="glass-strong absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full py-1.5 pr-3.5 pl-1.5 text-xs font-extrabold whitespace-nowrap text-ink">
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
          className="grid aspect-square w-full max-w-11 place-items-center rounded-full bg-gradient-brand text-xs font-black text-white shadow-glow"
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
          className="rounded-full bg-white/75 px-3.5 py-1.5 text-sm font-bold whitespace-nowrap text-ink ring-1 ring-white"
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
