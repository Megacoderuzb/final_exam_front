import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const ProfilePage = () => {
  const [data, setData] = useState({});
  let getdata = async () => {
    let data = await axios.get("/users/me");
    console.log(data);
    setData(data.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <Container style={{ maxWidth: "820px", padding: "3rem" }}>
      <h2
        style={{
          marginBottom: "35px",
        }}
      >
        My Profile
      </h2>
      <Row>
        <Col md={12}>
          <h2>
            {data.data?.first_name} {data.data?.last_name}
          </h2>
          <p>{data.data?.name}</p>
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
          <p>{data.data?.guides.length}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
