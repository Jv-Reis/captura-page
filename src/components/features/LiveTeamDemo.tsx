import { motion } from 'motion/react'
import { CameraIcon, DeviceMobileIcon, VideoCameraIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { STATUS_CLASSES, STATUS_LABEL, type SceneStatus } from '../status'
import { usePlayOnView } from '../usePlayOnView'
import { CAPTURED_BEFORE_RINGS, COUPLE, PHASES, TIMES, progressLabel } from '../../data/casamento'

// Illustration only: the people who share the link, as they work on the day.
const MEMBERS: { role: string; icon: Icon }[] = [
  { role: 'cinegrafista', icon: VideoCameraIcon },
  { role: 'fotógrafo', icon: CameraIcon },
  { role: 'redes sociais', icon: DeviceMobileIcon },
]

type Card = { title: string; status: SceneStatus; times: string }

/* The app's field screen: fixed top with progress, sync and phases, then
   scene cards with their status and the times of each change. */
export function LiveTeamDemo() {
  // 1: troca de alianças marked Feito · 2: chegada da noiva marked Postado
  const { ref, step, reduce } = usePlayOnView([900, 2300])
  const ringsDone = step >= 1
  const arrivalPosted = step >= 2

  const cards: (Card & { updated: boolean })[] = [
    {
      title: 'Chegada da noiva',
      status: arrivalPosted ? 'posted' : 'done',
      times: arrivalPosted
        ? `Concluído ${TIMES.arrivalDone} · Postado ${TIMES.arrivalPosted}`
        : `Concluído ${TIMES.arrivalDone}`,
      updated: arrivalPosted,
    },
    {
      title: 'Troca de alianças',
      status: ringsDone ? 'done' : 'doing',
      times: ringsDone
        ? `Iniciado ${TIMES.ringsStarted} · Concluído ${TIMES.ringsDone}`
        : `Iniciado ${TIMES.ringsStarted}`,
      updated: ringsDone && !arrivalPosted,
    },
    { title: 'Primeiro beijo', status: 'todo', times: '', updated: false },
  ]

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Tela de campo da CAPTURA: quando a troca de alianças é marcada como feita e a chegada da noiva como postada, o progresso sobe para 4 de 6 cenas e a equipe inteira vê na hora, com o horário de cada mudança."
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink shadow-panel">
        <div className="border-b border-white/8 px-4 pb-3 pt-3.5">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate font-display text-sm font-semibold text-paper">{COUPLE}</p>
            <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-state-done">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-state-done" />
              sincronizado
            </span>
          </div>
          <p className="tabular mt-1 font-mono text-xs text-mist">
            {progressLabel(CAPTURED_BEFORE_RINGS + (ringsDone ? 1 : 0))}
          </p>
          <div className="mt-3 flex gap-1.5">
            {PHASES.map((phase) => (
              <span
                key={phase}
                className={`rounded-full px-2.5 py-1 text-[11px] ${
                  phase === 'Cerimônia' ? 'bg-amber-dim text-amber' : 'bg-white/[0.05] text-mist-dim'
                }`}
              >
                {phase}
              </span>
            ))}
          </div>
        </div>

        <ul className="flex flex-col gap-1.5 p-2">
          {cards.map((card) => (
            <li key={card.title} className="relative overflow-hidden rounded-lg border border-white/8 px-3 py-2.5">
              {card.updated && !reduce ? (
                <motion.span
                  key={card.status}
                  aria-hidden="true"
                  className="absolute inset-0 bg-state-done/10"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                />
              ) : null}
              <div className="relative flex items-center justify-between gap-3">
                <span className="text-sm text-paper">{card.title}</span>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[11px] tracking-wide ${STATUS_CLASSES[card.status]}`}>
                  {STATUS_LABEL[card.status]}
                </span>
              </div>
              {card.times ? <p className="tabular relative mt-1 text-xs text-mist-dim">{card.times}</p> : null}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs text-mist-dim">Todo mundo no mesmo link:</span>
        {MEMBERS.map((member) => (
          <span
            key={member.role}
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs text-mist"
          >
            <member.icon size={13} weight="bold" className="text-mist-dim" />
            {member.role}
          </span>
        ))}
      </div>
    </div>
  )
}
