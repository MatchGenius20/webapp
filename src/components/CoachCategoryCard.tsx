import Image from 'next/image';
import React from 'react';
import { CoachCategoryCardProps } from '../../type';
const CoachCategoryCard: React.FC<CoachCategoryCardProps> = ({ name, description, rating, imageUrl }) => {
  return (
    <div className="bg-white border border-gray-200 p-4 text-left rounded-lg shadow-lg max-w-80">
      <div className="flex justify-center">
        <Image height={256} width={256} src={imageUrl} alt={`${name}'s picture`} className="object-cover rounded-md" />
      </div>
      <h3 className="text-xl font-semibold mt-6">{name}</h3>
      <p className="mt-3 text-lg">{description}</p>
      <div className="mt-6 font-medium text-lg">Rating: {Array(rating).fill('⭐').join('')}</div>
      <div className="flex justify-end mt-6">
        <button className="px-5 py-3 bg-[#453EF1] text-white rounded-lg  text-base">Book Session</button>
      </div>
    </div>
  );
};

export default CoachCategoryCard;