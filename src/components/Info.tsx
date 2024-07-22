const Info = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/2 md:pr-6 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 ">
            Find your <span className="text-[#443EDE]">Coach</span>,<br />
            and connect <br />
            <span className="text-[#443EDE]">instantly</span>.
          </h1>
          <p className="mt-6 text-md md:text-xl text-gray-600">
            Get instant consultation and guidance<br /> from the coach of your choice,
            and <br /> get ahead in your career.
          </p>
          <div className="mt-8 flex space-x-6">
            <button className="bg-[#443EDE] text-white px-6 py-3 rounded-md hover:bg-[#3836c4] font-semibold text-lg">
              Get Started
            </button>
            <button className="bg-[#EDECFF] border border-[#443EDE] text-[#443EDE] px-6 py-3 rounded-md hover:bg-gray-200 font-semibold text-lg">
              Get Free Trial
            </button>
          </div>
        </div>
        <div
          className="md:w-1/2 relative flex justify-center items-center"
          style={{
            backgroundImage: 'url(/grp.svg)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '500px'
          }}
        >
          <video className="relative z-10 mr-8 md:mr-16" width="360" height="340" controls autoPlay>
            <source src="https://www.youtube.com/watch?v=3FIZwdzxNB4" type="video/mp4"  />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Info;
