import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <div className="d-flex">
        <div className="sidebar bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
          <div className="sidebar-header mb-4">
            <h3 className="text-center">Admin Dashboard</h3>
          </div>
          <ul className="nav flex-column">
            {/* <li className="nav-item mb-2">
              <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </Link>
            </li> */}
            <li className="nav-item mb-2">
              <Link to="/products" className="nav-link text-white d-flex align-items-center active">
                <i className="bi bi-box-seam me-2"></i>
                Products
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="#users" className="nav-link text-white d-flex align-items-center">
                <i className="bi bi-people me-2"></i>
                Users
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="#orders" className="nav-link text-white d-flex align-items-center">
                <i className="bi bi-cart-check me-2"></i>
                Orders
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="#settings" className="nav-link text-white d-flex align-items-center">
                <i className="bi bi-gear me-2"></i>
                Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="main-content flex-grow-1 p-4">
          {/* Top Navigation Bar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="d-flex align-items-center ms-auto">
                <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle me-1"></i>
                    Admin User
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="#settings">Settings</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item text-danger" to="/">Logout</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Welcome to Admin Dashboard</h4>
            </div>
            <div className="card-body">
              <p>Select an option from the sidebar to manage different sections of your application.</p>
              <div className="alert alert-info">
                <i className="bi bi-info-circle-fill me-2"></i>
                You're currently viewing the Products section.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;