import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../redux/actions/userAction";
import { logout } from "../utils/localstorage";

const SideDrawer = ({ show, click }) => {
  const sideDrawerClass = [
    "position-fixed",
    "top-0",
    "start-0",
    "h-100",
    "bg-white",
    "shadow-lg",
  ];
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  if (show) {
    sideDrawerClass.push("d-block");
  } else {
    sideDrawerClass.push("d-none");
  }

  const _handleLogout = () => {
    dispatch(setInitialState());
    logout();
    history.push("/");
  };

  return (
    <div
      className={sideDrawerClass.join(" ")}
      style={{
        width: "280px",
        zIndex: 1040,
        transition: "transform 0.3s ease",
      }}
    >
      <div className="p-4">
        <button
          type="button"
          className="btn-close"
          onClick={click}
          aria-label="Close"
        ></button>
      </div>
      <ul className="nav flex-column gap-3 px-4" onClick={click}>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Shop
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            <i className="fas fa-shopping-cart me-2"></i>
            Cart <span className="badge bg-danger ms-1">{getCartCount()}</span>
          </Link>
        </li>

        {user.userInfo.isLogin && user.userInfo.details.isAdmin && (
          <li className="nav-item">
            <Link to="/admin/add-product" className="nav-link">
              <i className="fas fa-plus-circle me-2"></i>
              Add Product
            </Link>
          </li>
        )}

        {!user.userInfo.isLogin ? (
          <li className="nav-item">
            <Link to="/signin" className="nav-link">
              Sign In
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <button
              onClick={_handleLogout}
              className="nav-link btn btn-link text-start"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideDrawer;
