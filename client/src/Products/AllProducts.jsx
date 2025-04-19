import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3001/delete/product/${productId}`);
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().includes(searchTerm)
  );

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
            <span className="navbar-brand">Product Management</span>
            <div className="d-flex align-items-center ms-auto">
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle me-1"></i>Admin
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item text-danger" to="/logout">Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container-fluid p-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <i className="bi bi-box-seam me-2"></i>Product List
              </h4>
              <div className="w-25">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="alert alert-warning text-center">
                  No products found. {searchTerm && "Try a different search term."}
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th width="5%">#</th>
                        <th width="25%">Product</th>
                        <th width="15%">Price</th>
                        <th width="20%">Image</th>
                        <th width="15%">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product, index) => (
                        <tr key={product._id}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{product.name}</strong>
                          </td>
                          <td>${product.price}</td>
                          <td>
                            {product.image ? (
                              <img 
                                src={`http://localhost:3001${product.image}`} 
                                alt={product.name}
                                className="img-thumbnail"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                              />
                            ) : (
                              <span className="badge bg-secondary">No Image</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link 
                                to={`/update/${product._id}`}  type='button'
                                className="btn btn-sm btn-outline-primary"
                                title="Edit"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <button
                                onClick={() => deleteProduct(product._id)}
                                className="btn btn-sm btn-outline-danger"
                                title="Delete"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <div className="card-footer bg-light">
              <small className="text-muted">
                Showing {filteredProducts.length} of {products.length} products
              </small>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllProducts;