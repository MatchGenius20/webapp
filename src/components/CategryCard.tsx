import Image from 'next/image';

type CategoryCardProps = {
  name: string;
  coaches: string;
  bgColor: string;
};

const CategoryCard   = ({ name, coaches, bgColor }:CategoryCardProps) => {
  return (
    <div
      className="flex items-center p-4 bg-white border rounded-lg"
      style={{ backgroundColor: bgColor, maxWidth: '18rem' }}
    >
      <div className="w-16 h-16 flex items-center justify-center bg-slate-50 border rounded-md mr-4">
        <Image height={40} width={40} alt="icon" src="/images/assessment 1.png" />
      </div>
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{coaches}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
