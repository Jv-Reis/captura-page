import { CheckIcon } from '@phosphor-icons/react'
import { AppLink } from './AppLink'
import { Reveal } from './Reveal'

const ASSURANCES = [
  'Grátis enquanto validamos com equipes reais',
  'No modo padrão, a equipe entra sem criar conta',
  'Nada vai ao ar sem a sua revisão',
]

export function CTASection() {
  return (
    <section id="comecar" className="scroll-mt-20 border-t border-white/8 py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-paper text-balance md:text-5xl">
            Cole o roteiro da sua próxima cobertura.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">
            Organize em minutos e leve a equipe inteira para o mesmo checklist,
            ao vivo.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <AppLink size="lg" />
            <p className="max-w-md text-sm text-mist text-pretty">
              Sem roteiro em mãos? Use o roteiro de exemplo do app para testar.
            </p>
            <p className="text-xs text-mist-dim">Abre o app da CAPTURA em uma nova aba.</p>
          </div>

          <ul className="mx-auto mt-10 flex w-fit flex-col gap-2.5 text-left">
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-mist">
                <CheckIcon size={14} weight="bold" className="shrink-0 text-amber" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
