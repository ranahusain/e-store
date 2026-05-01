import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Api } from "../../utils/Api";
import { setToken } from "../../utils/localstorage";

function SignInScreen() {
  const { replace, push } = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const _handleSubmit = useCallback(async () => {
    if (email.length > 2 && password.length > 2) {
      setLoading(true);
      setError("");
      const { statusCode, data } = await Api.postRequest("/api/user/signin", {
        email,
        password,
      });
      setLoading(false);
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setError(data);
        return;
      }
      const { token } = JSON.parse(data);
      setToken(token);
      replace("/");
    } else {
      setError("Please fill in all fields");
    }
  }, [email, password, replace]);

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
                  <h2 className="fw-bold mb-2">Welcome Back</h2>
                  <p className="text-muted">Sign in to your ShopHub account</p>
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

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    _handleSubmit();
                  }}
                >
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

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Sign In Button */}
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
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Divider */}
                  <div className="text-center mb-3">
                    <span className="text-muted">Don't have an account?</span>
                  </div>

                  {/* Sign Up Link */}
                  <Link
                    to="/signup"
                    className="btn btn-outline-dark btn-lg w-100 fw-bold"
                  >
                    Create Account
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

export default SignInScreen;
