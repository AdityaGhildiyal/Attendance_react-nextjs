'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { GraduationCap, UserCog } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-2">Welcome to GEU</CardTitle>
          <p className="text-gray-200">Login Portal</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full h-16 text-lg bg-white hover:bg-gray-100 text-indigo-600"
            onClick={() => router.push('/student/StudentLogin')}
          >
            <GraduationCap className="mr-2 h-6 w-6" />
            Login as Student
          </Button>
          <Button 
            className="w-full h-16 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => router.push('/Teachers/teacherlogin')}
          >
            <UserCog className="mr-2 h-6 w-6" />
            Login as Teacher
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
