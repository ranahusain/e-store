import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match, product]);

  const addToCartHandler = () => {
    if (user.userInfo.isLogin) {
      dispatch(addToCart(product._id, qty));
      history.push(`/cart`);
      return;
    } else {
      alert("You need to first login.");
    }
  };

  return (
    <div className="app">
      <div className="container py-5">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        ) : (
          <>
            {/* Back Button */}
            <Link to="/" className="btn btn-outline-dark mb-4">
              <i className="fas fa-arrow-left me-2"></i>
              Back to Shop
            </Link>

            <div className="row g-5">
              {/* Product Image Section */}
              <div className="col-lg-6">
                <div
                  className="card border-0 shadow-sm p-4"
                  style={{ backgroundColor: "#f9f9f9" }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="img-fluid"
                    style={{ objectFit: "contain", height: "400px" }}
                  />
                </div>
              </div>

              {/* Product Details Section */}
              <div className="col-lg-6">
                <div>
                  <h1 className="fw-bold mb-3">{product.name}</h1>

                  {/* Rating (optional) */}
                  <div className="mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-star text-warning"></i>
                      <i className="fas fa-star text-warning"></i>
                      <i className="fas fa-star text-warning"></i>
                      <i className="fas fa-star text-warning"></i>
                      <i className="fas fa-star-half-alt text-warning"></i>
                      <span className="ms-2 text-muted">(245 reviews)</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <h2 className="fw-bold text-dark">${product.price}</h2>
                  </div>

                  {/* Description */}
                  <p className="text-muted mb-4 lead">{product.description}</p>

                  {/* Stock Status */}
                  <div className="mb-4">
                    <p>
                      <strong>Availability:</strong>{" "}
                      <span
                        className={`badge ${
                          product.countInStock > 0 ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </p>
                  </div>

                  {/* Quantity Selector */}
                  {product.countInStock > 0 && (
                    <div className="mb-4">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Quantity:
                          </label>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="form-select"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ),
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-dark btn-lg"
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-lg"
                    >
                      <i className="fas fa-heart me-2"></i>
                      Add to Wishlist
                    </button>
                    {user.userInfo?.details?.isAdmin && (
                      <button
                        type="button"
                        className="btn btn-warning btn-lg"
                        onClick={() =>
                          history.push(`/admin/add-product/${product._id}`)
                        }
                      >
                        <i className="fas fa-edit me-2"></i>
                        Edit Product
                      </button>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="mt-5 pt-4 border-top">
                    <div className="row g-4">
                      <div className="col-md-4 text-center">
                        <i className="fas fa-truck fa-2x text-muted mb-2"></i>
                        <p className="fw-bold">Free Shipping</p>
                        <p className="small text-muted">On orders over $50</p>
                      </div>
                      <div className="col-md-4 text-center">
                        <i className="fas fa-undo fa-2x text-muted mb-2"></i>
                        <p className="fw-bold">Easy Returns</p>
                        <p className="small text-muted">30-day return policy</p>
                      </div>
                      <div className="col-md-4 text-center">
                        <i className="fas fa-lock fa-2x text-muted mb-2"></i>
                        <p className="fw-bold">Secure Payment</p>
                        <p className="small text-muted">
                          SSL encrypted checkout
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
