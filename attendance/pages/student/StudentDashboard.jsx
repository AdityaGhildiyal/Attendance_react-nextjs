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
  const [studentInfo, setStudentInfo] = useState(null);
  const [timetable, setTimetable] = useState([])
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const res = await fetch('../api/studentinfo');
        const data = await res.json();
        if (res.ok) {
          setStudentInfo(data);
        } else {
          console.log('Error:', data.message);
        }
      } catch (error) {
        console.log('Error fetching student info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, []);

  
  useEffect(() => {
    // Fetch timetable data
    const fetchTimetable = async () => {
      console.log('Fetching timetable data...'); // Log when fetch is called
      try {
        const response = await fetch('/api/timetable');  // Replace with your actual API endpoint
        const data = await response.json();
  
        // Log the fetched data to check its structure
        console.log('Fetched data:', data);  
  
        if (!Array.isArray(data) || data.length === 0) {
          console.log('No timetable data available.');
          return;
        }
  
        // Handle missing times or missing fields
        const processedTimetable = data.map(item => {
          if (!item.startTime || !item.endTime) {
            console.log(`Time information is missing for ${item.subject}`);
            return { ...item, startTime: 'N/A', endTime: 'N/A' };  // Add a fallback value
          }
          return item;
        });
  
        setTimetable(processedTimetable);  // Set timetable data into state
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };
  
    fetchTimetable();
  }, []);
  
  // Log timetable whenever it changes
  useEffect(() => {
    console.log('Timetable state updated:', timetable); // Log the state whenever it changes
  }, [timetable]);

  

  useEffect(() => {
    // Fetch the subject-wise attendance data
    const fetchAttendance = async () => {
      try {
        const response = await fetch("/api/attendance");
        const data = await response.json();

        if (Array.isArray(data)) {
          setSubjects(data); // Set subjects to the state if the response is an array
        } else {
          console.error("Failed to load attendance data", data.message);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendance(); // Call the function to fetch data when component mounts
  }, []);
  

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

  if (loading || !studentInfo) {
    return <div>Loading...</div>;
  }

  

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
              {Array.isArray(timetable) && timetable.length > 0 ? (
                timetable.map((item, index) => {
                  // Handle missing startTime and endTime
                  if (!item.startTime || !item.endTime) {
                    return (
                      <div key={index} className="text-gray-300">
                        <p>Time information is missing for {item.subject}.</p>
                      </div>
                    );
                  }

                  // Parse start and end times from the schema (startTime and endTime)
                  const classStartTime = new Date();
                  const [startHour, startMinute] = item.startTime.split(/[: ]/);
                  classStartTime.setHours(startHour % 12 + (item.startTime.includes("PM") ? 12 : 0));
                  classStartTime.setMinutes(startMinute);

                  const classEndTime = new Date(classStartTime);
                  const [endHour, endMinute] = item.endTime.split(/[: ]/);
                  classEndTime.setHours(endHour % 12 + (item.endTime.includes("PM") ? 12 : 0));
                  classEndTime.setMinutes(endMinute);

                  const now = new Date();
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
                          {item.startTime} - {item.endTime} - Duration: {item.duration}
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
                })
              ) : (
                <div className="text-center text-gray-300">
                  {timetable.message || "No timetable available."}
                </div>
              )}
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
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <Card key={subject.subjectName} className="bg-gray-700">
                <CardHeader>
                  <CardTitle>
                    {subject.subjectName} 
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Faculty: {subject.faculty}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2 text-gray-300">
                    <span>Total Lectures: {subject.totalLectures}</span>
                    <span>Attended: {subject.attended}</span>
                  </div>
                  <Progress value={subject.attendancePercentage} className="w-full" />
                  <div className="text-right mt-2 text-gray-300">
                    {subject.attendancePercentage}%
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-300">No attendance data available.</div>
          )}
        </div>
      </section>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentDashboard
