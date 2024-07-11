import Image from "next/image"

const Hero = () => {
  return (
    <div className="bg-gray-50 ml-36">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-5 lg:px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Find your <span className="text-[#443EDE]">Coach</span>,<br />
            and connect <br />
            <span className="text-[#443EDE]">instantly</span>.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Get instant consultation and guidance<br/> from the coach of your choice,
            and <br/> get ahead in your career.
          </p>
          <div className="mt-8 flex space-x-4">
            <button className="bg-[#443EDE] text-white px-4 py-2 rounded-md hover:bg-[#3836c4] font-semibold">
              Get Started
            </button>
            <button className="bg-[#EDECFF] border border-[#443EDE] text-[#443EDE] px-4 py-2 rounded-md hover:bg-gray-200 font-semibold">
              Get Free Trial
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
        <Image src="/images/design.png" width={480} height={480} alt="desin"/>
          {/* <div className="relative pb-56 h-0 overflow-hidden rounded-md shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video"
            ></iframe>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Hero
