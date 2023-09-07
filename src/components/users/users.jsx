import { Container, Table, Button } from "react-bootstrap";

const Users = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  ];
  return (
    <Container style={{ maxWidth: "820px" }} className="mt-4">
      <h1>Users Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop over the list of users and create table rows */}
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <Button variant="info">
                  <i className="bx bx-show-alt"></i>
                </Button>
                <Button variant="primary">
                  <i className="bx bx-edit"></i>
                </Button>
                <Button variant="danger">
                  <i className="bx bx-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
