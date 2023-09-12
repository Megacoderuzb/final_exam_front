import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Pagination,
  Table,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const GuideInfo = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  let getdata = async () => {
    let data = await axios.get(`/guides/${id}`);
    console.log(data);
    setData(data.data);
  };
  let getUsers = async () => {
    setLoading(true);
    let url = query
      ? `/users?q=${query}&page[offset]=${offset}&page[limit]=${limit}`
      : `/users?page[offset]=${offset}&page[limit]=${limit}`;

    if (filter != "") {
      console.log(url);
      console.log(url + `&filters[role]=${filter}`);
      let { data } = await axios.get(url + `&filters[role]=${filter}`);

      console.log(data?.pageInfo?.total, "total");
      setTotal(data?.pageInfo?.total);
      console.log(data, "in use");
      setUsers(data.data);
      setLoading(false);
      return;
      // }
    }

    let { data } = await axios.get(url);
    console.log(data?.pageInfo?.total, "total");
    setTotal(data?.pageInfo?.total);
    console.log(data.data, "in use");
    setUsers(data?.data);
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, [query, limit, offset]);
  useEffect(() => {
    getdata();
  }, []);
  console.log(users, "users");
  const sendGuide = () => {
    setLoading(true);
    axios
      .post("user-guides/bulk", {
        user_ids: selectedUser,
        guide_id: id,
      })
      .then((response) => {
        console.log("Message sent!", response.data);
        setShowModal(false);
        toast("Successfully sended to users", { type: "success" });
      })
      .catch((error) => {
        console.error(error);
        toast("Error while sending to users", { type: "error" });
      });
    setLoading(false);
  };
  async function hendleSelect(id) {
    setSelectedUser([...selectedUser, id]);
  }
  // console.log(selectedUser, "mana ");
  let role = localStorage.getItem("role");
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
          Guide Info
        </h2>
        <Row>
          <Col md={12}>
            <h3>{data.data?.title}</h3>
          </Col>
        </Row>

        <p>{data.data?.content}</p>

        <Row>
          <Col md={3}>
            <h5>Revisions:</h5>
            <p>{data.data?.revisions}</p>
          </Col>
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Notify Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* onChange={(e) => setSelectedUser(e.target.value)} */}
            <InputGroup size="lg" style={{ margin: "2rem 0" }}>
              <InputGroup.Text id="inputGroup-sizing-lg">
                Search
              </InputGroup.Text>
              <Form.Control
                // style={{ width: "300px" }}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                type="text"
                placeholder="Type here"
                name="search"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <Form.Select
                size="lg"
                name="limit"
                id="limit"
                onChange={(e) => {
                  console.log(e.target.value, "val");
                  setLimit(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  Select limit
                </option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </Form.Select>
              <Form.Select
                size="lg"
                name="filter"
                id="filter"
                onChange={(e) => {
                  console.log(e.target.value, "val");
                  setFilter(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  Select role
                </option>
                <option value="">All</option>
                <option value="admin">admin</option>
                <option value="employee">employee</option>
              </Form.Select>
            </InputGroup>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.username}</td>
                    <td>{user.age}</td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <Form.Check
                        reverse
                        name="group1"
                        type="checkbox"
                        id={`reverse-checkbox-1`}
                        onClick={() => hendleSelect(id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {/* <Pagination.First /> */}
              <Pagination.Prev
                disabled={offset <= 0}
                onClick={() => {
                  console.log(total);
                  setOffset(offset - limit);
                }}
              />

              <Pagination.Item>__</Pagination.Item>

              <Pagination.Next
                disabled={offset + limit >= total}
                onClick={() => {
                  console.log(total);
                  setOffset(offset + limit);
                }}
              />
              {/* <Pagination.Last /> */}
            </Pagination>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={sendGuide}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          hidden={role ? false : true}
          variant="primary"
          onClick={() => setShowModal(true)}
        >
          Notify Users
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default GuideInfo;
