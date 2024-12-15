'use client'

import React, { useState , useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Bell, CalendarIcon, CheckCircle, LogOut, User, Video, Brain, X } from 'lucide-react'

export default function EnhancedTeacherDashboard() {
  const router = useRouter(); 
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [teacherInfo, setteacherInfo] = useState(null);
  const [isGeneratingLessonPlan, setIsGeneratingLessonPlan] = useState(false)
  const [lessonPlan, setLessonPlan] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch('../api/teacherinfo');
        const data = await res.json();
        if (res.ok) {
          setteacherInfo(data);
        } else {
          console.log('Error:', data.message);
        }
      } catch (error) {
        console.log('Error fetching teacher info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherInfo();
  }, []);

  const upcomingClasses = [
    { id: 1, topic: "Neural Networks", time: "10:00 AM", duration: "1 hour", room: "CS-301", link: "https://meet.google.com/abc-defg-hij" },
    { id: 2, topic: "Reinforcement Learning", time: "02:00 PM", duration: "2 hours", room: "CS-301", link: "https://meet.google.com/klm-nopq-rst" },
    { id: 3, topic: "Natural Language Processing", time: "04:00 PM", duration: "1.5 hours", room: "CS-301", link: "https://meet.google.com/uvw-xyza-bcd" },
  ]

  const students = [
    { id: 1, name: "Alice Johnson", attendance: 90, grade: "A", attendanceHistory: [1,1,1,1,0,1,1,1,1,1] },
    { id: 2, name: "Bob Williams", attendance: 85, grade: "B+", attendanceHistory: [1,1,0,1,1,1,1,0,1,1] },
    { id: 3, name: "Charlie Brown", attendance: 75, grade: "B", attendanceHistory: [1,0,1,1,0,1,0,1,1,1] },
    { id: 4, name: "Diana Martinez", attendance: 95, grade: "A+", attendanceHistory: [1,1,1,1,1,1,1,1,0,1] },
    { id: 5, name: "Ethan Davis", attendance: 80, grade: "B", attendanceHistory: [1,1,0,1,1,0,1,1,1,1] },
  ]

  const assignments = [
    { id: 1, title: "AI Ethics Case Study", dueDate: "2023-06-15", submitted: 18, total: 25 },
    { id: 2, title: "Neural Network Implementation", dueDate: "2023-06-20", submitted: 22, total: 25 },
    { id: 3, title: "NLP Algorithm Design", dueDate: "2023-06-18", submitted: 24, total: 25 },
  ]

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  }

  const handleStudentClick = (student) => {
    setSelectedStudent(student)
  }

  const generateLessonPlan = () => {
    setIsGeneratingLessonPlan(true)
    setTimeout(() => {
      setLessonPlan({
        topic: "Introduction to Neural Networks",
        objectives: [
          "Understand the basic structure of neural networks",
          "Learn about activation functions",
          "Implement a simple neural network using Python"
        ],
        activities: [
          "Interactive presentation on neural network components",
          "Group discussion on real-world applications",
          "Hands-on coding session to build a basic neural network"
        ],
        resources: [
          "Neural Networks and Deep Learning by Michael Nielsen",
          "TensorFlow playground for visualizations",
          "Jupyter notebook with starter code"
        ]
      })
      setIsGeneratingLessonPlan(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Card className="w-full max-w-7xl mx-auto bg-gray-900 shadow-xl rounded-xl overflow-hidden text-white border-gray-800">
        <CardContent className="p-6">
          <header className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white"
            >
              Teacher Dashboard
            </motion.h1>
            <nav className="flex space-x-4">
              <Button variant="outline"><Bell className="mr-2 h-4 w-4" /> Notifications</Button>
              <Button variant="outline"><User className="mr-2 h-4 w-4" /> Profile</Button>
              <Button variant="outline"><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
            </nav>
          </header>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-6 gap-4 bg-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-black">Overview</TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-white data-[state=active]:text-black">Students</TabsTrigger>
              <TabsTrigger value="assignments" className="data-[state=active]:bg-white data-[state=active]:text-black">Assignments</TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-white data-[state=active]:text-black">Schedule</TabsTrigger>
              <TabsTrigger value="lessonplan" className="data-[state=active]:bg-white data-[state=active]:text-black">Lesson Plan</TabsTrigger>
              <TabsTrigger value="onlineclass" className="data-[state=active]:bg-white data-[state=active]:text-black">Online Class</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Card className="bg-gray-800 border-gray-700">
    <CardHeader>
      <CardTitle>Teacher Information</CardTitle>
    </CardHeader>
    <CardContent>
      {teacherInfo ? (
        <div className="flex items-center space-x-4 mb-4">
          {/* Profile Initials */}
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-white">
            {teacherInfo.name 
              ? teacherInfo.name.split(' ').map((n) => n[0]).join('') 
              : "N/A"}
          </div>

          {/* Teacher Details */}
          <div>
            <h3 className="text-xl font-semibold">
              {teacherInfo.name || "Unknown Name"}
            </h3>
            <p className="text-gray-400">{teacherInfo.email || "Unknown Email"}</p>
          </div>
        </div>
      ) : (
        // Fallback UI when `teacherInfo` is not available
        <div className="text-gray-400">Loading teacher information...</div>
      )}

      {/* Teacher Info Details */}
      {teacherInfo && (
        <div className="space-y-2 text-gray-300">
          <p><strong>Department:</strong> {teacherInfo.department || "N/A"}</p>
          <p><strong>Employee ID:</strong> {teacherInfo.employeeId || "N/A"}</p>
          <p><strong>Join Date:</strong> {teacherInfo.joinDate || "N/A"}</p>
          <p><strong>Specialization:</strong> {teacherInfo.specialization || "N/A"}</p>
          <p><strong>Course:</strong> {teacherInfo.course || "N/A"}</p>
        </div>
      )}
    </CardContent>
  </Card>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle>Upcoming Classes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {upcomingClasses.map((cls) => (
                            <li key={cls.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                              <div>
                                <p className="font-semibold">{cls.topic}</p>
                                <p className="text-sm text-gray-400">{cls.time} - {cls.duration}</p>
                              </div>
                              <span className="text-sm bg-white text-black px-2 py-1 rounded">{cls.room}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle>Student Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Attendance</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Progress value={student.attendance} className="w-[60%] mr-2" />
                                  <span>{student.attendance}%</span>
                                </div>
                              </TableCell>
                              <TableCell>{student.grade}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" onClick={() => handleStudentClick(student)}>Analyze Attendance</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  {selectedStudent && (
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle>Attendance Analysis: {selectedStudent.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex space-x-1">
                          {selectedStudent.attendanceHistory.map((attendance, index) => (
                            <div
                              key={index}
                              className={`w-8 h-8 ${attendance ? 'bg-white' : 'bg-gray-600'} rounded-sm flex items-center justify-center`}
                            >
                              {attendance ? <CheckCircle className="w-4 h-4 text-black" /> : <X className="w-4 h-4 text-white" />}
                            </div>
                          ))}
                        </div>
                        <p className="mt-4">Overall Attendance: {selectedStudent.attendance}%</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="assignments" className="space-y-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle>Assignments and Exams</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assignments.map((assignment) => (
                            <TableRow key={assignment.id}>
                              <TableCell>{assignment.title}</TableCell>
                              <TableCell>{assignment.dueDate}</TableCell>
                              <TableCell>{assignment.submitted}/{assignment.total}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">View Details</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Create New Assignment</Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 text-white border-gray-700">
                            <DialogHeader>
                              <DialogTitle>Create New Assignment</DialogTitle>
                              <DialogDescription>
                                Enter the details for the new assignment.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                  Title
                                </Label>
                                <Input id="title" className="col-span-3 bg-gray-700 text-white" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dueDate" className="text-right">
                                  Due Date
                                </Label>
                                <Input id="dueDate" type="date" className="col-span-3 bg-gray-700 text-white" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                  Description
                                </Label>
                                <Textarea id="description" className="col-span-3 bg-gray-700 text-white" />
                              </div>
                            </div>
                            <Button type="submit" variant="outline">Create Assignment</Button>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle>Class Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border border-gray-700 bg-gray-800 text-white"
                          />
                        </div>
                        <div className="w-full md:w-1/2">
                          <h3 className="text-lg font-semibold mb-4">Classes for {selectedDate?.toDateString()}</h3>
                          <ul className="space-y-2">
                            {upcomingClasses.map((cls) => (
                              <li key={cls.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                                <span>{cls.topic}</span>
                                <span>{cls.time}</span>
                              </li>
                            ))}
                          </ul>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="mt-4">
                                <Video className="mr-2 h-4 w-4" />
                                Schedule Online Class
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 text-white border-gray-700">
                              <DialogHeader>
                                <DialogTitle>Schedule Online Class</DialogTitle>
                                <DialogDescription>
                                  Enter the details for the online class.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="className" className="text-right">
                                    Topic
                                  </Label>
                                  <Input id="className" className="col-span-3 bg-gray-700 text-white" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="classDate" className="text-right">
                                    Date
                                  </Label>
                                  <Input id="classDate" type="date" className="col-span-3 bg-gray-700 text-white" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="classTime" className="text-right">
                                    Time
                                  </Label>
                                  <Input id="classTime" type="time" className="col-span-3 bg-gray-700 text-white" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="classDuration" className="text-right">
                                    Duration
                                  </Label>
                                  <Select>
                                    <SelectTrigger className="col-span-3 bg-gray-700 text-white">
                                      <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-white">
                                      <SelectItem value="30">30 minutes</SelectItem>
                                      <SelectItem value="60">1 hour</SelectItem>
                                      <SelectItem value="90">1.5 hours</SelectItem>
                                      <SelectItem value="120">2 hours</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <Button type="submit" variant="outline">Schedule Class</Button>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="lessonplan" className="space-y-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle>AI-Assisted Lesson Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {!lessonPlan ? (
                        <div className="text-center">
                          <p className="mb-4">Generate an AI-assisted lesson plan for your next class.</p>
                          <Button 
                            onClick={generateLessonPlan} 
                            disabled={isGeneratingLessonPlan}
                            variant="outline"
                          >
                            {isGeneratingLessonPlan ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="mr-2"
                                >
                                  <Brain className="h-4 w-4" />
                                </motion.div>
                                Generating...
                              </>
                            ) : (
                              <>
                                <Brain className="mr-2 h-4 w-4" />
                                Generate Lesson Plan
                              </>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">{lessonPlan.topic}</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold">Objectives:</h4>
                              <ul className="list-disc pl-5">
                                {lessonPlan.objectives.map((objective, index) => (
                                  <li key={index}>{objective}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold">Activities:</h4>
                              <ul className="list-disc pl-5">
                                {lessonPlan.activities.map((activity, index) => (
                                  <li key={index}>{activity}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold">Resources:</h4>
                              <ul className="list-disc pl-5">
                                {lessonPlan.resources.map((resource, index) => (
                                  <li key={index}>{resource}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <Button 
                            onClick={() => setLessonPlan(null)} 
                            className="mt-4"
                            variant="outline"
                          >
                            Generate New Plan
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="onlineclass" className="space-y-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle>Join Online Class</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => { router.push('/Teachers/onlineclass'); }}
                        variant="outline"
                      >
                        Online Class
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
