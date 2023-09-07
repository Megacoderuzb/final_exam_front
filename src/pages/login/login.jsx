import { useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) navigate("/");
  }, []);

  // let headers = { "Access-Control-Allow-Origin": "*" };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSubmitting(true); // Set isSubmitting to true when submitting the form

      let res = await axios.post(
        "/users/login",
        // headers,
        values
      );
      // console.log(res);
      // let res = await axios.post("/users/login", values);

      if (res.status === 200) {
        toast("Login successfully", { type: "success" });
        setValues({ username: "", password: "" }); // Clear input values
        localStorage.setItem("token", res.data.data.token); // Save token to localStorage
        navigate("/");
      }
    } catch (error) {
      if (error.message === "Network Error") {
        toast("Problem with Internet", { type: "warning" });
      } else {
        toast("The information you entered is incorrect", { type: "error" });
      }

      console.log(error);
    } finally {
      setIsSubmitting(false); // Reset isSubmitting to false after request completes
    }
  }

  function handleChange(e) {
    setValues((oldValues) => {
      return {
        ...oldValues,
        [e.target.name]: e.target.value,
      };
    });
  }

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your login logic here
  // };

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
            placeholder="Enter username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group style={{ width: "100%" }} controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={{ width: "100%" }}
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </Form.Group>

        {/* <Button

        > */}
        <button
          style={{
            width: "50%",
            marginTop: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "rgb(48,142,254)",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#fff",
          }}
          // variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          Send
        </button>
        {/* </Button> */}
      </Form>
    </Container>
  );
};

export default Login;
