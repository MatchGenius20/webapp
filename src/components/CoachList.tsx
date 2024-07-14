import React from 'react';
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
    description: 'I am a Maths instructor for past 15 years .',
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
  return (
    <div className="flex flex-col items-center py-10 bg-[#EDECFF]">
      <div className="flex justify-between w-full max-w-4xl px-4 mb-10">
        <div className='ml-[-166px]'>
          <h1 className="lg:text-3xl font-bold mb-1">Top Rated Coaches</h1>
          <p className="text-[#000000] py-3">Get consultation from best coaches.</p>
        </div>
        <div className='lg:mr-[-189px]'>
          <Link href="/all-coaches" passHref>
            <button className=" border border-[#443EDE] px-5 py-3 bg-[#FFFFFF] text-[#443EDE] hover:text-purple-600 rounded-lg font-bold">All Coaches</button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-center">
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
