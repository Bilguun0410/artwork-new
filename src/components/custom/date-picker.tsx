"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Calendar } from "@/src/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { cn } from "@/src/utils/utils"

export function DatePicker({value} : {value?: any}) {
  const [date, setDate] = React.useState<Date>(value)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[150px] justify-between text-left font-normal h-5 rounded-3xl bg-transparent border border-[#665F5FE0]",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>YYYY-MM-DD</span>}
          <CalendarIcon className="ml-2 h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
