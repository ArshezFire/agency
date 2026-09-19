import type { Model } from "../config/site"
import { cx } from "../lib/cx"
import { placeholderGradient } from "../lib/placeholder"

type Props = {
  model: Model
  /** Posición de la modelo en la lista (elige el degradado de reserva). */
  index: number
  className?: string
  /** Muestra la inicial sobre el degradado de reserva. */
  initial?: boolean
  eager?: boolean
}

/** Foto de la modelo, o un degradado con su inicial si todavía no tiene foto. */
export function ModelPhoto({ model, index, className, initial = true, eager = false }: Props) {
  if (model.photo) {
    return (
      <img
        src={model.photo}
        alt={model.name}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className={cx("absolute inset-0 size-full object-cover", className)}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={model.name}
      className={cx("@container absolute inset-0 overflow-hidden", className)}
      style={{ backgroundImage: placeholderGradient(index) }}
    >
      {initial && (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center pb-[8%] font-display text-[58cqw] leading-none text-white/80 italic"
        >
          {model.name.charAt(0)}
        </span>
      )}
      <div aria-hidden="true" className="bg-noise absolute inset-0 opacity-25 mix-blend-overlay" />
    </div>
  )
}
