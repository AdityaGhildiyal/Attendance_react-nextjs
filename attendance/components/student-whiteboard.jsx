'use client'

import { useRef, useEffect } from 'react'

export function StudentWhiteboard() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 100
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative h-full bg-black text-white">
      <div className="absolute top-0 left-0 right-0 bg-gray-800 p-2 text-center">
        Viewing the teacher's whiteboard
      </div>
      <canvas
        ref={canvasRef}
        className="bg-black mt-10"
      />
    </div>
  )
}

