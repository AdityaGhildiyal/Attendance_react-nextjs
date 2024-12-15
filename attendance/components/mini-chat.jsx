'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MiniChat() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    const newMessage = {
      id: Date.now(),
      username: 'User', // In a real app, this would be the actual username
      text: inputMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputMessage('')
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-b-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <div className="text-xs text-blue-400">{message.username}</div>
            <div className="bg-gray-800 p-1 rounded text-sm">{message.text}</div>
            <div className="text-xs text-gray-400">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-700">
        <div className="flex">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 mr-2 bg-gray-800 text-white text-sm"
          />
          <Button type="submit" size="sm">Send</Button>
        </div>
      </form>
    </div>
  )
}

