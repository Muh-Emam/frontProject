import axios from "axios";
import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const passRef = useRef();
  const emailRef = useRef();

  //
  const [validated, setValidated] = useState(false);

  async function addUser(user) {
    try {
      let res = await axios.post("https://dummyjson.com/users/add", user); 
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    setValidated(true);

    // NOTE: (Mock)
    const user = {
      firstName: firstnameRef.current.value,
      lastName: lastnameRef.current.value,
      password: passRef.current.value,
      email: emailRef.current.value,
    };

    addUser(user);
    event.target.reset();
    setValidated(false);
  };

  return (
    <>
      <Container className="border my-5">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="py-5 px-4"
        >
          <h1 className="text-center mb-4">Register</h1>

          <Form.Label className="fw-bold">Name</Form.Label>
          <Row className="mb-3">
            {/* First Name Column */}
            <Col md="6" xs="6" className="mb-2 mb-md-0">
              <Form.Control
                name="firstName"
                required
                type="text"
                placeholder="First name"
                className="bg-light"
                ref={firstnameRef}
              />
            </Col>

            {/* Surname Column */}
            <Col md="6" xs="6">
              <Form.Control
                name="lastname"
                required
                type="text"
                placeholder="Last name"
                className="bg-light"
                ref={lastnameRef}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="password">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                className="bg-light"
                ref={passRef}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="email">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Email"
                className="bg-light"
                ref={emailRef}
              />
            </Form.Group>
          </Row>

          <Button type="submit" className="w-100 fs-5 fw-bolder py-2 mb-3">
            Sign Up
          </Button>
        </Form>

        <div className="d-flex justify-content-center align-items-center pb-4 px-5">
          <span className="me-1" style={{ color: "#8A8FB9", fontSize: "14px" }}>
            Have an account?
          </span>
          <Link
            to="/login"
            style={{
              color: "#FB2E86",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Login
          </Link>
        </div>
      </Container>
    </>
  );
}

export default Register;
