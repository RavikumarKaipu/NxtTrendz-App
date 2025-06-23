import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash-screen">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="splash logo"
        className="splash-logo"
      />
      <p className="splash-tagline">NXT Trendz</p>
    </div>
  )
}

export default SplashScreen
