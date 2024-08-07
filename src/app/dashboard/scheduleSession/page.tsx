import PrimaryButton from '@/components/PrimaryButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ScheduleSession: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Calendar View</h2>
        <Link href={"/consultNow"}>
        <PrimaryButton text='Consult Now'/>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="border border-gray-300 rounded-lg p-4">
          <Image src={"/images/calender.png"} height={400} width={880} alt="Calendar" className="w-full h-auto rounded-lg"/>
        </div>
      </div>
    </div>
  )
}

export default ScheduleSession
