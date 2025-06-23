import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const navigate = useNavigate()

  const handlePaymentContinue = () => {
    if (paymentMethod !== '') {
      localStorage.setItem('payment_method', paymentMethod)
      navigate('/checkout/summary')
    } else {
      alert('Please select a payment method')
    }
  }

  const paymentMethods = [
    { id: 'COD', label: 'Cash on Delivery' },
    { id: 'UPI', label: 'UPI' },
    { id: 'Card', label: 'Credit / Debit Card' },
  ]

  return (
    <div className="payment-container">
      <h2 className="payment-title">Select Payment Method</h2>
      <div className="payment-method">
        {paymentMethods.map(method => (
          <div
            key={method.id}
            className={`payment-option ${
              paymentMethod === method.id ? 'selected' : ''
            }`}
            onClick={() => setPaymentMethod(method.id)}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={() => setPaymentMethod(method.id)}
            />
            <label>{method.label}</label>
          </div>
        ))}
      </div>
      <button
        className="pay-now-button"
        onClick={handlePaymentContinue}
        disabled={paymentMethod === ''}
      >
        Continue to Summary
      </button>
    </div>
  )
}

export default PaymentOptions
