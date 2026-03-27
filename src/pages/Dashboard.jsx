import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, [activeTab, skip]);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/${activeTab}?limit=${limit}&skip=${skip}`);
      setData(res.data[activeTab]);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Error: ", error.message);
      setLoading(false);
    }
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setData(data.filter((item) => item.id !== id));
      setTotal(total - 1);
    }
  }
  const handleEditClick = (item) => {
    setEditItem(item); // Load this item into the modal
  };

  function handleSaveEdit(event) {
    event.preventDefault();
    const updatedPrice = event.target.price.value;
    const updatedData = data.map((item) => (item.id === editItem.id ? { ...item, price: updatedPrice } : item));
    setData(updatedData);
    setEditItem(null); // Close modal logic
    alert("Product updated successfully!");
  }

  function handleAddProduct(event) {
    event.preventDefault();
    const newProduct = {
      id: Date.now(),
      title: event.target.title.value,
      price: event.target.price.value,
      thumbnail: "https://picsum.photos/200",
    };
    setData([newProduct, ...data]);
    setTotal(total + 1);
    setSkip(0);
    event.target.reset();
  }

  return (
    <>
      <div className="d-flex flex-column flex-md-row" style={{ minHeight: "100vh" }}>
        {/* SIDEBAR: Full Width in Mobile */}
        <aside className="bg-dark text-white p-3 shadow col-12 col-md-auto">
          <div style={{ width: "250px" }} className="d-none d-md-block">
            <h4 className="fw-bold mb-4 text-secondary text-center">Control Panel</h4>
          </div>
          <div className="nav flex-row flex-md-column nav-pills gap-2 justify-content-center justify-content-md-start overflow-auto pb-2 pb-md-0">
            <button
              className={`nav-link text-white text-start ${activeTab === "products" ? "bg-secondary" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <i className="bi bi-box-seam me-2"></i> Products
            </button>
            <button
              className={`nav-link text-white text-start ${activeTab === "users" ? "bg-secondary" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              <i className="bi bi-people me-2"></i> Users
            </button>
            <button
              className={`nav-link text-white text-start ${activeTab === "carts" ? "bg-secondary" : ""}`}
              onClick={() => setActiveTab("carts")}
            >
              <i className="bi bi-cart3 me-2"></i> Carts
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-grow-1 p-2 p-md-4 bg-light overflow-hidden">
          <div className="container-fluid p-4">
            <div className="card shadow-sm border-0 p-4">
              {/* HEADER  */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
                <h2 className="text-capitalize fw-bold">{activeTab} Management</h2>
                {activeTab === "products" && (
                  <button className="btn btn-success shadow-sm" data-bs-toggle="modal" data-bs-target="#addModal">
                    <i className="bi bi-plus-lg me-1"></i> Add Product
                  </button>
                )}
              </div>

              {/* TABLE */}
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      {activeTab === "products" && (
                        <>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th className="text-center">Actions</th>
                        </>
                      )}
                      {activeTab === "users" && (
                        <>
                          <th>Avatar</th>
                          <th>Full Name</th>
                          <th>Username</th>
                        </>
                      )}
                      {activeTab === "carts" && (
                        <>
                          <th>Cart ID</th>
                          <th>Total Items</th>
                          <th>Total Price</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {!loading ? (
                      data.map((item) => (
                        <tr key={item.id}>
                          {activeTab === "products" && (
                            <>
                              <td>
                                <img src={item.thumbnail} width="50" className="rounded" alt="p" />
                              </td>
                              <td className="fw-semibold">{item.title}</td>
                              <td>${item.price}</td>
                              <td className="text-center">
                                {/* Edit Button - Triggers Modal */}
                                <button
                                  className="btn btn-sm btn-outline-primary me-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editModal"
                                  onClick={() => handleEditClick(item)}
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                                {/* Delete Button */}
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </>
                          )}

                          {/* Users and Carts (Read-Only) */}
                          {activeTab === "users" && (
                            <>
                              <td>
                                <img src={item.image} width="40" className="rounded-circle" alt="u" />
                              </td>
                              <td>
                                {item.firstName} {item.lastName}
                              </td>
                              <td>@{item.username}</td>
                            </>
                          )}

                          {activeTab === "carts" && (
                            <>
                              <td>Cart #{item.id}</td>
                              <td>{item.totalProducts} items</td>
                              <td className="fw-bold text-success">${item.total}</td>
                            </>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-5">
                          <div className="spinner-border" style={{ color: "#fb2e86" }}></div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4">
              <Pagination skip={skip} limit={limit} totalItems={total} setSkip={setSkip} />
            </div>
          </div>
        </main>

        {/* ------------------------- MODALS ------------------------- */}

        {/* EDIT MODAL */}
        <div className="modal fade" id="editModal" tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSaveEdit}>
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Edit {editItem?.title ?? "Product"}</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">New Price ($)</label>
                  <input type="number" name="price" className="form-control" defaultValue={editItem?.price} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* ADD Product Modal */}
        <div className="modal fade" id="addModal" tabIndex="-1">
          <div className="modal-dialog border-0">
            <form className="modal-content shadow-lg" onSubmit={handleAddProduct}>
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">Add New Product</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Product Title</label>
                  <input type="text" name="title" className="form-control" placeholder="e.g. iPhone 15" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Price ($)</label>
                  <input type="number" name="price" className="form-control" placeholder="99.99" required />
                </div>
              </div>

              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-success px-4" data-bs-dismiss="modal">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
