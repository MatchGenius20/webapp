'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@/context/UserContext'
import { LoginProps } from '../../type'

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const { setUser } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim() !== '')
  }, [email, password])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<any> => {
    e.preventDefault()
    if (!isFormValid) return
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/login?isUser=true',
        {
          email,
          password,
        },
      )
      console.log(response.data.data)

      const { accessToken, refreshToken, user } = response.data.data
      console.log(accessToken)
      console.log(refreshToken)

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileUrl,
      })

      onClose()
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message)
    }
  }

  return (
    <div className="flex justify-center items-center md:mt-16 mt-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 bg-[#EDECFF] p-6 rounded-lg"
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

export default Login
