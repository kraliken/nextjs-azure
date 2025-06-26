
import TodoCard from './TodoCard'

const PersonalTodos = ({ todos, allTodosCount }) => {

  const isFiltered = todos.length === 0 && allTodosCount > 0
  const isEmpty = todos.length === 0 && allTodosCount === 0

  return (
    <>
      {todos.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
      {isFiltered && (
        <div className="w-full col-span-full flex justify-center py-8 text-gray-500">
          No todos match the current filter.
        </div>
      )}
      {isEmpty && (
        <div className="w-full col-span-full flex justify-center py-8 text-gray-500">
          No todos yet. Add one above!
        </div>
      )}
    </>
  )
}

export default PersonalTodos