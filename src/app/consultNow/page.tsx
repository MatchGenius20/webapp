'use client'
import Link from 'next/link';
import React, { useState, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  isOutgoing: boolean;
  attachment?: File;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (inputText.trim() || attachment) {
      setMessages([...messages, { 
        id: Date.now(), 
        text: inputText, 
        isOutgoing: true,
        attachment: attachment || undefined
      }]);
      setInputText('');
      setAttachment(null);
    }
  };

  const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:ml-3 md:mr-3">
        <div className='font-bold text-[#443EDE] mb-2 mt-1 lg:text-lg md:text-md sm:text-sm'>
          <Link href={"/"}>
          DebatesMatch
          </Link>
        </div>
      <header className="bg-[#443EDE] md:rounded-md text-white p-1 sm:p-2 md:p-3 lg:p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full mr-2 sm:mr-3"><img src="/images/man2.svg" alt="" /></div>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">Coach Ben</span>
        </div>
        <div className="space-x-1 sm:space-x-2 md:space-x-3">
          <button className="text-[#443EDE] bg-[#EBEBEB] py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2.5 lg:px-5 rounded-md text-xs sm:text-sm md:text-base lg:text-lg font-medium">
            <Link href={"/dashboard/scheduleSession"}>
            EXIT
            </Link>
            </button>
          <button className=" text-[#443EDE] bg-[#EBEBEB] py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2.5 lg:px-5 rounded text-xs sm:text-sm md:text-base lg:text-lg font-medium">INVITE</button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-5 space-y-2 sm:space-y-3 md:space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isOutgoing ? 'justify-end' : 'justify-start'}`}>
            <div className={`inline-block max-w-[80%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[60%] ${
              message.isOutgoing ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
            } px-3 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-3.5 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl`}>
              <p className="break-words">{message.text}</p>
              {message.attachment && (
                <div className="mt-1 sm:mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
                  Attachment: {message.attachment.name}
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      <footer className="bg-white p-2 sm:p-3 md:p-4 lg:p-5 border-t border-gray-200">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" fill="blue" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleAttachment}
            className="hidden"
          />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full py-1 px-3 sm:py-1.5 sm:px-3.5 md:py-2 md:px-4 lg:py-2.5 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={handleSend} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 sm:p-1.5 md:p-2 lg:p-2.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
        {attachment && (
          <div className="mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5 text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
            Attached: {attachment.name}
          </div>
        )}
      </footer>
    </div>
  );
};

export default ChatInterface;