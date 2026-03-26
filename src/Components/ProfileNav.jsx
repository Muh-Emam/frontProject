import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProfileNav({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));

    if (storedData) {
      // Check for existence of token/id specifically
      if (storedData.token) {
        setUser(storedData);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);
  if (!user) {
    return null;
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }

  return (
    <>
      <div
        className="py-1 px-5 text-white d-flex flex-column flex-md-row justify-content-between align-items-center gap-2"
        style={{ backgroundColor: "#7E33E0", fontSize: "14px" }}
      >
        {/* Email Div */}
        <div>
          <i className="bi bi-envelope-at me-2"></i>
          {user.email}
        </div>

        {/* Name Div */}
        <div className="flex-grow-1 text-center fw-bold text-capitalize">
          {user.firstName} {user.lastName}
        </div>

        {/* Logout Div */}
        <div style={{ cursor: "pointer" }} onClick={handleLogout}>
          Logout <i className="bi bi-box-arrow-right ms-1"></i>
        </div>
      </div>
    </>
  );
}

export default ProfileNav;
