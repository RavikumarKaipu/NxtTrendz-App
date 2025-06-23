import './index.css'

const OrderSummary = () => {
  const address=localStorage.getItem('shipping_address');
  const productsLength= localStorage.getItem('cart_length')
  return (
    <div className="order-summary-container">
      <h2 className="order-summary-title">Order Summary</h2>
      <div className="order-details">
        <p><strong>Order ID:</strong> #NF2345</p>
        <p><strong>Delivery Address:</strong> {address}</p>
        <p><strong>Payment Mode:</strong> UPI</p>
        <p><strong>Total Items:</strong> {productsLength}</p>
      </div>
      <p className="total-amount">Total: ₹1,949/-</p>
      <p className="thank-you">🎉 Thank you for shopping with NxtTrendz!</p>
      <button className="order-summary-button" onClick={() => window.location.href = "/products"}>
        Continue Shopping
      </button>
    </div>
  )
}

export default OrderSummary
