'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Placement({ onBack }) {
  const [particles, setParticles] = useState([])
  const [resumeUploaded, setResumeUploaded] = useState(false)

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

  const handleResumeUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Here you would typically handle the file upload to a server
      console.log('Resume uploaded:', file.name)
      setResumeUploaded(true)
    }
  }

  const eligibleCompanies = [
    { name: 'TechCorp', role: 'Software Engineer', package: '₹8 LPA' },
    { name: 'DataSystems', role: 'Data Analyst', package: '₹7 LPA' },
    { name: 'WebFront', role: 'Frontend Developer', package: '₹6.5 LPA' },
    { name: 'AIInnovate', role: 'Machine Learning Engineer', package: '₹9 LPA' },
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
          GEU Placement
        </h1>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </header>

      {/* Main content */}
      <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Resume Upload</h2>
          <div className="mb-6">
            <Label htmlFor="resume" className="block mb-2">Upload your resume:</Label>
            <Input 
              id="resume" 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleResumeUpload}
              className="bg-gray-700 text-white"
            />
            {resumeUploaded && (
              <p className="mt-2 text-green-400">Resume uploaded successfully!</p>
            )}
          </div>

          <h2 className="text-2xl font-semibold mb-6">Eligible Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibleCompanies.map((company, index) => (
              <Card key={index} className="bg-gray-700">
                <CardHeader>
                  <CardTitle>{company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Role: {company.role}</p>
                  <p>Package: {company.package}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}