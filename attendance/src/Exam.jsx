'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Exam = ({ onBack }) => {
  const [backPaperApplication, setBackPaperApplication] = useState({})

  const examTimetable = [
    { subject: "Data Structures", code: "CS301", date: "2024-05-10", day: "Monday", time: "09:00 AM - 12:00 PM" },
    { subject: "Database Systems", code: "CS302", date: "2024-05-12", day: "Wednesday", time: "02:00 PM - 05:00 PM" },
    { subject: "Web Development", code: "CS303", date: "2024-05-14", day: "Friday", time: "09:00 AM - 12:00 PM" },
    { subject: "Machine Learning", code: "CS304", date: "2024-05-16", day: "Monday", time: "02:00 PM - 05:00 PM" },
  ]

  const semesterResults = [
    {
      semester: 1,
      sgpa: 8.5,
      subjects: [
        { name: "Introduction to Programming", code: "CS101", marks: 85, status: "Pass" },
        { name: "Digital Logic", code: "CS102", marks: 78, status: "Pass" },
        { name: "Mathematics I", code: "MA101", marks: 90, status: "Pass" },
      ]
    },
    {
      semester: 2,
      sgpa: 7.8,
      subjects: [
        { name: "Object-Oriented Programming", code: "CS201", marks: 82, status: "Pass" },
        { name: "Data Structures", code: "CS202", marks: 75, status: "Pass" },
        { name: "Mathematics II", code: "MA201", marks: 68, status: "Pass" },
      ]
    },
    {
      semester: 3,
      sgpa: 8.2,
      subjects: [
        { name: "Database Management Systems", code: "CS301", marks: 88, status: "Pass" },
        { name: "Computer Networks", code: "CS302", marks: 79, status: "Pass" },
        { name: "Operating Systems", code: "CS303", marks: 35, status: "Fail" },
      ]
    },
  ]

  const backPapers = [
    { subject: "Operating Systems", code: "CS303", semester: 3, eligible: true, applied: false },
    { subject: "Computer Architecture", code: "CS204", semester: 2, eligible: true, applied: true },
  ]

  const handleBackPaperApplication = (code) => {
    setBackPaperApplication(prev => ({
      ...prev,
      [code]: !prev[code]
    }))
  }

  const downloadAdmitCard = () => {
    // In a real application, this would trigger a download
    console.log("Downloading admit card...")
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Exam Information
        </h1>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </header>

      {/* Main content */}
      <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {/* Exam Timetable Section */}
            <AccordionItem value="timetable">
              <AccordionTrigger className="text-xl font-semibold">Exam Timetable</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableCaption>Upcoming Exam Schedule</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examTimetable.map((exam) => (
                      <TableRow key={exam.code}>
                        <TableCell>{exam.subject}</TableCell>
                        <TableCell>{exam.code}</TableCell>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>{exam.day}</TableCell>
                        <TableCell>{exam.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            {/* Results Section */}
            <AccordionItem value="results">
              <AccordionTrigger className="text-xl font-semibold">Semester Results</AccordionTrigger>
              <AccordionContent>
                {semesterResults.map((semester) => (
                  <Card key={semester.semester} className="mb-4 bg-gray-800">
                    <CardHeader>
                      <CardTitle>Semester {semester.semester} - SGPA: {semester.sgpa}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Marks</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {semester.subjects.map((subject) => (
                            <TableRow key={subject.code}>
                              <TableCell>{subject.name}</TableCell>
                              <TableCell>{subject.code}</TableCell>
                              <TableCell>{subject.marks}</TableCell>
                              <TableCell>{subject.status}</TableCell>
                              <TableCell>
                                {subject.status === "Fail" && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleBackPaperApplication(subject.code)}
                                  >
                                    Apply for Back Paper
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Back Papers Section */}
            <AccordionItem value="backpapers">
              <AccordionTrigger className="text-xl font-semibold">Back Papers</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableCaption>Back Paper Information</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Eligible</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backPapers.map((paper) => (
                      <TableRow key={paper.code}>
                        <TableCell>{paper.subject}</TableCell>
                        <TableCell>{paper.code}</TableCell>
                        <TableCell>{paper.semester}</TableCell>
                        <TableCell>{paper.eligible ? "Yes" : "No"}</TableCell>
                        <TableCell>{paper.applied ? "Applied" : "Not Applied"}</TableCell>
                        <TableCell>
                          {paper.eligible && !paper.applied && (
                            <Button
                              size="sm"
                              onClick={() => handleBackPaperApplication(paper.code)}
                            >
                              Apply
                            </Button>
                          )}
                          {paper.applied && (
                            <span className="text-green-500">Application Submitted</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            {/* Admit Card Section */}
            <AccordionItem value="admitcard">
              <AccordionTrigger className="text-xl font-semibold">Admit Card</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle>Download Admit Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Your admit card for the upcoming exams is now available for download.</p>
                    <Button onClick={downloadAdmitCard}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Admit Card
                    </Button>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Subject Reevaluation Section */}
            <AccordionItem value="reevaluation">
              <AccordionTrigger className="text-xl font-semibold">Subject Reevaluation</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle>Request Reevaluation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="subject">Select Subject</Label>
                        <select
                          id="subject"
                          className="w-full p-2 rounded bg-gray-700 text-white"
                        >
                          <option value="">Select a subject</option>
                          {semesterResults.flatMap(semester => 
                            semester.subjects.map(subject => (
                              <option key={subject.code} value={subject.code}>
                                {subject.name} ({subject.code})
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="reason">Reason for Reevaluation</Label>
                        <Input
                          id="reason"
                          placeholder="Enter your reason for requesting reevaluation"
                          className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                      </div>
                      <Button type="submit">Submit Reevaluation Request</Button>
                    </form>
                    <Alert className="mt-4" variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Important Note</AlertTitle>
                      <AlertDescription>
                        Reevaluation requests are subject to approval and may incur additional fees. Please ensure you have valid reasons for requesting a reevaluation.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Back Paper Application Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <span className="hidden">Open Back Paper Application</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply for Back Paper</DialogTitle>
            <DialogDescription>
              Please confirm that you want to apply for a back paper. This may incur additional fees.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => console.log("Back paper application submitted")}>
              Confirm Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Exam