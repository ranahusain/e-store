import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const CheckoutScreen = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const { cartItems } = cart;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const getTaxAmount = () => {
    return (getCartSubTotal() * 0.1).toFixed(2);
  };

  const getTotalAmount = () => {
    return (parseFloat(getCartSubTotal()) + parseFloat(getTaxAmount())).toFixed(
      2,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
    }, 2000);
  };

  if (!user.userInfo.isLogin) {
    return (
      <div className="app">
        <div className="container py-5">
          <div className="alert alert-warning" role="alert">
            <i className="fas fa-info-circle me-2"></i>
            You need to <Link to="/signin">sign in</Link> to checkout.
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="app">
        <div className="container py-5">
          <div className="alert alert-info" role="alert">
            <i className="fas fa-info-circle me-2"></i>
            Your cart is empty. <Link to="/">Continue shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="app">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="mb-4">
                <i className="fas fa-check-circle fa-5x text-success"></i>
              </div>
              <h2 className="fw-bold mb-3">Order Placed Successfully!</h2>
              <p className="text-muted mb-4">
                Thank you for your purchase. Your order has been confirmed and
                will be shipped soon.
              </p>
              <p className="mb-4">
                <strong>Order ID:</strong> #ORD-
                {Math.floor(Math.random() * 1000000)}
              </p>
              <p className="mb-4">
                <strong>Total Amount:</strong> ${getTotalAmount()}
              </p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-dark btn-lg"
                  onClick={() => history.push("/")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container py-5">
        <h1 className="mb-4 fw-bold">
          <i className="fas fa-lock me-2"></i>
          Secure Checkout
        </h1>

        <div className="row g-4">
          {/* Checkout Form */}
          <div className="col-lg-7">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-truck me-2"></i>
                    Shipping Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label fw-bold">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label fw-bold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label fw-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label fw-bold">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label fw-bold">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label
                        htmlFor="postalCode"
                        className="form-label fw-bold"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="country" className="form-label fw-bold">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-credit-card me-2"></i>
                    Payment Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="cardName" className="form-label fw-bold">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardName"
                      name="cardName"
                      placeholder="Full name as shown on card"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label fw-bold">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="expMonth" className="form-label fw-bold">
                        Expiration Month
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="expMonth"
                        name="expMonth"
                        placeholder="MM"
                        maxLength="2"
                        value={formData.expMonth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="expYear" className="form-label fw-bold">
                        Expiration Year
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="expYear"
                        name="expYear"
                        placeholder="YYYY"
                        maxLength="4"
                        value={formData.expYear}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="cvv" className="form-label fw-bold">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        maxLength="3"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="alert alert-info mt-3">
                    <i className="fas fa-info-circle me-2"></i>
                    <small>
                      This is a demo checkout. Your payment information is not
                      processed or stored.
                    </small>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock me-2"></i>
                      Complete Purchase
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-lg"
                  onClick={() => history.push("/cart")}
                >
                  Back to Cart
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-lg-5">
            <div className="card shadow-sm sticky-top" style={{ top: "100px" }}>
              <div className="card-header bg-light">
                <h5 className="mb-0 fw-bold">Order Summary</h5>
              </div>
              <div className="card-body">
                {/* Order Items */}
                <div className="mb-4 pb-4 border-bottom">
                  <h6 className="fw-bold mb-3">Items ({cartItems.length})</h6>
                  <div className="d-flex flex-column gap-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.product}
                        className="d-flex justify-content-between text-muted small"
                      >
                        <span>
                          {item.name} x {item.qty}
                        </span>
                        <span>${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal:</span>
                    <span className="fw-bold">${getCartSubTotal()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tax (10%):</span>
                    <span className="fw-bold">${getTaxAmount()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Shipping:</span>
                    <span className="fw-bold text-success">Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-5">Total:</span>
                    <span className="fs-5 fw-bold text-dark">
                      ${getTotalAmount()}
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="d-flex flex-column gap-2 text-center text-muted small">
                  <div>
                    <i className="fas fa-lock text-success"></i> Secure Checkout
                  </div>
                  <div>
                    <i className="fas fa-shield-alt text-success"></i> SSL
                    Encrypted
                  </div>
                  <div>
                    <i className="fas fa-truck text-success"></i> Free Shipping
                    Over $50
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
