import {useState, useEffect, useContext} from 'react'
import {useParams, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import CartContext from '../../context/CartContext'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProductItemDetails = () => {
  const [productData, setProductData] = useState({})
  const [similarProductsData, setSimilarProductsData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [quantity, setQuantity] = useState(1)

  const {id} = useParams()
  const {addCartItem, cartList} = useContext(CartContext)

  const getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  useEffect(() => {
    const getProductData = async () => {
      setApiStatus(apiStatusConstants.inProgress)
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/products/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = getFormattedData(fetchedData)
        const updatedSimilarProductsData = fetchedData.similar_products.map(
          each => getFormattedData(each),
        )
        setProductData(updatedData)
        setSimilarProductsData(updatedSimilarProductsData)
        setApiStatus(apiStatusConstants.success)
      } else if (response.status === 404) {
        setApiStatus(apiStatusConstants.failure)
      }
    }
    getProductData()
  }, [id])

  const onDecrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1)
  }

  const onIncrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const renderLoadingView = () => (
    <div className="products-details-loader-container">
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="#0b69ff"
        ariaLabel="three-dots-loading"
      />
    </div>
  )

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  const renderProductDetailsView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productData

    const isInCart = cartList.some(item => item.id === productData.id)

    const onClickAddToCart = () => {
      if (!isInCart) {
        addCartItem({...productData, quantity})
        toast.success('✅ Added to Cart!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        })
      }
    }

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementQuantity}
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>

            {isInCart ? (
              <Link to="/cart">
                <button type="button" className="button add-to-cart-btn">
                  Go To Cart
                </button>
              </Link>
            ) : (
              <button
                type="button"
                className="button add-to-cart-btn"
                onClick={onClickAddToCart}
              >
                ADD TO CART
              </button>
            )}
          </div>
        </div>

        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map(each => (
            <SimilarProductItem
              productDetails={each}
              key={each.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
        <ToastContainer />
      </div>
    </>
  )
}

export default ProductItemDetails
