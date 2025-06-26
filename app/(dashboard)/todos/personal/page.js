export const dynamic = 'force-dynamic';

import { getTodos } from '@/lib/actions/todo.actions';
import PersonalTodos from '@/components/PersonalTodos';
// import TodoSheet from '@/components/TodoSheet';
// import TodoForm from '@/components/TodoForm';
// import TodoFilter from '@/components/TodoFilter';

const PersonalTodosPage = async ({ searchParams }) => {

    const { status } = await searchParams

    const { all_count, filtered } = await getTodos("personal", status)

    return (
        <div className="pt-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold mb-6 text-center">Personal Todos</h1>
                {/* <TodoSheet title="Add Personal Todo">
                    <TodoForm category="personal" />
                </TodoSheet> */}
            </div>

            {/* {all_count > 0 && <TodoFilter currentStatus={status} category="personal" />} */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PersonalTodos todos={filtered} allTodosCount={all_count} />
            </div>
        </div>
    );
};

export default PersonalTodosPage;