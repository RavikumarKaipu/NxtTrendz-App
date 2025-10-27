import {useState, useCallback, useEffect} from 'react'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import OrderSuccess from './components/OrderSuccess'
import Checkout from './components/checkout'
import AddressForm from './components/AddressForm'
import PaymentOptions from './components/Payment'
import SplashScreen from './components/SplashScreen'
import NetworkStatus from './components/NetworkStatus'

import './App.css'
import OrderSummary from './components/Summary'

const App = () => {
  const [cartList, setCartList] = useState([])
  const [showSplash, setShowSplash] = useState(true)

  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000) // Splash for 3 seconds
    return () => clearTimeout(timer)
  }, [])

  const removeAllCartItems = useCallback(() => {
    setCartList([])
  }, [])

  const incrementCartItemQuantity = useCallback(id => {
    setCartList(prevList =>
      prevList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item
      )
    )
  }, [])

  const decrementCartItemQuantity = useCallback(id => {
    setCartList(prevList =>
      prevList.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({...item, quantity: item.quantity - 1})
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [])
    )
  }, [])

  const removeCartItem = useCallback(id => {
    setCartList(prevList => prevList.filter(item => item.id !== id))
  }, [])

  const addCartItem = useCallback(product => {
    setCartList(prevList => {
      const existingProduct = prevList.find(item => item.id === product.id)
      if (existingProduct) {
        return prevList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item
        )
      } else {
        return [...prevList, product]
      }
    })
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      {/* Show Network Status Banner Globally */}
      <NetworkStatus />

      {/* Splash screen shows only when app opens first */}
      {showSplash && location.pathname === '/' ? (  
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
          <Route
            path="/products/:id"
            element={<ProtectedRoute element={<ProductItemDetails />} />}
          />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/address" element={<AddressForm />} />
          <Route path="/checkout/payment" element={<PaymentOptions />} />
          <Route path="/checkout/summary" element={<OrderSummary />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      )}
    </CartContext.Provider>
  )
}

export default App
