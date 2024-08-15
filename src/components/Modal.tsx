// Modal.tsx
import React from 'react'
import PrimaryButton from './PrimaryButton'

interface ModalProps {
  isModalOpen: boolean
  email: string
  setEmail: (email: string) => void
  handleModalClose: () => void
  handleModalSubmit: () => void
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  email,
  setEmail,
  handleModalClose,
  handleModalSubmit,
}) => {
  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-sm sm:text-md md:text-xl lg:text-2xl font-semibold mb-4 text-primary">
              Enter Email
            </h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 sm:py-2.5 sm:px-4 md:py-3 md:px-5 lg:py-4 lg:px-6 text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-center mt-4">
              <PrimaryButton text="Submit" onClick={handleModalSubmit} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
