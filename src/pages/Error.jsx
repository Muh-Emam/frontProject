import { Link } from "react-router-dom"

function Error() {
    return(
    <>
    <div className="container vh-100 d-flex align-items-center justify-content-center text-center">
      <div className="p-5 shadow-lg rounded-4 bg-white border border-light" style={{ maxWidth: "500px" }}>
        {/* Big Error Number */}
        <h1 className="display-1 fw-bold mb-0" style={{ color: "#f52d7b" }}>404</h1>
        
        {/* Icon (Uses Bootstrap Icons) */}
        <div className="mb-4">
          <i className="bi bi-exclamation-octagon text-muted" style={{ fontSize: "3rem" }}></i>
        </div>

        <h2 className="fw-bold mb-3" style={{ color: "#1d1d42" }}>Page Not Found</h2>
        
        <p className="text-muted mb-4">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/" className="btn btn-primary px-4 py-2 rounded-pill">
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-outline-secondary px-4 py-2 rounded-pill"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
    </>
    )
}
export default Error