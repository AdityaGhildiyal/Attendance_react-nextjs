'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Fee({ onBack }) {
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

  const feeDetails = [
    { type: "Tuition Fee", amount: 50000 },
    { type: "Hostel Fee", amount: 30000 },
    { type: "Mess Fee", amount: 20000 },
    { type: "Library Fee", amount: 5000 },
    { type: "Examination Fee", amount: 3000 },
  ]

  const totalFee = feeDetails.reduce((sum, fee) => sum + fee.amount, 0)

  const handlePayment = (method) => {
    if (method === 'cash') {
      alert("Please visit the fee counter at the Administrative Block, Ground Floor, Room No. 001")
    } else {
      alert(`Redirecting to ${method} payment gateway...`)
    }
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
          GEU Fee Management
        </h1>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </header>

      {/* Main content */}
      <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="fee-submission">
              <AccordionTrigger>Fee Submission</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-gray-700 mb-4">
                  <CardHeader>
                    <CardTitle>Fee Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {feeDetails.map((fee, index) => (
                      <div key={index} className="flex justify-between mb-2">
                        <span>{fee.type}</span>
                        <span>₹{fee.amount}</span>
                      </div>
                    ))}
                    <div className="flex justify-between mt-4 font-bold">
                      <span>Total</span>
                      <span>₹{totalFee}</span>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex gap-4">
                  <Button onClick={() => handlePayment('cash')}>Pay with Cash</Button>
                  <Button onClick={() => handlePayment('upi')}>Pay with UPI</Button>
                  <Button onClick={() => handlePayment('card')}>Pay with Card</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="fee-receipt">
              <AccordionTrigger>Fee Receipt</AccordionTrigger>
              <AccordionContent>
                <p>Your latest fee receipt will be displayed here once payment is processed.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="transaction-history">
              <AccordionTrigger>Transaction History</AccordionTrigger>
              <AccordionContent>
                <p>Your transaction history will be displayed here.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}