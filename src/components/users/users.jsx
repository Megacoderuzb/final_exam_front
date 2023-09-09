import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
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
  let navigate = useNavigate();
  let getdata = async () => {
    let url = query
      ? `/users?q=${query}&page[offset]=${offset}&page[limit]=${limit}`
      : `/users?page[offset]=${offset}&page[limit]=${limit}`;

    if (filter != "") {
      console.log(url);
      console.log(url + `&filters[role]=${filter}`);
      let { data } = await axios.get(
        url + `&filters[role]=${filter}`
        // `/users?q=${query}&page[offset]=0&page[limit]=5`
      );
      // console.log(data, "in use");
      // setData(data.data);
      // } else {
      // let { data } = await axios.get(url);
      console.log(data?.pageInfo?.total, "total");
      setTotal(data?.pageInfo?.total);
      console.log(data, "in use");
      setData(data.data);

      return;
      // }
    }

    let { data } = await axios.get(url);
    console.log(data?.pageInfo?.total, "total");
    setTotal(data?.pageInfo?.total);
    console.log(data, "in use");
    setData(data.data);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    getdata();
  }, [filter, query, limit, offset]);
  console.log(data, "out");
  let hendleDelete = (p) => {
    let config = {
      method: "delete",
      url: `/users/${p}`,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast(response.data.data, { type: "info" });
      })
      .catch((error) => {
        console.log(error);
        toast("Error try again", { type: "error" });
      });
  };

  return (
    <Container
      style={{ maxWidth: "820px", marginBottom: "100px" }}
      className="mt-4"
    >
      <h1>Users Page</h1>
      <input
        type="text"
        placeholder="search"
        name="search"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <select
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
      </select>
      <select
        name="filter"
        id="filter"
        // defaultValue={filter}
        onChange={(e) => {
          console.log(e.target.value, "val");
          setFilter(e.target.value);
          // console.log(filter);
        }}
      >
        <option value="" disabled selected>
          Select role
        </option>
        <option value="">All</option>
        <option value="admin">admin</option>
        <option value="employee">employee</option>
      </select>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Full Name</th>
            <th>Username</th>
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
    </Container>
  );
};

export default Users;
