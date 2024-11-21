'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Timetable({ onBack }) {
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

  const timetable = [
    { day: "Monday", schedule: [
      { subject: "Data Structures", time: "09:00 AM - 11:00 AM" },
      { subject: "Web Development", time: "01:00 PM - 02:00 PM" },
    ]},
    { day: "Tuesday", schedule: [
      { subject: "Database Systems", time: "10:00 AM - 12:00 PM" },
      { subject: "Machine Learning", time: "02:00 PM - 04:00 PM" },
    ]},
    { day: "Wednesday", schedule: [
      { subject: "Web Development", time: "09:00 AM - 11:00 AM" },
      { subject: "Data Structures", time: "01:00 PM - 02:00 PM" },
    ]},
    { day: "Thursday", schedule: [
      { subject: "Machine Learning", time: "10:00 AM - 12:00 PM" },
      { subject: "Database Systems", time: "02:00 PM - 03:00 PM" },
    ]},
    { day: "Friday", schedule: [
      { subject: "Data Structures", time: "09:00 AM - 10:00 AM" },
      { subject: "Database Systems", time: "11:00 AM - 01:00 PM" },
      { subject: "Web Development", time: "02:00 PM - 03:00 PM" },
    ]},
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
          GEU Timetable
        </h1>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </header>

      {/* Main content */}
      <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Weekly Schedule</h2>
          <div className="grid gap-6">
            {timetable.map((day, index) => (
              <Card key={index} className="bg-gray-700">
                <CardHeader>
                  <CardTitle>{day.day}</CardTitle>
                </CardHeader>
                <CardContent>
                  {day.schedule.map((class_, classIndex) => (
                    <div key={classIndex} className="mb-2 last:mb-0">
                      <p className="font-medium">{class_.subject}</p>
                      <p className="text-sm text-gray-300">{class_.time}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 