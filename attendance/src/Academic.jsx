'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, Star, Bus, Check, X, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Academic = ({ onBack }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isBusUser, setIsBusUser] = useState(true) // Set this based on actual student data
  const [expandedSubject, setExpandedSubject] = useState(null)
  const [excuseDialogOpen, setExcuseDialogOpen] = useState(false)
  const [excuseDate, setExcuseDate] = useState(null)

  const subjects = [
    {
      name: "Data Structures",
      code: "CS301",
      faculty: "Dr. Smith",
      total: 30,
      attended: 28,
      percentage: 93,
      classes: [
        { date: '2023-11-01', present: true },
        { date: '2023-11-03', present: true },
        { date: '2023-11-05', present: false },
        { date: '2023-11-07', present: true },
        { date: '2023-11-09', present: true },
      ]
    },
    {
      name: "Database Systems",
      code: "CS302",
      faculty: "Prof. Johnson",
      total: 25,
      attended: 18,
      percentage: 72,
      classes: [
        { date: '2023-11-02', present: true },
        { date: '2023-11-04', present: false },
        { date: '2023-11-06', present: false },
        { date: '2023-11-08', present: true },
        { date: '2023-11-10', present: false },
      ]
    },
    {
      name: "Web Development",
      code: "CS303",
      faculty: "Ms. Williams",
      total: 28,
      attended: 26,
      percentage: 93,
      classes: [
        { date: '2023-11-01', present: true },
        { date: '2023-11-03', present: true },
        { date: '2023-11-05', present: true },
        { date: '2023-11-07', present: true },
        { date: '2023-11-09', present: false },
      ]
    },
    {
      name: "Machine Learning",
      code: "CS304",
      faculty: "Dr. Brown",
      total: 32,
      attended: 30,
      percentage: 94,
      classes: [
        { date: '2023-11-02', present: true },
        { date: '2023-11-04', present: true },
        { date: '2023-11-06', present: true },
        { date: '2023-11-08', present: true },
        { date: '2023-11-10', present: true },
      ]
    }
  ]

  const studentBusRoute = {
    route: "Route A",
    stops: "Main Gate - Library - Hostel Block - Academic Block"
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    console.log(`Feedback for ${selectedFaculty}: Rating ${rating}, Comment: ${comment}`)
    setIsDialogOpen(true)
    setSelectedFaculty('')
    setRating(0)
    setComment('')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log(`File uploaded: ${file.name}`)
    }
  }

  const handleExcuseRequest = (date) => {
    setExcuseDate(date)
    setExcuseDialogOpen(true)
  }

  const submitExcuseRequest = () => {
    console.log(`Excuse requested for ${excuseDate}`)
    setExcuseDialogOpen(false)
    setExcuseDate(null)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Academic Information
        </h1>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </header>

      <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="attendance">
              <AccordionTrigger className="text-xl font-semibold">Current Semester Attendance</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableCaption>Attendance for current semester subjects</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Total Lectures</TableHead>
                      <TableHead>Lectures Attended</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map((subject) => (
                      <React.Fragment key={subject.code}>
                        <TableRow 
                          className="cursor-pointer" 
                          onClick={() => setExpandedSubject(expandedSubject === subject.code ? null : subject.code)}
                        >
                          <TableCell>{subject.name}</TableCell>
                          <TableCell>{subject.code}</TableCell>
                          <TableCell>{subject.faculty}</TableCell>
                          <TableCell>{subject.total}</TableCell>
                          <TableCell>{subject.attended}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={subject.percentage} className="w-[60%]" />
                              <span>{subject.percentage}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedSubject === subject.code && (
                          <TableRow>
                            <TableCell colSpan={6}>
                              <div className="p-4 bg-gray-800 rounded-md">
                                <h4 className="text-lg font-semibold mb-2">Detailed Attendance</h4>
                                <div className="grid grid-cols-5 gap-2">
                                  {subject.classes.map((classDay, index) => (
                                    <div 
                                      key={index} 
                                      className={`p-2 rounded-md flex items-center justify-between ${
                                        classDay.present ? 'bg-green-600' : 'bg-red-600 cursor-pointer'
                                      }`}
                                      onClick={() => !classDay.present && handleExcuseRequest(classDay.date)}
                                    >
                                      <span>{classDay.date}</span>
                                      {classDay.present ? <Check size={16} /> : <X size={16} />}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                        {subject.percentage < 75 && (
                          <TableRow>
                            <TableCell colSpan={6}>
                              <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Attendance Alert</AlertTitle>
                                <AlertDescription>
                                  Your attendance is below 75% in this subject. Please improve your attendance to avoid any academic penalties.
                                </AlertDescription>
                              </Alert>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="feedback">
              <AccordionTrigger className="text-xl font-semibold">Faculty Feedback</AccordionTrigger>
              <AccordionContent>
                <form onSubmit={handleFeedbackSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="faculty">Select Faculty</Label>
                      <select
                        id="faculty"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        value={selectedFaculty}
                        onChange={(e) => setSelectedFaculty(e.target.value)}
                        required
                      >
                        <option value="">Select a faculty</option>
                        {subjects.map((subject) => (
                          <option key={subject.code} value={subject.faculty}>
                            {subject.faculty} - {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="rating">Rating (1-10)</Label>
                      <div className="flex items-center space-x-1">
                        {[...Array(10)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-6 h-6 cursor-pointer ${
                              index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                            }`}
                            onClick={() => setRating(index + 1)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="comment">Comment</Label>
                      <Textarea
                        id="comment"
                        placeholder="Your feedback..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-black"
                      />
                    </div>
                    <Button type="submit">Submit Feedback</Button>
                  </div>
                </form>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="assignment">
              <AccordionTrigger className="text-xl font-semibold">Assignment Upload</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="assignment">Select Assignment</Label>
                    <select
                      id="assignment"
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    >
                      <option value="">Select an assignment</option>
                      {subjects.map((subject) => (
                        <option key={subject.code} value={subject.code}>
                          {subject.name} Assignment
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="file-upload">Upload File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                  </div>
                  <Button type="button" onClick={() => console.log('Upload clicked')}>
                    <Upload className="mr-2 h-4 w-4" /> Upload Assignment
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {isBusUser && (
              <AccordionItem value="bus-route">
                <AccordionTrigger className="text-xl font-semibold">Bus Route</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Bus className="w-5 h-5" />
                      <span className="font-semibold">{studentBusRoute.route}</span>
                    </div>
                    <p>{studentBusRoute.stops}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-xl text-blue-400">Feedback Submitted</DialogTitle>
            <DialogDescription className="text-gray-300">
              Thank you for your feedback. Your input is valuable to us and helps improve our teaching quality.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsDialogOpen(false)} className="bg-green-500 hover:bg-green-600 text-white">Close</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={excuseDialogOpen} onOpenChange={setExcuseDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-xl text-blue-400">Request Attendance Excuse</DialogTitle>
            <DialogDescription className="text-gray-300">
              You are requesting an excuse for your absence on {excuseDate}. Please provide a reason for your absence.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for absence..."
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <Button onClick={submitExcuseRequest} className="bg-green-500 hover:bg-green-600 text-white">Submit Request</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Academic