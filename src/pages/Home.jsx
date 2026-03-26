import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only 4 products for the "Featured" section
    axios
      .get("https://dummyjson.com/products?limit=4")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="bg-light">
        {/* HERO SECTION */}
        <section className="py-5" style={{ backgroundColor: "#F2F0FF", position: "relative" }}>
          <div className="container">
            <div className="row align-items-center">
              {/* Left Column: Text Content */}
              <div className="col-md-12 text-start">
                <p className="fw-bold mb-2" style={{ color: "#FB2E86" }}>
                  Best Furniture For Your Castle...
                </p>
                <h1 className="display-3 fw-bold mb-3" style={{ color: "#000000" }}>
                  New Furniture Collection Trends in 2026
                </h1>
                <p className="text-muted mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in
                  justo.
                </p>
                <Link
                  to="/products"
                  className="btn btn-primary btn-lg text-white px-5 rounded-1 shadow-sm d-inline-flex align-items-center justify-content-center"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED SECTION */}
        <div className="container py-5">
          <h2 className="text-center mb-5 fw-bold" style={{ color: "#151875" }}>
            Featured Products
          </h2>
          <div className="row g-4">
            {loading ? (
              <div className="text-center w-100 py-5">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : (
              products.map((product) => (
                <div className="col-lg-3 col-md-6" key={product.id}>
                  <div className="card border-0 shadow-sm h-100 text-center product-card">
                    {/* Image from API */}
                    <div
                      className="bg-light p-4 d-flex align-items-center justify-content-center"
                      style={{ height: "250px" }}
                    >
                      <img
                        src={product.thumbnail}
                        className="img-fluid"
                        alt={product.title}
                        style={{ maxHeight: "100%" }}
                      />
                    </div>

                    {/* Data from API */}
                    <div className="card-body p-3">
                      <h6 className="fw-bold mb-1" style={{ color: "#FB2E86" }}>
                        {product.title}
                      </h6>
                      <div className="d-flex justify-content-center gap-1 mb-2">
                        <span
                          className="rounded-pill"
                          style={{ width: "12px", height: "4px", backgroundColor: "#05E6B7" }}
                        ></span>
                        <span
                          className="rounded-pill"
                          style={{ width: "12px", height: "4px", backgroundColor: "#F701A8" }}
                        ></span>
                        <span
                          className="rounded-pill"
                          style={{ width: "12px", height: "4px", backgroundColor: "#00009D" }}
                        ></span>
                      </div>
                      <p className="small text-muted mb-1">Code - {product.id}Y52</p>
                      <p className="fw-bold text-dark">${product.price}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
