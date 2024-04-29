import * as React from "react"

import { cn } from "@/src/utils/utils"
import { User } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, ...props }, ref) => {
    return (
        <input
          type={type}
          id={id}
          className={cn(
            "flex h-10 w-full border-0 peer bg-background px-3 py-2 text-sm ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
    )
  }
)
Input.displayName = "Input"

export { Input }
