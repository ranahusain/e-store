import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Api } from "../../utils/Api";

function SignUpScreen() {
  const { replace, push } = useHistory();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const _handleSubmit = useCallback(async () => {
    if (fullName.length < 2 || email.length < 2 || password.length < 2) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    const { statusCode, data } = await Api.postRequest("/api/user/signup", {
      email,
      fullName,
      password,
    });
    setLoading(false);

    if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
      setError(data);
      return;
    }

    setSuccess("Account created successfully! Redirecting to sign in...");
    setTimeout(() => {
      replace("/signin");
    }, 2000);
  }, [email, fullName, password, confirmPassword, replace]);

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
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-5">
                  <h2 className="fw-bold mb-2">Create Account</h2>
                  <p className="text-muted">Join ShopHub and start shopping</p>
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    _handleSubmit();
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label fw-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Enter password (min 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-bold"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg w-100 fw-bold mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  {/* Divider */}
                  <div className="text-center mb-3">
                    <span className="text-muted">Already have an account?</span>
                  </div>

                  {/* Sign In Link */}
                  <Link
                    to="/signin"
                    className="btn btn-outline-dark btn-lg w-100 fw-bold"
                  >
                    Sign In
                  </Link>
                </form>

                {/* Back to Home */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={() => push("/")}
                  >
                    <i className="fas fa-home me-2"></i>
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpScreen;
