'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Stats = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-primary py-8 border rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
          <div
            className="flex flex-row items-center space-x-6"
            data-aos="slide-left"
            data-aos-delay="100"
          >
            <div className="px-4 py-4 bg-secondary border rounded-md h-24 w-24 flex items-center justify-center">
              <Image
                height={40}
                width={40}
                alt="coach"
                src="/images/coach.svg"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-4xl font-bold text-secondary">10k+</p>
              <p className="text-xl font-semibold text-effect">Total Coaches</p>
            </div>
          </div>
          <div
            className="flex flex-row items-center space-x-6"
            data-aos="slide-left"
            data-aos-delay="100"
          >
            <div className="px-4 py-4 bg-secondary border rounded-md h-24 w-24 flex items-center justify-center">
              <Image
                height={40}
                width={40}
                alt="category"
                src="/images/category.svg"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-4xl font-bold text-secondary">500+</p>
              <p className="text-xl font-semibold text-effect">
                Top Rated Coaches
              </p>
            </div>
          </div>
          <div
            className="flex flex-row items-center space-x-6"
            data-aos="slide-left"
            data-aos-delay="100"
          >
            <div className="px-4 py-4 bg-secondary border rounded-md h-24 w-24 flex items-center justify-center">
              <Image
                height={40}
                width={40}
                alt="students"
                src="/images/graduated.svg"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-4xl font-bold text-secondary">300k+</p>
              <p className="text-xl font-semibold text-effect">Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
