// Brand wordmark. `light` switches to the white-lettered version for dark
// surfaces; `size` sets the rendered height (width follows the 567:144 art).
const RATIO = 567 / 144

export default function Logo({ light = false, size = 36, className = '' }) {
  return (
    <img
      src={light ? '/brand/wordmark-light.webp' : '/brand/wordmark.webp'}
      alt="AL-KHOMASI"
      width={Math.round(size * RATIO)}
      height={size}
      decoding="async"
      className={`block h-auto select-none ${className}`}
      style={{ width: Math.round(size * RATIO) }}
      draggable="false"
    />
  )
}

// The petal mark on its own, for compact spots (badges, demo hubs).
export function LogoMark({ size = 20, className = '' }) {
  return (
    <img
      src="/brand/mark.webp"
      alt=""
      aria-hidden="true"
      width={Math.round(size * (320 / 196))}
      height={size}
      decoding="async"
      className={`inline-block select-none ${className}`}
      draggable="false"
    />
  )
}
