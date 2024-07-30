'use client';

import { useState } from 'react';
import CoachCard from './CoachCard';
import CoachDetails from './CoachDetails';
import PrimaryButton from './PrimaryButton';
import FilterCoach from './FilterCoach';

import { Coach } from '../../type';
import { coaches } from '@/coachdata';


export default function FindCoachContent() {
  const [selectedCoach, setSelectedCoach] = useState<Coach>(coaches[0]);
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>(coaches);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const applyFilters = (filters: {
    search: string;
    price: string;
    rating: string;
    experience: string;
  }) => {
    let filtered = coaches;
  
    if (filters.search) {
      filtered = filtered.filter(coach =>
        coach.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        coach.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase())) ||
        coach.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
  
    if (filters.price) {
      const maxPrice = parseFloat(filters.price);
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter(coach => coach.price <= maxPrice);
      }
    }
  
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      if (!isNaN(minRating)) {
        filtered = filtered.filter(coach => coach.rating >= minRating);
      }
    }
  
    if (filters.experience) {
      const minExperience = parseInt(filters.experience, 10);
      if (!isNaN(minExperience)) {
        filtered = filtered.filter(coach => coach.experience >= minExperience);
      }
    }
  
    setFilteredCoaches(filtered);
  };
    

  return (
    <div>
      <div className="flex justify-between mb-6 bg-[#FFFFFF]">
        <div className="space-x-3">
          <button className="bg-[#FFFFFF] border border-[#C1BFFA] px-4 py-3 rounded-md font-semibold">4+ Rating</button>
          <button className="bg-[#FFFFFF] border border-[#C1BFFA] px-3 py-3 rounded-md font-semibold">10+ Sessions</button>
        </div>
        <PrimaryButton text='Filters' onClick={() => setIsFilterModalOpen(true)} />
      </div>
      <div className="flex space-x-8">
        <div className="w-1/2 overflow-y-auto h-[calc(100vh-300px)] pr-4 hide-scrollbar">
          {filteredCoaches.map((coach) => (
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
      <FilterCoach
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={applyFilters}
      />
    </div>
  );
}