'use client'
import PrimaryButton from '@/components/PrimaryButton';
import { useState } from 'react';

const ProfileSettings = () => {
    const [name, setName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleUpdate = async () => {
        // Placeholder for update logic
        // This is where you would add the logic to handle profile updates
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(event.target.files[0]);
            // Placeholder for image upload logic
            // This is where you would add the logic to handle image uploads
        }
    };

    return (
        <div className="p-6 flex justify-center">
            <div>
                <div className="flex items-center gap-4 mb-6 flex-row m-3 ">
                    <div className="w-20 h-20 bg-gray-300 rounded-full cursor-pointer"/>
                    <div className="text-3xl font-medium">piyushjaiswal@gmail.com</div>
                    <label className="px-1 py-1 text-sm border border-[#8A86EA] text-[#443EDE] rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">
                        Update Profile Image
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
               <hr />
                <div className="bg-[#EDECFF] p-8 rounded-lg absolute w-120 h-80 -ml-44">
                    <h2 className="text-lg font-bold mb-4   text-[#443EDE]">Update Details</h2>
                    <div className="mb-4 flex items-center pr-24">
                        <label className="w-32  font-semibold">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-76 px-8 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-32 font-semibold">Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-76 px-8 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-32 font-semibold">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-76 px-8 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="absolute right-3 bottom-3">
                    <PrimaryButton text='Update' onClick={handleUpdate} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
