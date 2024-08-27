import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = (props: any) => {
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
      if (user && user.role === 'user') {
        router.push('/login') // Redirect to login if not a coach
      }
    }, [user, router])

    if (!user || user.role !== 'coach') {
      return null // Render nothing (or a loading spinner) if not authorized
    }

    return <WrappedComponent {...props} />
  }

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return ComponentWithAuth
}

export default withAuth
