interface PrimaryButtonProps {
  text: string
  onClick?: () => void
}

export default function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
  return (
    <button
      className="bg-[#443EDE] text-white px-4 py-3 rounded-md font-semibold"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
