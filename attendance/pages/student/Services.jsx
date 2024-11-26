'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Book, Briefcase, Heart, Wifi, Users, DollarSign, GraduationCap, Handshake, Leaf, Calendar, Shield, Bus, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"

export default function Services({ onBack }) {
  const [activePage, setActivePage] = useState('services')
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

  const servicesSections = [
    {
      title: "Academic Services",
      icon: Book,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Academic Advising: Personalized guidance for course selection and career planning</li>
          <li>Tutoring and Mentoring: Free access to peer and professional tutoring</li>
          <li>Library Services: Digital and physical library with millions of resources</li>
          <li>Research Assistance: Support for research projects, including funding and equipment</li>
          <li>Language Support: Courses to improve English proficiency or learn other languages</li>
        </ul>
      )
    },
    {
      title: "Career Development Services",
      icon: Briefcase,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Career Counseling: One-on-one sessions with career experts</li>
          <li>Job Placement Services: Assistance with job search, resume building, and interviews</li>
          <li>Internship Programs: Partnerships with leading companies for real-world experience</li>
          <li>Entrepreneurship Hub: Resources and mentorship for aspiring entrepreneurs</li>
        </ul>
      )
    },
    {
      title: "Student Life and Wellbeing",
      icon: Heart,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Counseling and Mental Health Services: Confidential support for emotional well-being</li>
          <li>Health Services: 24/7 on-campus medical center</li>
          <li>Student Housing: Comfortable and secure accommodation options</li>
          <li>Dining Services: Multi-cuisine cafeterias with healthy meal options</li>
          <li>Recreational Facilities: Gyms, pools, and sports complexes</li>
        </ul>
      )
    },
    {
      title: "IT and Tech Support",
      icon: Wifi,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>High-Speed Wi-Fi: Seamless connectivity across the campus</li>
          <li>Virtual Learning Environment (VLE): Online platforms for accessing course materials</li>
          <li>Tech Support Desk: 24/7 assistance for technical issues</li>
        </ul>
      )
    },
    {
      title: "Diversity and Inclusion Services",
      icon: Users,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Cultural Integration Programs: Activities to help international students adapt</li>
          <li>Diversity Office: Dedicated team ensuring inclusivity and equal opportunities</li>
          <li>Support Groups: Safe spaces for students to share experiences</li>
        </ul>
      )
    },
    {
      title: "Financial Aid and Scholarship Services",
      icon: DollarSign,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Scholarships and Grants: Merit-based and need-based financial support</li>
          <li>Work-Study Programs: On-campus employment opportunities</li>
          <li>Financial Planning Assistance: Guidance on managing expenses</li>
        </ul>
      )
    },
    {
      title: "Alumni Services",
      icon: GraduationCap,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Alumni Network: Access to a global community of GEU graduates</li>
          <li>Career Support: Continued career assistance and networking opportunities</li>
          <li>Alumni Events: Regular reunions, workshops, and seminars</li>
        </ul>
      )
    },
    {
      title: "Community Engagement and Outreach",
      icon: Handshake,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Volunteer Programs: Opportunities for community service</li>
          <li>Skill Development Workshops: Training for underprivileged communities</li>
          <li>Public Lectures and Seminars: Open sessions by thought leaders</li>
        </ul>
      )
    },
    {
      title: "Sustainability Services",
      icon: Leaf,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Green Campus Initiative: Programs for environmental conservation</li>
          <li>Sustainability Workshops: Awareness campaigns on sustainable living</li>
          <li>Eco-Friendly Transport: Electric shuttles and bicycle-sharing systems</li>
        </ul>
      )
    },
    {
      title: "Event Management Services",
      icon: Calendar,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Conference and Seminar Spaces: Fully equipped venues for hosting events</li>
          <li>Event Support Team: Professional assistance for planning and execution</li>
          <li>Cultural Celebrations: Festivals celebrating diversity and traditions</li>
        </ul>
      )
    },
    {
      title: "Security and Safety Services",
      icon: Shield,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>24/7 Campus Security: Dedicated team of trained personnel</li>
          <li>Emergency Helpline: Quick response team for emergencies</li>
          <li>Surveillance System: State-of-the-art CCTV coverage</li>
        </ul>
      )
    },
    {
      title: "Transportation Services",
      icon: Bus,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Campus Shuttle Services: Regular routes connecting key areas</li>
          <li>Outstation Buses: Comfortable buses for nearby towns and cities</li>
          <li>Airport Pickup for International Students: Assistance upon arrival</li>
        </ul>
      )
    },
    {
      title: "Innovation and Start-Up Services",
      icon: Lightbulb,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Innovation Lab: Cutting-edge tools for prototyping and development</li>
          <li>Startup Incubator: Funding, mentorship, and workspace for entrepreneurs</li>
          <li>Competitions and Hackathons: Regular events to foster innovation</li>
        </ul>
      )
    },
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
            GEU Services
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
          <p className="text-lg mb-6">
            At GEU, we are committed to providing a comprehensive range of services to ensure the academic, professional, and personal success of our students, faculty, and the broader community.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {servicesSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <section.icon className="w-6 h-6 mr-2" />
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                    </div>
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
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Discover the services that make GEU a hub for learning, growth, and success!</h2>
            <Button className="bg-gradient-to-r from-purple-400 to-pink-600 text-white">Explore More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}