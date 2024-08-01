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
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  //const mock = new MockAdapter(axios);

  // mock.onPost("/user/login").reply(401, {
  //   status: "error",
  //   message: "Authentication failed. Username or password is incorrect.",
  // });
  // mock.onPost("/user/login").reply(200, {
  //   code: "200",
  //   status: 200,
  //   message: "Success",
  //   timestamp: 1721675472929,
  //   data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsidXNlcmlkIjpudWxsLCJ1c2VybmFtZSI6InRlc3R1c2VyMTgifSwiZXhwIjoxNzIxNzE4NjcyfQ.iil9h5Htzd9QrC4ciq3sXX-UiuWZaOszyUxCogRwi-Q",
  //   error: null,
  // });

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("userData", userData);
      const response = await axios.post(
        "http://localhost:9090/user/login",
        userData
      );
      if (response.status === 200) {
        console.log("token", response.data.data);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("token", response.data.data);
        console.log("login success");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("error", error.response);
        setError("Authentication failed. Username or password is incorrect.");
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
          <h2 className="text-center mb-4">Login</h2>
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
              Login
            </Button>
          </Form>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          <div className="text-center mt-3">
            <Link to="/signup">Don't have an account? Sign up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
