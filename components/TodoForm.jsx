'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createTodo, updateTodo } from '@/lib/actions/todo.actions';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { Textarea } from './ui/textarea';

const TodoForm = ({ category, todo, onSuccess }) => {

  const isEdit = Boolean(todo)

  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState(
    todo?.deadline ? new Date(todo.deadline) : null
  );

  const updateAction = async (prevState, formData) => {
    return updateTodo(prevState, todo.id, formData)
  }

  const [data, action] = useActionState(isEdit ? updateAction : createTodo, {
    success: false,
    message: '',
    errors: {},
    data: todo || {}
  });

  useEffect(() => {
    if (data.success) {
      toast.success(data.message || (isEdit ? 'Todo updated successfully!' : 'Todo created successfully!'));

      router.refresh()
      onSuccess();
    }
  }, [data.success]);


  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Update Todo' : 'Add Todo')}
      </Button>
    );
  };

  return (
    <form action={action} className="space-y-4 p-4">
      <input type="hidden" name="category" value={category} />
      <div className='space-y-4'>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={data?.data?.title || todo?.title || ''}
          className={data?.errors?.title ? 'border-red-400' : ''}
        />
      </div>
      {data && !data.success && data.errors?.title && (
        <div className='text-center text-destructive'>{data.errors.title}</div>
      )}
      <div className='space-y-4'>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          type="text"
          defaultValue={data?.data?.description || todo?.description || ''}
          className={data?.errors?.description ? 'border-red-400' : ''}
        />
      </div>
      {data && !data.success && data.errors?.description && (
        <div className='text-center text-destructive'>{data.errors.description}</div>
      )}

      <div className="space-y-4">
        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          defaultValue={data?.data?.status || todo?.status || 'backlog'}
        >
          <SelectTrigger className={data?.errors?.status ? 'border-red-400' : ''}>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="backlog">Backlog</SelectItem>
            <SelectItem value="progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
        {data?.errors?.status && (
          <p className="text-sm text-destructive">{data.errors.status}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              {selectedDate ? format(selectedDate, "yyyy.MM.dd") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {selectedDate && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            // className="text-red-500 hover:text-red-700 text-sm mt-1"
            onClick={() => setSelectedDate(null)}
          >
            Remove deadline
          </Button>
        )}

        {/* hidden input a beküldéshez */}
        <input
          type="hidden"
          name="deadline"
          value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ""}
        />
      </div>

      {data && !data.success && data?.message && (
        <p className="text-sm text-destructive">{data.message}</p>
      )}
      <SubmitButton />
    </form>
  )
}

export default TodoForm