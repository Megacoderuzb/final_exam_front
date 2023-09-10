import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const CreateGuide = () => {
  const [send, setSend] = useState({
    title: "",
    content: "",
    notify: false,
  });
  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let res = await axios.post(`/guides`, send);

      if (res.status === 200) {
        toast("Created successfully", { type: "success" });
        navigate(`/guide`);
      }
    } catch (error) {
      if (error.message === "Network Error") {
        toast("Problem with Internet", { type: "warning" });
      } else {
        toast("The information you entered is incorrect", { type: "error" });
      }

      console.log(error);
    }
  }

  function handleChange(e) {
    setSend((oldValues) => {
      return {
        ...oldValues,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleNotify(e) {
    setSend((oldValues) => {
      return {
        ...oldValues,
        [e.target.name]: !send[e.target.name],
      };
    });
  }
  console.log(send);

  return (
    <div>
      <Sidebar />
      <Container style={{ maxWidth: "820px", padding: "3rem" }}>
        <h2
          style={{
            marginBottom: "35px",
          }}
        >
          Create Guide
        </h2>
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Form.Group style={{ width: "100%" }} controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="title"
              //   placeholder="first name"
              name="title"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group style={{ width: "100%" }} controlId="formlastName">
            <Form.Label>Content</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="content"
              //   placeholder="Content"
              name="content"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Notify for all users"
            name="notify"
            onChange={handleNotify}
          />
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
          >
            Send
          </button>
          {/* </Button> */}
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default CreateGuide;
