import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";

const GuideInfo = () => {
  const [data, setData] = useState({});
  let { id } = useParams();
  let getdata = async () => {
    let data = await axios.get(`/guides/${id}`);
    console.log(data);
    setData(data.data);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <Sidebar />
      <Container style={{ maxWidth: "820px", padding: "3rem" }}>
        <h2
          style={{
            marginBottom: "35px",
          }}
        >
          Guide Info
        </h2>
        <Row>
          <Col md={12}>
            <h3>{data.data?.title}</h3>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            {/* <h5>:</h5> */}
            <p>{data.data?.content}</p>
          </Col>
          {/* 
          <Col md={3}>
            <h5>Role:</h5>
            <p>{data.data?.role}</p>
          </Col>

          <Col md={3}>
            <h5>Guides:</h5>
            <p>{data.data?.guides.length}</p>
          </Col> */}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default GuideInfo;
