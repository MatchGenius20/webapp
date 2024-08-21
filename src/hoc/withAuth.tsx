import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/context/UserContext'

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
      if (!user || user.role !== 'coach') {
        router.push('/login') // Redirect to login if not a coach
      }
    }, [user, router])

    if (!user || user.role !== 'coach') {
      return null // Render nothing (or a loading spinner) if not authorized
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
