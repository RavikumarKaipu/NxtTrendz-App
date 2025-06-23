import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const AddressForm = () => {
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleContinue = () => {
    if (address.trim().length < 10) {
      setError('Please enter a valid address (at least 10 characters).')
      return
    }
    localStorage.setItem('shipping_address', address)
    navigate('/checkout/payment')
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Enter Delivery Address</h2>
      <textarea
        className="address-input"
        rows="5"
        value={address}
        onChange={e => {
          setAddress(e.target.value)
          if (e.target.value.trim().length >= 10) setError('')
        }}
        placeholder="Flat No, Street Name, City, State, Pincode"
      />
      {error && <p className="error-msg">{error}</p>}
      <button className="save-address-button" onClick={handleContinue}>
        Continue to Payment
      </button>
    </div>
  )
}

export default AddressForm
