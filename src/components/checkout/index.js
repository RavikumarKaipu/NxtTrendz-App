import {useNavigate} from 'react-router-dom'
import './index.css'

const Checkout = () => {
  const navigate = useNavigate()

  const handleProceed = () => {
    navigate('/checkout/address')
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-heading">Checkout</h1>
      <p className="checkout-description">
        Ready to place your order? Let’s get your delivery details.
      </p>
      <button type="button" className="proceed-button" onClick={handleProceed}>
        Proceed to Address
      </button>
    </div>
  )
}

export default Checkout