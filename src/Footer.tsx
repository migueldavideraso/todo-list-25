
import { useFilteredTodosStore } from './store/todos' 

function Footer () {

  const activeTodos = useFilteredTodosStore(state => state.actives.length)
  const completedTodos = useFilteredTodosStore(state => state.completed.length)

  return (
    <footer role="todos-info">
      <span>Actives: {activeTodos}</span>
      <span>|</span>
      <span>Completed: {completedTodos}</span>
    </footer>
  )
}

export default Footer
