import PrimaryButton from '@/components/PrimaryButton'
import Image from 'next/image'
import React from 'react'

const ScheduleSession: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Calendar View</h2>
        <PrimaryButton text='Consult Now'/>
      </div>
      <div className="flex justify-center items-center" style={{ height: 600 }}>
        <div className="border border-gray-300 rounded-lg p-4">
          <p className="text-center text-gray-500">Image Placeholder</p>
          <Image src={"/images/calender.png"} height={400} width={640} alt="Calendar" className="w-full h-auto rounded-lg"/>
        </div>
      </div>
    </div>
  )
}

export default ScheduleSession
