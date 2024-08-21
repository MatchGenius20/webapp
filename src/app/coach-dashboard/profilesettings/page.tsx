'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useUser } from '@/context/UserContext'
import withAuth from '@/hoc/withAuth'

const ProfileSettings: React.FC = () => {
  const { user } = useUser()
  const [form, setForm] = useState({
    name: user?.name || '',
    oldPassword: '',
    newPassword: '',
  })

  const handleUpdateImage = async () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.onchange = async () => {
      if (fileInput.files?.[0]) {
        const formData = new FormData()
        formData.append('image', fileInput.files[0])

        try {
          const accessToken = localStorage.getItem('accessToken')
          const refreshToken = localStorage.getItem('refreshToken')
          await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/profile/image`,
            formData,
            {
              headers: {
                'access-token': `Bearer ${accessToken}`,
                'refresh-token': `Bearer ${refreshToken}`,
              },
            },
          )
          alert('Profile image updated successfully!')
        } catch (error) {
          console.error('Error updating profile image:', error)
        }
      }
    }
    fileInput.click()
  }

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault()
    const userId = user?.id

    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword?isUser=true`,
        form,
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      alert('Details updated successfully!')
    } catch (error) {
      console.error('Error updating details:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img
            src={user?.profileImage || '/images/man2.svg'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold break-all">
            {user?.email || 'User Email'}
          </p>
          <button
            className="mt-2 py-1 px-2 text-sm sm:text-base text-[#736EE6] border rounded-md border-[#b8b6F2] hover:bg-[#736EE6] hover:text-white transition-colors"
            onClick={handleUpdateImage}
          >
            Update Profile Image
          </button>
        </div>
      </div>
      <div className="bg-[#EDECFF] p-4 sm:p-6 lg:p-8 rounded-lg relative">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[#443EDE]">
          Update Details
        </h3>
        <form onSubmit={handleUpdateDetails} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start">
            <label className="block font-bold mb-2 sm:mb-0 sm:w-1/3 lg:w-1/4">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full sm:w-2/3 lg:w-3/4 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start">
            <label className="block font-bold mb-2 sm:mb-0 sm:w-1/3 lg:w-1/4">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              className="w-full sm:w-2/3 lg:w-3/4 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start">
            <label className="block font-bold mb-2 sm:mb-0 sm:w-1/3 lg:w-1/4">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full sm:w-2/3 lg:w-3/4 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-[#443EDE] text-white rounded hover:bg-[#3632b3] transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withAuth(ProfileSettings)
