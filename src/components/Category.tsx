import CategoryCard from '../components/CategryCard';
import Link from 'next/link';

const categories = [
  { name: "Maths and Statistics", coaches: "20+ Coaches", bgColor: "#EDECFF" },
  { name: "Maths and Statistics", coaches: "20+ Coaches", bgColor: "#EDECFF" },
  { name: "Maths and Statistics", coaches: "20+ Coaches", bgColor: "#EDECFF" },
  { name: "Maths and Statistics", coaches: "20+ Coaches", bgColor: "#EDECFF" },
  { name: "Maths and Statistics", coaches: "20+ Coaches", bgColor: "#EDECFF" },
  { name: "Maths and Statistics", coaches: "20+ Coaches", bgColor: "#EDECFF" },
];

const CategoryPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex flex-col md:flex-row justify-start items-start md:items-center mb-8">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">Explore coaches by category</h2>
          <p className="text-gray-600">Browse top rated coaches by browsing our category which will be more easy for you.</p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-8 flex flex-end">
          <Link href="/browse-all" passHref>
            <div className="text-[#443EDE] border  border-[#443EDE] px-4 py-2 rounded-md cursor-pointer font-semibold">Browse All</div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            name={category.name}
            coaches={category.coaches}
            bgColor={category.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
