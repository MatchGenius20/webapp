import { Coach } from '../type'
export const coaches: Coach[] = [
  {
    id: '1',
    name: 'Peter Hollins',
    location: 'New York',
    rating: 4.1,
    skills: ['Maths', 'Statistics', 'Probability'],
    speciality: 'Maths Faculty with 15 years of teaching experience',
    price: 30,
    availability:
      'This week, I am available to take sessions till 20th July 2024.',
    timings: 'Weekdays: 10am to 5pm\nWeekends: 10am to 12pm',
    image: '/images/man2.svg',
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
    image: '/images/man2.svg',
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
  {
    id: '3',
    name: 'Sarah Johnson',
    location: 'London',
    rating: 4.8,
    skills: ['Physics', 'Mathematics'],
    speciality: 'Physics Faculty with 12 years of teaching experience',
    price: 40,
    availability: 'Available to take sessions until 25th July 2024.',
    timings: 'Weekdays: 9am to 6pm\nWeekends: 11am to 2pm',
    image: '/images/man2.svg',
    experience: 12,
    description:
      'Experienced physics teacher with a passion for explaining complex concepts. Dedicated to helping students achieve academic success. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore rem ad eius.',
    statistics: {
      totalSessions: 50,
      totalDuration: 300,
    },
    reviews: [
      {
        rating: 4.8,
        date: '18 July 2024',
        text: 'Excellent teacher, very clear explanations.',
        duration: 120,
      },
      {
        rating: 4.7,
        date: '17 July 2024',
        text: 'Helped me understand difficult topics.',
        duration: 110,
      },
    ],
    calendar: [
      {
        session: 'Session 1',
        date: '20 July 2024',
        start: '09:00',
        end: '10:00',
      },
      {
        session: 'Session 2',
        date: '21 July 2024',
        start: '10:00',
        end: '11:00',
      },
      {
        session: 'Session 3',
        date: '22 July 2024',
        start: '11:00',
        end: '12:00',
      },
    ],
  },
  {
    id: '4',
    name: 'Emily Brown',
    location: 'Berlin',
    rating: 4.6,
    skills: ['Chemistry', 'Biology'],
    speciality: 'Chemistry Faculty with 10 years of teaching experience',
    price: 35,
    availability: 'Available for sessions until 18th July 2024.',
    timings: 'Weekdays: 8am to 4pm\nWeekends: 9am to 1pm',
    image: '/images/man2.svg',
    experience: 10,
    description:
      'Chemistry expert with a focus on practical applications. Passionate about teaching and making science accessible to all. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia maxime dolorum accusamus.',
    statistics: {
      totalSessions: 40,
      totalDuration: 200,
    },
    reviews: [
      {
        rating: 4.6,
        date: '15 July 2024',
        text: 'Great practical examples and explanations.',
        duration: 100,
      },
      {
        rating: 4.5,
        date: '14 July 2024',
        text: 'Very knowledgeable and helpful.',
        duration: 95,
      },
    ],
    calendar: [
      {
        session: 'Session 1',
        date: '16 July 2024',
        start: '08:00',
        end: '09:00',
      },
      {
        session: 'Session 2',
        date: '17 July 2024',
        start: '09:00',
        end: '10:00',
      },
      {
        session: 'Session 3',
        date: '18 July 2024',
        start: '10:00',
        end: '11:00',
      },
    ],
  },
  {
    id: '5',
    name: 'Michael Smith',
    location: 'Sydney',
    rating: 4.7,
    skills: ['Computer Science', 'Programming'],
    speciality: 'Computer Science Faculty with 8 years of teaching experience',
    price: 45,
    availability: 'Available for sessions until 22nd July 2024.',
    timings: 'Weekdays: 9am to 5pm\nWeekends: 10am to 1pm',
    image: '/images/man2.svg',
    experience: 8,
    description:
      'Passionate about coding and software development. Focused on helping students learn programming effectively. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, reiciendis.',
    statistics: {
      totalSessions: 35,
      totalDuration: 190,
    },
    reviews: [
      {
        rating: 4.7,
        date: '20 July 2024',
        text: 'Excellent knowledge of programming languages.',
        duration: 100,
      },
      {
        rating: 4.6,
        date: '19 July 2024',
        text: 'Very patient and helpful.',
        duration: 90,
      },
    ],
    calendar: [
      {
        session: 'Session 1',
        date: '21 July 2024',
        start: '09:00',
        end: '10:00',
      },
      {
        session: 'Session 2',
        date: '22 July 2024',
        start: '10:00',
        end: '11:00',
      },
      {
        session: 'Session 3',
        date: '23 July 2024',
        start: '11:00',
        end: '12:00',
      },
    ],
  },
  {
    id: '6',
    name: 'Michael Smith',
    location: 'Sydney',
    rating: 4.7,
    skills: ['Computer Science', 'Programming'],
    speciality: 'Computer Science Faculty with 8 years of teaching experience',
    price: 45,
    availability: 'Available for sessions until 22nd July 2024.',
    timings: 'Weekdays: 9am to 5pm\nWeekends: 10am to 1pm',
    image: '/images/man2.svg',
    experience: 8,
    description:
      'Passionate about coding and software development. Focused on helping students learn programming effectively. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, reiciendis.',
    statistics: {
      totalSessions: 35,
      totalDuration: 190,
    },
    reviews: [
      {
        rating: 4.7,
        date: '20 July 2024',
        text: 'Excellent knowledge of programming languages.',
        duration: 100,
      },
      {
        rating: 4.6,
        date: '19 July 2024',
        text: 'Very patient and helpful.',
        duration: 90,
      },
    ],
    calendar: [
      {
        session: 'Session 1',
        date: '21 July 2024',
        start: '09:00',
        end: '10:00',
      },
      {
        session: 'Session 2',
        date: '22 July 2024',
        start: '10:00',
        end: '11:00',
      },
      {
        session: 'Session 3',
        date: '23 July 2024',
        start: '11:00',
        end: '12:00',
      },
    ],
  },
]
