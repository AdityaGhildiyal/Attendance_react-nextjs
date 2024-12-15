'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Eraser, Pencil, Trash2 } from 'lucide-react'

export function Whiteboard() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#FFFFFF')
  const [isErasing, setIsErasing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    context.strokeStyle = color
    context.lineWidth = 2
    context.lineCap = 'round'

    const handleResize = () => {
      const tempCanvas = document.createElement('canvas')
      const tempContext = tempCanvas.getContext('2d')
      if (!tempContext) return

      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      tempContext.drawImage(canvas, 0, 0)

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      context.drawImage(tempCanvas, 0, 0)
      context.strokeStyle = color
      context.lineWidth = 2
      context.lineCap = 'round'
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [color])

  const startDrawing = (e) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const context = canvasRef.current?.getContext('2d')
    if (context) context.beginPath()
  }

  const draw = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!context || !canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    context.strokeStyle = isErasing ? '#000000' : color
    context.lineWidth = isErasing ? 20 : 2

    context.lineTo(x, y)
    context.stroke()
    context.beginPath()
    context.moveTo(x, y)
  }

  const handleColorChange = (e) => {
    setColor(e.target.value)
    setIsErasing(false)
  }

  const toggleEraser = () => {
    setIsErasing(!isErasing)
  }

  const clearWhiteboard = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!context || !canvas) return

    context.fillStyle = '#000000'
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="relative h-full">
      <canvas
        ref={canvasRef}
        className="bg-black"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
      />
      <div className="absolute top-4 right-4 flex space-x-2">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-8 h-8 rounded-full overflow-hidden"
        />
        <Button
          variant={isErasing ? "default" : "secondary"}
          size="icon"
          onClick={toggleEraser}
        >
          {isErasing ? <Pencil /> : <Eraser />}
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={clearWhiteboard}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  )
}

