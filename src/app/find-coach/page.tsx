import FindCoachContent from '@/components/FindCoachContent'

export default function FindCoachPage() {
  return (
    <>
      <div className="container mx-auto px-3 py-4 bg-primary rounded-md h-48">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 flex flex-col px-7 py-2">
            <h1 className="text-3xl font-semibold mb-4 text-gray-900">
              Find your <span className="font-bold text-secondary">Coach</span>
            </h1>
            <p className="mb-8 text-sm text-gray-300">
              Looking for an online coach? <br /> Use our advanced filters to
              find the coach who suits your requirements. Click on a coach to
              see details.
            </p>
          </div>
          <div className="w-full md:w-2/3 flex justify-end"></div>
        </div>
      </div>
      <div className="container mx-auto px-3 py-5">
        <FindCoachContent />
      </div>
    </>
  )
}
