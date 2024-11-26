'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ScrollArea } from "../../components/ui/scroll-area"

export default function Circular({ onBack }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const createParticles = () => {
      const newParticles = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 5 + 1,
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5
        })
      }
      setParticles(newParticles)
    }

    createParticles()

    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
        }))
      )
    }

    const intervalId = setInterval(animateParticles, 50)

    return () => clearInterval(intervalId)
  }, [])

  const circulars = [
    { id: 1, from: 'Teacher', subject: 'Assignment Submission Date Extended', content: 'The submission date for the Data Structures assignment has been extended to next Friday.' },
    { id: 2, from: 'HOD', subject: 'Department Meeting', content: 'All students are required to attend the department meeting on Monday at 10 AM.' },
    { id: 3, from: 'University', subject: 'Exam Schedule Update', content: 'The final exam schedule has been updated. Please check the university portal for details.' },
    { id: 4, from: 'Teacher', subject: 'Extra Class', content: 'There will be an extra class for Web Development on Saturday at 2 PM.' },
    { id: 5, from: 'University', subject: 'Holiday Announcement', content: 'The university will be closed next Wednesday for the national holiday.' },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full opacity-40"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          GEU Circulars
        </h1>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </header>

      {/* Main content */}
      <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Recent Circulars</h2>
          <ScrollArea className="h-[600px] pr-4">
            {circulars.map((circular) => (
              <Card key={circular.id} className="bg-gray-700 mb-4">
                <CardHeader>
                  <CardTitle>{circular.subject}</CardTitle>
                  <p className="text-sm text-gray-300">From: {circular.from}</p>
                </CardHeader>
                <CardContent>
                  <p>{circular.content}</p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
