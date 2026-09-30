const HEAD_ANGLE = (28 * Math.PI) / 180

/**
 * Открытый наконечник стрелки: два «уса» от конца линии назад, вдоль касательной c2 → to.
 * size — длина «усов» в единицах viewBox.
 */
export function arrowHead([cx, cy], [x, y], size = 20) {
  const len = Math.hypot(x - cx, y - cy) || 1
  const dx = (x - cx) / len
  const dy = (y - cy) / len
  const wing = (sign) => {
    const a = sign * HEAD_ANGLE
    const rx = dx * Math.cos(a) - dy * Math.sin(a)
    const ry = dx * Math.sin(a) + dy * Math.cos(a)
    return `${(x - rx * size).toFixed(1)} ${(y - ry * size).toFixed(1)}`
  }
  return `M${wing(1)} L${x} ${y} L${wing(-1)}`
}
