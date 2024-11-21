'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Hostel({ onBack }) {
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

  const hostelInfo = {
    hostelName: "Tagore Bhawan",
    roomNumber: "T-203",
    wardenName: "Dr. Rajesh Kumar",
    wardenPhone: "+91 98765 43210"
  }

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
          GEU Hostel
        </h1>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </header>

      {/* Main content */}
      <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100 mt-10">
        <CardContent className="p-6">
          <h2 className="text-4xl font-semibold mb-6">Hostel Information</h2>
          <Card className="bg-gray-700 h-64">
            <CardHeader>
              <CardTitle className="text-black text-3xl">{hostelInfo.hostelName}</CardTitle>
            </CardHeader>
            <CardContent className="text-black">
              <p className="mb-2">Room Number: {hostelInfo.roomNumber}</p>
              <p className="mb-2">Warden's Name: {hostelInfo.wardenName}</p>
              <p>Warden's Phone: {hostelInfo.wardenPhone}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}