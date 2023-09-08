import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const EditUser = () => {
  const [data, setData] = useState({});
  const [send, setSend] = useState({
    first_name: data.data?.first_name,
    last_name: data.data?.last_name,
    username: data.data?.username,
    age: data.data?.age,
  });
  let { id } = useParams();
  let navigate = useNavigate();
  let getdata = async () => {
    let data = await axios.get(`/users/${id}`);
    console.log(data);
    setData(data.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log(data.data);
      let res = await axios.patch(
        `/users/${id}`,
        // headers,
        send
        // {
        //   first_name: data.data.first_name,
        //   last_name: data.data.last_name,
        //   username: data.data.username,
        //   age: data.data.age,
        // }
      );
      // console.log(res);
      // let res = await axios.post("/users/login", values);

      if (res.status === 200) {
        toast("Login successfully", { type: "success" });
        setData({}); // Clear input values
        navigate(`/users/${id}`);
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

  return (
    <div>
      <Sidebar />
      <Container style={{ maxWidth: "820px", padding: "3rem" }}>
        <h2
          style={{
            marginBottom: "35px",
          }}
        >
          Edit User
        </h2>
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Form.Group style={{ width: "100%" }} controlId="formName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="first_name"
              //   placeholder="first name"
              name="first_name"
              defaultValue={data.data?.first_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group style={{ width: "100%" }} controlId="formlastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="last_name"
              //   placeholder="last name"
              name="last_name"
              defaultValue={data.data?.last_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group style={{ width: "100%" }} controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="text"
              placeholder="username"
              name="username"
              defaultValue={data.data?.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group style={{ width: "100%" }} controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="number"
              //   placeholder="Enter Age"
              name="age"
              defaultValue={data.data?.age}
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

export default EditUser;
