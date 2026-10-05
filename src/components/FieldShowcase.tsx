import { motion } from 'motion/react'
import { CameraIcon, DeviceMobileIcon, ClipboardTextIcon, VideoCameraIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { Reveal } from './Reveal'
import { STATUS_CLASSES, STATUS_LABEL } from './status'
import { usePlayOnView } from './usePlayOnView'
import { TIMES } from '../data/casamento'

const SENDER = { owner: 'cinegrafista', icon: VideoCameraIcon }
const RECEIVERS: { owner: string; icon: Icon }[] = [
  { owner: 'fotógrafo', icon: CameraIcon },
  { owner: 'redes sociais', icon: DeviceMobileIcon },
  { owner: 'coordenação', icon: ClipboardTextIcon },
]

function DeviceCard({
  owner,
  icon: OwnerIcon,
  done,
  justUpdated,
  sender = false,
}: {
  owner: string
  icon: Icon
  done: boolean
  justUpdated: boolean
  sender?: boolean
}) {
  const status = done ? 'done' : 'doing'
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border bg-ink-2 p-3.5 shadow-panel transition-colors duration-500 ${
        sender && done ? 'border-amber/35' : 'border-white/10'
      }`}
    >
      {justUpdated ? (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-state-done/10"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
      ) : null}
      <div className="relative flex items-center gap-2 border-b border-white/8 pb-2.5">
        <OwnerIcon size={15} weight="bold" className={sender ? 'text-amber' : 'text-mist-dim'} aria-hidden="true" />
        <span className="truncate text-xs text-mist">{owner}</span>
      </div>
      <div className="relative pt-3">
        <p className="text-sm text-paper">Troca de alianças</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] tracking-wide ${STATUS_CLASSES[status]}`}>
            {STATUS_LABEL[status]}
          </span>
          {done ? <span className="tabular font-mono text-[11px] text-mist-dim">{TIMES.ringsDone}</span> : null}
        </div>
      </div>
    </div>
  )
}

export function FieldShowcase() {
  // 1: the camera operator marks it · 2-4: each teammate's screen updates
  const { ref: stage, step, reduce } = usePlayOnView([700, 1250, 1500, 1750])

  return (
    <section id="produto" className="scroll-mt-20 border-t border-white/8 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-20">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-paper text-balance md:text-4xl">
              Uma cena. Vários aparelhos. O mesmo status.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-mist">
              O cinegrafista marca a cena como feita no dele. Toda a equipe vê a
              mudança na hora, com o horário, sem perguntar no grupo do WhatsApp.
            </p>
          </Reveal>

          <div
            ref={stage}
            role="img"
            aria-label={`O cinegrafista marca a troca de alianças como feita e os aparelhos do fotógrafo, das redes sociais e da coordenação mostram o mesmo status, às ${TIMES.ringsDone}.`}
            className="grid grid-cols-2 gap-3"
          >
            <DeviceCard
              owner={SENDER.owner}
              icon={SENDER.icon}
              sender
              done={step >= 1}
              justUpdated={false}
            />
            {RECEIVERS.map((receiver, index) => {
              const done = step >= index + 2
              return (
                <DeviceCard
                  key={receiver.owner}
                  owner={receiver.owner}
                  icon={receiver.icon}
                  done={done}
                  justUpdated={done && !reduce}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
