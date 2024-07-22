'use client';

import { useState } from 'react';
import CoachCard from './CoachCard';
import CoachDetails from './CoachDetails';

export type Coach = {
  id: string;
  name: string;
  location: string;
  rating: number;
  skills: string[];
  description: string;
  price: number;
  availability: string;
  timings: string;
  image: string;
};

const coaches: Coach[] = [
  {
    id: '1',
    name: 'Peter Hollins',
    location: 'New Delhi, India',
    rating: 4.5,
    skills: ['Maths', 'Statistics', 'Probability'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus sit amet est eget posuere. Phasellus vulputate massa arcu, et mattis augue euismod quis. Nulla hendrerit diam et metus consequat laoreet. Sed id quam vel purus commodo mollis id ac neque. In vel vulputate est.',
    price: 30,
    availability: 'This week, I am available to take sessions till 20th July 2024.',
    timings: 'Weekdays: 10am to 5pm\nWeekend: 10am to 12pm',
    image:"/images/user.png"
  },
  {
    id: '2',
    name: 'Peter Holli',
    location: 'New Delhi, India',
    rating: 4.5,
    skills: ['Maths', 'Statistics', 'Probability'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus sit amet est eget posuere. Phasellus vulputate massa arcu, et mattis augue euismod quis. Nulla hendrerit diam et metus consequat laoreet. Sed id quam vel purus commodo mollis id ac neque. In vel vulputate est.',
    price: 30,
    availability: 'This week, I am available to take sessions till 20th July 2024.',
    timings: 'Weekdays: 10am to 5pm\nWeekend: 10am to 12pm',
    image:"/images/user.png"
  },
  {
    id: '3',
    name: 'Peter Hollins',
    location: 'New Delhi, India',
    rating: 4.5,
    skills: ['Maths', 'Statistics', 'Probability'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus sit amet est eget posuere. Phasellus vulputate massa arcu, et mattis augue euismod quis. Nulla hendrerit diam et metus consequat laoreet. Sed id quam vel purus commodo mollis id ac neque. In vel vulputate est.',
    price: 30,
    availability: 'This week, I am available to take sessions till 20th July 2024.',
    timings: 'Weekdays: 10am to 5pm\nWeekend: 10am to 12pm',
    image:"/images/user.png"
  },
  {
    id: '4',
    name: 'Peter Hollins',
    location: 'New Delhi, India',
    rating: 4.5,
    skills: ['Maths', 'Statistics', 'Probability'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus sit amet est eget posuere. Phasellus vulputate massa arcu, et mattis augue euismod quis. Nulla hendrerit diam et metus consequat laoreet. Sed id quam vel purus commodo mollis id ac neque. In vel vulputate est.',
    price: 30,
    availability: 'This week, I am available to take sessions till 20th July 2024.',
    timings: 'Weekdays: 10am to 5pm\nWeekend: 10am to 12pm',
    image:"/images/user.png"
  },
  // Add more coaches here
];

export default function FindCoachContent() {
  const [selectedCoach, setSelectedCoach] = useState<Coach>(coaches[0]);

  return (
    <div>
      <div className="flex justify-between mb-6 bg-[#FFFFFF]">
        <div className="space-x-3">
          <button className="bg-[#FFFFFF] border border-[#C1BFFA] px-4 py-3 rounded-md font-semibold">4+ Rating</button>
          <button className="bg-[#FFFFFF] border border-[#C1BFFA] px-3 py-3 rounded-md font-semibold">10+ Sessions</button>
        </div>
        <button className="bg-[#443EDE] text-white px-6 rounded-md">Filters</button>
      </div>
      <div className="flex space-x-8">
        <div className="w-1/2 overflow-y-auto h-[calc(100vh-300px)] pr-4 hide-scrollbar">
          {coaches.map((coach) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              isSelected={selectedCoach.id === coach.id}
              onClick={() => setSelectedCoach(coach)}
            />
          ))}
        </div>
        <div className="w-1/2">
          <CoachDetails coach={selectedCoach} />
        </div>
      </div>
    </div>
  );
}