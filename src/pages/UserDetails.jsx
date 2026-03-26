import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetails() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getUser()
  }, [])

  if (!user)
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

  async function getUser() {
    try {
      const res = await axios.get(`https://dummyjson.com/users/${id}`);
      setUser(res.data)
    } catch (error) {
        console.error(error.message)
    }
  }

  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card" style={{ maxWidth: "800px", borderRadius: "15px", overflow: "hidden" }}>

          <div
            className="text-center py-4"
            style={{
              background: "linear-gradient(135deg, #7E33E0 0%, #a267f5 100%)",
              position: "relative",
            }}
          >
            <div
              className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{
                width: "100px",
                height: "100px",
                fontSize: "40px",
                color: "#7E33E0",
                fontWeight: "bold",
              }}
            >
              {user.firstName.charAt(0)}
            </div>
          </div>


          <div className="card-body text-center pto-0">
            <h2 className="mt-3 fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>
              {user.firstName} {user.lastName}
            </h2>
            <span className="badge rounded-pill px-3 py-2 text-uppercase" style={{ background: "#7E33E0" }}>
              {user.role}
            </span>
            <hr className="my-4 text-muted" />

            <div className="row text-start px-3">
              <div
                className="col-12 text-muted small fw-bold text-uppercase mb-3"
                style={{ fontSize: "20px", letterSpacing: "0.5px" }}
              >
                Account Information
              </div>
              <div className="col-6 mb-3">
                <label className="text-muted small fw-bold d-block text-uppercase">Username</label>
                <div className="d-flex align-items-center mt-1">
                  <i className="bi bi-person-fill me-2 text-muted"></i>
                  <span>{user.username}</span>
                </div>
              </div>
              <div className="col-6 mb-4">
                <label className="text-muted small fw-bold d-block text-uppercase">Email</label>
                <div className="d-flex align-items-center mt-1">
                  <i className="bi bi-envelope-fill me-2 text-muted"></i>
                  <span className="text-truncate">{user.email}</span>
                </div>
              </div>
              <div
                className="col-12 text-muted small fw-bold text-uppercase mb-3"
                style={{ fontSize: "20px", letterSpacing: "0.5px" }}
              >
                CONTACT & ROLE
              </div>
              <div className="col-6 mb-4">
                <label className="text-muted small fw-bold d-block text-uppercase">Department</label>
                <div className="d-flex align-items-center mt-1">
                  <i className="bi bi-building text-muted me-2" style={{ fontSize: "18px" }}></i>
                  <span>{user.company.department}</span>
                </div>
              </div>
              <div className="col-6 mb-4">
                <label className="text-muted small fw-bold d-block text-uppercase">Location</label>
                <div className="d-flex align-items-center mt-1">
                  <i className="bi bi-geo-alt-fill me-2 text-muted"></i>
                  <span>London, UK</span>
                </div>
              </div>
              <div
                className="col-12 text-muted small fw-bold text-uppercase mb-3"
                style={{ fontSize: "20px", letterSpacing: "0.5px" }}
              >
                Security & Session
              </div>
              <div className="col-6 mb-4">
                <label className="text-muted small fw-bold d-block text-uppercase">Role</label>
                <div className="d-flex align-items-center mt-1">
                  <i className="bi bi-shield-check text-muted me-2" style={{ fontSize: "18px" }}></i>
                  <span>{user.role === "admin" ? "Administrator (Conformed)" : "Standard Member"}</span>
                </div>
              </div>
              <div className="col-6 mb-4">
                <label className="text-muted small fw-bold d-block text-uppercase">Session Status</label>
                <div className="d-flex align-items-center mt-1 text-success">
                  <i className="bi bi-clock-history me-2" style={{ fontSize: "18px" }}></i>
                  <span className="fw-semibold">Active (Token Verified)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
