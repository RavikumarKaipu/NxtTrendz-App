import { useEffect, useState } from 'react'
import './index.css'

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="network-status-banner">
      <p>No Internet Connection. Please check your network.</p>
    </div>
  )
}

export default NetworkStatus
