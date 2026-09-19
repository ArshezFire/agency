/** Fondo fijo: manchas de color suaves para que el glass tenga algo que desenfocar. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      <div className="absolute -top-[22vmax] -left-[16vmax] size-[62vmax] rounded-full bg-[radial-gradient(closest-side,rgb(255_79_167/0.3),transparent)]" />
      <div className="absolute top-[4vmax] -right-[20vmax] size-[64vmax] rounded-full bg-[radial-gradient(closest-side,rgb(123_63_228/0.24),transparent)]" />
      <div className="absolute -bottom-[28vmax] left-[12vmax] size-[62vmax] rounded-full bg-[radial-gradient(closest-side,rgb(197_74_208/0.22),transparent)]" />
      <div className="bg-noise absolute inset-0 opacity-[0.05]" />
    </div>
  )
}
