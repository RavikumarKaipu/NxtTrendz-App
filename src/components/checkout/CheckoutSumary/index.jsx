import { useNavigate } from 'react-router-dom'
import './index.css'

const CheckoutSummary = () => {
  const navigate = useNavigate()

  const handlePayNow = () => {
    navigate('/checkout/payment-gateway')
  }

  return (
    <div className="checkout-summary-container">
      <h2>Total: ₹1000</h2>
      <button className="pay-now-button" onClick={handlePayNow}>
        Pay Now
      </button>
    </div>
  )
}

export default CheckoutSummary
