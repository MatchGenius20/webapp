import { Coach } from '../type'
export const coaches: Coach[] = [
  {
    id: '1',
    name: 'Peter Hollins',
    location: 'New York',
    rating: 4.5,
    skills: ['Maths', 'Statistics', 'Probability'],
    speciality: 'Maths Faculty with 15 years of teaching experience',
    price: 30,
    availability:
      'This week, I am available to take sessions till 20th July 2024.',
    timings: 'Weekdays: 10am to 5pm\nWeekends: 10am to 12pm',
    image: '/images/user.png',
    experience: 15,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime rem corporis esse asperiores eum in? Tempore enim odit reiciendis debitis eum voluptatem a quasi, aperiam magnam repellat sed modi amet mollitia, itaque assumenda! Iusto Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime rem corporis esse asperiores eum in? Tempore enim odit reiciendis debitis eum voluptatem a quasi, aperiam magnam repellat sed modi amet mollitia, itaque assumenda! Iusto!',
    statistics: {
      totalSessions: 45,
      totalDuration: 230,
    },
    reviews: [
      {
        rating: 4.5,
        date: '19 July 2024',
        text: 'Very experienced. Good communication skills.',
        duration: 90,
      },
      {
        rating: 4.5,
        date: '18 July 2024',
        text: 'Very experienced. Good communication skills.',
        duration: 90,
      },
      {
        rating: 4.5,
        date: '17 July 2024',
        text: 'Very experienced. Good communication skills.',
        duration: 90,
      },
    ],
    calendar: [
      {
        session: 'Session 1',
        date: '22 July 2024',
        start: '10:00',
        end: '11:00',
      },
      {
        session: 'Session 2',
        date: '23 July 2024',
        start: '11:00',
        end: '12:00',
      },
      {
        session: 'Session 3',
        date: '24 July 2024',
        start: '12:00',
        end: '13:00',
      },
    ],
  },
  {
    id: '2',
    name: 'John Doe',
    location: 'Paris',
    rating: 4.5,
    skills: ['Maths', 'Statistics'],
    speciality: 'Maths Faculty with 15 years of teaching experience',
    price: 30,
    availability:
      'This week, I am available to take sessions till 20th July 2024.',
    timings: 'Weekdays: 10am to 5pm\nWeekends: 10am to 12pm',
    image: '/images/user.png',
    experience: 15,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime rem corporis esse asperiores eum in? Tempore enim odit reiciendis debitis eum voluptatem a quasi, aperiam magnam repellat sed modi amet mollitia, itaque assumenda! Iusto!',
    statistics: {
      totalSessions: 45,
      totalDuration: 230,
    },
    reviews: [
      {
        rating: 4.5,
        date: '19 July 2024',
        text: 'Very experienced. Good communication skills.',
        duration: 90,
      },
      {
        rating: 4.5,
        date: '18 July 2024',
        text: 'Very experienced. Good communication skills.',
        duration: 90,
      },
      {
        rating: 4.5,
        date: '17 July 2024',
        text: 'Very experienced. Good communication skills.',
        duration: 90,
      },
    ],
    calendar: [
      {
        session: 'Session 1',
        date: '22 July 2024',
        start: '10:00',
        end: '11:00',
      },
      {
        session: 'Session 2',
        date: '23 July 2024',
        start: '11:00',
        end: '12:00',
      },
      {
        session: 'Session 3',
        date: '24 July 2024',
        start: '12:00',
        end: '13:00',
      },
    ],
  },
  // ... other coaches
]
