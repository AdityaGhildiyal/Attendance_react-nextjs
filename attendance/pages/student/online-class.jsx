'use client'

import { useRouter } from 'next/router'
import OnlineClass from '../../components/OnlineClass'

export default function OnlineClassPage() {
  const router = useRouter()

  return (
    <OnlineClass 
      onBack={() => router.push('/')} 
    />
  )
}
