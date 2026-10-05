import { motion } from 'motion/react'
import { ArrowsClockwiseIcon, CheckIcon, WifiSlashIcon } from '@phosphor-icons/react'
import { STATUS_CLASSES, STATUS_LABEL } from '../status'
import { usePlayOnView } from '../usePlayOnView'
import { TIMES } from '../../data/casamento'

/* Uses the app's own offline wording: "N ações sem conexão", then
   "sincronizando…". The time kept is the tap, not the sync. */
export function OfflineDemo() {
  // 1: marked offline, queued · 2: connection back, syncing · 3: synced
  const { ref, step, reduce } = usePlayOnView([800, 2000, 2900], { wideOffset: 3000 })
  const done = step >= 1
  const status = done ? 'done' : 'doing'

  const indicator =
    step >= 3
      ? { icon: CheckIcon, text: 'sincronizado', className: 'text-state-done' }
      : step === 2
        ? { icon: ArrowsClockwiseIcon, text: 'sincronizando…', className: 'text-mist' }
        : step === 1
          ? { icon: WifiSlashIcon, text: '1 ação sem conexão', className: 'text-amber' }
          : { icon: WifiSlashIcon, text: 'sem conexão', className: 'text-amber' }

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Sem conexão, a cena Primeiro beijo é marcada como feita às ${TIMES.kissOffline} e fica na fila como 1 ação sem conexão. Quando a conexão volta, ela é sincronizada com a equipe, mantendo o horário do toque.`}
      className="rounded-lg border border-white/8 px-3 py-2.5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-paper">Primeiro beijo</span>
        <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] tracking-wide ${STATUS_CLASSES[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        <span className={`flex items-center gap-1.5 ${indicator.className}`}>
          <indicator.icon size={13} weight="bold" aria-hidden="true" />
          {indicator.text}
        </span>
        {done ? (
          <motion.span
            className="tabular text-mist-dim"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Concluído {TIMES.kissOffline}
          </motion.span>
        ) : null}
      </div>
    </div>
  )
}
