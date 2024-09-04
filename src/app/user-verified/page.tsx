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
    title: '',
    about: '',
    keywords: '',
    timings: '',
    availabilityStatus: '',
    isOnline: true,
    profileUrl: '',
  })

  useEffect(() => {
    const currUrl = window.location.href
    const urlObj = new URL(currUrl)
    const mode = urlObj.searchParams.get('mode')

    if (mode === 'resetPassword') {
      router.push(`/reset-password?url=${currUrl}`)
    } else {
      // Check for continueUrl or direct email and isCoach params
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
      console.log(cookies)

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
                  htmlFor="Name"
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
                  htmlFor="Password"
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
                      htmlFor="Title"
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
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      About
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      spellCheck
                      value={formData.about}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          about: e.target.value,
                        }))
                      }}
                      required
                      className="w-full border resize-none border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="avlbl-status"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Availability Status
                    </label>
                    <p className="text-xs my-1">
                      Note: Please enter details about your availability for
                      sessions.
                    </p>
                    <textarea
                      id="avlbl-status"
                      name="avlbl-status"
                      rows={3}
                      spellCheck
                      value={formData.availabilityStatus}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          availabilityStatus: e.target.value,
                        }))
                      }}
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
                    <p className="text-xs my-1">
                      Note: Please enter timings details in which you can take
                      up sessions.
                    </p>
                    <textarea
                      id="timings"
                      name="timings"
                      rows={3}
                      spellCheck
                      value={formData.timings}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          timings: e.target.value,
                        }))
                      }}
                      required
                      className="w-full border resize-none border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="keywords"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Keywords
                    </label>
                    <div className="my-2">
                      <p className="text-xs">
                        Note: Please enter keywords related to your expertise so
                        that users can find you in search.
                      </p>
                      <p className="text-xs">
                        Note: Segregate keywords from each other by introducing
                        a blank space between them.
                      </p>
                    </div>
                    <textarea
                      id="keywords"
                      name="keywords"
                      rows={3}
                      spellCheck
                      value={formData.keywords}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          keywords: e.target.value,
                        }))
                      }}
                      required
                      className="w-full border resize-none border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
