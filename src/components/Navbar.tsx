import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl text-[#443EDE]  font-bold mr-8 -ml-4">
              DebatesMatch
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-[#1E1E1E] hover:text-gray-700 font-semibold">
              Home
            </Link>
            <Link href="/find-coach" className="text-[#1E1E1E] hover:text-gray-700 font-semibold">
              Find Coach
            </Link>
            <Link href="/about" className="text-[#1E1E1E] hover:text-gray-700 font-semibold">
              About
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in" className="text-[#1E1E1E] hover:text-gray-700 font-semibold">
              Sign In
            </Link>
            <Link href="/register" className="bg-[#443EDE] text-[#ffff] font-semibold  px-4 py-2 rounded-md hover:bg-[#3836c4]">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
