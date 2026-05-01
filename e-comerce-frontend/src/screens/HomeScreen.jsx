import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";
import { setUserDeatils } from "../redux/actions/userAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUserDeatils());
  }, [dispatch]);

  // Filter and sort products
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filteredProducts = [...filteredProducts].reverse();
  }

  return (
    <div className="app">
      {/* Hero Section */}
      <section
        className="py-5 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
        }}
      >
        <div className="container">
          <h1 className="display-5 fw-bold mb-3">Welcome to ShopHub</h1>
          <p className="lead text-muted mb-4">
            Discover the finest collection of products crafted for you
          </p>
          <button
            className="btn btn-dark btn-lg px-5"
            onClick={() => setSearchTerm("")}
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-5 px-4 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Featured Categories</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div
                className="p-5 border rounded-3"
                style={{
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <i className="fas fa-laptop fa-3x text-dark mb-3"></i>
                <h5>Electronics</h5>
                <p className="text-muted">Latest gadgets and devices</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="p-5 border rounded-3"
                style={{
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <i className="fas fa-shopping-bags fa-3x text-dark mb-3"></i>
                <h5>Fashion</h5>
                <p className="text-muted">Trendy clothing and accessories</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="p-5 border rounded-3"
                style={{
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <i className="fas fa-home fa-3x text-dark mb-3"></i>
                <h5>Home & Garden</h5>
                <p className="text-muted">Everything for your home</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-5 px-4 bg-light">
        <div className="container">
          <div className="row g-3 mb-4">
            {/* Search Bar */}
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="col-md-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted mb-4">
            Showing <strong>{filteredProducts.length}</strong> products
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-5 px-4">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading products...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-search fa-4x text-muted mb-3"></i>
              <h5>No products found</h5>
              <p className="text-muted">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div key={product._id} className="col-lg-3 col-md-6 col-sm-12">
                  <Product
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    productId={product._id}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer/CTA Section */}
      <section className="py-5 px-4 bg-dark text-white text-center">
        <div className="container">
          <h3 className="mb-3">Ready to Start Shopping?</h3>
          <p className="mb-4 text-light">
            Browse our collection and find what you love
          </p>
          <Link to="/" className="btn btn-light btn-lg">
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
