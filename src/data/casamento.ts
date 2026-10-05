/* The one example wedding every demo on the page tells. Keep times, names
   and phases here so no two sections can contradict each other. Times use
   the app's own HH:MM format ("Concluído 14:15 · Postado 14:38").

   Timeline (sábado):
   13:30  event starts (calendar)        14:40  troca de alianças iniciada
   13:52  making of: noiva se arrumando  14:47  troca de alianças feita
   14:08  making of: detalhe do vestido  14:52  primeiro beijo (sem conexão)
   14:32  chegada da noiva feita         15:10  chegada da noiva postada */

export const COUPLE = 'Ana e Rafael'
export const EVENT_TITLE = `Casamento ${COUPLE}`
export const EVENT_DAY = 'sáb'
export const EVENT_START = '13:30'

export const PHASES = ['Making of', 'Cerimônia', 'Festa'] as const

export const TIMES = {
  arrivalDone: '14:32',
  ringsStarted: '14:40',
  ringsDone: '14:47',
  kissOffline: '14:52',
  arrivalPosted: '15:10',
} as const

/* Scene count across all phases (2 making of + 3 cerimônia + 1 festa), and
   how many are captured (Feito or Postado) before the rings are marked. */
export const TOTAL_SCENES = 6
export const CAPTURED_BEFORE_RINGS = 3

export function progressLabel(captured: number) {
  return `${captured}/${TOTAL_SCENES} cenas · ${Math.round((captured / TOTAL_SCENES) * 100)}%`
}
