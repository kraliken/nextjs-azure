"use client"

import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Pencil } from 'lucide-react'
import { statusColor } from '@/lib/constants'
import { format } from "date-fns";
import TodoSheet from './TodoSheet'
import TodoForm from './TodoForm'
import TodoCardAlertDialog from './TodoCardAlertDialog'
import TodoDescriptionDialog from './TodoDescriptionDialog'

const TodoCard = ({ todo }) => {

  const { title, status, deadline } = todo;

  return (
    <Card className="w-full h-full flex flex-col justify-between shadow-md rounded-2xl p-4 hover:shadow-lg transition-all">
      <div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>

        <div className="mt-2 flex justify-between gap-2 flex-wrap">
          <Badge className={statusColor[status] || "bg-gray-200 text-gray-800"}>
            {status}
          </Badge>
          {deadline && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              deadline: {format(new Date(deadline), "yyyy.MM.dd")}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="flex items-center justify-between text-sm text-muted-foreground p-0 pt-2">

      </CardContent>
      <CardFooter className="flex justify-between gap-2 px-0 text-sm text-muted-foreground">
        <div>
          <TodoDescriptionDialog todo={todo} />
        </div>

        <div className='flex gap-2'>
          <TodoSheet
            title="Edit Todo"
            trigger={
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                <Pencil className="w-4 h-4" /> Edit
              </Button>
            }
          >
            <TodoForm category={todo.category} todo={todo} />
          </TodoSheet>
          <TodoCardAlertDialog todo={todo} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default TodoCard