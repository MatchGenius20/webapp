import FindCoachContent from '@/components/FindCoachContent'

export default function FindCoachPage() {
  return (
    <>
      <div className="container mx-auto px-3 py-4 bg-[#EBEBFE] rounded-md h-48">
        <div className='flex flex-row'>
          <div className="w-1/3 flex flex-col px-7 py-2">
            <h1 className=" text-3xl font-bold mb-4">
              Find your <span className="text-[#443EDE]">Coach</span>
            </h1>
            <p className=" mb-8 text-sm text-[#A2A2A2]">
              Looking for an online coach? <br/> Use our advanced filters to find the
              coach who suits your requirements. Click on coach to see details.
            </p>
          </div>
          <div className="w-4/3 flex justify-end">
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3 py-5">
        <FindCoachContent />
      </div>
    </>
  )
}
