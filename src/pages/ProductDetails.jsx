import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getProduct();
  }, []);

  if (!item)
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center">
          {/* The Purple Spinner */}
          <div className="spinner-border" role="status" style={{ color: "#7E33E0", width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fw-bold" style={{ color: "#7E33E0" }}>
            Loading Details...
          </p>
        </div>
      </div>
    );

  async function getProduct() {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setItem(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-sm border-0 p-4" style={{ backgroundColor: "#F9F9FD", borderRadius: "15px" }}>
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <div
                className="bg-white p-4 rounded shadow-sm d-flex align-items-center justify-content-center"
                style={{ minHeight: "450px" }}
              >
                <img
                  src={item.thumbnail}
                  className="img-fluid rounded"
                  alt={item.title}
                  style={{ maxHeight: "400px", width: "auto", objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="col-md-6 ps-md-5 mt-4 mt-md-0">
              <h2 className="fw-bold mb-2" style={{ color: "#151875", fontSize: "2.5rem" }}>
                {item.title}
              </h2>

              {/* Price Section */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="fs-3 fw-bold" style={{ color: "#151875" }}>
                  ${item.price}
                </span>
                <span className="text-decoration-line-through fs-5" style={{ color: "#FB2E86" }}>
                  ${(item.price * 1.2).toFixed(2)}
                </span>
              </div>

              <p className="fw-bold mb-1" style={{ color: "#151875" }}>
                Description
              </p>
              <p className="text-muted mb-4" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                {item.description}
              </p>

              <div className="d-flex align-items-center gap-3 mb-5">
                <button
                  className="btn px-5 py-3 fw-bold text-white shadow-sm"
                  style={{ backgroundColor: "#7E33E0", borderRadius: "8px", border: "none" }}
                  onClick={() => dispatch(addToCart(item.id))}
                >
                  Add To Cart
                </button>
              </div>

              <div className="pt-4 border-top">
                <p className="mb-2">
                  <span className="fw-bold" style={{ color: "#151875" }}>
                    Category:
                  </span>{" "}
                  {item.category}
                </p>
                <p className="mb-2">
                  <span className="fw-bold" style={{ color: "#151875" }}>
                    Brand:
                  </span>{" "}
                  {item.brand}
                </p>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <span className="fw-bold" style={{ color: "#151875" }}>
                    Share:
                  </span>

                  <a href="https://www.facebook.com" target="_blank" style={{fontSize: "20px"}}>
                    <i className="bi bi-facebook pointer"></i>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" style={{fontSize: "20px"}}>
                    <i className="bi bi-instagram pointer"></i>
                  </a>
                  <a href="https://www.twitter.com" target="_blank" style={{fontSize: "20px"}}>
                    <i className="bi bi-twitter pointer"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
