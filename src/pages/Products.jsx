import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import Pagination from "../Components/Pagination";

function Products() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const navigate = useNavigate();
  const searchRef = useRef();
  const dispatch = useDispatch();
  const limit = 15;

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, [skip, category, sortBy, order]);

  async function getProducts() {
    try {
      setLoading(true);
      const searched = searchRef.current ? searchRef.current.value.trim() : "";
      let baseUrl;
      if (searched) {
        baseUrl = `https://dummyjson.com/products/search?q=${searched}&limit=${limit}&skip=${skip}`;
      } else if (category) {
        baseUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else {
        baseUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }
      if (sortBy) {
        baseUrl += `&sortBy=${sortBy}&order=${order}`;
      }
      const res = await axios.get(`${baseUrl}`);
      setProducts(res.data.products);
      setTotalProducts(res.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleCategoryChange(category) {
    setCategory(category);
    setSkip(0);
  }

  function handleSearch() {
    setCategory("");
    setSkip(0);
    getProducts();
  }

  return (
    <>
      <div className="container">
        <div className="row align-items-center mt-5 g-3">
          {/* LEFT SIDE: Title */}
          <div className="col-12 col-lg-4">
            <h4 className="fw-bold" style={{ color: "#2F2E41" }}>
              Ecommerce Accessories & Fashion items
            </h4>
          </div>

          {/* RIGHT SIDE: Unified Search & Filter Group */}
          <div className="col-12 col-lg-8">
            <div className="row g-2 justify-content-center justify-content-lg-end">
              {/* Sort & Order Group */}
              <div className="col-auto d-flex gap-2">
                <div className="btn-group">
                  <button
                    className="btn btn-outline-primary btn-pink-outline btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    {sortBy ? sortBy.charAt(0).toUpperCase() + sortBy.slice(1) : "Sort By"}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={() => setSortBy("price")}>
                        Price
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => setSortBy("rating")}>
                        Rating
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => setSortBy("title")}>
                        Title (A-Z)
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={() => setSortBy("")}>
                        Default
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="btn-group">
                  <button
                    className="btn btn-outline-primary btn-pink-outline btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    disabled={!sortBy}
                    style={{ borderColor: "#fb2e86", color: "#fb2e86" }}
                  >
                    {order === "asc" ? <i className="bi bi-sort-up"></i> : <i className="bi bi-sort-down"></i>}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={() => setOrder("asc")}>
                        Low to High
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => setOrder("desc")}>
                        High to Low
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Search & Filter Group */}
              <div className="col-12 col-sm-auto">
                <div className="input-group input-group-sm mx-auto" style={{ maxWidth: "400px" }}>
                  <span
                    className="input-group-text bg-white border-end-0"
                    onClick={handleSearch}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search..."
                    ref={searchRef}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ backgroundColor: "#fb2e86", color: "#fff", borderColor: "#fb2e86" }}
                  >
                    {category ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ") : "Filter"}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={() => handleCategoryChange("home-decoration")}>
                        Home Decoration
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleCategoryChange("beauty")}>
                        Beauty
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleCategoryChange("furniture")}>
                        Furniture
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleCategoryChange("groceries")}>
                        Groceries
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={() => handleCategoryChange("")}>
                        Clear
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-4" />
        {/* Products GRID */}
        <div className="row g-3 mt-2">
          {loading ? (
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
              <div className="text-center">
                {/* The Purple Spinner */}
                <div
                  className="spinner-border"
                  role="status"
                  style={{ color: "#fb2e86", width: "3rem", height: "3rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 fw-bold" style={{ color: "#fb2e86" }}>
                  Fetching Products...
                </p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center mt-5">
              <h3>No products found for "{searchRef.current?.value}"</h3>
              <button
                className="btn btn-primary"
                onClick={() => {
                  searchRef.current.value = "";
                  handleSearch();
                }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            products.map((item) => (
              <div className="col-12 col-sm-6 col-lg-4 mb-4" key={item.id}>
                <div
                  className="card h-100 shadow-sm border-0 product-card"
                  style={{ cursor: "pointer", transition: "0.3s" }}
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <img
                    src={item.thumbnail}
                    className="card-img-top img-fluid"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">{item.description.substring(0, 50)}...</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold fs-5 text-success">${item.price}</span>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(addToCart(item))
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <Pagination skip={skip} setSkip={setSkip} limit={limit} totalItems={totalProducts} loading={loading}/>
      </div>
    </>
  );
}

export default Products;
