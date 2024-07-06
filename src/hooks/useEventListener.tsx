import { useEffect, useRef } from 'react'

export default function useEventListener(
  eventType: string,
  callback: () => void,
) {
  const callbackRef = useRef(callback)
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (window == null) return
    // @ts-ignore
    const handler = (e: any) => callbackRef.current(e)
    window.addEventListener(eventType, handler)

    return () => window.removeEventListener(eventType, handler)
  }, [eventType, window])
}
