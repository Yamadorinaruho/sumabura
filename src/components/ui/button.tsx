import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, ...props }, ref) => {
   return (
     <button
       className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 ${className}`}
       ref={ref}
       {...props}
     />
   )
 }
)
Button.displayName = "Button"

export { Button }
