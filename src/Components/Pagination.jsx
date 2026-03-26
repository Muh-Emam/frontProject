const Pagination = ({ skip, limit, totalItems, setSkip }) => {
  // Logic to handle the "Showing X - Y of Z" text
  const start = totalItems === 0 ? 0 : skip + 1;
  const end = Math.min(skip + limit, totalItems);

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 gap-md-5 mt-5 mb-5">
      {/* Previous Button */}
      <button
        className="btn btn-outline-primary btn-pink-outline px-4 shadow-sm"
        disabled={skip === 0}
        onClick={() => setSkip(skip - limit)}
      >
        <i className="bi bi-arrow-left me-2"></i> Previous
      </button>

      {/* Dynamic Status Text */}
      <span className="fw-bold text-muted">
        {totalItems === 0 
          ? "None to Show" 
          : `Showing ${start} - ${end} of ${totalItems}`}
      </span>

      {/* Next Button */}
      <button
        className="btn btn-outline-primary btn-pink-outline px-4 shadow-sm"
        disabled={skip + limit >= totalItems}
        onClick={() => setSkip(skip + limit)}
      >
        Next <i className="bi bi-arrow-right ms-2"></i>
      </button>
    </div>
  );
};

export default Pagination;