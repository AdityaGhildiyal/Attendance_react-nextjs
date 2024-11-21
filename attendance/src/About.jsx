'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function About({ onBack }) {
  const aboutSections = [
    {
      title: "About GEU (Global Education University)",
      content: (
        <>
          <h3 className="text-xl font-semibold mb-2">Vision:</h3>
          <p className="mb-4">At Global Education University (GEU), we envision a world where knowledge transcends boundaries, empowering students to become leaders, innovators, and contributors to a sustainable and inclusive global society.</p>
          <h3 className="text-xl font-semibold mb-2">Mission:</h3>
          <p>GEU's mission is to provide world-class education that fosters creativity, critical thinking, and collaboration. We strive to blend cutting-edge research with practical applications, equipping students with the skills and values needed to thrive in a dynamic world.</p>
        </>
      )
    },
    {
      title: "Overview of GEU",
      content: (
        <p>Founded in the heart of a bustling academic city in 1995, Global Education University (GEU) has grown from a small institution to a globally recognized university. With a 250-acre campus, GEU is home to over 15,000 students and 1,200 faculty members from more than 40 countries. Offering a diverse range of programs and ranked among the top 200 global universities, GEU combines academic rigor with real-world learning experiences.</p>
      )
    },
    {
      title: "Academic Excellence",
      content: (
        <>
          <p className="mb-4">GEU offers a multidisciplinary approach with key features including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Interdisciplinary Curriculum</li>
            <li>Industry-Integrated Programs</li>
            <li>Research Opportunities</li>
          </ul>
          <h4 className="text-lg font-semibold mb-2">Faculties and Departments:</h4>
          <ul className="list-disc pl-6">
            <li>Faculty of Engineering and Technology</li>
            <li>Faculty of Business Administration</li>
            <li>Faculty of Health Sciences</li>
            <li>Faculty of Arts and Humanities</li>
            <li>Faculty of Environmental Sciences</li>
          </ul>
        </>
      )
    },
    {
      title: "Campus Life",
      content: (
        <>
          <p className="mb-4">GEU's campus features:</p>
          <ul className="list-disc pl-6">
            <li>Smart Classrooms</li>
            <li>Innovation Hubs</li>
            <li>Global Village</li>
            <li>Comfortable Accommodation</li>
            <li>Vibrant student clubs and organizations</li>
            <li>Annual events like GEU Global Fest and TechExpo</li>
          </ul>
        </>
      )
    },
    {
      title: "Research and Innovation",
      content: (
        <>
          <p className="mb-4">GEU hosts over 100 research centers focusing on areas like renewable energy, artificial intelligence, public health, and climate change.</p>
          <p className="mb-2">Notable achievements include:</p>
          <ul className="list-disc pl-6">
            <li>Development of a cost-effective water purification system for rural areas</li>
            <li>Creation of AI-driven tools for personalized learning in schools</li>
            <li>Contributions to global policy on climate resilience and urban sustainability</li>
          </ul>
        </>
      )
    },
    {
      title: "Global Presence",
      content: (
        <p>GEU has partnerships and exchange programs with over 200 institutions worldwide. Students can participate in semester exchange programs, collaborative research, or international internships. The university also offers dual-degree programs recognized across continents.</p>
      )
    },
    {
      title: "Sustainability and Social Responsibility",
      content: (
        <>
          <p className="mb-4">GEU is committed to sustainable development and community outreach, implementing initiatives such as:</p>
          <ul className="list-disc pl-6">
            <li>A solar-powered campus with a rainwater harvesting system</li>
            <li>Waste segregation and composting systems</li>
            <li>Electric shuttles and bicycle-sharing for eco-friendly transportation</li>
          </ul>
          <p className="mt-4">The GEU Social Impact Program engages students in projects like rural development, digital literacy drives, and disaster relief efforts.</p>
        </>
      )
    },
    {
      title: "Career Development and Alumni Success",
      content: (
        <>
          <p className="mb-4">GEU's Career Development Center (CDC) provides comprehensive career support for students.</p>
          <h4 className="text-lg font-semibold mb-2">Key highlights:</h4>
          <ul className="list-disc pl-6">
            <li>95% placement rate</li>
            <li>GEU Startup Incubator has supported over 300 student-led startups</li>
            <li>Alumni include Nobel laureates, CEOs of Fortune 500 companies, and internationally acclaimed artists and scientists</li>
          </ul>
        </>
      )
    },
    {
      title: "Why Choose GEU?",
      content: (
        <ul className="list-disc pl-6">
          <li>Global Recognition: Degrees recognized and respected worldwide</li>
          <li>Cutting-Edge Curriculum: Industry-relevant, flexible programs</li>
          <li>Diversity: A multicultural community fostering global connections</li>
          <li>Student Support: Comprehensive resources for academic, mental, and emotional well-being</li>
          <li>Location: Nestled in a vibrant academic city with modern amenities and cultural heritage</li>
        </ul>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          About GEU
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
            {aboutSections.map((section, index) => (
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
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join GEU Today!</h2>
            <p className="mb-4">At Global Education University, we don't just educate; we inspire. Join us to become part of a community that empowers you to lead, innovate, and transform the world. Let your journey of lifelong learning and impact begin here at GEU!</p>
            <Button className="bg-gradient-to-r from-purple-400 to-pink-600 text-white">Apply Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 