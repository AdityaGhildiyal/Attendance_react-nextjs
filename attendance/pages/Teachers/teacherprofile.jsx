'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Book, Calendar, CheckCircle, ChevronRight, Clock, FileText, LogOut, MessageSquare, User, Users, Video, Brain, Award, Briefcase, GraduationCap, Mail, Phone } from 'lucide-react'

export default function TeacherProfile() {
  const [activeTab, setActiveTab] = useState("personal")

  const teacherInfo = {
    name: "Dr. Jane Smith",
    email: "jane.smith@example.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    employeeId: "T12345",
    joinDate: "2015-09-01",
    specialization: "Artificial Intelligence",
    course: "CS301: Advanced Artificial Intelligence",
    education: [
      { degree: "Ph.D. in Computer Science", institution: "Stanford University", year: "2015" },
      { degree: "M.S. in Artificial Intelligence", institution: "MIT", year: "2010" },
      { degree: "B.S. in Computer Science", institution: "UC Berkeley", year: "2008" }
    ],
    publications: [
      { title: "Deep Learning Approaches in Natural Language Processing", year: "2020", journal: "IEEE Transactions on Neural Networks and Learning Systems" },
      { title: "Ethical Considerations in AI Development", year: "2019", journal: "AI & Society" },
      { title: "Advancements in Reinforcement Learning for Robotics", year: "2018", journal: "Journal of Machine Learning Research" }
    ],
    awards: [
      { name: "Outstanding Teacher Award", year: "2022" },
      { name: "Best Paper Award - International Conference on Machine Learning", year: "2020" },
      { name: "Young Researcher Award", year: "2017" }
    ]
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Teacher Profile
        </motion.h1>
        <nav className="flex space-x-4">
          <Button variant="ghost"><Bell className="mr-2 h-4 w-4" /> Notifications</Button>
          <Button variant="ghost"><User className="mr-2 h-4 w-4" /> Dashboard</Button>
          <Button variant="ghost"><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
        </nav>
      </header>

      {/* Main content */}
      <Card className="w-full max-w-4xl mx-auto bg-gray-900 shadow-xl rounded-xl overflow-hidden text-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6 mb-6">
            <Avatar className="w-24 h-24 border-2 border-purple-500">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>{teacherInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold">{teacherInfo.name}</h2>
              <p className="text-gray-400">{teacherInfo.specialization}</p>
              <div className="flex space-x-2 mt-2">
                <Badge variant="secondary">{teacherInfo.department}</Badge>
                <Badge variant="secondary">{teacherInfo.course}</Badge>
              </div>
            </div>
          </div>

          <Tabs defaultValue="personal" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 gap-4 bg-gray-800">
              <TabsTrigger value="personal" className="data-[state=active]:bg-purple-700">Personal Info</TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-purple-700">Education</TabsTrigger>
              <TabsTrigger value="publications" className="data-[state=active]:bg-purple-700">Publications</TabsTrigger>
              <TabsTrigger value="awards" className="data-[state=active]:bg-purple-700">Awards</TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TabsContent value="personal" className="space-y-4">
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>{teacherInfo.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      <span>{teacherInfo.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>Employee ID: {teacherInfo.employeeId}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Join Date: {teacherInfo.joinDate}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {teacherInfo.education.map((edu, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-gray-400">{edu.institution}, {edu.year}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="publications" className="space-y-4">
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle>Publications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {teacherInfo.publications.map((pub, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h3 className="text-lg font-semibold">{pub.title}</h3>
                        <p className="text-gray-400">{pub.journal}, {pub.year}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="awards" className="space-y-4">
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle>Awards and Honors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {teacherInfo.awards.map((award, index) => (
                      <div key={index} className="flex items-center mb-4 last:mb-0">
                        <Award className="mr-2 h-5 w-5 text-yellow-500" />
                        <div>
                          <h3 className="text-lg font-semibold">{award.name}</h3>
                          <p className="text-gray-400">{award.year}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}