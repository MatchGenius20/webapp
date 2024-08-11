import React, { useState, useEffect } from 'react'
import { LoginProps } from '../../type'
import axios from 'axios'

const Login: React.FC<LoginProps> = ({ onClose }) => {
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
      const response = await axios.post('/api/signup', { email, password })
      console.log('Login successful:', response.data)
      onClose()
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message)
    }
  }

  return (
    <div className="bg-white rounded-lg  max-w-3xl mx-auto py-4">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#443EDE]">Login</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
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
        className="space-y-4 sm:space-y-6 bg-[#EDECFF] p-2 sm:p-8 rounded-lg"
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
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#443EDE] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
