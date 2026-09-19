import type { ReactNode } from "react"
import { Link, buttonVariants } from "@heroui/react"
import { ArrowUpRight } from "lucide-react"
import { site } from "../config/site"
import { cx } from "../lib/cx"
import { Sparkle, TelegramLogo, TelegramPlane } from "./icons"

/** Logotipo en texto (sin el logo de la marca). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
        <Sparkle className="size-3.5" />
      </span>
      <span className="font-display text-[28px] leading-none tracking-tight text-ink">{site.name}</span>
    </span>
  )
}

/** Etiqueta pequeña sobre los títulos de sección. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("flex items-center gap-2 text-sm font-medium text-ink-soft", className)}>
      <span className="size-1.5 rounded-full bg-gradient-brand" />
      {children}
    </p>
  )
}

type TelegramButtonProps = {
  children: ReactNode
  href?: string
  /** glass: píldora blanca translúcida · gradient: píldora rosa → morado */
  variant?: "glass" | "gradient"
  size?: "sm" | "md" | "lg"
  className?: string
}

/** Botón que abre Telegram en otra pestaña. */
export function TelegramButton({
  children,
  href = site.telegram.channel,
  variant = "glass",
  size = "md",
  className,
}: TelegramButtonProps) {
  const external = { href, target: "_blank", rel: "noopener noreferrer" }

  if (variant === "gradient") {
    return (
      <Link
        {...external}
        className={cx(
          buttonVariants({ size: "lg" }),
          "group/tg relative gap-2.5 overflow-hidden rounded-full bg-gradient-brand font-semibold text-white shadow-glow",
          "transition-[translate,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:no-underline",
          size === "sm" && "h-10 pr-4 pl-1.5 text-sm",
          size === "md" && "h-13 pr-6 pl-2 text-[15px]",
          size === "lg" && "h-15 pr-7 pl-2 text-base",
          className,
        )}
      >
        <span
          className={cx(
            "grid shrink-0 place-items-center rounded-full bg-white/20 ring-1 ring-white/40",
            size === "sm" ? "size-7" : "size-10",
          )}
        >
          <TelegramPlane className={cx("m-0", size === "sm" ? "size-3.5" : "size-[18px]")} />
        </span>
        {children}
        <Shine />
      </Link>
    )
  }

  return (
    <Link
      {...external}
      className={cx(
        buttonVariants({ size: "lg" }),
        "glass-strong group/tg relative gap-3 overflow-hidden rounded-full font-semibold text-ink",
        "transition-[translate,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:no-underline",
        "hover:shadow-[var(--shadow-glass),0_18px_40px_-16px_rgb(197_74_208/0.55)]",
        size === "sm" && "h-11 gap-2 pr-4 pl-1.5 text-sm",
        size === "md" && "h-14 pr-2 pl-2 text-[15px]",
        size === "lg" && "h-[72px] pr-2.5 pl-2.5 text-base sm:text-lg",
        className,
      )}
    >
      <TelegramLogo
        className={cx(
          "m-0 shrink-0 drop-shadow-[0_6px_12px_rgb(0_125_187/0.35)]",
          size === "sm" ? "size-8" : size === "md" ? "size-10" : "size-[52px]",
        )}
      />
      <span className={cx(size === "sm" ? "" : "pr-1")}>{children}</span>
      {size !== "sm" && (
        <span
          className={cx(
            "grid shrink-0 place-items-center rounded-full bg-gradient-brand text-white shadow-glow transition-transform duration-300 group-hover/tg:rotate-45",
            size === "md" ? "size-10" : "size-[52px]",
          )}
        >
          <ArrowUpRight className="m-0 size-5" />
        </span>
      )}
      <Shine />
    </Link>
  )
}

/** Brillo que cruza el botón cada pocos segundos. */
function Shine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-linear-to-r from-transparent via-white/45 to-transparent motion-reduce:hidden"
      style={{ transform: "skewX(-20deg)" }}
    />
  )
}

/** Botón circular con flecha (enlace externo o interno). */
export function ArrowLink({
  href,
  label,
  className,
  external = true,
}: {
  href: string
  label: string
  className?: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cx(
        "grid size-14 shrink-0 place-items-center rounded-full bg-gradient-brand text-white shadow-glow transition-transform duration-300 hover:rotate-45 active:scale-95",
        className,
      )}
    >
      <ArrowUpRight className="size-5" />
    </a>
  )
}
