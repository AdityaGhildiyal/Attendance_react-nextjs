import React from 'react'
import { Button } from "./ui/button"
import { LogOut, Home } from 'lucide-react'
import { useRouter } from 'next/router'

export default function Header({ handleLogout }) {
  const router = useRouter()

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          GEU
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/student/StudentDashboard')}
          className="text-white hover:text-gray-300"
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => router.push('/student/About')}
          className="text-white hover:text-gray-300"
        >
          About
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => router.push('/student/ContactUs')}
          className="text-white hover:text-gray-300"
        >
          Contact Us
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => router.push('/student/Services')}
          className="text-white hover:text-gray-300"
        >
          Services
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            handleLogout();
          }}
          className="text-white hover:text-gray-300"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}