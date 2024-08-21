'use client'
import React, { useState, useEffect } from 'react'
import { SignupProps, FormData } from '../../type'
import { useUser } from '@/context/UserContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Signup: React.FC<SignupProps> = ({ onClose }) => {
  const { setUser } = useUser()
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  })
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false)
  const [isCoach, setIsCoach] = useState(false)
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

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
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<any> => {
    e.preventDefault()
    if (!isFormValid) return
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup?isCoach=${isCoach}`,
        formData,
      )
      console.log('Signup successful:', response.data)

      // Redirect to login page after successful signup
      onClose()
      router.push('/login')
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message)
      setError(
        error.response?.data?.message || 'Signup failed. Please try again.',
      )
    }
  }

  return (
    <div className="flex justify-center items-center md:mt-16 mt-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">
          Sign Up
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 bg-[#EDECFF] p-6 rounded-lg"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isCoach"
              checked={isCoach}
              onChange={(e) => setIsCoach(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isCoach"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Sign Up as Coach (uncheck to sign up as User)
            </label>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  terms and conditions
                </a>
              </label>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
