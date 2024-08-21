import { CoachCardProps } from '../../type'

import Image from 'next/image'

export default function CoachCard({
  coach,
  isSelected,
  onClick,
}: CoachCardProps) {
  return (
    <div
      className={`mb-4 p-4 border-[#B9B9B9] rounded-lg cursor-pointer border ${
        isSelected ? 'bg-primary text-white' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full mr-4 flex justify-center items-center">
          <Image
            src={coach.image || ''}
            alt={coach.name || ''}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {/* Rest of the component */}
      </div>
    </div>
  )
}
