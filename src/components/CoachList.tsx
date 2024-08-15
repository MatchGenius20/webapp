'use client'
import React, { useEffect } from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css';
import Link from 'next/link';
import CoachCategoryCard from './CoachCategoryCard';
interface Coach {
  name: string;
  description: string;
  rating: number;
  imageUrl: string;
}

const coaches: Coach[] = [
  {
    name: 'Bejamin Brody',
    description: 'I am a Maths instructor for past 15 years.',
    rating: 5,
    imageUrl: '/images/coachpic.png',
  },
  {
    name: 'Bejamin Brody',
    description: 'I am a Maths instructor for past 15 years.',
    rating: 5,
    imageUrl: '/images/coachpic.png',
  },
  {
    name: 'Bejamin Brody',
    description: 'I am a Maths instructor for past 15 years.',
    rating: 5,
    imageUrl: '/images/coachpic.png',
  },
  {
    name: 'Bejamin Brody',
    description: 'I am a Maths instructor for past 15 years.',
    rating: 5,
    imageUrl: '/images/coachpic.png',
  },
  {
    name: 'Bejamin Brody',
    description: 'I am a Maths instructor for past 15 years.',
    rating: 5,
    imageUrl: '/images/coachpic.png',
  },
  {
    name: 'Bejamin Brody',
    description: 'I am a Maths instructor for past 15 years.',
    rating: 5,
    imageUrl: '/images/coachpic.png',
  },
  
  // Add more coach objects as needed
];

const CoachList: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-col items-center py-8 md:mb-12 mb-8 md:mt-16 mt-10 bg-[#EDECFF]" data-aos="slide-right" data-aos-delay="100">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full max-w-6xl px-6 mb-14">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Top Rated Coaches</h1>
          <p className="text-lg lg:text-xl text-[#000000] py-3">Get consultation from the best coaches.</p>
        </div>
        <div className="mt-6 lg:mt-0">
          <Link href="/find-coach" passHref>
            <button className="border border-[#443EDE] px-6 py-3 lg:px-7 lg:py-4 bg-[#FFFFFF] text-[#443EDE]  rounded-lg font-bold text-base lg:text-lg">Browse All</button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-center">
        {coaches.map((coach, index) => (
          <CoachCategoryCard
            key={index}
            name={coach.name}
            description={coach.description}
            rating={coach.rating}
            imageUrl={coach.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default CoachList;