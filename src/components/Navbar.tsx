'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Use the new `useRouter` hook from 'next/navigation'
import { useUser } from '@/context/UserContext'
import Image from 'next/image'
import userPic from '../../public/images/user.png'

const Navbar: React.FC = () => {
  const { user, logout } = useUser()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter() // Initialize the router
  const [isHome, setHome] = useState<boolean>(false)

  useEffect(() => {
    const curr = window.location.href?.slice(0, window.location.href.length - 1)
    const origin = window.location.origin
    if (curr === origin) {
      setHome(true)
    } else {
      setHome(false)
    }
  }, [])

  const handleToggle = (): void => setIsOpen(!isOpen)

  const handleLogout = (): void => {
    logout() // Call the logout function
    router.push('/')
  }

  // Redirect to signup page
  const handleSignupRedirect = (): void => {
    router.push('/signup')
  }

  // Redirect to login page
  const handleLoginRedirect = (): void => {
    router.push('/login')
  }

  return (
    <div>
      <nav className={isHome ? 'absolute w-full z-50' : 'bg-gray-50'}>
        <div className="max-w-full mx-auto px-8 sm:px-8 lg:px-16">
          <div className="flex justify-between items-center h-20 relative">
            <div className="flex items-center">
              <Link
                href="/"
                className={`${isHome ? 'text-indigo-100 ' : 'text-[#443EDE]'}  text-2xl font-bold`}
              >
                DebateMatch
              </Link>
            </div>

            {/* Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={handleToggle}
                className="bg-primary focus:outline-none"
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
            <div className="hidden md:flex justify-center items-center space-x-10">
              <Link
                href="/"
                className={
                  isHome
                    ? 'text-[#EEEEEE] font-medium hover:text-primary text-md'
                    : `text-[#1E1E1E] hover:text-gray-700 text-md`
                }
              >
                Home
              </Link>
              <Link
                href="/find-coach"
                className={
                  isHome
                    ? 'text-[#EEEEEE] font-medium hover:text-primary text-md'
                    : `text-[#1E1E1E] hover:text-gray-700 text-md`
                }
              >
                Find Coach
              </Link>
              <Link
                href="/our-coaches"
                className={
                  isHome
                    ? 'text-[#EEEEEE] font-medium hover:text-primary text-md'
                    : `text-[#1E1E1E] hover:text-gray-700 text-md`
                }
              >
                Our Coaches
              </Link>
              <Link
                href="/our-team"
                className={
                  isHome
                    ? 'text-[#EEEEEE] font-medium hover:text-primary text-md'
                    : `text-[#1E1E1E] hover:text-gray-700 text-md`
                }
              >
                Our Team
              </Link>
              <Link
                href="/event-booking"
                className="text-primary bg-gray-100 px-2 py-1 rounded-sm font-semibold text-md"
                onClick={handleToggle}
              >
                Events
              </Link>
            </div>

            {/* Desktop Sign In/Register/Logout Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="flex justify-center items-center">
                  <a
                    href={
                      !user
                        ? '/login'
                        : user.role == 'admin'
                          ? '/coach-dashboard/profilesettings'
                          : '/dashboard/profilesettings'
                    }
                    className={
                      isHome
                        ? 'text-[#EEEEEE] font-medium hover:text-primary text-md px-4'
                        : `text-[#1E1E1E] hover:text-gray-700 text-md px-4`
                    }
                  >
                    Dashboard
                  </a>
                  <div
                    onClick={() => {
                      const div = document.getElementById('nav-dropdown')
                      div?.classList.toggle('hidden')
                    }}
                    className={
                      isHome
                        ? 'invert'
                        : '' +
                          ' w-[25px] h-[25    px] rounded-full flex justify-center items-center cursor-pointer'
                    }
                  >
                    <Image
                      src={
                        user.profileImage === null ? userPic : user.profileImage
                      }
                      alt=""
                      className="h-full w-full font-bold object-contain flex justify-center items-center cursor-pointer"
                    />
                  </div>
                  <div
                    id="nav-dropdown"
                    className="bg-white hidden max-h-[100px] w-[130px] absolute md:top-14 md:shadow-md md:rounded-sm p-2"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full p-2 bg-white rounded-md hover:bg-primary hover:text-white text-left px-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleLoginRedirect}
                    className={
                      isHome
                        ? 'text-[#EEEEEE] font-medium hover:text-primary text-md px-5'
                        : `text-[#1E1E1E] hover:text-gray-700 text-md px-5`
                    }
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignupRedirect}
                    className="bg-primary text-white font-semibold text-md px-5 py-3 rounded-md"
                  >
                    Register
                  </button>
                </div>
              )}
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
                  className="text-primary focus:outline-none mb-6"
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
                  href="/event-booking"
                  className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-lg py-3"
                  onClick={handleToggle}
                >
                  Events
                </Link>
                <Link
                  href="/our-coaches"
                  className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-lg py-3"
                  onClick={handleToggle}
                >
                  Our Coaches
                </Link>
                <Link
                  href="/our-team"
                  className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-lg py-3"
                  onClick={handleToggle}
                >
                  Our Team
                </Link>
                {user ? (
                  <div className="flex flex-col md:flex-row md:justify-center md:items-center">
                    <a
                      href={
                        !user
                          ? '/login'
                          : user.role == 'admin'
                            ? '/coach-dashboard/profilesettings'
                            : '/dashboard/profilesettings'
                      }
                      className="text-[#1E1E1E] cursor-pointer hover:text-gray-700 font-semibold text-lg py-3 md:py-0 md:text-md md:px-4"
                    >
                      Dashboard
                    </a>
                    <div
                      onClick={() => {
                        const div = document.getElementById('nav-dropdown-sm')
                        div?.classList.toggle('hidden')
                      }}
                      className="w-[20px] h-[20px] rounded-full borde border-primar bg-whit overflow-hidden flex justify-center items-center"
                    >
                      <Image
                        src={
                          user.profileImage === null
                            ? userPic
                            : user.profileImage
                        }
                        alt=""
                        className="h-full w-full object-contain flex justify-center items-center"
                      />
                    </div>
                    <div
                      id="nav-dropdown-sm"
                      className="bg-white border rounded-md hidden max-h-[100px] w-[150px] md:shadow-md md:rounded-sm p-2"
                    >
                      <button
                        onClick={handleLogout}
                        className="w-full p-2 bg-white rounded-md hover:bg-primary hover:text-white text-left px-2"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleToggle()
                        handleLoginRedirect()
                      }}
                      className="text-[#1E1E1E] hover:text-gray-700 font-semibold text-lg py-3"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        handleToggle()
                        handleSignupRedirect()
                      }}
                      className="bg-primary text-white font-semibold text-lg px-8 py-3 rounded-md mt-6"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
