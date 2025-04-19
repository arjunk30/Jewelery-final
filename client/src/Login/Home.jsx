import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
// import ring from '../assets/ring.jpg'; // adjust path as needed
import silver from "../assets/silver.webp";
import axios from "axios";

const HomePage = () => {
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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm)
  );

  return (
    <div className="jewellery-website">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="text-primary fw-bold">LUXE</span> Jewels
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#lnavbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/collections">
                  Collections
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rings">
                  Rings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/necklaces">
                  Necklaces
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-primary me-2">
                Admin
              </Link>
              <button className="btn btn-primary">
                <i className="bi bi-cart3"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Timeless Elegance, Crafted for You
              </h1>
              <p className="lead mb-4">
                Discover our exquisite collection of handcrafted jewellery
                pieces that tell your unique story.
              </p>
              <Link
                to="/collections"
                className="btn btn-primary btn-lg px-4 me-2"
              >
                Shop Now
              </Link>
              <Link to="/about" className="btn btn-outline-primary btn-lg px-4">
                Learn More
              </Link>
            </div>
            <div className="col-lg-6">
              <img
                src={silver}
                alt="Luxury Jewellery"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.map((product, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
                <div className="card h-100 border-0 shadow-sm">
                  <Link to={`/product/${product._id}`}>
                    <div className="img-box p-3">
                      {product.image ? (
                        <img
                          src={`http://localhost:3001${product.image}`}
                          alt={product.name}
                          className="img-fluid"
                        />
                      ) : (
                        <div className="text-center py-5">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h6 className="card-title">{product.name}</h6>
                      <h6 className="card-text">
                        Price:{" "}
                        <span className="text-primary">${product.price}</span>
                      </h6>
                    </div>
                    <div className="new-badge">
                      <span className="badge bg-danger">New</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
                alt="About Us"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Craftsmanship Since 1985</h2>
              <p className="lead mb-4">
                Each piece in our collection is meticulously crafted by master
                jewellers with decades of experience.
              </p>
              <p>
                We source only the finest materials and gemstones, ensuring
                every creation meets our exacting standards of quality and
                beauty.
              </p>
              <Link to="/about" className="btn btn-primary mt-3">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What Our Customers Say</h2>
            <p className="text-muted">Trusted by thousands of happy clients</p>
          </div>
          <div className="row g-4">
            {[1, 2, 3].map((item) => (
              <div className="col-md-4" key={item}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className="bi bi-star-fill text-warning"
                        ></i>
                      ))}
                    </div>
                    <p className="card-text">
                      "The engagement ring is even more beautiful in person.
                      Excellent craftsmanship and customer service!"
                    </p>
                    <div className="mt-3">
                      <img
                        src={`https://randomuser.me/api/portraits/women/${
                          item + 20
                        }.jpg`}
                        className="rounded-circle"
                        width="60"
                        alt="Customer"
                      />
                      <h6 className="mt-2 mb-0">Sarah Johnson</h6>
                      <small className="text-muted">New York</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className="fw-bold mb-3">Join Our Newsletter</h2>
              <p className="mb-4">
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>
              <form className="row g-2">
                <div className="col-8">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                  />
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-light w-100">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h5 className="fw-bold mb-3">LUXE Jewels</h5>
              <p>
                Creating timeless jewellery pieces since 1985. Each creation
                tells a story.
              </p>
              <div className="social-icons">
                <a href="#l" className="text-white me-2">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#l" className="text-white me-2">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#l" className="text-white me-2">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#l" className="text-white">
                  <i className="bi bi-pinterest"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="fw-bold">Shop</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#l" className="text-white-50">
                    All Collections
                  </a>
                </li>
                <li>
                  <a href="#l" className="text-white-50">
                    Rings
                  </a>
                </li>
                <li>
                  <a href="#l" className="text-white-50">
                    Necklaces
                  </a>
                </li>
                <li>
                  <a href="#l" className="text-white-50">
                    Earrings
                  </a>
                </li>
                <li>
                  <a href="#l" className="text-white-50">
                    Bracelets
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="fw-bold">Company</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#l" className="text-white-50">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#l" className="text-white-50">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#l" className="text-white-50">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#l" className="text-white-50">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 mb-4">
              <h6 className="fw-bold">Contact</h6>
              <p className="mb-1">
                <i className="bi bi-geo-alt me-2"></i> 123 Jewel Street, New
                York
              </p>
              <p className="mb-1">
                <i className="bi bi-telephone me-2"></i> (123) 456-7890
              </p>
              <p className="mb-0">
                <i className="bi bi-envelope me-2"></i> info@luxejewels.com
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="small mb-0">
                &copy; 2023 LUXE Jewels. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="small mb-0">
                <a href="#l" className="text-white-50 me-2">
                  Privacy Policy
                </a>
                <a href="#l" className="text-white-50">
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
