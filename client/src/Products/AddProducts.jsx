import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Addproduct.css";
import axios from "axios";

function AddProducts() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      // Create preview URL
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      await axios.post("http://localhost:3001/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/all_products");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar Navigation - You can extract this to a separate component */}
      <div className="sidebar bg-dark text-white">
        <div className="sidebar-header p-3">
          <h3 className="text-center">Admin Panel</h3>
        </div>
        {/* <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add_products" className="nav-link text-white active">
              <i className="bi bi-plus-circle me-2"></i>Add Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/all_products" className="nav-link text-white">
              <i className="bi bi-list-ul me-2"></i>View Products
            </Link>
          </li>
        </ul> */}
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <nav className="navbar navbar-light bg-light mb-4 shadow-sm">
          <div className="container-fluid">
            <span className="navbar-brand">Add New Product</span>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle me-1"></i>Admin
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="#profile">Profile</Link></li>
                  <li><Link className="dropdown-item" to="/">Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Product Form */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-box-seam me-2"></i>Product Information
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={submitForm}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={product.name}
                          onChange={inputHandler}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="price" className="form-label">Price ($)</label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          value={product.price}
                          onChange={inputHandler}
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="image" className="form-label">Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={imageHandler}
                        accept="image/*"
                        required
                      />
                      {preview && (
                        <div className="mt-3 text-center">
                          <img
                            src={preview}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "200px" }}
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger mt-2"
                            onClick={() => {
                              setPreview("");
                              setProduct(prev => ({ ...prev, image: null }));
                            }}
                          >
                            Remove Image
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Adding Product...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-save me-2"></i>Add Product
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddProducts;