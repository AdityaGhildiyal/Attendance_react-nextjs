'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"

export default function Grievance({ onBack }) {
  const [activePage, setActivePage] = useState('grievance')
  const [particles, setParticles] = useState([])
  const [subject, setSubject] = useState('')
  const [complaint, setComplaint] = useState('')
  const [location, setLocation] = useState('')
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the grievance to a server
    console.log('Grievance submitted:', { subject, complaint, location })
    setSubmitted(true)
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

      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Grievance Portal
          </h1>
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Main content */}
      <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Submit a Grievance</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                required 
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="complaint">Complaint</Label>
              <Textarea 
                id="complaint" 
                value={complaint} 
                onChange={(e) => setComplaint(e.target.value)} 
                required 
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                required 
                className="bg-gray-700 text-white"
              />
            </div>
            <Button type="submit">Send to HOD</Button>
          </form>
          {submitted && (
            <p className="mt-4 text-green-400">Grievance sent to the HOD successfully!</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}