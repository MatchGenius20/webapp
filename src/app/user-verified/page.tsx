'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { FormData } from '../../../type'
import Loader from '@/components/Loader'

export default function UserVerify() {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isCoach, setCoach] = useState<string>('false')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    location: '',
    title: '',
    speciality: '',
    description: '',
    availability: '',
    timings: '',
    experience: 0,
    education: '',
    profileUrl: '',
    currentPrice: 0,
    travelAvailability: '',
    schedulingAvailability: '',
    sessionSize: '',
    isOnline: true, // Added default
  })

  useEffect(() => {
    const currUrl = window.location.href
    const urlObj = new URL(currUrl)
    const mode = urlObj.searchParams.get('mode')

    if (mode === 'resetPassword') {
      router.push(`/reset-password?url=${currUrl}`)
    } else {
      const continueUrl = urlObj.searchParams.get('continueUrl')

      let email, isCoachParam

      if (continueUrl) {
        email = new URLSearchParams(new URL(continueUrl).search).get('email')
        isCoachParam = new URLSearchParams(new URL(continueUrl).search).get(
          'isCoach',
        )
      } else {
        email = urlObj.searchParams.get('email')
        isCoachParam = urlObj.searchParams.get('isCoach')
      }

      setFormData((prev) => ({ ...prev, email: email as string }))
      setCoach(isCoachParam as string)

      // Save access and refresh token from x-auth-cookie to localStorage
      const cookies = document.cookie.split(';')
      cookies.forEach((cookie) => {
        const [key, value] = cookie.split('=').map((c) => c.trim())
        if (key === 'x-auth-cookie') {
          try {
            const { accessToken, refreshToken } = JSON.parse(
              decodeURIComponent(value),
            )
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
          } catch (e) {
            console.error('Failed to parse x-auth-cookie:', e)
          }
        }
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const signup = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault()
    if (formData.password.length < 6) {
      setError("Password can't be less than 6 characters!")
      return
    }
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup?isCoach=${isCoach}`,
        formData,
      )
      console.log('Signup successful:', response.data)
      router.push('/login')
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message)
      setError(
        error.response?.data?.message || 'Signup failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="flex justify-center items-center md:mt-5 mt-10">
        <div className="bg-white rounded-lg p-8 max-w-lg max-h-[700px] overflow-x-hidden overflow-y-scroll w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-0">
            Registration Details
          </h2>
          <div>
            <form
              onSubmit={signup}
              className="space-y-4 sm:space-y-6 p-6 rounded-lg"
            >
              User email:{' '}
              <label className="text-primary">{formData.email}</label>
              <br />
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
              {isCoach === 'true' && (
                <>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="speciality"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Speciality
                    </label>
                    <input
                      type="text"
                      id="speciality"
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      spellCheck
                      value={formData.description}
                      onChange={handleTextAreaChange}
                      required
                      className="w-full border resize-none border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="availability"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Availability
                    </label>
                    <textarea
                      id="availability"
                      name="availability"
                      rows={2}
                      value={formData.availability}
                      onChange={handleTextAreaChange}
                      required
                      className="w-full border resize-none border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="timings"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Timings
                    </label>
                    <textarea
                      id="timings"
                      name="timings"
                      rows={2}
                      value={formData.timings}
                      onChange={handleTextAreaChange}
                      required
                      className="w-full border resize-none border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="education"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Education
                    </label>
                    <input
                      type="text"
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="profileUrl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Profile URL
                    </label>
                    <input
                      type="url"
                      id="profileUrl"
                      name="profileUrl"
                      value={formData.profileUrl}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="currentPrice"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Price (₹)
                    </label>
                    <input
                      type="number"
                      id="currentPrice"
                      name="currentPrice"
                      value={formData.currentPrice}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="travelAvailability"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Travel Availability
                    </label>
                    <input
                      type="text"
                      id="travelAvailability"
                      name="travelAvailability"
                      value={formData.travelAvailability}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="schedulingAvailability"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Scheduling Availability
                    </label>
                    <input
                      type="text"
                      id="schedulingAvailability"
                      name="schedulingAvailability"
                      value={formData.schedulingAvailability}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sessionSize"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Session Size
                    </label>
                    <input
                      type="text"
                      id="sessionSize"
                      name="sessionSize"
                      value={formData.sessionSize}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="isOnline"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Is Online?
                    </label>
                    <input
                      type="checkbox"
                      id="isOnline"
                      name="isOnline"
                      checked={formData.isOnline}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isOnline: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                </>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
