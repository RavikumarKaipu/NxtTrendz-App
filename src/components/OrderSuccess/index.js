import {Link} from 'react-router-dom'
import './index.css'

const OrderSuccess = () => (
  <div className="order-success-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-success-img.png"
      alt="order placed"
      className="success-image"
    />
    <h1 className="success-heading">Order Placed Successfully!</h1>
    <p className="success-message">Thank you for shopping with NxtTrendz.</p>
    <Link to="/products">
      <button type="button" className="continue-shopping-button">
        Continue Shopping
      </button>
    </Link>
  </div>
)

export default OrderSuccess
