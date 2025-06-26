import TodoStatCard from './TodoStatCard'

const TodoStats = ({ stats }) => {

  return (
    <>
      {stats.map(stat => (
        <TodoStatCard key={stat.name} stat={stat} />
      ))}
    </>
  )
}

export default TodoStats