
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TFilterType, type ITodo } from '../types/data'


interface ITodosStore {
  lastOrder: number
  todosObject: { [name: string]: ITodo }
  addTodo: (name: string) => void
  deleteTodo: (name: string) => void
  toogleCompleteTodo: (name: string) => void
}


export const useTodoStore = create<ITodosStore>()(
  persist((set) => {

    return {

      lastOrder: 0,
      todosObject: {},

      addTodo (name: string) {
        set(({ todosObject, lastOrder }: ITodosStore) => {
  
          lastOrder++
          todosObject[name] = {
            name,
            completed: false,
            order: lastOrder
          }
  
          return { todosObject, lastOrder }
        })
      },
  
      deleteTodo (name: string) {
        set(({ todosObject }: ITodosStore) => {
          delete todosObject[name]
          return todosObject
        })
      },
  
      toogleCompleteTodo (name: string) {
        set(({ todosObject }: ITodosStore) => {
          if (todosObject[name]) {
            todosObject[name].completed = !todosObject[name].completed
          }
          return todosObject
        })
      },
    }
  },
  { name: 'todos' })
)


interface IFilteredTodosStore {
  all: ITodo[]
  actives: ITodo[]
  completed: ITodo[]
  filterType: TFilterType
  setFilterType (filterType: TFilterType): void
}

export const useFilteredTodosStore = create<IFilteredTodosStore>(
  (set) => {

    useTodoStore.subscribe(state => {
      set(getFilteredTodos(state.todosObject))
    })

    return {
      filterType: 'all',
      setFilterType (filterType: TFilterType) {
        set({ filterType })
      },
      ...getFilteredTodos(useTodoStore.getState().todosObject)
    }
  }
)

function getFilteredTodos (todosObject: { [name: string]: ITodo }) {

  const todos = Object.values(todosObject)

  return {
    all: todos,
    actives: todos.filter(todo => !todo.completed),
    completed: todos.filter(todo => todo.completed)
  }
}

