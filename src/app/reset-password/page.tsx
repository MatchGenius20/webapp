'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import { resetPassword } from '@/utils/firebase'

export default function ResetPassword() {
  const router = useRouter()

  useEffect(() => {
    const currUrl = window.location.href
    const urlObj = new URL(currUrl)
    const oobCode = urlObj.searchParams.get('oobCode')
    if (oobCode?.length === 0) {
      alert('Invalid access!')
      router.push(`/reset-password?url=${currUrl}`)
    }
  }, [])

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isEmailSent, setEmailSent] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')

  const resetPasswordHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<any> => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setError("Password can't be of less than 6 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords doesn't match!")
      return
    }

    setLoading(true)
    try {
      const res = await resetPassword(email)
      setEmailSent(true)
      setMsg(res.msg)
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
            Forgot Password
          </h2>
          {isEmailSent ? (
            <div>
              <p>{msg}</p>
            </div>
          ) : (
            <div>
              <form
                onSubmit={resetPasswordHandler}
                className="space-y-4 sm:space-y-6 p-6 rounded-lg"
              >
                <div>
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-Password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    type="new-password"
                    id="new-password"
                    name="new-password"
                    value={newPassword}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-Password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="confirm-password"
                    id="confirm-password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  />
                </div>
                <label className="text-red-500">{error}</label>
                <div>
                  <button
                    type="submit"
                    // disabled={!isFormValid}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  }`}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
