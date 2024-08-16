import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white ">
      <div className="container py-0">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-4">
            <h3>About Us</h3>
            <p>
              MyShop is a lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consequat dolor odio odio malesuada at condimentum adipiscing iaculis semper.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li>
                <Link to="/home" className="text-white">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-white">Products</Link>
              </li>
              <li>
                <Link to="/services" className="text-white">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-4">
            <h3>Contact Us</h3>
            <ul className="list-unstyled">
              <li>Email: contact@Myfurniture.com</li>
              <li>Phone: +1234567890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4">
        <p>&copy; 2024 MyShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
