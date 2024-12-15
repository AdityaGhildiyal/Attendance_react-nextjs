'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Mic, PhoneOff, Video, Edit3, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react'
import { StudentWhiteboard } from './student-whiteboard'
import { Chat } from './chat'
import { MiniChat } from './mini-chat'
import { ParticipantsList } from './participants-list'

export default function StudentVideoCall() {
  const [showParticipants, setShowParticipants] = useState(false)
  const [showMiniChat, setShowMiniChat] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [micOn, setMicOn] = useState(true)

  const toggleCamera = () => setCameraOn(!cameraOn)
  const toggleMic = () => setMicOn(!micOn)
  const toggleMiniChat = () => setShowMiniChat(!showMiniChat)
  const endCall = () => {
    console.log('Call ended')
  }

  return (
    <div className="h-screen bg-black text-white">
      <Tabs defaultValue="video" className="h-full">
        <TabsList className="absolute top-4 left-4 z-10">
          <TabsTrigger value="video"><Video className="mr-2" />Video</TabsTrigger>
          <TabsTrigger value="whiteboard"><Edit3 className="mr-2" />Whiteboard</TabsTrigger>
          <TabsTrigger value="chat"><MessageSquare className="mr-2" />Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="video" className="h-full">
          <div className="relative h-full">
            {/* Main video area */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <div className="text-2xl">Main Video Feed</div>
            </div>

            {/* Participants */}
            {showParticipants && (
              <div className="absolute top-4 right-4 w-64 bg-gray-800 rounded-lg overflow-hidden">
                <ParticipantsList />
              </div>
            )}

            {/* Mini Chat */}
            <div className={`absolute right-4 bottom-20 w-80 ${showMiniChat ? 'h-96' : 'h-10'} transition-all duration-300 ease-in-out`}>
              <div className="bg-gray-800 rounded-t-lg p-2 flex justify-between items-center cursor-pointer" onClick={toggleMiniChat}>
                <span>Chat</span>
                {showMiniChat ? <ChevronDown /> : <ChevronUp />}
              </div>
              {showMiniChat && <MiniChat />}
            </div>

            {/* Control buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <Button
                variant={cameraOn ? "default" : "secondary"}
                size="icon"
                onClick={toggleCamera}
              >
                <Camera />
              </Button>
              <Button
                variant={micOn ? "default" : "secondary"}
                size="icon"
                onClick={toggleMic}
              >
                <Mic />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={endCall}
              >
                <PhoneOff />
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="whiteboard" className="h-full">
          <StudentWhiteboard />
        </TabsContent>
        <TabsContent value="chat" className="h-full">
          <Chat />
        </TabsContent>
      </Tabs>
    </div>
  )
}

