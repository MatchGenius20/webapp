'use client'
import React from 'react';

const ProfileSettings: React.FC = () => {
    const handleUpdateImage = () => {
        // Logic to update profile image
    };

    const handleUpdateDetails = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Logic to update user details
    };

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img src="/images/man2.svg" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-semibold break-all">piyushjaiswal@gmail.com</p>
                    <button
                        className="mt-2 py-1 px-2 text-sm sm:text-base text-[#736EE6] border rounded-md border-[#b8b6F2] hover:bg-[#736EE6] hover:text-white transition-colors"
                        onClick={handleUpdateImage}
                    >
                        Update Profile Image
                    </button>
                </div>
            </div>
            <div className="bg-[#EDECFF] p-4 sm:p-6 lg:p-8 rounded-lg relative">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[#443EDE]">Update Details</h3>
                <form onSubmit={handleUpdateDetails} className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start">
                        <label className="block font-bold mb-2 sm:mb-0 sm:w-1/3 lg:w-1/4">Name</label>
                        <input type="text" className="w-full sm:w-2/3 lg:w-3/4 p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start">
                        <label className="block font-bold mb-2 sm:mb-0 sm:w-1/3 lg:w-1/4">Old Password</label>
                        <input type="password" className="w-full sm:w-2/3 lg:w-3/4 p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start">
                        <label className="block font-bold mb-2 sm:mb-0 sm:w-1/3 lg:w-1/4">New Password</label>
                        <input type="password" className="w-full sm:w-2/3 lg:w-3/4 p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="py-2 px-4 bg-[#443EDE] text-white rounded hover:bg-[#3632b3] transition-colors">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;