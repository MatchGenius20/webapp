type CategoryCardProps = {
  name: string
  coaches: string
  bgColor: string
}
type CoachCardProps = {
  coach: Coach
  isSelected: boolean
  onClick: () => void
}
export type Coach = {
  id?: string
  name?: string
  location?: string
  rating?: number
  skills?: string[]
  speciality?: string
  description?: string
  price?: number
  availability?: string
  timings?: string
  image?: string
  experience?: number
  education?: string // Education field
  travelAvailability?: string // Travel availability field
  schedulingAvailability?: string // Scheduling availability field
  sessionSize?: string // Session size field
  statistics?: {
    totalSessions?: number
    totalDuration?: number
  }
  reviews?: {
    rating?: number
    date?: string
    text?: string
    duration?: number
  }[]
  calendar?: {
    session?: string
    date?: string
    start?: string
    end?: string
  }[]
}

type CoachCardProps = {
  coach: Coach
  isSelected: boolean
  onClick: () => void
}
interface SignupProps {
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  password: string
}
interface LoginProps {
  onClose: () => void
}
interface ButtonProps {
  text: string
}
// Updated FilterState interface
export interface FilterState {
  search: string
  price: string
  rating: string
  experience: string
  education: string // New field
  travelAvailability: string // New field
  schedulingAvailability: string // New field
  sessionSize: string // New field
}

// Updated FilterModalProps interface
export interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterState) => void
}

type SidebarProps = {
  selected: string
  onSelect: (option: string) => void
}

interface BookingPopupProps {
  onClose: () => void
}
export interface Review {
  text: string
  rating: number
  date: string
  duration: number
}

export interface Event {
  id: string
  summary: string
  start: {
    dateTime: string
  }
  end: {
    dateTime: string
  }
}
interface CoachCategoryCardProps {
  name: string
  description: string
  rating: number
  imageUrl: string
  id: number
}
