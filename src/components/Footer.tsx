// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EBEFF8] text-gray-700 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-4">
        <div className="mb-8 md:mb-0 max-w-80">
          <h2 className="text-[#453FE1] text-2xl font-bold">DebatesMatch</h2>
          <p className="text-md text-[#A2A2A2] py-2">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="https://www.linkedin.com" aria-label="LinkedIn">
              <img src="/images/linkedin 1.png" alt="LinkedIn" className="w-6 h-6" />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter">
              <img src="/images/twitter.png" alt="Twitter" className="w-6 h-6" />
            </Link>
            <Link href="https://www.instagram.com" aria-label="Instagram">
              <img src="/images/instagram 1.png" alt="Instagram" className="w-6 h-6" />
            </Link>
            <Link href="mailto:info@example.com" aria-label="Email">
              <img src="/images/mail 1.png" alt="Email" className="w-6 h-6" />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap md:space-x-8 space-y-4 md:space-y-0">
          <div>
            <h3 className="text-[#8480F6] font-bold">Links</h3>
            <ul className="space-y-1 font-bold text-sm text-[#A2A2A2]">
              <li>
                <Link href="/" passHref>
                  <span className="hover:underline cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <span className="hover:underline cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/services" passHref>
                  <span className="hover:underline cursor-pointer">Services</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#8480F6] font-bold">Community</h3>
            <ul className="space-y-1 font-bold text-sm text-[#A2A2A2]">
              <li>
                <Link href="/" passHref>
                  <span className="hover:underline cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <span className="hover:underline cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/services" passHref>
                  <span className="hover:underline cursor-pointer">Services</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#8480F6] font-bold">Resources</h3>
            <ul className="space-y-1 font-bold text-sm text-[#A2A2A2]">
              <li>
                <Link href="/" passHref>
                  <span className="hover:underline cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <span className="hover:underline cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/services" passHref>
                  <span className="hover:underline cursor-pointer">Services</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[#918DF6] mt-8"></div>
      <div className="text-center text-[#7D7D7B] text-sm mt-4">
        <p>Copyright DebatesMatch 2024, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
