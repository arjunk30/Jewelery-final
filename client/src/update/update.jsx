import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./update.css";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/products/${id}`
        );
        setProduct(response.data);
        if (response.data.image) {
          setPreview(`http://localhost:3001${response.data.image}`);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      await axios.put(`http://localhost:3001/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/all_products");
    } catch (err) {
      console.error("Error updating product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <div className="sidebar bg-dark text-white">
        <div className="sidebar-header p-3">
          <h3 className="text-center">Admin Panel</h3>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add_products" className="nav-link text-white">
              <i className="bi bi-plus-circle me-2"></i>Add Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/all_products" className="nav-link text-white active">
              <i className="bi bi-list-ul me-2"></i>View Products
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <span className="navbar-brand">Update Product</span>
            <div className="d-flex align-items-center ms-auto">
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>Admin
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-danger" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container-fluid p-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-pencil-square me-2"></i>Edit Product
                  </h4>
                </div>

                {isLoading ? (
                  <div className="card-body text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading product details...</p>
                  </div>
                ) : (
                  <div className="card-body">
                    <form onSubmit={submitForm}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="name" className="form-label">
                            Product Name
                          </label>
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
                          <label htmlFor="price" className="form-label">
                            Price ($)
                          </label>
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
                        <label htmlFor="image" className="form-label">
                          Product Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          name="image"
                          onChange={fileHandler}
                          accept="image/*"
                        />

                        {preview && (
                          <div className="mt-3">
                            <p className="mb-2">Image Preview:</p>
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={preview}
                                alt="Preview"
                                className="img-thumbnail"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                }}
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                  setPreview(
                                    product.image
                                      ? `http://localhost:3001${product.image}`
                                      : ""
                                  );
                                  setNewImage(null);
                                  // Clear the file input
                                  document.getElementById("image").value = "";
                                }}
                              >
                                <i className="bi bi-x-lg me-1"></i>Remove New
                                Image
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="d-flex justify-content-between">
                        <Link
                          to="/all_products"
                          className="btn btn-outline-secondary"
                        >
                          <i className="bi bi-arrow-left me-1"></i>Cancel
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Updating...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-save me-1"></i>Update Product
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateProduct;
