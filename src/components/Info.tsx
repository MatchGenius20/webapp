'use Client'
import Image from 'next/image'
import PrimaryButton from './PrimaryButton'
import Link from 'next/link'
import { useUser } from '@/context/UserContext'

const Info = () => {
  const { user } = useUser()
  return (
    <div className="relative bg-gray-50 md:mb-8 mb-4 h-[100vh] flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/about.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
      </div>
      <div className="absolute inset-0 w-fu h-full bg-gray-900 opacity-50"></div>
      {/* hekek */}
      <div className="relative w-full h-screen flex justify-center items-center mx-auto text-center md:text-left px-4 sm:px-6 lg:px-8">
        <div className="md:w-full md:pr-6">
          <h1 className="text-5xl md:text-7xl font-medium text-[#EDECFF] text-center">
            Find your <span className="text-primary font-bold">Coach</span>,
            <br />
            and connect <br />
            <span className="text-primary font-bold">instantly</span>.
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-[#EDECFF] text-center">
            Get instant consultation and guidance
            <br /> from the coach of your choice, and <br /> get ahead in your
            career.
          </p>
          <div className="m-7 flex flex-col items-center">
            <Link href={!user ? '/login' : '/find-coach'}>
              <button className="px-6 py-3 bg-primary text-white font-bold border border-white rounded-md transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
