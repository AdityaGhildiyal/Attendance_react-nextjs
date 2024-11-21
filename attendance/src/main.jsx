import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import Login from './Login'
import StudentDashboard from './StudentDashboard'
import About from './About'
import Contact from './ContactUs'
import Services from './Services'
import Fee from './fee'
import Grievance from './grievance'
import Hostel from './hostel'
import Placement from './placement'
import Circular from './circular'
import Timetable from './timetable'
import Academic from './Academic'
import Exam from './Exam'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/fee" element={<Fee />} />
      <Route path="/grievance" element={<Grievance />} />
      <Route path="/hostel" element={<Hostel />} />
      <Route path="/placement" element={<Placement />} />
      <Route path="/circular" element={<Circular />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/academic" element={<Academic />} />
      <Route path="/exam" element={<Exam />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  </Router>
)

