  type CategoryCardProps = {
    name: string;
    coaches: string;
    bgColor: string;
  };
  type CoachCardProps = {
    coach: Coach;
    isSelected: boolean;
    onClick: () => void;
  };
  export type Coach = {
    id: string;
    name: string;
    location: string;
    rating: number;
    skills: string[];
    speciality: string;
    description: string;
    price: number;
    availability: string;
    timings: string;
    image: string;
    experience: number;
    statistics: {
      totalSessions: number;
      totalDuration: number;
    };
    reviews: {
      rating: number;
      date: string;
      text: string;
      duration: number;
    }[];
    calendar: {
      session: string;
      date: string;
      start: string;
      end: string;
    }[];
  };

  type CoachCardProps = {
    coach: Coach;
    isSelected: boolean;
    onClick: () => void;
  };
  interface SignupProps {
    onClose: () => void;
  }
  
  interface FormData {
    name: string;
    email: string;
    password: string;
  }
  interface LoginProps {
    onClose: () => void;
  }
  interface ButtonProps {
    text: string;
}
  interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

  interface FilterState {
  search: string;
  price: string;
  rating: string;
  experience: string;
}
  type SidebarProps = {
  selected: string;
  onSelect: (option: string) => void;
};