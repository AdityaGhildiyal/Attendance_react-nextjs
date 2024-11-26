'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Video, VideoOff, MessageSquare, Users, Share, Code, Brain, ChevronRight, X, Send } from 'lucide-react'

export default function EnhancedOnlineClass() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isSharing, setIsSharing] = useState(false)
  const [activeTab, setActiveTab] = useState("video")
  const [codeSnippet, setCodeSnippet] = useState("# Python code for neural network\nimport tensorflow as tf\n\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(64, activation='relu'),\n    tf.keras.layers.Dense(10, activation='softmax')\n])")
  const [codeOutput, setCodeOutput] = useState("")
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState("")
  const [aiAssistantResponse, setAiAssistantResponse] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })

  const students = [
    { id: 1, name: "Alice Johnson", status: "active" },
    { id: 2, name: "Bob Williams", status: "inactive" },
    { id: 3, name: "Charlie Brown", status: "active" },
    { id: 4, name: "Diana Martinez", status: "active" },
    { id: 5, name: "Ethan Davis", status: "away" },
  ]

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Alice Johnson", message: "Can you explain backpropagation again?" },
    { id: 2, sender: "You", message: "Backpropagation is a method used in neural networks to calculate gradients of the loss function with respect to the weights." },
    { id: 3, sender: "Charlie Brown", message: "What's the difference between supervised and unsupervised learning?" },
  ])

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          videoRef.current.srcObject = stream
        })
        .catch(err => console.error("Error accessing media devices:", err))
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.strokeStyle = 'white'
    context.lineWidth = 2
    context.lineCap = 'round'
  }, [])

  const handleAiAssistant = () => {
    // Simulating AI response
    setTimeout(() => {
      setAiAssistantResponse("Based on your input, here's a suggested explanation for the concept:\n\n" + aiAssistantPrompt + "\n\nThis concept is fundamental in AI and relates to how neural networks process information.")
    }, 1000)
  }

  const handleCodeExecution = () => {
    // Simulating code execution
    setTimeout(() => {
      setCodeOutput("Model compiled successfully.\nTraining...\nEpoch 1/10\n100/100 [==============================] - 1s 5ms/step - loss: 0.2345 - accuracy: 0.9234\n...")
    }, 1000)
  }

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setIsDrawing(true)
    setLastPosition({ x, y })
  }

  const draw = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    context.beginPath()
    context.moveTo(lastPosition.x, lastPosition.y)
    context.lineTo(x, y)
    context.stroke()

    setLastPosition({ x, y })
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearWhiteboard = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, { id: chatMessages.length + 1, sender: "You", message: chatMessage }])
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-7xl mx-auto bg-gray-800 shadow-xl rounded-xl overflow-hidden text-gray-100">
        <CardHeader className="bg-gray-700">
          <CardTitle className="text-2xl font-bold">AI Advanced Concepts - Live Class</CardTitle>
          <CardDescription>CS301: Advanced Artificial Intelligence</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="video" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 gap-4 bg-gray-700">
                  <TabsTrigger value="video" className="data-[state=active]:bg-blue-600">Video</TabsTrigger>
                  <TabsTrigger value="whiteboard" className="data-[state=active]:bg-blue-600">Whiteboard</TabsTrigger>
                  <TabsTrigger value="code" className="data-[state=active]:bg-blue-600">Code Editor</TabsTrigger>
                  <TabsTrigger value="ai-assistant" className="data-[state=active]:bg-blue-600">AI Assistant</TabsTrigger>
                </TabsList>

                <TabsContent value="video">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video ref={videoRef} autoPlay muted={isMuted} className="w-full h-full object-cover" />
                  </div>
                </TabsContent>

                <TabsContent value="whiteboard">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={450}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseOut={stopDrawing}
                      className="w-full h-full"
                    />
                    <Button
                      onClick={clearWhiteboard}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
                    >
                      Clear Whiteboard
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="code">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden p-4">
                      <Textarea 
                        value={codeSnippet} 
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        className="w-full h-full bg-gray-900 text-green-400 font-mono resize-none"
                      />
                    </div>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden p-4 flex flex-col">
                      <div className="flex-grow overflow-auto font-mono text-green-400 whitespace-pre-wrap">
                        {codeOutput}
                      </div>
                      <Button onClick={handleCodeExecution} className="mt-2 bg-green-600 hover:bg-green-700">
                        Run Code
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ai-assistant">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden p-4 flex flex-col">
                    <Textarea 
                      value={aiAssistantPrompt} 
                      onChange={(e) => setAiAssistantPrompt(e.target.value)}
                      placeholder="Enter a concept or question for the AI assistant..."
                      className="w-full h-1/3 bg-gray-800 text-white mb-2 resize-none"
                    />
                    <Button onClick={handleAiAssistant} className="mb-2 bg-blue-600 hover:bg-blue-700">
                      <Brain className="mr-2 h-4 w-4" />
                      Generate Explanation
                    </Button>
                    <ScrollArea className="flex-grow bg-gray-800 p-2 rounded">
                      <p className="text-green-400 whitespace-pre-wrap">{aiAssistantResponse}</p>
                    </ScrollArea>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button 
                    variant={isMuted ? "destructive" : "secondary"} 
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant={isVideoOn ? "secondary" : "destructive"} 
                    size="icon"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant={isSharing ? "destructive" : "secondary"}
                    size="icon"
                    onClick={() => setIsSharing(!isSharing)}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="destructive">End Class</Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{student.name}</span>
                        </div>
                        <Badge variant={student.status === 'active' ? 'default' : student.status === 'away' ? 'secondary' : 'outline'}>
                          {student.status}
                        </Badge>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] mb-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="mb-2">
                        <span className="font-bold">{msg.sender}: </span>
                        <span>{msg.message}</span>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-grow mr-2"
                    />
                    <Button onClick={sendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}