'use client'
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <div className="flex items-center">
            <Link href="/" className="text-2xl text-[#443EDE] font-bold">
              DebatesMatch
            </Link>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleToggle}
              className="text-[#443EDE] hover:text-[#3836c4] focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
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

          {/* Desktop Sign In and Register Buttons */}
          <div className="hidden md:flex items-center space-x-4 gap-4">
            <Link href="/sign-in" className="text-[#1E1E1E] hover:text-gray-700 font-semibold px-3">
              Sign In
            </Link>
            <Link href="/register" className="bg-[#443EDE] text-[#ffff] font-semibold px-6 py-2 rounded-md hover:bg-[#3836c4]">
              Register
            </Link>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 right-0 h-full bg-white z-50 transition-transform duration-300 ease-in-out md:hidden ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ width: '250px' }} // Set the width of the mobile menu
          >
            <div className="flex flex-col items-start pt-16 px-6">
              <button
                onClick={handleToggle}
                className="text-[#443EDE] hover:text-[#3836c4] focus:outline-none mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Link href="/" className="text-[#1E1E1E] hover:text-gray-700 font-semibold py-2" onClick={handleToggle}>
                Home
              </Link>
              <Link href="/find-coach" className="text-[#1E1E1E] hover:text-gray-700 font-semibold py-2" onClick={handleToggle}>
                Find Coach
              </Link>
              <Link href="/about" className="text-[#1E1E1E] hover:text-gray-700 font-semibold py-2" onClick={handleToggle}>
                About
              </Link>
              <Link href="/sign-in" className="text-[#1E1E1E] hover:text-gray-700 font-semibold py-2" onClick={handleToggle}>
                Sign In
              </Link>
              <Link href="/register" className="bg-[#443EDE] text-[#ffff] font-semibold px-6 py-2 rounded-md hover:bg-[#3836c4] mt-4" onClick={handleToggle}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
