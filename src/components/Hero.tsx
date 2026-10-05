import { motion, useReducedMotion } from 'motion/react'
import { AppLink } from './AppLink'
import { HeroMonitor } from './HeroMonitor'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative scroll-mt-20">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-5 pb-20 pt-12 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-center md:pb-24 md:pt-20 lg:gap-16">
        <div>
          <h1 className="font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.025em] text-paper text-balance md:text-5xl lg:text-[4rem]">
            Seu roteiro vira checklist ao vivo.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-mist md:text-lg">
            Cole o roteiro que você escreve. A IA organiza em fases e cenas. Sua
            equipe acompanha ao vivo, em campo.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <AppLink />
            <a
              href="#como-funciona"
              className="inline-flex items-center rounded-full border border-white/12 px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Ver como funciona
            </a>
          </div>

          <p className="mt-5 max-w-md text-sm text-mist-dim text-pretty">
            Grátis durante a validação. No modo padrão, sua equipe entra só
            pelo link, sem criar conta.
          </p>
        </div>

        <motion.div
          className="flex justify-center md:justify-end"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <HeroMonitor />
        </motion.div>
      </div>
    </section>
  )
}
