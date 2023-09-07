import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          height: "50px",
          width: "100vw",
          zIndex: "10",
          backgroundColor: "rgb(48,142,254)",
          paddingTop: "10px",
        }}
      >
        <Row>
          <Col className="text-center align-middle">
            <p className="align-middle">
              © 2023 Muhammadjon Abduvahobov. All rights reserved.
            </p>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
