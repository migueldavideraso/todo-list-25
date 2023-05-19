import { useTodoStore } from "./store/todos"


function Form() {

  const addTodo = useTodoStore(state => state.addTodo)


  function handleSubmit (e: any) {

    e.preventDefault()
    const input = e.target.querySelector('input')
    const value = String(input.value)

    if (!value) {
      return
    }

    addTodo(value)
    input.value = ''
  }

  return (
    <form action="submit" role="new-todo-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="New Todo" />
      <button>Create</button>
    </form>
  )
}

export default Form
