import Login from '@/components/login'
import React from 'react'

const page = () => {
  return (
    <Login
      onClose={() => {
        console.log('Login closed')
      }}
    />
  )
}

export default page
