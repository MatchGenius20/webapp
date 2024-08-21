'use client'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import axios from 'axios'
import { headers } from 'next/headers'
import { log } from 'console'

interface User {
  id: string
  name: string
  email: string
  profileImage: string
  role: string
}

interface UserContextProps {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  logout: () => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  const logout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      console.log(accessToken)
      console.log(refreshToken)

      await axios.post(
        'http://localhost:8080/api/v1/auth/logout',
        {},
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )

      document.cookie.split(';').forEach((cookie) => {
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      })
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      sessionStorage.clear()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
