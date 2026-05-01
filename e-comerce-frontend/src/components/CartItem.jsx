import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div className="row g-3 mb-3 p-3 border rounded align-items-center">
      {/* Product Image */}
      <div className="col-md-2">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="img-fluid rounded"
          style={{ maxHeight: "100px", objectFit: "contain" }}
        />
      </div>

      {/* Product Info */}
      <div className="col-md-3">
        <Link
          to={`/product/${item.product}`}
          className="text-decoration-none text-dark"
        >
          <h6 className="mb-0">{item.name}</h6>
        </Link>
      </div>

      {/* Price */}
      <div className="col-md-2">
        <p className="mb-0 fw-bold">${item.price}</p>
      </div>

      {/* Quantity Selector */}
      <div className="col-md-2">
        <select
          value={item.qty}
          onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
          className="form-select form-select-sm"
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Remove Button */}
      <div className="col-md-3 d-flex justify-content-end">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => removeHandler(item.product)}
          title="Remove from cart"
        >
          <i className="fas fa-trash me-2"></i>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
