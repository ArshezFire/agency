// Degradados de reserva mientras una modelo no tenga foto.
const PALETTES = [
  ["#ff9fd2", "#e056c1", "#7b3fe4"],
  ["#ffc2e2", "#ff5fae", "#b33fd6"],
  ["#d9c6ff", "#9b5cf0", "#5b2bc0"],
  ["#ffb3d9", "#c54ad0", "#6a35d8"],
  ["#f7c1ff", "#d24fd8", "#8a3fe0"],
  ["#c8b8ff", "#ff6fb5", "#c54ad0"],
] as const

/** Fondo CSS de reserva para la modelo en la posición `index`. */
export function placeholderGradient(index: number) {
  const [a, b, c] = PALETTES[index % PALETTES.length]
  return `radial-gradient(90% 70% at 20% 10%, rgb(255 255 255 / .55), transparent 60%), radial-gradient(80% 80% at 90% 100%, ${c}, transparent 70%), linear-gradient(160deg, ${a} 0%, ${b} 55%, ${c} 100%)`
}
