'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Mail, VoicemailIcon as Fax, MapPin, Globe, Facebook, Twitter, Instagram, Linkedin, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"

export default function Contact({ onBack }) {
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

  const contactSections = [
    {
      title: "Main Campus Address",
      content: (
        <div className="flex items-start">
          <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
          <p>
            Global Education University (GEU)<br />
            Innovation Boulevard, Sector 12<br />
            Global City, State - 123456<br />
            Country
          </p>
        </div>
      )
    },
    {
      title: "General Enquiries",
      content: (
        <>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 h-5 w-5" />
            <p>+1-800-GEU-2024 (Toll-Free)</p>
          </div>
          <div className="flex items-center mb-2">
            <Fax className="mr-2 h-5 w-5" />
            <p>+1-555-123-4567</p>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            <p>info@geu.edu</p>
          </div>
        </>
      )
    },
    {
      title: "Admissions Office",
      content: (
        <>
          <p className="mb-2">Interested in joining GEU? Our admissions team is here to help!</p>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 h-5 w-5" />
            <p>+1-800-ADMIT-GEU</p>
          </div>
          <div className="flex items-center mb-2">
            <Mail className="mr-2 h-5 w-5" />
            <p>admissions@geu.edu</p>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            <p>Monday to Friday, 9:00 AM to 5:00 PM (GMT)</p>
          </div>
        </>
      )
    },
    {
      title: "Student Support",
      content: (
        <>
          <p className="mb-2">For enrolled students seeking academic, career, or personal support:</p>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 h-5 w-5" />
            <p>+1-800-STUDENT-GEU</p>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            <p>support@geu.edu</p>
          </div>
        </>
      )
    },
    {
      title: "Corporate & Industry Partnerships",
      content: (
        <>
          <p className="mb-2">Looking to collaborate with GEU? Let's connect!</p>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 h-5 w-5" />
            <p>+1-555-987-6543</p>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            <p>partnerships@geu.edu</p>
          </div>
        </>
      )
    },
    {
      title: "Media Enquiries",
      content: (
        <>
          <p className="mb-2">For press releases, interviews, and media collaborations:</p>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 h-5 w-5" />
            <p>+1-555-NEWS-GEU</p>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            <p>media@geu.edu</p>
          </div>
        </>
      )
    },
    {
      title: "Emergency Contact",
      content: (
        <>
          <p className="mb-2">In case of emergencies on campus, contact our 24/7 helpline:</p>
          <div className="flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            <p>+1-555-EMRGNCY</p>
          </div>
        </>
      )
    }
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

      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Contact Us
          </h1>
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {contactSections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Card className="bg-gray-700 mt-2">
                        <CardContent className="p-4">
                          {section.content}
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: contactSections.length * 0.1 }}
            >
              <Card className="bg-gray-700 mt-6">
                <CardHeader>
                  <CardTitle>Stay Connected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Globe className="mr-2 h-5 w-5" />
                    <a href="http://www.geu.edu" className="text-blue-400 hover:underline">www.geu.edu</a>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <a href="https://facebook.com/geu" className="text-blue-400 hover:text-blue-300">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="https://twitter.com/GEU_Official" className="text-blue-400 hover:text-blue-300">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href="https://instagram.com/geu_official" className="text-blue-400 hover:text-blue-300">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://linkedin.com/school/global-education-university" className="text-blue-400 hover:text-blue-300">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}