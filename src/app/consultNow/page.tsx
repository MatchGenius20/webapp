'use client'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Modal from '../../components/Modal'

interface Message {
  id: number
  text: string
  isOutgoing: boolean
  attachment?: File
}

// Other imports

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (inputText.trim() || attachment) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: inputText,
          isOutgoing: true,
          attachment: attachment || undefined,
        },
      ])
      setInputText('')
      setAttachment(null)
    }
  }

  const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAttachment(file)
    }
  }

  const handleInviteClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalSubmit = () => {
    console.log('Email submitted:', email)
    setIsModalOpen(false)
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="relative flex flex-col h-screen bg-gray-100 md:ml-3 md:mr-3">
      <div className="font-bold text-primary mb-2 mt-1 lg:text-lg md:text-md sm:text-sm">
        <Link href={'/'}>DebatesMatch</Link>
      </div>
      <header className="bg-primary md:rounded-md text-white p-1 sm:p-2 md:p-3 lg:p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full mr-2 sm:mr-3">
            <Image
              src="/images/man2.svg"
              alt="User Avatar"
              width={48}
              height={48}
            />{' '}
            {/* Update here */}
          </div>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
            Coach Ben
          </span>
        </div>
        <div className="space-x-1 sm:space-x-2 md:space-x-4">
          <button className="text-primary bg-[#EBEBEB] py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-4 rounded-full hover:bg-[#736EE6] hover:text-white transition-colors">
            Chat
          </button>
          <button
            className="text-primary bg-[#EBEBEB] py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-4 rounded-full hover:bg-[#736EE6] hover:text-white transition-colors"
            onClick={handleInviteClick}
          >
            Invite
          </button>
        </div>
      </header>

      <div className="flex-grow p-1 sm:p-2 md:p-3 lg:p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-center mb-1 sm:mb-2 md:mb-3 ${
              message.isOutgoing ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.isOutgoing && (
              <div className="text-right">
                {message.text && (
                  <p className="bg-primary text-white p-1 sm:p-2 md:p-3 rounded-lg inline-block mb-1 sm:mb-2 md:mb-3">
                    {message.text}
                  </p>
                )}
                {message.attachment && (
                  <p className="bg-gray-300 p-1 sm:p-2 md:p-3 rounded-lg inline-block">
                    Attachment: {message.attachment.name}
                  </p>
                )}
              </div>
            )}
            {!message.isOutgoing && (
              <div className="text-left">
                {message.text && (
                  <p className="bg-gray-200 p-1 sm:p-2 md:p-3 rounded-lg inline-block mb-1 sm:mb-2 md:mb-3">
                    {message.text}
                  </p>
                )}
                {message.attachment && (
                  <p className="bg-gray-300 p-1 sm:p-2 md:p-3 rounded-lg inline-block">
                    Attachment: {message.attachment.name}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="p-1 sm:p-2 md:p-3 lg:p-4 bg-gray-200">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-1 sm:p-2 md:p-3 rounded-lg border border-gray-300"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center justify-between mt-1 sm:mt-2 md:mt-3">
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAttachment}
          />
          <button
            className="py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-4 bg-primary text-white rounded-full hover:bg-[#3632b3] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            Attach
          </button>
          <button
            className="py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-4 bg-primary text-white rounded-full hover:bg-[#3632b3] transition-colors"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
              Invite via Email
            </h2>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full p-1 sm:p-2 md:p-3 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-4 bg-gray-200 rounded-lg mr-2"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-4 bg-primary text-white rounded-lg"
                onClick={handleModalSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatInterface
