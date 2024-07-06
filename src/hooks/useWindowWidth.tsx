'use client'

import { useState } from 'react'
import useEventListener from './useEventListener'

const isClient = typeof window === 'object'

export default function useWindowWidth() {
  const [width, setWidth] = useState(isClient ? window.innerWidth : 0)

  if (!isClient) return

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEventListener('resize', () => {
    setWidth(window.innerWidth)
  })

  return width
}
