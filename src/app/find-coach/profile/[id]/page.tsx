'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Coach } from '../../../../../type'
import PrimaryButton from '@/components/PrimaryButton'
import BookingPopup from '@/components/BookingPopup'
import axios from 'axios'
import Image from 'next/image'
const sampleCoach: Coach = {
  id: '12345',
  name: 'John Doe',
  location: 'New York, USA',
  title: 'Certified Fitness Coach',
  rating: 4.8,
  isOnline: true,
  skills: ['Strength Training', 'Yoga', 'Nutrition'],
  speciality: 'Weight Loss',
  description:
    'A highly experienced coach with over 10 years of experience in helping clients achieve their fitness goals.',
  price: 75, // Per session price
  availability: 'Weekdays and Weekends',
  timings: '9 AM - 5 PM',
  image: '/images/johndoe.jpg',
  experience: 10, // 10 years of experience
  education: 'B.Sc. in Sports Science', // Education field
  travelAvailability: 'Within the city', // Travel availability field
  schedulingAvailability: 'Flexible', // Scheduling availability field
  sessionSize: 'One-on-One', // Session size field
  statistics: {
    totalSessions: 500,
    totalDuration: 1500, // Total duration in hours
  },
  reviews: [
    {
      rating: 5.0,
      date: '2024-07-21',
      text: 'John is an amazing coach! His sessions are highly effective and enjoyable.',
      duration: 60, // Duration in minutes
    },
    {
      rating: 4.5,
      date: '2024-07-15',
      text: 'Great experience. I learned a lot about proper nutrition and exercise techniques.',
      duration: 90,
    },
  ],
  calendar: [
    {
      session: 'Yoga Class',
      date: '2024-08-25',
      start: '10:00 AM',
      end: '11:00 AM',
    },
    {
      session: 'Strength Training',
      date: '2024-08-26',
      start: '2:00 PM',
      end: '3:00 PM',
    },
  ],
}

const CoachProfile: React.FC = () => {
  const params = useParams()
  const [coach, setCoach] = useState<Coach | null>({
    id: '',
    name: '',
    location: '',
    title: '',
    rating: 0,
    isOnline: false,
    skills: [],
    speciality: '',
    description: '',
    price: 0,
    availability: '',
    timings: '',
    image: '',
    experience: 0,
    education: '',
    travelAvailability: '',
    schedulingAvailability: '',
    sessionSize: '',
    statistics: {
      totalSessions: 0,
      totalDuration: 0,
    },
    reviews: [
      {
        rating: 0,
        date: '',
        text: '',
        duration: 0,
      },
    ],
    calendar: [
      {
        session: '',
        date: '',
        start: '',
        end: '',
      },
    ],
  })
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false)
  const [onlineStatus, setOnlineStatus] = useState<string>('')
  const [rating, setRating] = useState<number>(5)
  const [price, setPrice] = useState<number>(200)
  const [totalSessions, setTotalSessions] = useState<number>(0)
  const [totalDuration, setTotalDuration] = useState<number>(0)
  const [availability, setAvailability] = useState<string>('')
  const [timings, setTimings] = useState<string>('')
  const id = params?.id
  useEffect(() => {
    const fetchCoachData = async () => {
      const id = params?.id
      if (typeof id === 'string') {
        try {
          // Fetch coach details
          const coachResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/coach/${id}`,
          )
          // setCoach(coachResponse.data.data || null)
          setCoach(sampleCoach)
          setRating(coachResponse.data.data.rating)
          // setPrice(coachResponse.data.data.price)
          // setPrice(200)
          setTotalSessions(coachResponse.data.data.statistics?.totalSessions)
          setTotalDuration(coachResponse.data.data.statistics?.totalDuration)
          setAvailability(coachResponse.data.data.availability)
          setTimings(coachResponse.data.data.timings)

          // Fetch online status
          const statusResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/coach/onlineStatus/${id}`,
          )
          setOnlineStatus(statusResponse.data.isOnline ? 'Online' : 'Offline')
        } catch (error) {
          console.error('Error fetching coach data:', error)
        }
      }
    }

    fetchCoachData()
  }, [params])

  if (!coach) {
    return <div>Loading...</div>
  }

  const handleBookSessionClick = () => {
    setIsBookingPopupOpen(true)
  }

  const handleCloseBookingPopup = () => {
    setIsBookingPopupOpen(false)
  }

  const statusColor =
    onlineStatus === 'Online' ? 'text-green-500' : 'text-red-500'

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 border rounded-md p-4">
        <div className="flex items-start">
          <Image
            src={coach.image || '/'}
            alt={coach.name || ''}
            width={16}
            height={16}
            className="w-16 h-16 bg-gray-200 rounded-full mr-4 md:mr-8"
          />
          <div>
            <h2 className="text-2xl font-bold">{coach.name}</h2>
            <p className="text-md text-gray-600">{coach.location}</p>
            <p className={`text-md font-medium ${statusColor}`}>
              • {onlineStatus}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <PrimaryButton text="Book Session" onClick={handleBookSessionClick} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 gap-8 md:gap-16 border  rounded-md p-4">
        <div className="w-full md:w-[30%]">
          <div className="mb-6 border-b  pb-4">
            <p className="text-xl mb-2 font-medium">Rating: {rating}⭐</p>
            <p className="text-xl font-medium">Price: ${price} per hour</p>
          </div>
          <div className="border-b  pb-4">
            <h3 className="text-lg font-semibold mb-2">Statistics</h3>
            <p className="text-md">Total Sessions: {totalSessions}</p>
            <p className="text-md">Total Duration: {totalDuration} minutes</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Availability Status</h3>
            <p className="text-md">{availability}</p>
            <h3 className="text-lg font-semibold mt-4 mb-3">Timings</h3>
            <p className="text-md whitespace-pre-line">{timings}</p>
          </div>
        </div>
        <div className="w-full md:w-[70%] flex flex-col border-l  pl-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">{coach.speciality}</h2>
            <p className="text-md text-[#A5A4A4]">{coach.description}</p>
            <div className="flex flex-wrap mt-6">
              {coach.skills?.map((skill, index) => (
                <div
                  key={index}
                  className="bg-[#EDECFF] text-[#8480F6] rounded-md px-4 py-2 text-md font-medium mr-2 mb-2 border "
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Calendar</h3>
            <div className="bg-white border  rounded p-6">
              <Image
                src="/images/calender.png"
                alt="Calendar"
                layout="responsive"
                className="w-full"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {coach.reviews?.map((review, index) => (
              <div
                key={index}
                className="bg-[#F3F3FF] p-6 rounded mb-4 border "
              >
                <div className="flex flex-row gap-6">
                  <div className="bg-gray-300 rounded-full h-16 w-16 border "></div>
                  <div>
                    <p className="text-lg">{review.text}</p>
                    <p className="text-md text-gray-600 mt-2">
                      {review.rating} ⭐ | {review.date} | Duration:{' '}
                      {review.duration} Minutes
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isBookingPopupOpen && (
        <BookingPopup
          onClose={handleCloseBookingPopup}
          coachId={id}
          price={price}
        />
      )}
    </div>
  )
}

export default CoachProfile
