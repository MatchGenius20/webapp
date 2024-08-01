import React, { useState, useEffect } from 'react'
import { SignupProps,FormData } from '../../type'

const Signup: React.FC<SignupProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  })
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false)
  const [isFormValid, setIsFormValid] = useState<boolean>(false)

  useEffect(() => {
    const { name, email, password } = formData
    setIsFormValid(
      name.trim() !== '' &&
        email.trim() !== '' &&
        password.trim() !== '' &&
        agreeTerms,
    )
  }, [formData, agreeTerms])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAgreeTerms(e.target.checked)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // Handle signup logic here
    console.log('Signup:', formData)
    onClose()
  }

  return (
    <div className="bg-white rounded-lg  max-w-sm w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#443EDE]">Signup</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#EDECFF] p-6 rounded-lg"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          />
        </div>
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={handleAgreeChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree with Terms and Conditions of services.
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#443EDE] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
