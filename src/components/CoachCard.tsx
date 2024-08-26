import { CoachCardProps } from '../../type'
import DefaultCoachPic from '../../public/images/coach 1.png'

import Image from 'next/image'

export default function CoachCard({
  coach,
  isSelected,
  onClick,
}: CoachCardProps) {
  const fullStars = Math.floor(coach.rating ?? 1)
  const halfStar = (coach.rating ?? 1) % 1 >= 0.5 ? 1 : 0

  // Create star arrays
  const stars = [...Array(fullStars).fill('⭐'), ...Array(halfStar).fill('🌗')]

  return (
    <div
      className={`mb-4 p-4 border-[#B9B9B9] rounded-lg cursor-pointer border ${
        isSelected ? 'bg-primary text-white' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex justify-start items-center">
          <div className="w-12 h-12 rounded-full border-indigo-100 bg-secondary mr-4 flex justify-center items-center p-1">
            <Image
              src={
                coach.image?.length === 0 || coach.image === undefined
                  ? DefaultCoachPic
                  : coach.image
              }
              alt={coach.name || ''}
              className="w-full h-full rounded-full object-cover"
              width={20}
              height={20}
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <p>{coach.name}</p>
            <p className="text-sm">
              {coach.isOnline ? (
                <label className="text-green-500">• Online</label>
              ) : (
                <label className="text-red-400">• Offline</label>
              )}
            </p>
          </div>
        </div>
        <div>
          <p>
            {stars.join('')} {coach.rating ?? 1}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm">
          {(
            coach.description ??
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non enim hendrerit, aliquet felis feugiat, ullamcorper felis. Donec venenatis, tellus at faucibus gravida, mi nunc aliquet mi, eu rutrum dui libero vitae ex. Praesent dictum ipsum ut blandit fermentum. Praesent rhoncus ipsum a dui sollicitudin maximus id sed massa. Donec sit amet facilisis lacus. Nulla non egestas tortor. Nam tristique dapibus risus, nec eleifend ex ultricies et. Phasellus ornare congue aliquam. Proin vulputate eleifend nisl eget egestas. Vestibulum nec dui in purus molestie pulvinar. Nunc ultricies pretium consectetur. Sed laoreet congue mauris eget posuere. Suspendisse potenti. Integer lectus ex, pellentesque sed erat vel, gravida consectetur dolor.'
          ).slice(0, 200) + '...'}
        </p>
      </div>
    </div>
  )
}
