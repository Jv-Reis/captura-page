import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

/* Plays a short demo sequence once, the first time it scrolls into view.
   `delays` are ms from that moment; step N is reached after delays[N - 1].
   `wideOffset` delays the start on screens ≥1024px. Reduced motion jumps
   straight to the final step. */
export function usePlayOnView<T extends Element = HTMLDivElement>(
  delays: number[],
  { amount = 0.6, wideOffset = 0 }: { amount?: number; wideOffset?: number } = {},
) {
  const reduce = !!useReducedMotion()
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, amount })
  const final = delays.length
  const [step, setStep] = useState(0)
  const key = delays.join(',')

  useEffect(() => {
    if (reduce || !inView) return
    // On wide screens several demos enter view together; offset staggers them.
    const offset = wideOffset && window.matchMedia('(min-width: 1024px)').matches ? wideOffset : 0
    const ids = key.split(',').map((ms, i) => window.setTimeout(() => setStep(i + 1), Number(ms) + offset))
    return () => ids.forEach((id) => window.clearTimeout(id))
  }, [inView, reduce, key, wideOffset])

  return { ref, step: reduce ? final : step, reduce }
}
