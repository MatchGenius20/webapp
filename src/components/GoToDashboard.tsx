import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const GoToDashboard: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start p-4 md:p-14 bg-primary text-white overflow-hidden relative h-[600px]">
      <div className="max-w-full md:max-w-lg mb-5 md:mb-0">
        <div className="h-3 w-3 rounded-full bg-white absolute top-2 left-[22rem]"></div>
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">
          Schedule Your <br />
          <span className="text-5xl md:text-7xl font-bold py-4">SESSIONS</span>
        </h1>
        <p className="mb-4 md:mb-8 text-indigo-200">
          Neon vestibulum aliquet nibh a imperdiet. Nunc quis diam eros.
          Phasellus fermentum enim eget, eget faucibus leo pellentesque vel. Sed
          quis neque ornare, semper lectus ut.
        </p>
        <Link href={'/dashboard/profilesettings'}>
          <button className="px-6 py-3 bg-primary text-white font-bold border border-white rounded-md transition-colors">
            Go to Dashboard
          </button>
        </Link>
        <div className="h-5 w-5 rounded-full bg-white absolute bottom-3 left-[10rem]"></div>
      </div>
      <div className="relative w-full md:w-[600px] h-[200px] md:h-[400px]">
        <div className="absolute top-0 right-0 w-full h-full sm:bottom-2">
          <Image
            src="/images/dashboard2.svg"
            alt="Calendar Preview"
            layout="fill"
            objectFit="contain"
            className="rounded-sm"
          />
        </div>

        <div
          className="absolute w-full h-full z-10 sm:bottom-2"
          style={{ left: 'calc(-20% + 20px)', top: '20%' }}
        >
          <Image
            src="/images/dashboard1.svg"
            alt="Dashboard Preview"
            layout="fill"
            objectFit="contain"
            className="rounded-sm"
          />
        </div>
        <div className="absolute bottom-0 left-0 md:left-auto">
          <Image
            src="/images/e24.png"
            alt="E24 Logo"
            layout="fill"
            objectFit="contain"
            className="w-[20px] h-[20px] md:w-[27px] md:h-[27px]"
          />
        </div>

        {/* Circular divs on the right side */}
        <div className="h-20 w-20 rounded-full bg-white opacity-[0.6] absolute top-[-2rem] right-[-2rem] z-20"></div>
        <div className="h-12 w-12 rounded-full bg-white opacity-[0.6] absolute top-[23rem] right-[5rem] z-20"></div>
        <div className="h-12 w-12 rounded-full bg-white opacity-[0.6] absolute top-[28rem] right-[5rem] z-20"></div>
      </div>
    </div>
  )
}

export default GoToDashboard
