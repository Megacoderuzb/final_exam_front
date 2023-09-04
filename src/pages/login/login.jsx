import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <Container
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // margin: "auto 0 auto 0",
      }}
    >
      <h1>Login</h1>
      <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Form.Group style={{ width: "100%" }} controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ width: "100%" }} controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={{ width: "100%" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          style={{
            width: "50%",
            marginTop: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
