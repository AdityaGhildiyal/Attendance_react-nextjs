'use client'

import { useRouter } from 'next/router'
import { Button } from "../components/ui/button"
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function ForbiddenPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <ShieldAlert className="h-24 w-24 text-red-500" />
        </div>
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
          403
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Access Forbidden</h2>
        <p className="text-gray-400 mb-8">
          Sorry, you don't have permission to access this page. Please make sure you have the necessary authorization.
        </p>
        <div className="space-y-4">
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => router.push('/')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
