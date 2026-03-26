import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, updateCart } from "../features/cart/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15.0; // Flat rate or 0 if you want it free
  const total = subtotal === 0 ? 0 : subtotal + shipping;
  return (
    <>
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="table-responsive d-none d-md-block">
              <table className="table align-middle border-bottom">
                <thead style={{ backgroundColor: "#F6F7FB" }}>
                  <tr>
                    <th className="py-3 ps-3">Product</th>
                    <th className="py-3">Price</th>
                    <th className="py-3 text-center">Quantity</th>
                    <th className="py-3 text-end pe-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 ps-3">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="rounded me-3"
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                          />
                          <div>
                            <h6 className="mb-0 fw-bold">{item.title}</h6>
                            <small className="text-muted">Color: Default</small>
                          </div>
                        </div>
                      </td>
                      <td className="fw-bold">${item.price?.toFixed(2)}</td>
                      <td>
                        <div
                          className="input-group input-group-sm justify-content-center mx-auto"
                          style={{ width: "100px" }}
                        >
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(updateCart({ id: item.id, quantity: item.quantity - 1 }))}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center bg-white"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(updateCart({ id: item.id, quantity: item.quantity + 1 }))}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-end pe-3">
                        <button className="btn btn-sm text-danger" onClick={() => dispatch(removeFromCart(item.id))}>
                          <i className="bi bi-trash-fill fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-md-none">
              {cart.map((item) => (
                <div key={item.id} className="card border-0 border-bottom mb-3 pb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.thumbnail}
                      className="rounded me-3"
                      style={{ width: "70px", height: "70px", objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-bold">{item.title}</h6>
                      <p className="mb-1 text-primary fw-bold">${item.price?.toFixed(2)}</p>
                      <div className="d-flex align-items-center justify-content-between">
                        {/* Quantity Controls for Mobile */}
                        <div className="input-group input-group-sm w-auto">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(updateCart({ id: item.id, quantity: item.quantity - 1 }))}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 bg-light border-top border-bottom">{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(updateCart({ id: item.id, quantity: item.quantity + 1 }))}
                          >
                            +
                          </button>
                        </div>
                        <button className="btn text-danger p-0" onClick={() => dispatch(removeFromCart(item.id))}>
                          <i className="bi bi-trash-fill fs-5"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-4">
              <button className="btn btn-primary text-white px-4">
                Update Cart
              </button>
              <button
                className="btn btn-primary text-white px-4"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div
              className="card border-0 shadow-sm p-4 ms-auto"
              style={{
                backgroundColor: "#F4F4FC",
                borderRadius: "5px",
                maxWidth: "370px", // This gives it that fixed-width look
                width: "100%",
              }}
            >
              <h5 className="text-center fw-bold mb-4" style={{ color: "#1D3178" }}>
                Cart Totals
              </h5>

              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <span className="fw-semibold" style={{ color: "#1D3178" }}>
                  Subtotals:
                </span>
                <span style={{ color: "#151875" }}>${subtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-4 pb-2 border-bottom">
                <span className="fw-semibold" style={{ color: "#1D3178" }}>
                  Totals:
                </span>
                <span className="fw-bold" style={{ color: "#151875" }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="mb-4 d-flex align-items-center">
                {/* Custom Green Checkbox look */}
                <i className="bi bi-check-circle-fill me-2" style={{ color: "#19D16F", fontSize: "12px" }}></i>
                <label className="small text-muted" style={{ fontSize: "12px" }}>
                  Shipping & taxes calculated at checkout
                </label>
              </div>

              <button
                className="btn w-100 text-white fw-bold py-2 mt-2"
                style={{ backgroundColor: "#19D16F", borderRadius: "3px", fontSize: "14px" }}
                onClick={() => alert("Proceeding to Checkout...")}
                disabled={cart.length === 0}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
