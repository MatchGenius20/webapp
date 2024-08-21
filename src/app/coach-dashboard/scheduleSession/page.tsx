'use client'
import React from 'react'
import withAuth from '@/hoc/withAuth'
import Image from 'next/image'
import { useRouter } from 'next/router'

const ScheduleSession: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <Image
              src="/images/calender.png"
              alt="Calendar"
              layout="fill"
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="session-date" className="block text-sm font-medium">
              Session Date
            </label>
            <input
              type="date"
              id="session-date"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="session-time" className="block text-sm font-medium">
              Session Time
            </label>
            <input
              type="time"
              id="session-time"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#443EDE] text-white px-6 py-2 rounded-lg shadow-md"
            >
              Schedule Session
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withAuth(ScheduleSession)
