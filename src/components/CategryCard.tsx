import Image from 'next/image';

type CategoryCardProps = {
  name: string;
  coaches: string;
  bgColor: string;
};

const CategoryCard   = ({ name ,coaches, bgColor }:CategoryCardProps) => {
  return (
    <>
    <div
      className="flex items-center p-4 bg-[#FFFFFF]  rounded-lg" style={ {maxWidth: '18rem'} }
    >
      <div className="w-32 h-24 flex  items-center justify-center flex-col  rounded-md" style={{ backgroundColor: bgColor}}>
        <Image height={54} width={54} alt="icon" src="/images/assessment 1.png" />
      </div>
      <div className='bg-[#FFFFFF] px-4 w-48'>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{coaches}</p>
      </div>
    </div>
  </>
  );
};

export default CategoryCard;
