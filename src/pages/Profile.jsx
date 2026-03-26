import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ user, setUser }) {
  const [wholeUser, setWholeUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      getWholeUer();
    }
  }, [user]);
  if (!wholeUser){
    if (!user) {
      return (
        <div className="container mt-5 text-center">
          <h3>Please log in to view your profile.</h3>
        </div>
      );
    }
  
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center">
          {/* The Purple Spinner */}
          <div className="spinner-border" role="status" style={{ color: "#7E33E0", width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fw-bold" style={{ color: "#7E33E0" }}>
            Fetching Profile...
          </p>
        </div>
      </div>
    );
  }
  async function getWholeUer() {
    const res = await axios.get(`https://dummyjson.com/users/${user.id}`);
    setWholeUser(res.data);
  }

  function handleLog() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/")
  }

  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card" style={{ maxWidth: "800px", borderRadius: "15px", overflow: "hidden" }}>
          {/* Hero Header */}
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
              {wholeUser.firstName.charAt(0)}
            </div>
          </div>

          {/* Body Div */}
          <div className="card-body text-center pto-0">
            <h2 className="mt-3 fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>
              {wholeUser.firstName} {wholeUser.lastName}
            </h2>
            <span className="badge rounded-pill px-3 py-2 text-uppercase" style={{ background: "#7E33E0" }}>
              {wholeUser.role}
            </span>
            <hr className="my-4 text-muted" />
            {/* Info grid */}

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
                  <span>{wholeUser.username}</span>
                </div>
              </div>
              <div className="col-6 mb-4">
                <label className="text-muted small fw-bold d-block text-uppercase">Email</label>
                <div className="d-flex align-items-center mt-1">
                  <i className="bi bi-envelope-fill me-2 text-muted"></i>
                  <span className="text-truncate">{wholeUser.email}</span>
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
                  <span>{wholeUser.company.department}</span>
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
                  <span>{wholeUser.role === "admin" ? "Administrator (Conformed)" : "Standard Member"}</span>
                </div>
              </div>
              <div className="col-6 mb-4">
                <label className="text-muted small fw-bold d-block text-uppercase">Session Status</label>
                <div className="d-flex align-items-center mt-1 text-success">
                  <i className="bi bi-clock-history me-2" style={{ fontSize: "18px" }}></i>
                  <span className="fw-semibold">Active (Token Verified)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2 mt-2 px-3 pb-3">
                <button className="btn btn-secondary w-100 text-white">Edit Profile</button>
                <button className="btn btn-outline-secondary w-100" onClick={handleLog}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
