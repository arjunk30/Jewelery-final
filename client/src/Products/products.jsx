import React from "react";
import { Link } from "react-router-dom";

function Product() {
  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
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
        </ul>*/}
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            {/* <span className="navbar-brand">Admin Functionalities</span> */}
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#hh"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-1"></i>Admin
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="#profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#settings">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item text-danger" to="/">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-12">
              <div className="card shadow">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-box-seam me-2"></i>
                  </h4>
                </div>
                <div className="card-body">
                  {/* <div className="alert alert-info">
                    <i className="bi bi-info-circle-fill me-2"></i>
                  
                  </div> */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card mb-4">
                        <div className="card-body text-center">
                          <i className="bi bi-plus-circle display-4 text-primary mb-3"></i>
                          <h5>Add New Product</h5>
                          <p className="text-muted">
                            Create new product entries
                          </p>
                          <Link to="/add_products" className="btn btn-primary">
                            Go to Add Products
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card mb-4">
                        <div className="card-body text-center">
                          <i className="bi bi-list-ul display-4 text-primary mb-3"></i>
                          <h5>View Products</h5>
                          <p className="text-muted">
                            Browse and manage existing products
                          </p>
                          <Link to="/all_products" className="btn btn-primary">
                            Go to Product List
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Product;
