import Image from 'next/image';
import React from 'react';

interface CoachCardProps {
  name: string;
  description: string;
  rating: number;
  imageUrl: string;
}

const CoachCard: React.FC<CoachCardProps> = ({ name, description, rating, imageUrl }) => {
  return (
    <div className="bg-white border border-gray-200 p-3 text-left rounded-lg shadow-lg max-w-72">
      <div className="flex justify-center">
        <Image height={256} width={256} src={imageUrl} alt={`${name}'s picture`} className="object-cover rounded-md" />
      </div>
      <h3 className="text-lg font-semibold mt-4">{name}</h3>
      <p className="mt-2">{description}</p>
      <div className="mt-4 font-medium">Rating: {Array(rating).fill('⭐').join('')}</div>
      <div className="flex justify-end mt-4">
        <button className="px-4 py-3 bg-[#453EF1] text-white rounded-lg hover:bg-purple-700 text-xs">Book Session</button>
      </div>
    </div>
  );
};

export default CoachCard;
