import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { BookOpen, Lock, User, Sparkles, Eye, EyeOff } from 'lucide-react'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')  // Add state to handle role selection
  const [particles, setParticles] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', role);  // Store the selected role in localStorage
      setIsLoggedIn(true);  // This will trigger the redirect in _app.js

      // Redirect based on the selected role
      if (role === "teacher") {
        router.push("/teacher/TeacherLogin");
      } else {
        router.push("/students/StudentLogin");
      }
    }
  }

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 overflow-hidden relative">
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
      <Card className="w-full max-w-md shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4 relative">
            <BookOpen className="h-16 w-16 text-white" />
            <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-bold text-center text-white">GEU Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-white">Username</Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/50"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/50"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                <button 
                  type="button" 
                  onClick={handleTogglePassword} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-white">Role</Label>
              <div className="relative">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/50 w-full"
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-white text-indigo-900 hover:bg-indigo-100 transition-all duration-300">
              Login
            </Button>
            <Button variant="link" className="text-sm text-white hover:text-indigo-200">
              Forgot password?
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
