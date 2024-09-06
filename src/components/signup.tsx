'use client'
import React, { useState, useEffect } from 'react'
import { SignupProps, FormData } from '../../type'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import Loader from './Loader'
import { registerFirebaseUserAndEmail } from '@/utils/firebase'
import { CSSTransition } from 'react-transition-group'

export const Signup = () => {
  const { setUser } = useUser()
  const router = useRouter()
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
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false)
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitial, setInitial] = useState<boolean>(true)
  const [isOtpForm, setOtpForm] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isCoachSignup, setCoachSignup] = useState<boolean>(false)

  useEffect(() => {
    const { name, email, password } = formData
    setIsFormValid(email.trim() !== '' && agreeTerms)
  }, [formData, agreeTerms])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    if (isInitial) {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const sendEmail = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<any> => {
    e.preventDefault()
    if (formData.password.length < 6) {
      setError("Password can't be less than 6 characters!")
      return
    }
    setLoading(true)
    try {
      const res = await registerFirebaseUserAndEmail(
        formData.email,
        formData.password,
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/user-verified?email=${formData.email}&isCoach=${isCoachSignup}`,
      )
      if (!res.success) {
        setError('Something went wrong! Please try again later.')
      } else {
        setOtpForm(true)
        setInitial(false)
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || 'Email not sent. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?isCoach=${isCoachSignup}`
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-center items-center md:mt-16 mt-10">
        <div className="bg-white rounded-lg p-8 max-w-md max-h-[600px] overflow-x-hidden overflow-y-scroll w-full">
          <CSSTransition
            in={isInitial}
            timeout={300}
            classNames={{
              enter: 'opacity-0 scale-90',
              enterActive:
                'opacity-100 scale-100 transition-opacity transition-transform duration-300',
              exit: 'opacity-100 scale-100',
              exitActive:
                'opacity-0 scale-90 transition-opacity transition-transform duration-300',
            }}
            unmountOnExit
          >
            <div>
              <div className="flex justify-center mb-6">
                <button
                  className={`mx-2 px-4 py-2 rounded ${!isCoachSignup ? 'bg-primary text-white' : 'bg-gray-200'}`}
                  onClick={() => setCoachSignup(false)}
                >
                  Sign Up as User
                </button>
                <button
                  className={`mx-2 px-4 py-2 rounded ${isCoachSignup ? 'bg-primary text-white' : 'bg-gray-200'}`}
                  onClick={() => setCoachSignup(true)}
                >
                  Sign Up as Coach
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">
                Sign Up - {isCoachSignup ? 'Coach' : 'User'}
              </h2>
              <form
                onSubmit={sendEmail}
                className="space-y-4 sm:space-y-6 p-6 rounded-lg"
              >
                {/* Form fields */}
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
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
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
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
                  />
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
                    <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      I agree to the{' '}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        terms and conditions
                      </a>
                    </label>
                  </div>
                </div>
                {error && <div className="text-red-600 text-sm ">{error}</div>}
                <div>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Submit
                  </button>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none"
                  >
                    Continue with Google
                  </button>
                </div>
              </form>
            </div>
          </CSSTransition>

          {isOtpForm && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                Verify your email!
              </h2>
              <div className="space-y-4 sm:space-y-6 p-6 rounded-lg">
                <p>
                  Please check your email and click the link to get verified.
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setOtpForm(false)
                    setInitial(true)
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-300 focus:outline-none"
                >
                  Go back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
