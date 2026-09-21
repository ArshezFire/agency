import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel"
import { Button, Link } from "@heroui/react"
import { ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react"
import { site, telegramFor, type Model } from "../config/site"
import { cx } from "../lib/cx"
import { usePrefersReducedMotion } from "../lib/hooks"
import { ModelPhoto } from "../components/ModelPhoto"
import { Reveal } from "../components/Reveal"
import { Eyebrow } from "../components/ui"

// Cuánto se encogen/atenúan las tarjetas que no están en el centro.
const TWEEN_FACTOR_BASE = 0.42
const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1)

export function Models() {
  const reduceMotion = usePrefersReducedMotion()
  const plugins = useMemo(
    () => (reduceMotion ? [] : [Autoplay({ delay: 3800, stopOnInteraction: false, stopOnMouseEnter: true })]),
    [reduceMotion],
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, plugins)
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  // Efecto "coverflow" suave: escala y opacidad según la distancia al centro.
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<(HTMLElement | null)[]>([])

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map((node) => node.querySelector<HTMLElement>("[data-tween]"))
  }, [])

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  const tween = useCallback((api: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = api.internalEngine()
    const progress = api.scrollProgress()
    const inView = api.slidesInView()
    const isScroll = eventName === "scroll"

    api.scrollSnapList().forEach((snap, snapIndex) => {
      let diff = snap - progress
      engine.slideRegistry[snapIndex].forEach((slideIndex) => {
        if (isScroll && !inView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()
            if (slideIndex === loopItem.index && target !== 0) {
              diff = Math.sign(target) === -1 ? snap - (1 + progress) : snap + (1 - progress)
            }
          })
        }

        const t = clamp01(1 - Math.abs(diff * tweenFactor.current))
        const node = tweenNodes.current[slideIndex]
        if (node) {
          node.style.transform = `scale(${0.84 + 0.16 * t})`
          node.style.opacity = String(0.5 + 0.5 * t)
        }
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    const onInit = () => {
      setSnapCount(emblaApi.scrollSnapList().length)
      onSelect()
    }

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tween(emblaApi)
    onInit()

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tween)
      .on("reInit", onInit)
      .on("scroll", tween)
      .on("slideFocus", tween)
      .on("select", onSelect)

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tween)
        .off("reInit", onInit)
        .off("scroll", tween)
        .off("slideFocus", tween)
        .off("select", onSelect)
    }
  }, [emblaApi, setTweenNodes, setTweenFactor, tween])

  return (
    <section id="modelos" className="relative py-12 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow>Nuestras modelos</Eyebrow>
          <h2 className="mt-4 text-[2.6rem] leading-[1.02] font-black tracking-[-0.035em] text-ink sm:text-6xl">
            Conoce a las <span className="text-gradient">favoritas</span>
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed font-medium text-ink-soft">
            Desliza y descubre a la que más te guste. Cada una tiene contenido exclusivo esperándote en Telegram.
          </p>
        </Reveal>

        <div className="hidden gap-2 md:flex">
          <Button
            isIconOnly
            aria-label="Modelo anterior"
            onPress={() => emblaApi?.scrollPrev()}
            className="glass-strong size-12 rounded-full text-ink"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            isIconOnly
            aria-label="Modelo siguiente"
            onPress={() => emblaApi?.scrollNext()}
            className="glass-strong size-12 rounded-full text-ink"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>

      <Reveal delay={0.1} className="mx-auto mt-10 max-w-[1600px]">
        <div
          ref={emblaRef}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Modelos"
          className="overflow-hidden pt-4 pb-12 lg:[mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
        >
          <div className="flex touch-pan-y touch-pinch-zoom">
            {site.models.map((model, i) => (
              <div
                key={model.name}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${site.models.length}: ${model.name}`}
                className="min-w-0 shrink-0 grow-0 basis-[76%] px-2 sm:basis-[44%] md:basis-[34%] lg:basis-[27%] xl:basis-[23%]"
              >
                <div data-tween className="will-change-transform">
                  <ModelCard model={model} index={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: snapCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a ${site.models[i]?.name ?? `la modelo ${i + 1}`}`}
            aria-current={i === selected ? "true" : undefined}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cx(
              "h-2 cursor-pointer rounded-full transition-all duration-500",
              i === selected ? "w-8 bg-gradient-brand" : "w-2 bg-ink/15 hover:bg-ink/30",
            )}
          />
        ))}
      </div>
    </section>
  )
}

function ModelCard({ model, index }: { model: Model; index: number }) {
  return (
    <article className="group relative aspect-[3/4.2] overflow-hidden rounded-[32px] shadow-float ring-1 ring-white/70">
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <ModelPhoto model={model} index={index} />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/25 to-transparent" />

      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <span className="glass-dark inline-flex items-center gap-1 rounded-full py-1 pr-2.5 pl-1.5 text-[11px] font-extrabold text-white">
          <BadgeCheck className="size-3.5" />
          Verificada
        </span>
        {model.isNew && (
          <span className="rounded-full bg-gradient-brand px-2.5 py-1 text-[11px] font-extrabold text-white shadow-glow">
            Nueva
          </span>
        )}
      </div>

      <div className="glass-photo absolute inset-x-3 bottom-3 rounded-[24px] p-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[28px] leading-none font-black tracking-[-0.03em] text-ink">{model.name}</h3>
            <p className="mt-1.5 truncate text-[13px] font-semibold text-ink-soft">{model.tagline}</p>
          </div>
          <Link
            href={telegramFor(model)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver a ${model.name} en Telegram`}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-brand text-white no-underline shadow-glow transition-transform duration-300 hover:rotate-45 hover:no-underline"
          >
            <ArrowUpRight className="size-5" />
          </Link>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {model.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white/70 px-2.5 py-0.5 text-[11px] font-bold text-ink-soft ring-1 ring-white"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
