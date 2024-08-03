'use client'
const ProfileSettings: React.FC = () => {
    const handleUpdateImage = () => {
        // Logic to update profile image
    };

    const handleUpdateDetails = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Logic to update user details
    };

    return (
            <div className="max-w-2xl mx-auto p-4">
                <div className="flex flex-col md:flex-row items-center mb-8 ">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img src="/images/man2.svg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
                        <p className="text-3xl font-semibold">piyushjaiswal@gmail.com</p>
                        <button
                            className="mt-2 py-1 px-2  text-[#736EE6] border rounded-md border-[#b8b6F2]"
                            onClick={handleUpdateImage}
                        >
                            Update Profile Image
                        </button>
                    </div>
                </div>
                <div className="bg-[#EDECFF] p-4 rounded-lg relative h-72">
                    <h3 className="text-lg font-bold mb-4 text-[#443EDE]">Update Details</h3>
                    <form onSubmit={handleUpdateDetails}>
                        <div className="mb-3 flex flex-col md:flex-row items-center md:items-start">
                            <label className="block font-bold  md:w-1/3 mb-2 md:mb-0">Name</label>
                            <input type="text" className="w-1/2 p-2 border border-gray-300 rounded " />
                        </div>
                        <div className="mb-3 flex flex-col md:flex-row items-center md:items-start">
                            <label className="block font-bold md:w-1/3 mb-2 md:mb-0">Old Password</label>
                            <input type="password" className="w-1/2 p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="mb-3 flex flex-col md:flex-row items-center md:items-start">
                            <label className="block font-bold md:w-1/3 mb-2 md:mb-0">New Password</label>
                            <input type="password" className="w-1/2 p-2 border border-gray-300 rounded" />
                        </div>
                        <button type="submit" className="py-2 px-4 bg-[#443EDE] text-white rounded absolute right-3 bottom-3">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        
    );
};

export default ProfileSettings;
