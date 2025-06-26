import { Card, CardTitle } from './ui/card'

const TodoStatCard = ({ stat }) => {

  const { name, count } = stat;

  return (
    <Card className="w-full shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition-all">
      <CardTitle className="text-4xl font-bold mb-2">{count}</CardTitle>
      <div className="text-sm font-medium text-muted-foreground capitalize">
        {name}
      </div>
    </Card>
  )
}

export default TodoStatCard
