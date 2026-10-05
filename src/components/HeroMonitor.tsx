import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { CheckIcon, HeartIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react'
import { Viewfinder } from './Viewfinder'
import { STATUS_CLASSES, STATUS_LABEL, type SceneStatus } from './status'
import { CAPTURED_BEFORE_RINGS, COUPLE, TIMES, progressLabel } from '../data/casamento'

type Stage = 'script' | 'organizing' | 'review' | 'live'

/* The pasted script: messy, the way people actually write it. Highlighted
   fragments become scenes; the rest becomes each scene's capture note. */
const SCRIPT: { text: string; scene?: boolean }[][] = [
  [{ text: 'MAKING OF' }],
  [{ text: 'noiva se arrumando', scene: true }, { text: ', ' }, { text: 'detalhe do vestido', scene: true }],
  [{ text: 'CERIMÔNIA' }],
  [{ text: 'chegada da noiva', scene: true }, { text: ', pegar o pai ajeitando o véu' }],
  [{ text: 'troca de alianças', scene: true }, { text: ' - close nas mãos!!' }],
  [{ text: 'primeiro beijo', scene: true }, { text: ' (2 ângulos)' }],
  [{ text: 'FESTA' }],
  [{ text: 'discurso dos padrinhos', scene: true }, { text: ' pros stories' }],
  [{ text: 'madrinha chorando? se rolar', scene: true }],
]

type Scene = { title: string; note: string; status: SceneStatus; time?: string }

const CEREMONY: Scene[] = [
  { title: 'Chegada da noiva', note: 'pegar o pai ajeitando o véu', status: 'done', time: TIMES.arrivalDone },
  { title: 'Troca de alianças', note: 'close nas mãos', status: 'doing' },
  { title: 'Primeiro beijo', note: '2 ângulos', status: 'todo' },
]
const PARTY: Scene[] = [{ title: 'Discurso dos padrinhos', note: 'pros stories', status: 'todo' }]

const TABS: { stage: Exclude<Stage, 'organizing'>; label: string }[] = [
  { stage: 'script', label: 'Roteiro' },
  { stage: 'review', label: 'Revisão' },
  { stage: 'live', label: 'Ao vivo' },
]

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroMonitor() {
  const reduce = !!useReducedMotion()
  const figure = useRef<HTMLElement>(null)
  // Starts when the monitor is actually on screen (below the fold on phones).
  const seen = useInView(figure, { once: true, amount: 0.5 })
  const [stage, setStage] = useState<Stage>(reduce ? 'live' : 'script')
  const [publishing, setPublishing] = useState(false)
  const [ringsDone, setRingsDone] = useState(reduce)
  const timers = useRef<number[]>([])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const goLive = (delay = 0) => {
    later(() => {
      setPublishing(false)
      setStage('live')
    }, delay)
    later(() => setRingsDone(true), delay + 1700)
  }

  // Plays once: script, scenes highlighted, review with Publicar, live, one update.
  useEffect(() => {
    if (reduce || !seen) return
    later(() => setStage('organizing'), 2400)
    later(() => setStage('review'), 3700)
    later(() => setPublishing(true), 5600)
    goLive(6100)
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, seen])

  const select = (next: Exclude<Stage, 'organizing'>) => {
    clearTimers()
    setPublishing(false)
    if (next === 'live') {
      setRingsDone(reduce)
      if (reduce) setStage('live')
      else goLive()
      return
    }
    setRingsDone(false)
    setStage(next)
  }

  const activeTab = stage === 'organizing' ? 'script' : stage

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TABS.length - 1
    const target =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (target === null) return
    event.preventDefault()
    tabRefs.current[target]?.focus()
    select(TABS[target].stage)
  }

  const showList = stage === 'review' || stage === 'live'

  return (
    <figure
      ref={figure}
      aria-label="Demonstração: um roteiro colado é organizado, revisado e publicado como checklist ao vivo da equipe"
      className="w-full max-w-[460px]"
    >
      <Viewfinder>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-panel">
          <MonitorBar stage={stage} ringsDone={ringsDone} />

          <div role="tablist" aria-label="Etapa da demonstração" className="flex gap-1 border-b border-white/8 px-2">
            {TABS.map((tab, index) => {
              const active = activeTab === tab.stage
              return (
                <button
                  key={tab.stage}
                  ref={(el) => {
                    tabRefs.current[index] = el
                  }}
                  id={`monitor-tab-${tab.stage}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="monitor-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(tab.stage)}
                  onKeyDown={(event) => onTabKey(event, index)}
                  className={`relative min-h-11 rounded-t-md px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber ${
                    active ? 'text-paper' : 'text-mist-dim hover:text-mist'
                  }`}
                >
                  {tab.label}
                  {active ? (
                    <motion.span
                      layoutId="monitor-tab"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-amber"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                </button>
              )
            })}
          </div>

          <div
            id="monitor-panel"
            role="tabpanel"
            aria-labelledby={`monitor-tab-${activeTab}`}
            className="relative h-[400px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {showList ? (
                <motion.div
                  key="list"
                  className="absolute inset-0 px-3 py-3"
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Checklist
                    live={stage === 'live'}
                    publishing={publishing}
                    ringsDone={ringsDone}
                    reduce={reduce}
                    onPublish={() => select('live')}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="script"
                  className="absolute inset-0 px-5 py-4"
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Script highlight={stage === 'organizing'} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Viewfinder>
      <figcaption className="sr-only">
        O roteiro em texto solto é dividido em fases e cenas, cada uma com a nota de captura. Depois da
        revisão, o checklist é publicado. Quando a troca de alianças é marcada como feita, todos os
        aparelhos da equipe recebem a mudança com o horário.
      </figcaption>
    </figure>
  )
}

function MonitorBar({ stage, ringsDone }: { stage: Stage; ringsDone: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3">
      <div className="min-w-0">
        <p className="font-display text-sm font-semibold text-paper">{COUPLE}</p>
        <p className="truncate text-xs text-mist-dim">Casamento · making of, cerimônia e festa</p>
      </div>
      <div className="flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[11px] tracking-wide">
        {stage === 'live' ? (
          // The app's own live header: scene progress and sync state.
          <span className="flex flex-col items-end gap-0.5">
            <span className="tabular text-paper">
              {progressLabel(CAPTURED_BEFORE_RINGS + (ringsDone ? 1 : 0))}
            </span>
            <span className="flex items-center gap-1.5 text-state-done">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-state-done" />
              sincronizado
            </span>
          </span>
        ) : (
          <span className={stage === 'review' ? 'text-amber' : 'text-mist-dim'}>
            {stage === 'review' ? 'EM REVISÃO' : 'RASCUNHO'}
          </span>
        )}
      </div>
    </div>
  )
}

function Script({ highlight }: { highlight: boolean }) {
  return (
    <div className="text-[13px] leading-[1.9] text-mist">
      {SCRIPT.map((line, i) => {
        const heading = !line[0].scene && line[0].text === line[0].text.toUpperCase()
        return (
          <p key={i} className={heading ? 'mt-1.5 text-[11px] font-medium tracking-wider text-mist-dim first:mt-0' : ''}>
            {line.map((part, j) =>
              part.scene ? (
                <span key={j} className="relative whitespace-nowrap">
                  <motion.span
                    aria-hidden="true"
                    className="absolute -inset-x-1 inset-y-0.5 origin-left rounded-sm bg-amber/20"
                    initial={false}
                    animate={{ scaleX: highlight ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: highlight ? i * 0.07 : 0 }}
                  />
                  <span className={`relative transition-colors duration-300 ${highlight ? 'text-paper' : ''}`}>
                    {part.text}
                  </span>
                </span>
              ) : (
                <span key={j}>{part.text}</span>
              ),
            )}
          </p>
        )
      })}
    </div>
  )
}

function Checklist({
  live,
  publishing,
  ringsDone,
  reduce,
  onPublish,
}: {
  live: boolean
  publishing: boolean
  ringsDone: boolean
  reduce: boolean
  onPublish: () => void
}) {
  let row = 0
  const enter = (index: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 8 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: EASE, delay: 0.15 + index * 0.06 },
  })

  const phase = (name: string, scenes: Scene[]) => (
    <div className="mb-1.5">
      <p className="px-2 pb-0.5 pt-1 text-[11px] font-medium tracking-wider text-mist-dim">{name.toUpperCase()}</p>
      <ul>
        {scenes.map((scene) => {
          const isRings = scene.title === 'Troca de alianças'
          const status: SceneStatus = isRings && ringsDone ? 'done' : scene.status
          const time = isRings && ringsDone ? TIMES.ringsDone : scene.time
          return (
            <motion.li key={scene.title} className="relative rounded-lg px-2 py-1.5" {...enter(row++)}>
              {live && isRings && ringsDone && !reduce ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg bg-state-done/10"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                />
              ) : null}
              <div className="relative flex items-center justify-between gap-3">
                <span className="text-sm text-paper">{scene.title}</span>
                {live ? (
                  <motion.span
                    className="flex shrink-0 items-center gap-2"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    {time ? <span className="tabular font-mono text-[11px] text-mist-dim">{time}</span> : null}
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] tracking-wide ${STATUS_CLASSES[status]}`}>
                      {STATUS_LABEL[status]}
                    </span>
                  </motion.span>
                ) : null}
              </div>
              <p className="relative text-xs text-mist-dim">{scene.note}</p>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div className="flex h-full flex-col">
      <motion.div
        className="mb-1.5 flex items-center justify-between rounded-lg px-2 py-1.5"
        {...enter(row++)}
      >
        <span className="text-[11px] font-medium tracking-wider text-mist-dim">MAKING OF</span>
        <span className="text-xs text-mist">
          {live ? (
            <span className="flex items-center gap-1.5 text-state-done">
              <CheckIcon size={12} weight="bold" aria-hidden="true" />2 de 2 feitas
            </span>
          ) : (
            '2 cenas'
          )}
        </span>
      </motion.div>

      {phase('Cerimônia', CEREMONY)}
      {phase('Festa', PARTY)}

      <div className="mt-auto">
        {live ? (
          <motion.div
            className="flex items-center gap-2.5 rounded-lg border border-amber/25 bg-amber-dim px-3 py-2.5"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
          >
            <HeartIcon size={16} weight="fill" className="shrink-0 text-amber" aria-hidden="true" />
            <p className="text-xs text-paper">
              Missão: <span className="text-mist">madrinha chorando, a qualquer hora</span>
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="flex items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2"
            {...enter(row++)}
          >
            <p className="text-xs text-mist">Revise antes de publicar.</p>
            <button
              type="button"
              onClick={onPublish}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-full bg-amber px-3.5 text-xs font-semibold text-amber-ink transition-[transform,background-color] duration-150 hover:bg-amber-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-95 ${
                publishing ? 'scale-95' : ''
              }`}
            >
              <PaperPlaneTiltIcon size={12} weight="bold" aria-hidden="true" />
              Publicar
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
