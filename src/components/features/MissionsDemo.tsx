import { CheckIcon } from '@phosphor-icons/react'
import { usePlayOnView } from '../usePlayOnView'

const MISSIONS = ['Madrinha chorando', 'Pai do noivo dançando', 'Criança dormindo na cadeira']
const CAUGHT = 'Pai do noivo dançando'

/* Missions are chips in the app: tap to mark it caught. Only which one was
   marked is stored, so no time is shown here. */
export function MissionsDemo() {
  const { ref, step } = usePlayOnView([900], { wideOffset: 1600 })
  const caught = step >= 1

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Missões em chips, sem ordem fixa: ${MISSIONS.join(', ')}. ${CAUGHT} foi marcada como flagrada.`}
      className="flex flex-wrap gap-2"
    >
      {MISSIONS.map((mission) => {
        const isCaught = mission === CAUGHT && caught
        return (
          <span
            key={mission}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors duration-500 ${
              isCaught ? 'border-amber/50 bg-amber-dim text-paper' : 'border-white/12 text-mist'
            }`}
          >
            {isCaught ? <CheckIcon size={13} weight="bold" className="text-amber" aria-hidden="true" /> : null}
            {mission}
          </span>
        )
      })}
    </div>
  )
}
