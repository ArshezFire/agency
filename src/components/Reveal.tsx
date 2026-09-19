import { useEffect, useRef, type ComponentPropsWithoutRef, type CSSProperties } from "react"

// Un solo IntersectionObserver para todos los <Reveal>.
let observer: IntersectionObserver | undefined

function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute("data-shown", "")
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  )
  observer.observe(el)
  return () => observer?.unobserve(el)
}

type Props = ComponentPropsWithoutRef<"div"> & {
  /** Retraso en segundos (para escalonar tarjetas). */
  delay?: number
}

/**
 * Aparece con un fade-up al entrar en pantalla (estilos en index.css → [data-reveal]).
 * Si el contenido es "glass", pon las clases glass en este mismo elemento:
 * una opacidad animada en un padre anula el blur del hijo mientras dura.
 */
export function Reveal({ delay = 0, style, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => (ref.current ? observe(ref.current) : undefined), [])

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ ...style, "--reveal-delay": `${delay}s` } as CSSProperties}
      {...rest}
    />
  )
}
