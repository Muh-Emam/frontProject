import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  // make the refs to acccess the input data
  const userNameRef = useRef();
  const passRef = useRef();
  // make the users for thw dummyjson
  const [users, setUsers] = useState([]);
  // make the validity for validation
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

  async function getUsers() {
    try {
      const users = await axios.get("https://dummyjson.com/users");
      setUsers(users.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    let timer;
    if (showModal && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setShowModal(false);
    }
    return () => clearTimeout(timer);
  }, [showModal, countdown]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Get the inputs
    const username = userNameRef.current.value;
    const password = passRef.current.value;
    let User = users.find((user) => {
      return user.password === password && (user.username === username || user.email === username);
    });

    if (!!User) {
      setValidated(true);
      saveLocal(User);
      onLoginSuccess(User);
      navigate("/");
    } else {
      setShowModal(true);

      setCountdown(5);
    }
  };

  function saveLocal(user) {
    const {
      id,
      username,
      firstName,
      lastName,
      email,
      role,
      bank: { iban },
    } = user;
    let userObject = {
      id: id,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      token: iban,
    };
    localStorage.setItem("user", JSON.stringify(userObject));
  }
  return (
    <>
      <Container className="border my-5">
        <Form noValidate validated={validated} className="py-5 px-4" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Login</h1>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="username" className="py-2">
              <Form.Label>Email/Username</Form.Label>
              <Form.Control
                ref={userNameRef}
                name="username"
                required
                type="text"
                placeholder="Email/Username"
                className="bg-light"
              />
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="" className="py-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passRef}
                name="password"
                required
                type="password"
                placeholder="Password"
                className="bg-light"
              />
            </Form.Group>
          </Row>
          <Button type="submit" className="w-100 fs-5 fw-bolder py-2">
            Login
          </Button>
        </Form>
        <div className="d-flex justify-content-center align-items-center pb-3 pt-1 px-5">
          <button
            type="button"
            className="btn btn-link p-0 me-4"
            style={{
              color: "#8A8FB9",
              textDecoration: "none",
              fontSize: "14px",
            }}
            onClick={() => alert("Oops, We are working on this feature")}
          >
            Forgot password?
          </button>

          <span className="me-1" style={{ color: "#8A8FB9", fontSize: "14px" }}>
            New?
          </span>

          <Link
            to="/register"
            style={{
              color: "#FB2E86",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Register
          </Link>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title className="text-center w-100 fs-bolder">Login Failed</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center py-4">
            <h4>User not found!</h4>
            <p>Please check the data you entered and try again.</p>
            <div className="text-muted mt-2">Closing in {countdown} seconds...</div>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
export default Login;
