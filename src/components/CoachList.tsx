'use client'
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'
import CoachCategoryCard from './CoachCategoryCard'

interface Coach {
  id: string
  name: string
  email: string
  title: string
  about: string
  keywords: string
  timings: string
  rating: number
  availabilityStatus: string
  isCoachVerified: boolean
  profileUrl: string | null
}

const CoachList: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coach`)
        if (!response.ok) {
          throw new Error('Failed to fetch coaches')
        }
        const result = await response.json()
        const coachesData = Array.isArray(result.data) ? result.data : []
        setCoaches(coachesData)
      } catch (error) {
        console.error('Error fetching coaches:', error)
        setError('Failed to fetch coaches')
      } finally {
        setLoading(false)
      }
    }

    fetchCoaches()
  }, [])

  return (
    <div className="flex flex-col items-center py-8 md:mb-16 mb-10 md:mt-16 mt-10 ">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full max-w-7xl px-6 mb-14 overflow-hidden ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Top Rated Coaches
            <p className="text-lg text-gray-500 font-normal mt-1">
              Get consultation from the best coaches.
            </p>
          </h1>
        </div>
        <div className="mt-6 lg:mt-0">
          <Link href="/find-coach" passHref>
            <button className="border border-primary px-6 py-3 lg:px-5 lg:py-2 bg-[#FFFFFF] hover:bg-primary hover:text-white text-primary  rounded-lg font-semibold text-base lg:text-lg">
              Browse All
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-7 justify-center">
        {coaches.length > 0 ? (
          coaches.map((coach, index) => (
            <CoachCategoryCard
              key={index}
              id={coach.id}
              name={coach.name}
              title={
                coach.title?.length === 0 || coach.title === undefined
                  ? 'Sample Expert Title'
                  : coach.title
              }
              description={
                coach.about?.length === 0 || coach.about === undefined
                  ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non enim hendrerit, aliquet felis feugiat, ullamcorper felis. Donec venenatis, tellus at faucibus gravida, mi nunc aliquet mi, eu rutrum dui libero vitae ex. Praesent dictum ipsum ut blandit fermentum. Praesent rhoncus ipsum a dui sollicitudin maximus id sed massa. Donec sit amet facilisis lacus. Nulla non egestas tortor. Nam tristique dapibus risus, nec eleifend ex ultricies et. Phasellus ornare congue aliquam. Proin vulputate eleifend nisl eget egestas. Vestibulum nec dui in purus molestie pulvinar. Nunc ultricies pretium consectetur. Sed laoreet congue mauris eget posuere. Suspendisse potenti. Integer lectus ex, pellentesque sed erat vel, gravida consectetur dolor'
                  : coach.about
              } // Use email as a description placeholder
              rating={coach.rating} // Assuming a default value since rating is not in the API response
              image={coach.profileUrl || ''} // Fallback to a default image if profileUrl is null
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default CoachList
