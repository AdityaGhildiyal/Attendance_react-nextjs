import React from "react"

const Button = React.forwardRef(({ 
  className = "",
  variant = "default",
  size = "default",
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-white text-gray-900 hover:bg-gray-100",
    link: "text-white underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-8",
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button;
export { Button }