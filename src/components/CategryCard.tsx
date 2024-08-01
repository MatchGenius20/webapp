import Image from 'next/image'

import { CategoryCardProps } from '../../type'

const CategoryCard = ({ name, coaches, bgColor }: CategoryCardProps) => {
  return (
    <div
      className="flex items-center p-6 bg-[#FFFFFF] rounded-lg shadow-md my-1 md:my-3 cursor-pointer hover:animate-slideUp"
      style={{ maxWidth: '22rem' }}
    >
      <div
        className="w-40 h-32 flex items-center justify-center flex-col rounded-md"
        style={{ backgroundColor: bgColor }}
      >
        <Image
          height={80}
          width={80}
          alt="icon"
          src="/images/assessment 1.png"
          className="object-contain"
        />
      </div>
      <div className="bg-[#FFFFFF] px-6 w-56">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-md text-gray-600">{coaches}</p>
      </div>
    </div>
  )
}

export default CategoryCard
