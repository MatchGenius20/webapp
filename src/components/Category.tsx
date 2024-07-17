import CategoryCard from '../components/CategryCard';
import Link from 'next/link';

const categories = [
  { name: "Maths and Statistics", coaches: "20+ Coaches", bgColor: "#E9F8FF" },
  { name: "Science and Technology", coaches: "30+ Coaches", bgColor: "#EBEBFE" },
  { name: "Arts and Humanities", coaches: "25+ Coaches", bgColor: "#FFF3EC" },
  { name: "Business and Finance", coaches: "15+ Coaches", bgColor: "#FDEFEE" },
  { name: "Health and Wellness", coaches: "10+ Coaches", bgColor: "#FBEEFD" },
  { name: "Languages", coaches: "40+ Coaches", bgColor: "#EFFCF5" },
];

const CategoryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold text-[#202020] mb-2">Explore coaches by category</h2>
          <p className="text-lg text-[#000000]">Browse top-rated coaches by browsing our categories, which will make it easier for you.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/browse-all" passHref>
            <div className="text-[#443EDE] border border-[#443EDE] px-6 py-3 rounded-md cursor-pointer font-semibold text-center hover:text-purple-700">Browse All</div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
