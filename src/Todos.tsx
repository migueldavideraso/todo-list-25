
import { useFilteredTodosStore, useTodoStore } from './store/todos' 
import { TFilterType } from './types/data'

function Todos () {

  const deleteTodo = useTodoStore(state => state.deleteTodo)
  const toogleCompleteTodo = useTodoStore(state => state.toogleCompleteTodo)
  const setFilterType = useFilteredTodosStore(state => state.setFilterType)

  const todos = (
    useFilteredTodosStore(state => state[state.filterType])
    .sort((a, b) => a.order < b.order ? 1 : -1)
  )

  function handleDeleteTodo (name: string) {
    deleteTodo(name)
  }

  function handleToogleCompleteTodo (name: string) {
    toogleCompleteTodo(name)
  }

  function handleSetFilterType (newFilterType: TFilterType) {
    setFilterType(newFilterType)
  }

  return (
    <>
      <select id="filterType" role="select-by-completed-status" onChange={e => handleSetFilterType(e.target.value as TFilterType)}>
        <option value="all">All</option>
        <option value="actives">Actives</option>
        <option value="completed">Completed</option>
      </select>

      <main className="todos-grid" role='todos-grid'>
        {todos.map(todo => 
          <article role="todo" className={`todo ${todo.completed ? 'completed' : ''}`} key={todo.name}>
            <span role="todo-name" className='title'>{todo.name}</span>
            <button onClick={() => handleToogleCompleteTodo(todo.name)}>{todo.completed ? 'Activate' : 'Complete'}</button>
            <button onClick={() => handleDeleteTodo(todo.name)}>Delete</button>
          </article>  
        )}
      </main>
    </>
  )
}

export default Todos
