import { motion } from 'motion/react'
import { CalendarBlankIcon, FolderIcon, FolderPlusIcon } from '@phosphor-icons/react'
import { usePlayOnView } from '../usePlayOnView'
import { COUPLE, EVENT_DAY, EVENT_START, EVENT_TITLE as ROOT, PHASES } from '../../data/casamento'

const DAYS = ['qui', 'sex', 'sáb', 'dom']
// Hour rows drawn in each day column; the event runs from 13:30 into the night.
const HOURS = ['12h', '15h', '18h', '21h']

const EASE = [0.16, 1, 0.3, 1] as const

export function GoogleDemo() {
  // 1: event lands on the calendar · 2: button pressed · 3..6: folder tree builds
  const { ref, step, reduce } = usePlayOnView([500, 1400, 1800, 2100, 2400, 2700])
  const treeLines = Math.max(0, step - 2)

  const appear = (visible: boolean) => ({
    initial: reduce ? false : ({ opacity: 0, y: 6 } as const),
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 },
    transition: { duration: 0.4, ease: EASE },
  })

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`O evento ${ROOT} aparece no sábado às ${EVENT_START} na agenda, sincronizado. No Drive, a pasta do evento é criada com as subpastas ${PHASES.join(', ')}.`}
      className="grid flex-1 gap-3 sm:grid-cols-2"
    >
      <div className="flex flex-col rounded-xl border border-white/10 bg-ink p-4">
        <p className="flex items-center gap-2 text-xs text-mist">
          <CalendarBlankIcon size={14} weight="bold" className="text-mist-dim" />
          Google Calendar
        </p>
        <div className="mt-4 grid flex-1 grid-cols-4 gap-1.5">
          {DAYS.map((day) => (
            <div key={day} className="flex min-w-0 flex-col">
              <p className="text-center text-[11px] text-mist-dim">{day}</p>
              <div className="relative mt-1.5 flex min-h-28 flex-1 flex-col overflow-hidden rounded-md bg-white/[0.03]">
                {HOURS.map((hour) => (
                  <div key={hour} className="flex-1 border-t border-white/[0.05] first:border-t-0" />
                ))}
                {day === EVENT_DAY ? (
                  <motion.div
                    className="absolute inset-x-1 bottom-1 top-[12%] rounded-md border border-amber/40 bg-amber-dim p-1.5"
                    {...appear(step >= 1)}
                  >
                    <p className="tabular font-mono text-[11px] text-amber">{EVENT_START}</p>
                    <p className="text-[11px] leading-tight text-paper">{COUPLE}</p>
                  </motion.div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <motion.p className="mt-3 text-xs text-state-done" {...appear(step >= 1)}>
          sincronizado com a CAPTURA
        </motion.p>
      </div>

      <div className="rounded-xl border border-white/10 bg-ink p-4">
        <p className="flex items-center gap-2 text-xs text-mist">
          <FolderIcon size={14} weight="bold" className="text-mist-dim" />
          Google Drive
        </p>
        <div
          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all duration-200 ${
            step >= 2 ? 'scale-[0.97] border-amber/40 bg-amber-dim text-paper' : 'border-white/12 text-mist'
          }`}
        >
          <FolderPlusIcon size={14} weight="bold" className="text-amber" />
          Criar estrutura no Google Drive
        </div>
        <ul className="mt-4 space-y-1.5 font-mono text-[12px] text-mist">
          <motion.li className="flex items-center gap-2 text-paper" {...appear(treeLines >= 1)}>
            <FolderIcon size={14} weight="fill" className="shrink-0 text-amber" />
            <span className="truncate">{ROOT}</span>
          </motion.li>
          {PHASES.map((phase, i) => (
            <motion.li key={phase} className="flex items-center gap-2 pl-3" {...appear(treeLines >= i + 2)}>
              <span aria-hidden="true" className="text-mist-dim">
                {i === PHASES.length - 1 ? '└' : '├'}
              </span>
              <FolderIcon size={14} weight="fill" className="shrink-0 text-mist-dim" />
              {phase}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
