import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const EditGuide = () => {
  const [data, setData] = useState({});
  const [send, setSend] = useState({
    title: data.data?.title,
    content: data.data?.content,
    notify: false,
  });
  const [loading, setLoading] = useState(false);

  let { id } = useParams();
  let navigate = useNavigate();
  let getdata = async () => {
    setLoading(true);
    let { data } = await axios.get(`/guides/${id}`);
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    getdata();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(data.data);
      let res = await axios.patch(`/guides/${id}`, send);

      if (res.status === 200) {
        toast("Edited successfully", { type: "success" });
        setData({}); // Clear input values
        navigate(`/guide/${id}`);
      }
    } catch (error) {
      if (error.message === "Network Error") {
        toast("Problem with Internet", { type: "warning" });
      } else {
        toast("The information you entered is incorrect", { type: "error" });
      }

      console.log(error);
    }
    setLoading(false);
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
      <div
        hidden={!loading}
        style={{
          width: "100%",
          height: "100vh",
          zIndex: "1",
          backgroundColor: "rgba(134, 105, 105, 0.2)",
          position: "fixed",
          top: "0",
          left: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
      <Sidebar />
      <Container style={{ maxWidth: "820px", padding: "3rem" }}>
        <h2
          style={{
            marginBottom: "35px",
          }}
        >
          Edit Guide
        </h2>
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Form.Group style={{ width: "100%" }} controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="title"
              //   placeholder="first name"
              name="title"
              defaultValue={data.data?.title}
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
              defaultValue={data.data?.content}
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

export default EditGuide;
