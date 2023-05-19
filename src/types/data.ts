


export interface ITodo {
  order: number
  name: string
  completed: boolean
}

export type TFilterType = 'all'|'actives'|'completed'