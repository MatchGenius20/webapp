import { CoachCardProps } from '../../type'

export default function CoachCard({
  coach,
  isSelected,
  onClick,
}: CoachCardProps) {
  return (
    <div
      className={`mb-4 p-4 border-[#B9B9B9] rounded-lg cursor-pointer border ${
        isSelected ? 'bg-primary text-white' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full mr-4 flex justify-center items-center">
          <img
            src={coach.image}
            alt={coach.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <p className="text-xs">{coach.location}</p>
          <h2 className="font-bold text-lg">{coach.name}</h2>
          <p className="text-green-500 text-xs">• Online</p>
        </div>
        <div className="ml-auto">
          <span className="text-yellow-400">★</span> {coach.rating}
        </div>
      </div>
      <p
        className={`text-sm mb-4 ${isSelected ? 'text-white' : 'text-[#AEAEAE]'}`}
      >
        {coach.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {coach.skills?.map((skill) => (
          <span
            key={skill}
            className={`text-sm px-4 py-1 rounded-md ${
              skill === 'Maths'
                ? 'bg-[#E9F8FF] text-[#00ADFD]'
                : skill === 'Statistics'
                  ? 'bg-[#FFF3EC] text-[#FF6D62]'
                  : 'bg-[#EFFCF5] text-[#008C41]'
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
