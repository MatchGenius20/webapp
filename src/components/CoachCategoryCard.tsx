import Image from 'next/image'
import React from 'react'
import { Coach } from '../../type'
import Link from 'next/link'
import { REACT_LOADABLE_MANIFEST } from 'next/dist/shared/lib/constants'
import PrimaryButton from './PrimaryButton'

const CoachCategoryCard: React.FC<Coach> = ({
  name,
  description,
  rating = 1,
  image,
  title,
  id,
}) => {
  // Use default rating of 0 if rating is null
  const effectiveRating = rating ?? 1

  // Calculate full and half stars based on effective rating
  const fullStars = Math.floor(effectiveRating)
  const halfStar = effectiveRating % 1 >= 0.5 ? 1 : 0

  // Create star arrays
  const stars = [...Array(fullStars).fill('⭐'), ...Array(halfStar).fill('🌗')]

  return (
    <div className=" border border-gray-200 p-4 text-left rounded-lg w-72 max-h-100 overflow-hidden">
      <div className="flex justify-center bg-indigo-50">
        <img
          src={image || '/images/coachpic.png'}
          alt={``}
          className="object-cover h-full w-full rounded-md border-none outline-none"
        />
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium mt-3">{name}</h3>
        <div className="mt-3 font-medium text-md">{stars.join('')}</div>
      </div>
      <p className="text-md line-clamp-4 text-gray-400 mb-2">{title}</p>
      <p className="text-sm line-clamp-4 text-left">
        {description?.slice(0, 80) + '...'}
      </p>
      <div className="flex justify-end mt-1">
        <Link href={`/find-coach/profile/${id}`}>
          <button
            className="bg-secondary max-w-[180px] text-primary px-2 py-2 hover:bg-primary hover:text-secondary rounded-md font-semibold"
            onClick={() => {}}
          >
            View Profile
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CoachCategoryCard
