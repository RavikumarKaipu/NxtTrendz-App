import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)
  const navigate = useNavigate()

  const total = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    // Clear the cart
    removeAllCartItems()
    // Redirect to order success page
    navigate('/checkout/address')
  }

  return (
    <>
      <div className="cart-summary-container">
        <h1 className="order-total-value">
          <span className="order-total-label">Order Total:</span> Rs {total}/-
        </h1>
        <p className="total-items">{cartList.length} Items in cart</p>
        <button type="button" className="checkout-button d-sm-none" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      <button type="button" className="checkout-button d-lg-none" onClick={handleCheckout}>
        Checkout
      </button>
    </>
  )
}

export default CartSummary
