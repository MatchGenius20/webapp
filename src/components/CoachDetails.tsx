import { Coach } from '../../type';
import PrimaryButton from './PrimaryButton';

type CoachDetailsProps = {
  coach: Coach;
};

export default function CoachDetails({ coach }: CoachDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#D0D0D0]">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full mr-4 flex items-center justify-center">
          <img src={coach.image} alt="" />
        </div>
        <div>
          <p className="text-xs">{coach.location}</p>
          <h2 className="font-bold text-xl">{coach.name}</h2>
          <p className="text-green-500">• Online</p>
        </div>
      </div>
      <p className="mb-4 text-[#A2A2A2]">{coach.description}</p>
      <hr className='text-[#A2A2A2]' />
      <p className="font-semibold mb-2  text-sm py-4">Price: <span className='text-[#443EDE] font-semibold text-lg'>${coach.price} per hour </span></p>
      <p className="font-semibold text-sm mb-1">Availability this week</p>
      <p className="mb-2 text-[#8D8D8B]">{coach.availability}</p>
      <p className="font-semibold text-sm mb-1">Timings</p>
      <p className="mb-6 text-[#8D8D8B] text-sm whitespace-pre-line">{coach.timings}</p>
      <div className="flex space-x-6 justify-center">
       <PrimaryButton text='View Profile'/>
       <PrimaryButton text='Book Session'/>
      </div>
    </div>
  );
}