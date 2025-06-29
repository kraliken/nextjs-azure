'use client'

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function TodoSheet({ title, triggerLabel = 'Add Todo', trigger, children }) {

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-0 sm:mr-1" />
            <span className='hidden sm:inline'>{triggerLabel}</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="pt-4">
          {children && typeof children === 'object' && children.type
            ? { ...children, props: { ...children.props, onSuccess: handleClose } }
            : children
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}
