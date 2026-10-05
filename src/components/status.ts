export type SceneStatus = 'todo' | 'doing' | 'done' | 'posted'

export const STATUS_LABEL: Record<SceneStatus, string> = {
  todo: 'Não iniciado',
  doing: 'Em andamento',
  done: 'Feito',
  posted: 'Postado',
}

export const STATUS_CLASSES: Record<SceneStatus, string> = {
  todo: 'bg-ink-4 text-mist',
  doing: 'bg-amber-dim text-amber',
  done: 'bg-state-done/15 text-state-done',
  posted: 'bg-state-posted/15 text-state-posted',
}
