'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Book, DollarSign, FileText, Briefcase, Home, MessageSquare, LogOut, RocketIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import { useScroll } from '../../context/ScrollContext.js'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import Header from "../../components/Header"

function StudentDashboard() {
  const router = useRouter()
  const scrollContext = useScroll()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [particles, setParticles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Use either context scroll position or local state as fallback
  const scrollPosition = scrollContext?.scrollPosition ?? 0
  const setScrollPosition = scrollContext?.setScrollPosition ?? (() => {})

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (typeof scrollPosition === 'number') {
      window.scrollTo(0, scrollPosition)
    }
  }, [scrollPosition])

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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/')
  };

  const handleCardClick = async (card) => {
    try {
      setIsLoading(true)
      const currentScroll = window.scrollY
      setScrollPosition(currentScroll)
      await router.push(`/student/${card.path}`)
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(date);
  };
  
  

  const studentInfo = {
    name: "Aditya Ghildiyal",
    email: "adityaghildiyal@proton.me",
    contact: "+91 8439906540",
    fatherName: "X Ghildiyal",
    motherName: "Y Ghildiyal",
    dob: "08/06/2005",
    campus: "Lyon",
    course: "Computer Science",
    specialization: "Artificial Intelligence",
    yearSem: "3rd Year / 6th Semester",
    branch: "CSE",
    section: "A2",
    classRollNo: "CS2001",
    universityRollNo: "U20CS001",
    highschoolPercentage: "92%",
    intermediatePercentage: "88%"
  }

  const subjects = [
    { name: "Data Structures", code: "CS301", faculty: "Dr. Smith", total: 30, attended: 28, percentage: 93 },
    { name: "Database Systems", code: "CS302", faculty: "Prof. Johnson", total: 25, attended: 18, percentage: 72 },
    { name: "Web Development", code: "CS303", faculty: "Ms. Williams", total: 28, attended: 26, percentage: 93 },
    { name: "Machine Learning", code: "CS304", faculty: "Dr. Brown", total: 32, attended: 30, percentage: 94 }
  ]

  const timetable = [
    { subject: "Data Structures", time: "09:00 AM", duration: "1 hour" },
    { subject: "Database Systems", time: "11:00 AM", duration: "1 hour" },
    { subject: "Web Development", time: "02:00 PM", duration: "1 hour" },
    { subject: "Machine Learning", time: "04:00 PM", duration: "1 hour" }
  ]

  const navigationCards = [
    { title: "Timetable", icon: Calendar, path: "timetable" },
    { title: "Academic", icon: Book, path: "Academic" },
    { title: "Exam", icon: FileText, path: "Exam" },
    { title: "Fee", icon: DollarSign, path: "fee" },
    { title: "Circular", icon: FileText, path: "circular" },
    { title: "Placement", icon: Briefcase, path: "placement" },
    { title: "Online Class", icon: Book, path: "online-class" },
    { title: "Hostel", icon: Home, path: "hostel" },
    { title: "Grievance", icon: MessageSquare, path: "grievance" },
    { title: "About Us", icon: Book, path: "About" },
    { title: "Contact Us", icon: MessageSquare, path: "ContactUs" }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      <Header studentInfo={studentInfo} currentTime={currentTime} handleLogout={handleLogout} />
      
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

      {/* Main content */}
      <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden text-gray-100">
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        <CardContent className="p-6">
          {/* Welcome section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome back, {studentInfo.name}</h2>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-white">
                {studentInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-lg">{studentInfo.email}</p>
                <p>{studentInfo.contact}</p>
              </div>
            </div>
          </section>

          {/* Student Information */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Student Information</h3>
            <Card className="bg-gray-700">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(studentInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium text-gray-300">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Timetable */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Today's Timetable</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {timetable.map((item, index) => {
                // Parse times
                const classStartTime = new Date();
                const [hour, minute] = item.time.split(/[: ]/);
                classStartTime.setHours(hour % 12 + (item.time.includes("PM") ? 12 : 0));
                classStartTime.setMinutes(minute);

                const classEndTime = new Date(classStartTime);
                classEndTime.setMinutes(classStartTime.getMinutes() + parseInt(item.duration.split(" ")[0]) * 60);

                const now = currentTime;
                let classStatus = "Upcoming";
                if (now >= classStartTime && now <= classEndTime) {
                  classStatus = "Ongoing";
                } else if (now > classEndTime) {
                  classStatus = "Completed";
                }

                const progress =
                  classStatus === "Ongoing"
                    ? ((now - classStartTime) / (classEndTime - classStartTime)) * 100
                    : 0;

                return (
                  <Card key={index} className="bg-gray-700 shadow-md hover:shadow-lg transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">{item.subject}</CardTitle>
                      <CardDescription className="text-sm text-gray-300">
                        {item.time} - Duration: {item.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-2 text-gray-300">
                        <span>Status: <span className={`font-semibold ${classStatus === "Ongoing" ? "text-green-400" : classStatus === "Completed" ? "text-red-400" : "text-yellow-400"}`}>{classStatus}</span></span>
                        <span>Ends at: {formatTime(classEndTime)}</span>
                      </div>
                      <div className="relative h-4 w-full bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${classStatus === "Ongoing" ? "bg-blue-500" : "bg-gray-400"}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      {classStatus === "Ongoing" && (
                        <p className="text-right mt-2 text-sm text-gray-300">
                          {Math.ceil((classEndTime - now) / 60000)} minutes left
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Cards */}
          <section className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {navigationCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="bg-gray-700 text-white cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg"
                    onClick={() => handleCardClick(card)}
                  >
                    <CardHeader className="flex flex-col items-center">
                      <card.icon className="w-8 h-8 mb-2" />
                      <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Subject-wise Attendance */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Subject-wise Attendance</h3>
            <div className="space-y-4">
              {subjects.map(subject => (
                <Card key={subject.code} className="bg-gray-700">
                  <CardHeader>
                    <CardTitle>{subject.name} ({subject.code})</CardTitle>
                    <CardDescription className="text-gray-300">Faculty: {subject.faculty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-2 text-gray-300">
                      <span>Total Lectures: {subject.total}</span>
                      <span>Attended: {subject.attended}</span>
                    </div>
                    <Progress value={subject.percentage} className="w-full" />
                    <div className="text-right mt-2 text-gray-300">{subject.percentage}%</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentDashboard
