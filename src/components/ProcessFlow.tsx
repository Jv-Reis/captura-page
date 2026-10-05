import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from './Reveal'

const STEPS = [
  {
    title: 'Cole o roteiro',
    body: 'Texto solto, do jeito que você já escreve para a cobertura.',
  },
  {
    title: 'A IA organiza, você revisa',
    body: 'Fases e cenas, com o que capturar em cada uma. Nada vai ao ar sem sua revisão.',
  },
  {
    title: 'Publique o link',
    body: 'Um link único. No modo padrão, a equipe em campo entra sem criar conta.',
  },
  {
    title: 'Acompanhe ao vivo',
    body: 'Cada cena muda de status em todos os aparelhos. Depois, o relatório mostra quais cenas demoraram mais entre gravar e postar.',
    live: true,
  },
]

export function ProcessFlow() {
  const reduce = useReducedMotion()

  return (
    <section id="como-funciona" className="scroll-mt-20 border-t border-white/8 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-paper text-balance md:text-4xl">
            Do roteiro solto ao link ao vivo da equipe.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist">
            Quatro passos entre colar o texto e ver a equipe inteira rodando o
            mesmo checklist em campo.
          </p>
        </Reveal>

        {/* Timeline: horizontal track on desktop, vertical track on mobile. */}
        <ol className="relative mt-16 grid gap-10 pl-8 md:grid-cols-4 md:gap-8 md:pl-0 md:pt-10">
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10 md:inset-x-0 md:bottom-auto md:left-0 md:top-[5px] md:h-px md:w-auto" />
          <motion.span
            aria-hidden="true"
            className="absolute left-[5px] top-2 hidden h-px origin-left bg-amber md:right-0 md:top-[5px] md:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {STEPS.map((step, index) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-8 top-1.5 size-[11px] rounded-full border-2 md:-top-10 md:left-0 ${
                  step.live ? 'border-state-live bg-state-live' : 'border-amber bg-ink'
                }`}
              />
              <p className="tabular font-mono text-xs text-mist-dim">
                Passo {index + 1}
                {step.live ? <span className="ml-2 text-state-live">AO VIVO</span> : null}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-paper">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
