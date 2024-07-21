import { Coach } from './FindCoachContent';

type CoachDetailsProps = {
  coach: Coach;
};

export default function CoachDetails({ coach }: CoachDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full mr-4 flex items-center justify-center">
          <img src="/images/user.png" alt="" />
        </div>
        <div>
          <h2 className="font-bold text-xl">{coach.name}</h2>
          <p className="text-green-500">• Online</p>
        </div>
      </div>
      <p className="mb-4 text-gray-600">{coach.description}</p>
      <p className="font-bold mb-2">Price: ${coach.price} per hour</p>
      <p className="font-bold mb-2">Availability this week</p>
      <p className="mb-4 text-gray-600">{coach.availability}</p>
      <p className="font-bold mb-2">Timings</p>
      <p className="mb-6 text-gray-600 whitespace-pre-line">{coach.timings}</p>
      <div className="flex space-x-4">
        <button className="bg-indigo-600 text-white px-6 py-2 rounded">View Profile</button>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded">Book Session</button>
      </div>
    </div>
  );
}