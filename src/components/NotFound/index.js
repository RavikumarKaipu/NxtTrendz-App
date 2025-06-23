import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We're sorry, the page you're looking for doesn't exist.
    </p>
    <Link to="/">
      <button className="go-home-btn" type="button">Go to Home</button>
    </Link>
  </div>
)

export default NotFound
