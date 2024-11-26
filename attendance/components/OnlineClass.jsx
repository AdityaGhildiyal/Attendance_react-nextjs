'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import { MessageCircle, Video, Users, Hand, Mic, MicOff, Send, Camera, CameraOff, ScreenShare, StopCircle, Download, PenTool } from 'lucide-react'

const OnlineClass = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', content: 'Hello everyone!', timestamp: '10:00 AM' },
    { id: 2, sender: 'Jane Smith', content: 'Hi John, how are you?', timestamp: '10:02 AM' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [whiteboard, setWhiteboard] = useState([])
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#000000')
  const [isTyping, setIsTyping] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })

  const participants = [
    { name: 'John Doe', role: 'Instructor' },
    { name: 'Jane Smith', role: 'Student' },
    { name: 'Alice Johnson', role: 'Student' },
    { name: 'Bob Williams', role: 'Student' },
    { name: 'Charlie Brown', role: 'Student' },
  ]

  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage('')
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setElapsedTime(0)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleMouseDown = (e) => {
    if (isTyping) {
      const rect = canvasRef.current.getBoundingClientRect()
      setTextPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    } else {
      setIsDrawing(true)
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ctx.lineTo(x, y)
    ctx.strokeStyle = currentColor
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const clearWhiteboard = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const addTextToCanvas = () => {
    if (textInput.trim() !== '') {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.font = '16px Arial'
      ctx.fillStyle = currentColor
      ctx.fillText(textInput, textPosition.x, textPosition.y)
      setIsTyping(false)
      setTextInput('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <Card className="container mx-auto max-w-6xl bg-white">
        <CardHeader className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Online Class: Introduction to React</CardTitle>
              <p className="text-gray-600">Teacher: Dr. Jane Smith</p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to Dashboard
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="video" className="w-full space-y-4">
            <TabsList className="w-full grid grid-cols-4 gap-4 bg-muted rounded-lg p-1">
              <TabsTrigger 
                value="video"
                className="data-[state=active]:bg-background"
              >
                <Video className="w-4 h-4 mr-2" />
                Video
              </TabsTrigger>
              <TabsTrigger 
                value="chat"
                className="data-[state=active]:bg-background"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="participants"
                className="data-[state=active]:bg-background"
              >
                <Users className="w-4 h-4 mr-2" />
                Participants
              </TabsTrigger>
              <TabsTrigger 
                value="whiteboard"
                className="data-[state=active]:bg-background"
              >
                <PenTool className="w-4 h-4 mr-2" />
                Whiteboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="mt-4 border-none p-0">
              <div className="relative w-full h-[500px] bg-gray-800 rounded-lg overflow-hidden">
                <video className="w-full h-full object-cover" poster="/placeholder.svg?height=400&width=800" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => setIsMuted(!isMuted)}
                          >
                            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center">
                          {isMuted ? 'Unmute' : 'Mute'}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => setIsCameraOn(!isCameraOn)}
                          >
                            {isCameraOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center">
                          {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => setIsScreenSharing(!isScreenSharing)}
                          >
                            <ScreenShare className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center">
                          {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isHandRaised ? "secondary" : "ghost"}
                            size="icon"
                            onClick={() => setIsHandRaised(!isHandRaised)}
                          >
                            <Hand className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center">
                          {isHandRaised ? 'Lower Hand' : 'Raise Hand'}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isRecording && (
                      <Badge variant="secondary" className="mr-2">
                        {formatTime(elapsedTime)}
                      </Badge>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isRecording ? "destructive" : "secondary"}
                            size="icon"
                            onClick={toggleRecording}
                          >
                            <StopCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center">
                          {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                {isRecording && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md flex items-center">
                    <span className="animate-pulse mr-2">●</span>
                    REC {formatTime(elapsedTime)}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="chat" className="mt-4 border-none p-0">
              <div className="h-[500px] flex flex-col border rounded-lg bg-background">
                <ScrollArea className="flex-grow p-4">
                  {messages.map((message) => (
                    <div key={message.id} className="mb-4">
                      <div className="flex items-center">
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                          <AvatarFallback>{message.sender[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{message.sender}</p>
                          <p className="text-sm text-gray-500">{message.timestamp}</p>
                        </div>
                      </div>
                      <p className="mt-1 ml-10 text-gray-700">{message.content}</p>
                    </div>
                  ))}
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow mr-2"
                    />
                    <Button type="submit" variant="secondary">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="participants" className="mt-4 border-none p-0">
              <ScrollArea className="h-[500px] border rounded-lg p-4 bg-background">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between mb-4 p-2 hover:bg-muted rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${participant.name}`} />
                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{participant.name}</p>
                        <Badge variant="secondary" className="text-xs">{participant.role}</Badge>
                      </div>
                    </div>
                    {participant.role === 'Student' && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Hand className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MicOff className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="whiteboard" className="mt-4 border-none p-0">
              <div className="relative h-[500px] border rounded-lg bg-background">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="w-full h-full"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={!isTyping ? "secondary" : "primary"}
                          size="icon"
                          onClick={() => {
                            setIsTyping(!isTyping)
                            setIsDrawing(false)
                          }}
                        >
                          <PenTool className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" align="center">
                        {isTyping ? 'Cancel Text' : 'Add Text'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" align="center">
                        Save Whiteboard
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Input
                      type="color"
                      value={currentColor}
                      onChange={(e) => setCurrentColor(e.target.value)}
                      className="w-8 h-8 p-0 border-0"
                    />
                    <Button variant="secondary" size="sm" onClick={clearWhiteboard}>
                      Clear
                    </Button>
                  </div>
                  <Button variant="secondary" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
                {isTyping && (
                  <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-lg">
                    <Input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addTextToCanvas()
                        }
                      }}
                      placeholder="Type and press Enter"
                      className="w-48"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default OnlineClass