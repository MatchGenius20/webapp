'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggle = (): void => setIsOpen(!isOpen)

  return (
    <nav className="bg-gray-50">
      <div className="max-w-full mx-auto px-8 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center h-20 relative">
          <div className="flex items-center">
            <Link href="/" className="text-2xl text-primary font-bold">
              DebatesMatch
            </Link>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleToggle}
              className="text-primary hover:text-[#3836c4] focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
          <div className="hidden md:flex space-x-10">
            <Link
              href="/"
              className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-md"
            >
              Home
            </Link>
            <Link
              href="/find-coach"
              className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-md"
            >
              Find Coach
            </Link>
            <Link
              href="/about"
              className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-md"
            >
              About
            </Link>
          </div>

          {/* Desktop Sign In and Register Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/login"
              className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-md px-4"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-white font-semibold text-md px-5 py-3 rounded-md hover:bg-[#3836c4]"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 right-0 h-full bg-white z-50 transition-transform duration-300 ease-in-out md:hidden ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ width: '300px' }}
          >
            <div className="flex flex-col items-start pt-16 px-8">
              <button
                onClick={handleToggle}
                className="text-primary hover:text-[#3836c4] focus:outline-none mb-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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
              <Link
                href="/"
                className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-lg py-3"
                onClick={handleToggle}
              >
                Home
              </Link>
              <Link
                href="/find-coach"
                className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-lg py-3"
                onClick={handleToggle}
              >
                Find Coach
              </Link>
              <Link
                href="/about"
                className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-lg py-3"
                onClick={handleToggle}
              >
                About
              </Link>
              <Link
                href="/login"
                className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-lg py-3"
                onClick={handleToggle}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-white font-semibold text-lg px-8 py-3 rounded-md hover:bg-[#3836c4] mt-6"
                onClick={handleToggle}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
