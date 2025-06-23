import { useEffect } from 'react'
import './index.css'

const RazorpayPayment = ({ amount = 500, user = {} }) => {
  useEffect(() => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Test Key
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      name: "NXTTrendz",
      description: "Order Payment",
      image: "https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`)
        // Optionally store response.razorpay_payment_id in DB
      },
      prefill: {
        name: user.name || "Customer",
        email: user.email || "customer@example.com",
        contact: user.phone || "9999999999"
      },
      theme: {
        color: "#2874f0"
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }, [amount, user])

  return (
    <div className="razorpay-loader-container">
      <h3>Processing Payment...</h3>
    </div>
  )
}

export default RazorpayPayment
