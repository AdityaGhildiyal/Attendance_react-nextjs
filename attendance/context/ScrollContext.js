'use client'

import { createContext, useContext, useState } from 'react'

const ScrollContext = createContext()

export function ScrollProvider({ children }) {
  const [scrollPosition, setScrollPosition] = useState(0)

  return (
    <ScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  return useContext(ScrollContext)
}
