import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  InputGroup,
  Form,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const Guides = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  let getdata = async () => {
    setLoading(true);
    let url = query
      ? `/guides?q=${query}&page[offset]=${offset}&page[limit]=${limit}`
      : `/guides?page[offset]=${offset}&page[limit]=${limit}`;

    let { data } = await axios.get(url);
    // console.log(data?.pageInfo?.total, "total");
    setTotal(data?.pageInfo?.total);
    console.log(data, "in use");
    setData(data.data);
    setLoading(false);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    getdata();
  }, [query, limit, offset]);
  // console.log(data, "out");
  let role = localStorage.getItem("role");
  let hendleDelete = async (p) => {
    setLoading(true);
    let config = {
      method: "delete",
      url: `/guides/${p}`,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast("Successfully deleted", { type: "info" });
      })
      .catch((error) => {
        console.log(error);
        toast("Error try again", { type: "error" });
      });
    setLimit(limit);
    setLoading(false);
    window.location.reload();
    // let news = await data.filter((item) => item.ID === p);
    // console.log(news);
    // setData(news);
  };
  const TextComponent = ({ text, maxLength }) => {
    if (text.length > maxLength) {
      text = text.slice(0, maxLength) + "...";
    }

    return text;
  };
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
      <Container
        style={{ maxWidth: "820px", marginBottom: "100px" }}
        className="mt-4"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <h1>Guide Page</h1>
          <Button
            hidden={role ? false : true}
            variant="info"
            style={{ color: "#fff", fontWeight: "bold" }}
            onClick={() => {
              navigate("/guide/add");
            }}
          >
            Add New
          </Button>
        </div>
        <InputGroup size="lg" style={{ margin: "2rem 0" }}>
          <InputGroup.Text id="inputGroup-sizing-lg">Search</InputGroup.Text>
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
        </InputGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((guide, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{TextComponent({ text: guide.title, maxLength: 30 })}</td>
                <td>{TextComponent({ text: guide.content, maxLength: 30 })}</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Button
                    variant="info"
                    onClick={() => {
                      navigate(`/guide/${guide._id}`);
                    }}
                  >
                    <i className="bx bx-show-alt"></i>
                  </Button>
                  <Button
                    hidden={role ? false : true}
                    variant="primary"
                    onClick={() => {
                      navigate(`/guide/edit/${guide._id}`);
                    }}
                  >
                    <i className="bx bx-edit"></i>
                  </Button>
                  <Button
                    hidden={role ? false : true}
                    variant="danger"
                    onClick={() => {
                      hendleDelete(guide._id);
                    }}
                  >
                    <i className="bx bx-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
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
        </Pagination>
      </Container>
    </>
  );
};

export default Guides;
