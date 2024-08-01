import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const GoToDashboard: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-14 bg-[#443EDE] text-white overflow-hidden relative">
      <div className="relative max-w-full md:max-w-lg mb-8 md:mb-0">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">
          Schedule Your <br />
          <span className="text-5xl md:text-7xl font-bold py-4">SESSIONS</span>
        </h1>
        <p className="mb-4 md:mb-8 text-indigo-200">
          Neon vestibulum aliquet nibh a imperdiet. Nunc quis diam eros.
          Phasellus fermentum enim eget, eget faucibus leo pellentesque vel. Sed
          quis neque ornare, semper lectus ut.
        </p>
        <Link href={'/dashboard/profile'}>
          <button className="px-6 py-3 bg-[#443EDE] text-white font-bold border border-white rounded-md transition-colors">
            Go to Dashboard
          </button>
        </Link>
      </div>
      <div className="relative w-full md:w-[500px] h-[200px] md:h-[300px]">
        <div className="absolute top-0 right-0 w-full h-full md:w-[600px] md:h-[300px]">
          <Image
            src="/images/dashboard2.png"
            alt="Calendar Preview"
            layout="fill"
            objectFit="contain"
            className="rounded-lg "
          />
        </div>
        <div
          className="absolute w-full h-full md:w-[600px] md:h-[300px] z-10"
          style={{ left: 'calc(-50% + 20px)', top: '20%' }}
        >
          <Image
            src="/images/dashboard1.png"
            alt="Dashboard Preview"
            layout="fill"
            objectFit="contain"
            className="rounded-lg "
          />
        </div>
        <div className="absolute bottom-0 left-0 md:left-auto">
          <img
            className="w-[20px] h-[20px] md:w-[27px] md:h-[27px]"
            src="/images/e24.png"
            alt="E24 Logo"
          />
        </div>
      </div>
    </div>
  )
}

export default GoToDashboard
