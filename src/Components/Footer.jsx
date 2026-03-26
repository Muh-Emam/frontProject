function Footer() {
  return (
    <footer className="py-5 mb-0" style={{ backgroundColor: "#EEEFFB", color: "#8A8FB9" }}>
      <div className="container">
        <div className="row">
          {/* Column 1: Brand & Newsletter */}
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <h2 className="fw-bold text-black mb-4" style={{ fontSize: "34px" }}>
              Hekto
            </h2>
            <div className="d-flex mb-3">
              <input
                type="email"
                className="form-control border-0 rounded-start"
                placeholder="Enter Email Address"
                style={{ padding: "10px", width: "200px" }}
              />
              <button className="btn text-white px-4 rounded-end" style={{ backgroundColor: "#FB2E86" }}>
                Sign Up
              </button>
            </div>
            <p className="small mb-1">Contact Info</p>
            <p className="small">Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
          </div>

          {/* Column 2: Categories */}
          <div className="col-6 col-md-3 col-lg-2 mb-4">
            <h5 className="text-black fw-bold mb-4">Catagories</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>Laptops & Computers</li>
              <li>Cameras & Photography</li>
              <li>Smart Phones & Tablets</li>
              <li>Video Games & Consoles</li>
              <li>Waterproof Headphones</li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="col-6 col-md-3 col-lg-2 mb-4">
            <h5 className="text-black fw-bold mb-4">Customer Care</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>My Account</li>
              <li>Discount</li>
              <li>Returns</li>
              <li>Orders History</li>
              <li>Order Tracking</li>
            </ul>
          </div>

          {/* Column 4: Pages */}
          <div className="col-6 col-md-3 col-lg-2 mb-4">
            <h5 className="text-black fw-bold mb-4">Pages</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>Blog</li>
              <li>Browse the Shop</li>
              <li>Category</li>
              <li>Pre-Built Pages</li>
              <li>Visual Composer Elements</li>
              <li>WooCommerce Pages</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-3 mt-4 mb-0" style={{ backgroundColor: "#E7E4F8" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 small text-muted">©Hekto - All Rights Reserved</p>
          <div className="d-flex gap-3 text-dark">
            <a href="https://www.facebook.com" target="_blank"><i className="bi bi-facebook pointer"></i></a>
            <a href="https://www.instagram.com" target="_blank"><i className="bi bi-instagram pointer"></i></a>
            <a href="https://www.twitter.com" target="_blank"><i className="bi bi-twitter pointer"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
