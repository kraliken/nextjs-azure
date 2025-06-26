import TodoStats from "@/components/TodoStats";
import { getTodoStats } from "@/lib/actions/todo.actions";

export default async function Home() {

  const stats = await getTodoStats()

  return (
    <div className="pt-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Welcome on Dashboard!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TodoStats stats={stats} />
      </div>
    </div>
  );
}
