'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Video, VideoOff } from 'lucide-react'

const participants = [
  { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40', isSpeaking: true, isMuted: false, isVideoOn: true },
  { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40', isSpeaking: false, isMuted: true, isVideoOn: false },
  { id: '3', name: 'Charlie Brown', avatar: '/placeholder.svg?height=40&width=40', isSpeaking: false, isMuted: false, isVideoOn: true },
  { id: '4', name: 'Diana Prince', avatar: '/placeholder.svg?height=40&width=40', isSpeaking: false, isMuted: false, isVideoOn: true },
]

export function ParticipantsList() {
  const [localParticipants, setLocalParticipants] = useState(participants)

  return (
    <div className="max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold p-3 bg-gray-700">Participants ({localParticipants.length})</h3>
      <ul>
        {localParticipants.map((participant) => (
          <li key={participant.id} className={`flex items-center justify-between p-3 ${participant.isSpeaking ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span>{participant.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              {participant.isMuted ? <MicOff size={16} /> : <Mic size={16} />}
              {participant.isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}