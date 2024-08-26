import Image from 'next/image'
import PrimaryButton from './PrimaryButton'

const Info = () => {
  return (
    <div className="relative bg-gray-50 md:mb-8 mb-4 h-[90vh] flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/back.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
      </div>
      {/* hekek */}
      <div className="relative max-w-7xl mx-auto text-center md:text-left px-4 sm:px-6 lg:px-8">
        <div className="md:w-full md:pr-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#EEEEEE] text-center">
            Find your <span className="text-primary">Coach</span>,<br />
            and connect <br />
            <span className="text-primary">instantly</span>.
          </h1>
          <p className="mt-6 text-xl md:text-3xl text-gray-600 text-center">
            Get instant consultation and guidance
            <br /> from the coach of your choice, and <br /> get ahead in your
            career.
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            <PrimaryButton text="Get Started" />
            <button className="bg-[#EDECFF] border border-primary text-primary px-6 py-3 rounded-md hover:bg-gray-200 font-semibold text-lg">
              Get Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
