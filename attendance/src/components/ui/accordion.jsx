import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"

const Accordion = ({ children, className, ...props }) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  )
}

const AccordionItem = ({ children, className, value }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={cn("border-b border-gray-700", className)}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen,
            onToggle: handleToggle,
            value
          })
        }
        return child
      })}
    </div>
  )
}

const AccordionTrigger = ({ children, className, isOpen, onToggle }) => {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
      onClick={onToggle}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

const AccordionContent = ({ children, className, isOpen }) => {
  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "max-h-screen" : "max-h-0"
      )}
    >
      {children}
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }