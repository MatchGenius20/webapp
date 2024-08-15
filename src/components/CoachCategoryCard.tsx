import Image from 'next/image';
import React from 'react';
import { Coach } from '../../type';
import Link from 'next/link';

const CoachCategoryCard: React.FC<Coach> = ({ name, description, rating = 0, image, id }) => {
  // Use default rating of 0 if rating is null
  const effectiveRating = rating ?? 0;

  // Calculate full and half stars based on effective rating
  const fullStars = Math.floor(effectiveRating);
  const halfStar = effectiveRating % 1 >= 0.5 ? 1 : 0;

  // Create star arrays
  const stars = [
    ...Array(fullStars).fill('⭐'),
    ...Array(halfStar).fill('🌗')
  ];

  return (
    <div className="bg-white border border-gray-200 p-4 text-left rounded-lg shadow-lg max-w-80">
      <div className="flex justify-center">
        <Image height={128} width={128} src={image || "/images/coachpic.png"} alt={`${name}'s picture`} className="object-cover rounded-md" />
      </div>
      <h3 className="text-xl font-semibold mt-6">{name}</h3>
      <p className="mt-3 text-lg line-clamp-4">{description}</p>
      <div className="mt-6 font-medium text-lg">Rating: {stars.join('')}</div>
      <div className="flex justify-end mt-6">
        <Link href={`/find-coach/profile/${id}`}>
          <button className="px-5 py-3 bg-[#453EF1] text-white rounded-lg text-base">Book Session</button>
        </Link>
      </div>
    </div>
  );
};

export default CoachCategoryCard;
