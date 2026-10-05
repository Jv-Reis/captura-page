import type { ReactNode } from 'react'

const CORNERS = [
  'left-0 top-0 border-l-2 border-t-2',
  'right-0 top-0 border-r-2 border-t-2',
  'left-0 bottom-0 border-l-2 border-b-2',
  'right-0 bottom-0 border-r-2 border-b-2',
]

/* Camera-viewfinder framing marks around a piece of product UI. */
export function Viewfinder({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative p-3 sm:p-4 ${className}`}>
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          className={`pointer-events-none absolute size-5 border-paper/30 ${corner}`}
        />
      ))}
      {children}
    </div>
  )
}
