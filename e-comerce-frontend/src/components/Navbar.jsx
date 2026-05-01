import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { logout } from "../utils/localstorage";
import { setInitialState } from "../redux/actions/userAction";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const _handleLogout = () => {
    dispatch(setInitialState());
    logout();
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom border-light-subtle sticky-top">
      <div className="container-fluid px-4">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-dark" to="/">
          <i className="fas fa-shopping-bag me-2"></i>
          ShopHub
        </Link>

        {/* Hamburger Menu */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={click}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            {/* Home Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Shop
              </Link>
            </li>

            {/* Admin Link */}
            {user.userInfo.isLogin && user.userInfo.details.isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add-product">
                  <i className="fas fa-plus-circle me-1"></i>
                  Add Product
                </Link>
              </li>
            )}

            {/* Cart Link */}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <i className="fas fa-shopping-cart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getCartCount()}
                </span>
              </Link>
            </li>

            {/* Auth Links */}
            {!user.userInfo.isLogin ? (
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="nav-link btn btn-link dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <span className="dropdown-item-text">
                      {user.userInfo.details?.fullName || "User"}
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={_handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
