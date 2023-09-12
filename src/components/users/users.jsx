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

const Users = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState({ by: "age", order: "" });
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  let navigate = useNavigate();
  let getUsers = async () => {
    setLoading(true);
    let url = query
      ? `/users?q=${query}&page[offset]=${offset}&page[limit]=${limit}`
      : `/users?page[offset]=${offset}&page[limit]=${limit}`;
    if (sort.order) {
      url += `&sort[by]=${sort.by}&sort[order]=${sort.order}`;
    }
    if (filter != "") {
      let { data } = await axios.get(url + `&filters[role]=${filter}`);
      setTotal(data?.pageInfo?.total);
      setData(data.data);
      setLoading(false);
      if (!data.data[0]) {
        setHide(true);
      }
      return;
    }

    let { data } = await axios.get(url);
    setTotal(data?.pageInfo?.total);
    setData(data.data);
    setLoading(false);
    if (!data.data[0]) {
      setHide(true);
      return;
    }
    setHide(false);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, query, limit, offset, sort]);
  console.log(data, "out");
  let hendleDelete = (p) => {
    setLoading(true);
    let config = {
      method: "delete",
      url: `/users/${p}`,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast("User deleted", { type: "info" });
        getUsers();
      })
      .catch((error) => {
        console.log(error);
        toast("Error try again", { type: "error" });
      });
    setLoading(false);
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
          <h1>Users Page</h1>
          <Button
            variant="info"
            style={{ color: "#fff", fontWeight: "bold" }}
            onClick={() => {
              navigate("/users/add");
            }}
          >
            Add New
          </Button>
        </div>
        <div hidden={!hide}>
          <h4>There are no users</h4>
        </div>
        <InputGroup hidden={hide} size="lg" style={{ margin: "2rem 0" }}>
          <InputGroup.Text id="inputGroup-sizing-lg">Search</InputGroup.Text>
          <Form.Control
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

          <Form.Select
            onChange={(e) => setSort({ by: sort.by, order: e.target.value })}
            name="order"
            id="small"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </Form.Select>
        </InputGroup>

        <Table hidden={hide} striped bordered hover>
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
            {data?.map((user, index) => (
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
                  <Button
                    variant="info"
                    onClick={() => {
                      navigate(`/users/${user._id}`);
                    }}
                  >
                    <i className="bx bx-show-alt"></i>
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/users/edit/${user._id}`);
                    }}
                  >
                    <i className="bx bx-edit"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      hendleDelete(user._id);
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

export default Users;
