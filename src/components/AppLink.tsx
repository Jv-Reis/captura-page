import type { ReactNode } from 'react'
import { ArrowUpRightIcon } from '@phosphor-icons/react'

export const APP_URL = 'https://captura-checklist.onrender.com'

const SIZES = {
  sm: 'px-5 py-2.5',
  md: 'px-6 py-3.5',
  lg: 'px-7 py-4',
} as const

export function AppLink({
  size = 'md',
  className = '',
  onClick,
  children = 'Começar agora',
}: {
  size?: keyof typeof SIZES
  className?: string
  onClick?: () => void
  children?: ReactNode
}) {
  return (
    <a
      href={APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-amber text-sm font-semibold text-amber-ink transition-[background-color,transform] duration-200 hover:bg-amber-strong active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${SIZES[size]} ${className}`}
    >
      {children}
      <ArrowUpRightIcon
        size={16}
        weight="bold"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
      />
      <span className="sr-only">(abre o app em nova aba)</span>
    </a>
  )
}
