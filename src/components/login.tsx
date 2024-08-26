'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { LoginProps } from '../../type'
import Loader from './Loader'

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const { setUser } = useUser()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isUser, setIsUser] = useState(true)
  const [isFormValid, setIsFormValid] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim() !== '')
  }, [email, password])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<any> => {
    e.preventDefault()
    if (!isFormValid) return
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login?isUser=${isUser}`,
        {
          email,
          password,
        },
      )

      const { accessToken, refreshToken, user } = response.data.data

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileUrl,
        role: isUser ? 'user' : 'coach',
      })
      console.log(response)

      onClose()
      router.push('/')
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message)
      setError(
        error.response?.data?.message || 'Login failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-center items-center md:mt-16 mt-10">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">
            Login
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 p-6 rounded-lg"
          >
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isUser"
                checked={isUser}
                onChange={(e) => setIsUser(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isUser"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Login as User (uncheck to login as Coach)
              </label>
            </div>

            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            <div>
              <a
                href="/forgot-password"
                className="underrline text-primary text-sm"
              >
                Forgot Password?
              </a>
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
    </>
  )
}

export default Login
