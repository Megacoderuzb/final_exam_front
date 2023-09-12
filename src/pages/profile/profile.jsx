import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  let getdata = async () => {
    setLoading(true);
    try {
      let data = await axios.get("/users/me");
      // console.log(data);
      setData(data.data);
      // console.log(data.data.data.role === "admin", data.data.data.role);
      if (data.data.data.role === "admin") {
        localStorage.setItem("role", data.data.data.role);
      }
      if (data.data.data.role === "employee") {
        localStorage.removeItem("role");
      }
    } catch (error) {
      toast(error.data, { type: "error" });
    }
    setLoading(false);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
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
      <Container style={{ maxWidth: "820px", padding: "3rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <h2
            style={{
              marginBottom: "35px",
            }}
          >
            My Profile
          </h2>
          <div
            onClick={() => {
              navigate("/users/me");
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: "1rem",
              backgroundColor: "rgb(48,142,254)",
              color: "#fff",
              fontWeight: "bold",
              border: "1px solid blue",
              padding: "5px 10px",
              height: "40px",
            }}
          >
            <p>Edit Profile</p>
            <i className="bx bxs-cog " style={{ fontSize: "26px" }}></i>
          </div>
        </div>
        <Row>
          <Col md={12}>
            <h2>
              {data.data?.first_name} {data.data?.last_name}
            </h2>
            <p>{data.data?.username}</p>
          </Col>

          <Col md={3}>
            <h5>Age:</h5>
            <p>{data.data?.age}</p>
          </Col>

          <Col md={3}>
            <h5>Role:</h5>
            <p>{data.data?.role}</p>
          </Col>

          <Col md={3}>
            <h5>Guides:</h5>
            <p>Total guides {data.data?.total_guides}</p>
            <p>Read guides {data.data?.read_guides}</p>
            <p>Todo guides {data.data?.todo_guides}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
