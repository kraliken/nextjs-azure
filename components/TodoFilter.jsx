"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const TodoFilter = ({ currentStatus, category }) => {
  const pathname = usePathname()

  const statuses = ["backlog", "progress", "done"]

  const getFilterUrl = (status) => {
    const params = new URLSearchParams()
    if (status) params.set("status", status)
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      {statuses.map((s) => (
        <Link key={s} href={getFilterUrl(s)}>
          <Button
            variant={s === currentStatus ? "default" : "outline"}
            size="sm"
            className="rounded-full capitalize"
          >
            {s}
          </Button>
        </Link>
      ))}

      {currentStatus && (
        <Link href={pathname}>
          <Button
            variant="secondary"
            size="sm"
            className="ml-6"
          >
            Clear Filters
          </Button>
        </Link>
      )}
    </div>
  )
}

export default TodoFilter
