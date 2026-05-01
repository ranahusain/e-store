import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Api } from "../../utils/Api";

function AdminAddProduct() {
  const { push } = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      if (
        !formData.name ||
        !formData.description ||
        !formData.price ||
        !formData.countInStock ||
        !formData.imageUrl
      ) {
        setError("All fields are required");
        return;
      }

      setLoading(true);
      const { statusCode, data } = await Api.postRequest("/api/products", {
        ...formData,
        price: parseFloat(formData.price),
        countInStock: parseInt(formData.countInStock),
      });

      setLoading(false);

      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setError(typeof data === "string" ? data : JSON.stringify(data));
        return;
      }

      setSuccess("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        countInStock: "",
        imageUrl: "",
      });

      setTimeout(() => {
        push("/");
      }, 1500);
    },
    [formData, push],
  );

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="app bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                {/* Header */}
                <div className="d-flex align-items-center mb-5">
                  <button
                    onClick={() => push("/")}
                    className="btn btn-link me-3 p-0"
                    title="Back to home"
                  >
                    <i className="fas fa-arrow-left fa-2x text-dark"></i>
                  </button>
                  <h1 className="fw-bold mb-0">
                    <i className="fas fa-plus-circle me-3"></i>
                    Add New Product
                  </h1>
                </div>

                {/* Error Alert */}
                {error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError("")}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                {/* Success Alert */}
                {success && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    <i className="fas fa-check-circle me-2"></i>
                    {success}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Product Name */}
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label fw-bold">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      name="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label htmlFor="description" className="form-label fw-bold">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Enter product description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  {/* Price and Stock Row */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label htmlFor="price" className="form-label fw-bold">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="countInStock"
                        className="form-label fw-bold"
                      >
                        Stock Count
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        id="countInStock"
                        name="countInStock"
                        placeholder="Enter stock count"
                        min="0"
                        value={formData.countInStock}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div className="mb-4">
                    <label htmlFor="imageUrl" className="form-label fw-bold">
                      Image URL
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="imageUrl"
                      name="imageUrl"
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Image Preview */}
                  {formData.imageUrl && (
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        Image Preview
                      </label>
                      <div
                        className="border rounded p-3"
                        style={{ backgroundColor: "#f9f9f9" }}
                      >
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="img-fluid"
                          style={{ maxHeight: "300px", objectFit: "contain" }}
                          onError={() => setError("Failed to load image")}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
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
                          Adding Product...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus me-2"></i>
                          Add Product
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-lg"
                      onClick={() => push("/")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddProduct;
