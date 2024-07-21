import { Coach } from './FindCoachContent';

type CoachCardProps = {
  coach: Coach;
  isSelected: boolean;
  onClick: () => void;
};

export default function CoachCard({ coach, isSelected, onClick }: CoachCardProps) {
  return (
    <div
      className={`mb-4 p-6 border-[#B9B9B9] rounded-lg cursor-pointer border ${
        isSelected ? 'bg-[#443EDE] text-white' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h2 className="font-bold text-lg">{coach.name}</h2>
          <p className="text-sm">{coach.location}</p>
        </div>
        <div className="ml-auto">
          <span className="text-yellow-400">★</span> {coach.rating}
        </div>
      </div>
      <p className="text-sm mb-4">{coach.description}</p>
      <div className="flex flex-wrap gap-2">
        {coach.skills.map((skill) => (
          <span
            key={skill}
            className={`text-sm px-4 py-1 rounded-md ${
              skill === 'Maths' ? 'bg-[#E9F8FF] text-[#00ADFD]' :
              skill === 'Statistics' ? 'bg-pink-100 text-pink-800' :
              'bg-green-100 text-green-800'
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}