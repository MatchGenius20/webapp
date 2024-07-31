// components/BookingPopup.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BookingPopupProps } from '../../type';
const BookingPopup: React.FC<BookingPopupProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Book Session</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-md mb-2" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-md mb-2" htmlFor="startTime">Start time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={form.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-md mb-2" htmlFor="endTime">End time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={form.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-md mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={form.message}
              onChange={handleChange}
              rows={3}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;
