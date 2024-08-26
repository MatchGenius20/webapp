// components/Footer.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EBEFF8] text-gray-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0">
        <div className="flex flex-col items-start max-w-xs lg:max-w-sm">
          <h2 className="text-primary text-md md:text-xl lg:text-2xl font-bold">
            DebatesMatch
          </h2>
          <p className="text-sm md:text-md lg:text-lg text-[#A2A2A2] py-2">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="https://www.linkedin.com" aria-label="LinkedIn">
              <div className="w-5 h-5 md:w-6 md:h-6 overflow-hidden p-1">
                <Image
                  src="/images/linkedin 1.png"
                  alt="LinkedIn"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter">
              <div className="w-5 h-5 md:w-6 md:h-6 overflow-hidden p-1">
                <Image
                  src="/images/twitter.png"
                  alt="Twitter"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
            <Link href="https://www.instagram.com" aria-label="Instagram">
              <div className="w-5 h-5 md:w-6 md:h-6 overflow-hidden p-1">
                <Image
                  src="/images/instagram 1.png"
                  alt="Instagram"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
            <Link href="mailto:info@example.com" aria-label="Email">
              <div className="w-5 h-5 md:w-6 md:h-6 overflow-hidden p-1">
                <Image
                  src="/images/mail 1.png"
                  alt="Email"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <div>
            <h3 className="text-[#666161] font-bold text-lg">Links</h3>
            <ul className="space-y-1 text-sm md:text-md text-[#A2A2A2]">
              <li>
                <Link href="/" passHref>
                  <span className="hover:underline cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <span className="hover:underline cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services" passHref>
                  <span className="hover:underline cursor-pointer">
                    Services
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#666161] font-bold text-lg">Community</h3>
            <ul className="space-y-1 text-sm md:text-md text-[#A2A2A2]">
              <li>
                <Link href="/" passHref>
                  <span className="hover:underline cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <span className="hover:underline cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services" passHref>
                  <span className="hover:underline cursor-pointer">
                    Services
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#666161] font-bold text-lg">Resources</h3>
            <ul className="space-y-1 text-sm md:text-md text-[#A2A2A2]">
              <li>
                <Link href="/" passHref>
                  <span className="hover:underline cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <span className="hover:underline cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services" passHref>
                  <span className="hover:underline cursor-pointer">
                    Services
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#cbc2c2] mt-8"></div>
      <div className="text-center text-[#7D7D7B] text-sm md:text-base mt-4">
        <p>Copyright DebatesMatch 2024, All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
