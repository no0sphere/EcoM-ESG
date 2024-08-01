import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignUp = () => {
  //const mock = new MockAdapter(axios);

  // mock.onPost("/api/auth/login").reply(409, {
  //   status: "error",
  //   message: "Username or email already exists.",
  // });
  // mock.onPost("/api/auth/register").reply(200, {
  //   code: "200",
  //   status: 200,
  //   message: "Success",
  //   timestamp: 1721675472929,
  //   data: null,
  //   error: null,
  // });
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("post userData", userData);
      const response = await axios.post(
        "http://localhost:9090/user/register",
        userData
      );
      console.log("response", response);
      if (response.status === 200) {
        localStorage.setItem("username", userData.username);
        console.log("register success");
        localStorage.setItem("token", response.data.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log("error", error.response);
        setError("Username or email already exists.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="shadow-lg">
        <Card.Body className="p-5">
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          <div className="text-center mt-3">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
