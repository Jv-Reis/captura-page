export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <g fill="#ffd400" opacity="0.92">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <polygon key={angle} points="22,22 22,4 30,9" transform={`rotate(${angle} 22 22)`} />
        ))}
      </g>
      <circle cx="22" cy="22" r="6.5" fill="#0a0a0b" />
      <circle cx="22" cy="22" r="6.5" fill="none" stroke="#ff3b4e" strokeWidth="1.5" />
    </svg>
  )
}

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="font-display text-lg font-semibold tracking-tight text-paper">
        CAPTURA
      </span>
    </div>
  )
}
