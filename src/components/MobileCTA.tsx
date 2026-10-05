import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { AppLink } from './AppLink'

/* Thumb-reach CTA on phones: appears once the hero is gone, and steps aside
   when the final CTA section (or anything below it) is on screen. */
export function MobileCTA() {
  const reduce = useReducedMotion()
  const [heroGone, setHeroGone] = useState(false)
  const [endReached, setEndReached] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const end = document.getElementById('comecar')
    if (!hero || !end) return

    const heroObs = new IntersectionObserver(([entry]) => setHeroGone(!entry.isIntersecting))
    const endObs = new IntersectionObserver(([entry]) =>
      setEndReached(entry.isIntersecting || entry.boundingClientRect.top < 0),
    )
    heroObs.observe(hero)
    endObs.observe(end)
    return () => {
      heroObs.disconnect()
      endObs.disconnect()
    }
  }, [])

  const visible = heroGone && !endReached

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-20 border-t border-white/8 bg-ink/90 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
          initial={reduce ? { opacity: 0 } : { y: '100%' }}
          animate={reduce ? { opacity: 1 } : { y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <AppLink className="w-full" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
