import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";

const UserInfo = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  let getdata = async () => {
    setLoading(true);
    let data = await axios.get(`/users/${id}`);
    console.log(data);
    setData(data.data);
    setLoading(false);
  };
  useEffect(() => {
    getdata();
  });
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
          User Info
        </h2>
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
      <Footer />
    </div>
  );
};

export default UserInfo;
