'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import {ChevronRight, User , AlertCircle } from 'lucide-react'
import {Alert , AlertDescription} from '../../components/ui/alert'

export default function TeacherLogin() {
  const router = useRouter()
  const [particles, setParticles] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error , setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
    // Handle login logic here
    if (email && password) {
      router.push('/Teachers/teacherdashboard')
    } else {
      setError('Please enter your email and password.')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute bg-white rounded-full opacity-40"
            animate={{
              x: particle.x,
              y: particle.y,
            }}
            transition={{
              duration: 0,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-lg min-h-[500px] bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Teacher Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the teacher dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/20 border-white/30 text-white placeholder-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/20 border-white/30 text-white placeholder-white/50"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full h-12 text-lg bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700"
            onClick={handleSubmit}
          >
            Login <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm underline hover:text-purple-400">Forgot password?</a>
        </div>
      </Card>
    </div>
  )
}