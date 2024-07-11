import Image from 'next/image'

const Stats = () => {
  return (
    <div className="max-w-6xl  px-8 sm:px-6 lg:px-8 bg-[#EDECFF] h-36 border rounded-lg ml-48">
      <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 mt-8 ">
        <div className="flex flex-row items-center ">
          <div className="px-2 py-2 bg-slate-50 border rounded-md h-20 w-20 flex items-center justify-center">
            <Image height={30} width={30} alt="man" src="/images/coach 1.png" />
          </div>
          <div className="flex flex-col px-4">
            <p className="text-3xl font-bold text-[#443EDE]">10k+</p>
            <p className="text-lg font-semibold">Total Coaches</p>
          </div>
          </div>
          <div className="flex flex-row items-center ">
          <div className="px-2 py-2 bg-slate-50 border rounded-md h-20 w-20 flex items-center justify-center">
            <Image height={30} width={30} alt="man" src="/images/category.png" />
          </div>
          <div className="flex flex-col px-4">
            <p className="text-3xl font-bold text-[#443EDE]">500+</p>
            <p className="text-lg font-semibold">Categories</p>
          </div>
          </div>
          <div className="flex flex-row items-center ">
          <div className="px-2 py-2 bg-slate-50 border rounded-md h-20 w-20 flex items-center justify-center">
            <Image height={30} width={30} alt="man" src="/images/gra.png" />
          </div>
          <div className="flex flex-col px-4">
            <p className="text-3xl font-bold text-[#443EDE]">300k+</p>
            <p className="text-lg font-semibold">Students</p>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Stats
