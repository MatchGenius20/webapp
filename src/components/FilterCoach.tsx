import React, { useState } from 'react'
import { FilterModalProps } from '../../type'
import { FilterState } from '../../type'
import PrimaryButton from './PrimaryButton'

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    price: '',
    rating: '',
    experience: '',
    education: '', // New field
    travelAvailability: '', // New field
    schedulingAvailability: '', // New field
    sessionSize: '', // New field
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="w-full max-w-md h-full bg-white shadow-xl">
        <div className="flex justify-between items-center mb-6 bg-[#E8E7FF] p-2">
          <h2 className="text-xl font-bold text-primary px-4">Filters</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <div className="space-y-6 px-6">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={filters.search}
              onChange={handleInputChange}
              className="w-full p-3 pr-10 border border-primary rounded-md bg-white custom-placeholder"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-24">
              Hourly Rate ($/hour):
            </label>
            <input
              type="text"
              name="price"
              value={filters.price}
              onChange={handleInputChange}
              className="flex-grow p-3 border border-gray-300 rounded-md custom-placeholder"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-24">
              Rating:
            </label>
            <input
              type="text"
              name="rating"
              value={filters.rating}
              onChange={handleInputChange}
              className="flex-grow p-3 border border-gray-300 rounded-md custom-placeholder"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-24">
              Experience:
            </label>
            <input
              type="text"
              name="experience"
              value={filters.experience}
              onChange={handleInputChange}
              className="flex-grow p-3 border border-gray-300 rounded-md custom-placeholder"
            />
          </div>
          {/* New Dropdown Fields */}
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-24">
              Education:
            </label>
            <select
              name="education"
              value={filters.education}
              onChange={handleInputChange}
              className="flex-grow p-3 border border-gray-300 rounded-md custom-placeholder"
            >
              <option value="">Select Education</option>
              <option value="High School">High School</option>
              <option value="College">College</option>
              <option value="Post-Grad">Post-Grad</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-24">
              Travel Availability:
            </label>
            <select
              name="travelAvailability"
              value={filters.travelAvailability}
              onChange={handleInputChange}
              className="flex-grow p-3 border border-gray-300 rounded-md custom-placeholder"
            >
              <option value="">Select Travel Availability</option>
              <option value="Will Travel">Will Travel</option>
              <option value="Will Not Travel">Will Not Travel</option>
              <option value="Depends">Depends</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-24">
              Scheduling Availability:
            </label>
            <select
              name="schedulingAvailability"
              value={filters.schedulingAvailability}
              onChange={handleInputChange}
              className="flex-grow p-3 border border-gray-300 rounded-md custom-placeholder"
            >
              <option value="">Select Scheduling</option>
              <option value="Once a week">Once a week</option>
              <option value="Twice a week">Twice a week</option>
              <option value="Thrice a week">Thrice a week</option>
              <option value="More than four times a week">
                More than four times a week
              </option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 w-24">
              Session Size:
            </label>
            <select
              name="sessionSize"
              value={filters.sessionSize}
              onChange={handleInputChange}
              className="flex-grow p-3 border border-gray-300 rounded-md custom-placeholder"
            >
              <option value="">Select Session Size</option>
              <option value="PRIVATE">PRIVATE</option>
              <option value="GROUP">GROUP</option>
              <option value="Webinar">Webinar</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center mt-7">
          <PrimaryButton text="Apply" onClick={handleApply} />
        </div>
      </div>
    </div>
  )
}
