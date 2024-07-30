import React from 'react';
import Image from 'next/image';

const GoToDashboard: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-14 bg-[#443EDE] text-white overflow-hidden relative">
      <div className="relative max-w-lg mb-40">
        <h1 className="text-2xl font-semibold ">
          Schedule Your <br /><span className='text-7xl font-bold py-4'>SESSIONS</span>
        </h1>
        <p className="mb-8 text-indigo-200">
          Neon vestibulum aliquet nibh a imperdiet. Nunc quis diam eros. Phasellus fermentum enim eget, eget faucibus leo pellentesque vel. Sed quis neque ornare, semper lectus ut.
        </p>
        <button className="px-6 py-3 bg-[#443EDE] text-[#FFFFF] font-bold border border-white rounded-md transition-colors">
          Go to Dashboard
        </button>
      </div>
      <div className="relative w-[500px] h-[300px]">
        <div className="absolute top-0 right-0 w-[600px] h-[300px]">
          <Image
            src="/images/dashboard2.png"
            alt="Calendar Preview"
            layout="fill"
            objectFit="contain"
            className="rounded-lg "
          />
        </div>
        <div className="absolute w-[600px] h-[300px] z-10" style={{ left: '-260px', top: '64px' }}>
          <Image
            src="/images/dashboard1.png"
            alt="Dashboard Preview"
            layout="fill"
            objectFit="contain"
            className="rounded-lg "
          />
        </div>
        <div className='absolute bottom-0' >
          <img className='w-[27px] h-[27px]' src="/images/e24.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default GoToDashboard;
