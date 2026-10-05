import { CheckIcon, MinusIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { Reveal } from './Reveal'

const DOES = [
  'Organiza o roteiro que você escreveu em fases e cenas',
  'Acompanha a equipe inteira ao vivo, em campo',
  'Registra o horário de cada cena',
]

const LEAVES_OUT = [
  'Escrever o roteiro por você: a IA não inventa falas nem cenas',
  'Editar ou guardar suas fotos e vídeos',
  'Contrato e orçamento com o cliente (não é CRM)',
]

export function HonestySection() {
  return (
    <section id="para-quem" className="scroll-mt-20 border-t border-white/8 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-paper text-balance md:text-4xl">
            Feito para quem já tem roteiro.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist">
            A CAPTURA organiza e acompanha a cobertura. O resto continua nas
            ferramentas que você já usa.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-white/8">
            <List title="A CAPTURA faz" items={DOES} icon={CheckIcon} accent className="md:pr-12" />
            <List title="Fica de fora" items={LEAVES_OUT} icon={MinusIcon} className="md:pl-12" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function List({
  title,
  items,
  icon: ItemIcon,
  accent = false,
  className = '',
}: {
  title: string
  items: string[]
  icon: Icon
  accent?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <h3 className={`font-display text-lg font-semibold ${accent ? 'text-paper' : 'text-mist'}`}>{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-mist md:text-base">
            <span
              aria-hidden="true"
              className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-full ${
                accent ? 'bg-amber-dim text-amber' : 'bg-white/[0.06] text-mist-dim'
              }`}
            >
              <ItemIcon size={12} weight="bold" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
