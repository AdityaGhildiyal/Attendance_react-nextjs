import React from 'react'

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <span ref={ref} className={`inline-block overflow-hidden rounded-full ${className}`} {...props} />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef(({ className, src, alt = "", ...props }, ref) => (
  <img ref={ref} src={src} alt={alt} className={`aspect-square h-full w-full object-cover ${className}`} {...props} />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => (
  <span ref={ref} className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props}>
    {children}
  </span>
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }