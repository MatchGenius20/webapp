import Signup from '@/components/signup'
import React from 'react'

const page = () => {
  return (
    <Signup
      onClose={() => {
        console.log('Login closed')
      }}
    />
  )
}

export default page
