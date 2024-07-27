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
    description: string;
    price: number;
    availability: string;
    timings: string;
    image: string;
    experience: number;
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