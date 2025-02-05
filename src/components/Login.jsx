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
      const response = await axios.post(
        "http://localhost:9090/user/login",
        userData
      );
      if (response.status === 200) {
        localStorage.setItem("username", userData.username);
        localStorage.setItem("token", response.data.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Authentication failed. Username or password is incorrect.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url('../public/esg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Card style={{ width: "400px" }} className="shadow-lg">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4">EcoM ESG</h2>
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
    </div>
  );
};

export default Login;
