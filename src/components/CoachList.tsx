'use client'
import React, { useEffect } from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css';
import CoachCard from '../components/CoachCard';
import Link from 'next/link';

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
    rating: 3,
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
    <div className="flex flex-col items-center py-10 bg-[#EDECFF]" data-aos="slide-right">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full max-w-4xl px-4 mb-10">
        <div className="text-center lg:text-left lg:ml-[-166px]" data-aos="slide-right">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Top Rated Coaches</h1>
          <p className="text-base lg:text-lg text-[#000000] py-2">Get consultation from the best coaches.</p>
        </div>
        <div className="mt-4 lg:mt-0 lg:mr-[-189px]" data-aos="slide-right" data-aos-delay="100">
          <Link href="/all-coaches" passHref>
            <button className="border border-[#443EDE] px-4 py-2 lg:px-5 lg:py-3 bg-[#FFFFFF] text-[#443EDE] hover:text-purple-600 rounded-lg font-bold text-sm lg:text-base">All Coaches</button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 justify-center" data-aos="slide-right" data-aos-delay="200">
        {coaches.map((coach, index) => (
          <CoachCard
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
