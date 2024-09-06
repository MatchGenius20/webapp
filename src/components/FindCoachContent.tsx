'use client'

import { useState, useEffect } from 'react'
import CoachCard from './CoachCard'
import CoachDetails from './CoachDetails'
import PrimaryButton from './PrimaryButton'
import FilterModal from './FilterCoach'
import { Coach } from '../../type'
import { FilterState } from '../../type'

export default function FindCoachContent() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([])
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // Fetch coaches when the component is mounted
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
        setFilteredCoaches(coachesData)
        if (coachesData.length > 0) {
          setSelectedCoach(coachesData[0])
        }
      } catch (error) {
        console.error('Error fetching coaches:', error)
        setCoaches([])
        setFilteredCoaches([])
      }
    }

    fetchCoaches()
  }, [])

  const applyFilters = (filters: FilterState) => {
    let filtered = coaches

    if (filters.search) {
      filtered = filtered.filter(
        (coach) =>
          coach.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          coach?.skills?.some((skill) =>
            skill.toLowerCase().includes(filters.search.toLowerCase()),
          ) ||
          coach.location?.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.price) {
      const maxPrice = parseFloat(filters.price)
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter(
          (coach) => (coach.price as number) <= maxPrice,
        )
      }
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating)
      if (!isNaN(minRating)) {
        filtered = filtered.filter(
          (coach) => (coach.rating as number) >= minRating,
        )
      }
    }

    // if (filters.experience) {
    //   const minExperience = parseInt(filters.experience, 10)
    //   if (!isNaN(minExperience)) {
    //     filtered = filtered.filter(
    //       (coach) => (coach.experience as number) >= minExperience,
    //     )
    //   }
    // }

    if (filters.education) {
      filtered = filtered.filter(
        (coach) => coach.education === filters.education,
      )
    }

    if (filters.travelAvailability) {
      filtered = filtered.filter(
        (coach) => coach.travelAvailability === filters.travelAvailability,
      )
    }

    if (filters.schedulingAvailability) {
      filtered = filtered.filter(
        (coach) =>
          coach.schedulingAvailability === filters.schedulingAvailability,
      )
    }

    if (filters.sessionSize) {
      filtered = filtered.filter(
        (coach) => coach.sessionSize === filters.sessionSize,
      )
    }

    setFilteredCoaches(filtered)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6 bg-transparent">
        <div className="space-x-3 mb-4 md:mb-0">
          <button className="bg-white border border-[#C1BFFA] px-4 py-3 rounded-md font-semibold">
            4+ Rating
          </button>
          <button className="bg-white border border-[#C1BFFA] px-3 py-3 rounded-md font-semibold">
            10+ Sessions
          </button>
        </div>
        <PrimaryButton
          text="Filters"
          onClick={() => setIsFilterModalOpen(true)}
        />
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 overflow-y-auto max-h-[calc(100vh-400px)] pr-4 hide-scrollbar">
          {filteredCoaches.map((coach) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              isSelected={selectedCoach?.id === coach.id}
              onClick={() => setSelectedCoach(coach)}
            />
          ))}
        </div>
        <div className="w-full md:w-1/2">
          {selectedCoach && <CoachDetails coach={selectedCoach} />}
        </div>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={applyFilters}
      />
    </div>
  )
}
