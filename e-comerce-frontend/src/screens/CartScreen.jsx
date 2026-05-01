import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import useLogin from "../utils/hooks/useLogin";

const CartScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);

  const { loginInfo } = useLogin();

  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart({ pId: item.product, _id: item._id }));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
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

  const handleProceedToCheckout = () => {
    history.push("/checkout");
  };

  if (loginInfo.loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!loginInfo.loading && !loginInfo.isLogin)
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          <i className="fas fa-info-circle me-2"></i>
          You need to <Link to="/signin">sign in</Link> to view your cart.
        </div>
      </div>
    );

  return (
    <div className="app">
      <div className="container py-5">
        {cartItems.length === 0 ? (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <i
                className="fas fa-shopping-cart fa-5x text-muted mb-3"
                style={{ opacity: 0.5 }}
              ></i>
              <h3 className="mt-3">Your Cart is Empty</h3>
              <p className="text-muted mb-4">
                Start adding items to your cart by browsing our products
              </p>
              <Link to="/" className="btn btn-dark btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="row gap-4">
            {/* Cart Items Section */}
            <div className="col-lg-8">
              <h2 className="mb-4 fw-bold">Shopping Cart</h2>
              <div className="border-bottom pb-3 mb-3">
                <p className="text-muted">
                  <strong>{getCartCount()}</strong> item
                  {getCartCount() !== 1 ? "s" : ""} in cart
                </p>
              </div>

              <div className="d-flex flex-column gap-3">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product}
                    item={item}
                    qtyChangeHandler={qtyChangeHandler}
                    removeHandler={() => removeFromCartHandler(item)}
                  />
                ))}
              </div>

              <div className="mt-4">
                <Link to="/" className="btn btn-outline-dark">
                  <i className="fas fa-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="col-lg-4">
              <div
                className="card shadow-sm sticky-top"
                style={{ top: "100px" }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-4 fw-bold">Order Summary</h5>

                  {/* Summary Items */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Subtotal:</span>
                      <span className="fw-bold">${getCartSubTotal()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Tax (10%):</span>
                      <span className="fw-bold">${getTaxAmount()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Shipping:</span>
                      <span className="fw-bold text-success">Free</span>
                    </div>
                  </div>

                  <hr />

                  {/* Total */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="fw-bold fs-5">Total:</span>
                    <span className="fs-5 fw-bold">${getTotalAmount()}</span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    className="btn btn-dark w-100 py-3 fw-bold"
                    onClick={handleProceedToCheckout}
                  >
                    <i className="fas fa-lock me-2"></i>
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping */}
                  <button
                    className="btn btn-outline-dark w-100 mt-2"
                    onClick={() => history.push("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
