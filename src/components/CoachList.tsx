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
        console.log('Fetched data:', result)
        const coachesData = Array.isArray(result.data) ? result.data : []
        setCoaches(coachesData)
        console.log('Coaches data:', coachesData)
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
    <div
      className="flex flex-col items-center py-8 md:mb-16 mb-10 md:mt-16 mt-10 bg-[#EDECFF]"
      data-aos="slide-right"
      data-aos-delay="100"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full max-w-6xl px-6 mb-14">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            Top Rated Coaches
          </h1>
          <p className="text-lg lg:text-xl text-[#000000] py-3">
            Get consultation from the best coaches.
          </p>
        </div>
        <div className="mt-6 lg:mt-0">
          <Link href="/find-coach" passHref>
            <button className="border border-primary px-6 py-3 lg:px-7 lg:py-4 bg-[#FFFFFF] text-primary  rounded-lg font-bold text-base lg:text-lg">
              Browse All
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20 justify-center">
        {coaches.length > 0 ? (
          coaches.map((coach, index) => (
            <CoachCategoryCard
              key={index}
              id={coach.id}
              name={coach.name}
              description={coach.email} // Use email as a description placeholder
              rating={0} // Assuming a default value since rating is not in the API response
              image={coach.profileUrl || '/images/man2.svg'} // Fallback to a default image if profileUrl is null
            />
          ))
        ) : (
          <div>No coaches available</div>
        )}
      </div>
    </div>
  )
}

export default CoachList
