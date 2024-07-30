import Image from 'next/image';

import { CategoryCardProps } from '../../type';

const CategoryCard = ({ name, coaches, bgColor }: CategoryCardProps) => {
  return (
    <div
      className="flex items-center p-6 bg-[#FFFFFF] rounded-lg shadow-md" style={{ maxWidth: '20rem' }}
    >
      <div className="w-32 h-32 flex items-center justify-center flex-col rounded-md" style={{ backgroundColor: bgColor }}>
        <Image height={60} width={60} alt="icon" src="/images/assessment 1.png" />
      </div>
      <div className='bg-[#FFFFFF] px-6 w-56'>
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-lg text-gray-600">{coaches}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
