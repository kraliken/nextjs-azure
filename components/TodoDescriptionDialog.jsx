"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Eye, ListCollapse } from 'lucide-react'
import { useState } from 'react'

const TodoDescriptionDialog = ({ todo }) => {

  const { title, description } = todo;

  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-sm"
        >
          <ListCollapse className="w-4 h-4" /> Desvription
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="whitespace-pre-line">
            {description?.trim()
              ? description
              : <span className="italic text-muted-foreground">No description provided.</span>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsViewOpen(false)} variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TodoDescriptionDialog