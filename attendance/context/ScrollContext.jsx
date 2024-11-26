'use client'

import React, { createContext, useContext, useState } from 'react'

const ScrollContext = createContext({
  scrollPosition: 0,
  setScrollPosition: () => {},
})

export function ScrollProvider({ children }) {
  const [scrollPosition, setScrollPosition] = useState(0)

  return (
    <ScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider')
  }
  return context
}
