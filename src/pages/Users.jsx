import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";

function Users({user}) {
  if (!user) {
    return (
      <div className="container py-5 text-center mt-5">
        <div className="card shadow-sm p-5 border-0 bg-light">
           <i className="bi bi-lock-fill text-primary mb-3" style={{ fontSize: "3rem" }}></i>
           <h3 className="fw-bold">Access Denied</h3>
           <p className="text-muted">Please log in to view the Users Directory.</p>
           <Link to="/login" className="btn btn-primary px-4">Go to Login</Link>
        </div>
      </div>
    );
  }
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [role, setRole] = useState("");
  const searchRef = useRef();
  const limit = 16;

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    window.scrollTo(0, 0);
  }, [skip, role]);

  async function getUsers() {
    try {
      setLoading(true);
      const searched = searchRef.current ? searchRef.current.value.trim() : "";
      let baseUrl;
      if (searched) {
        baseUrl = `https://dummyjson.com/users/search?q=${searched}&limit=${limit}&skip=${skip}`;
      } else if(role) {
        baseUrl = `https://dummyjson.com/users/filter?key=role&value=${role}&limit=${limit}&skip=${skip}`;
      }
      else {
        baseUrl = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      }
      const res = await axios.get(`${baseUrl}`);
      setUsers(res.data.users);
      setTotalUsers(res.data.total);
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error.message);
      setUsers([]);
      setLoading(false);
    }
  }

  function handleSearch() {
    setSkip(0);
    getUsers();
  }

  function handleRole(role) {
    setRole(role);
    setSkip(0);
  }
  return (
    <>
      <div className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <h2 className="fw-bold m-0" style={{ color: "#1d1d42" }}>
            Users Directory
          </h2>
          <div className="d-flex align-items-center gap-2">
            <div className="btn-group">
              <button
                className="btn btn-outline-primary dropdown-toggle text-capitalize"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-badge me-2"></i>
                {role === "all" ? "Role" : role}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => handleRole("")}>
                    All Roles
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleRole("admin")}>
                    Admin
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleRole("moderator")}>
                    Moderator
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleRole("user")}>
                    User
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="input-group shadow-sm">
              <input
                name="searchQuery"
                type="text"
                className="form-control"
                placeholder="Search by name..."
                ref={searchRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button className="btn btn-primary" type="submit" onClick={handleSearch} style={{ cursor: "pointer" }}>
                <i className="bi bi-search"></i> {/* Bootstrap Icon */}
                Search
              </button>
            </div>
          </div>
        </div>

        <hr className="mb-5" />

        {/* The Grid - Exactly like your Products Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {/* Your users.map() goes here */}
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
          ) : users.length === 0 ? (
            <div className="col-1 w-100">
              <div className="text-center mt-5">
                <h3>No users found for "{searchRef.current?.value}"</h3>
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
            </div>
          ) : (
            users.map((user) => (
                <div className="col-12 col-md-6 col-lg-3 mb-4" key={user.id}>
                  <div className="card h-100 shadow-sm border-0">
                    <div className="text-center p-4">
                      <img
                        src={user.image}
                        className="rounded-circle border border-3 border-light shadow-sm"
                        alt="user image"
                        style={{ width: "100px", height: "100px", backgroundColor: "#f8f9fa" }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold">
                        {user.firstName} {user.lastName}
                      </h5>
                      <p className="text-muted small">@{user.username}</p>

                      {/* Using standard Bootstrap Badge class */}
                      <span className="badge rounded-pill bg-primary mb-3">{(user.role ?? "user").toUpperCase()}</span>

                      <div className="border-top pt-3">
                        <p className="small mb-1 text-truncate">{user.email}</p>
                        <button
                          className="btn btn-primary btn-sm w-100 mt-2"
                          onClick={() => navigate(`/users/${user.id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
          {/* End Map */}
        </div>

        <Pagination skip={skip} setSkip={setSkip} limit={limit} totalItems={totalUsers}/>
      </div>
    </>
  );
}

export default Users;
