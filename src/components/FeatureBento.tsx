import type { ReactNode } from 'react'
import { ClockCountdownIcon, LockSimpleIcon, NotebookIcon, TimerIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { Reveal } from './Reveal'
import { GoogleDemo } from './features/GoogleDemo'
import { LiveTeamDemo } from './features/LiveTeamDemo'
import { MissionsDemo } from './features/MissionsDemo'
import { OfflineDemo } from './features/OfflineDemo'

const SUPPORTING: { icon: Icon; title: string; body: string }[] = [
  {
    icon: ClockCountdownIcon,
    title: '4 estados, com horário',
    body: 'Não iniciado, em andamento, feito e postado. Cada mudança registra o horário, automaticamente.',
  },
  {
    icon: NotebookIcon,
    title: 'Observações compartilhadas',
    body: 'Um bloco de notas da equipe, em tempo real. Dono e editores escrevem, todo mundo lê.',
  },
  {
    icon: TimerIcon,
    title: 'Relatório de gargalo',
    body: 'Depois do evento, veja quanto tempo cada cena levou entre ser gravada e ser postada, e quais travaram a fila.',
  },
]

export function FeatureBento() {
  return (
    <section id="recursos" className="scroll-mt-20 border-t border-white/8 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight text-paper text-balance md:text-4xl">
          Feito para rodar em campo, sob pressão.
        </h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Lead feature: the whole team, live. */}
          <Reveal className="lg:col-span-12">
            <div className="grid gap-10 rounded-2xl border border-amber/20 bg-gradient-to-br from-amber-dim to-ink-2 p-6 sm:p-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-center md:gap-12 md:p-10">
              <div>
                <h3 className="font-display text-2xl font-bold text-paper text-balance md:text-3xl">
                  Progresso em tempo real
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-mist">
                  Quando alguém marca uma cena no celular, a equipe inteira vê
                  na hora, em qualquer aparelho, sem recarregar a página, com
                  o horário de cada mudança.
                </p>
              </div>
              <LiveTeamDemo />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <FeatureCell
              title="Agenda e pastas do evento, prontas"
              body="Com o Google conectado, o evento entra na sua agenda e na de quem da equipe autorizar, e se atualiza quando algo muda. Com um clique, a CAPTURA cria no seu Drive a pasta do evento, com uma subpasta para cada fase do roteiro."
              note={
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-mist-dim">
                  <LockSimpleIcon size={14} weight="bold" className="mt-px shrink-0" aria-hidden="true" />
                  A CAPTURA só acessa as pastas que ela mesma criou. Nunca lê o resto do seu Drive.
                </p>
              }
            >
              <GoogleDemo />
            </FeatureCell>
          </Reveal>

          <div className="grid gap-5 lg:col-span-5">
            <Reveal delay={0.1}>
              <FeatureCell
                title="Missões"
                body="Momentos soltos, sem ordem fixa, pra flagrar a qualquer hora."
              >
                <MissionsDemo />
              </FeatureCell>
            </Reveal>
            <Reveal delay={0.15}>
              <FeatureCell
                title="Caiu o sinal? Continue marcando."
                body="As cenas que você marcar ficam salvas no seu aparelho e chegam para a equipe assim que a conexão voltar. Vale para eventos que você já abriu com internet nesse aparelho."
              >
                <OfflineDemo />
              </FeatureCell>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-10 border-t border-white/8 pt-10 md:grid-cols-3 md:gap-8">
          {SUPPORTING.map((item) => (
            <li key={item.title} className="flex gap-4">
              <item.icon size={22} weight="bold" className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
              <div>
                <h3 className="font-display text-base font-semibold text-paper">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FeatureCell({
  title,
  body,
  note,
  children,
}: {
  title: string
  body: string
  note?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-ink-2 p-6 sm:p-7">
      <h3 className="font-display text-lg font-semibold text-paper text-balance">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-mist">{body}</p>
      {note}
      <div className="mt-6 flex flex-1 flex-col">{children}</div>
    </div>
  )
}
