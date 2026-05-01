import { Link } from "react-router-dom";

const Product = ({ imageUrl, description, price, name, productId }) => {
  return (
    <div
      className="card h-100 shadow-sm product-card"
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
    >
      <div
        className="position-relative overflow-hidden"
        style={{ height: "200px", backgroundColor: "#f5f5f5" }}
      >
        <img
          src={imageUrl}
          alt={name}
          className="card-img-top h-100"
          style={{ objectFit: "contain" }}
        />
        <Link
          to={`/product/${productId}`}
          className="position-absolute bottom-0 start-0 w-100 btn btn-dark rounded-0"
          style={{ opacity: 0, transition: "opacity 0.3s ease" }}
        >
          View Details
        </Link>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{name}</h5>
        <p className="card-text text-muted small flex-grow-1">
          {description.substring(0, 80)}...
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="h6 mb-0 fw-bold">${price}</span>
          <Link
            to={`/product/${productId}`}
            className="btn btn-sm btn-outline-dark"
          >
            Add to Cart
          </Link>
        </div>
      </div>
      <style>{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }
        .product-card:hover .position-absolute {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default Product;
