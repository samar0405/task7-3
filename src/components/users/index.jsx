import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom"; 

const UserModal = ({ open, toggle, user, fetchUsers }) => {
  const [form, setForm] = useState({ name: "", number: "", email: "" });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        number: user.number || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.id) {
      axios.post("http://localhost:8000/users", form).then((res) => {
        if (res.status === 201) {
          fetchUsers();
          toggle();
        }
      });
    } else {
      const payload = {
        name: form.name || user.name,
        number: form.number || user.number,
        email: form.email || user.email,
      };
      axios
        .put(`http://localhost:8000/users/${user.id}`, payload)
        .then((res) => {
          if (res.status === 200) {
            fetchUsers();
            toggle();
          }
        });
    }
  };

  return (
    <Modal open={open} onClose={toggle}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {user.id ? "Edit User" : "Add User"}
        </Typography>
        <form onSubmit={handleSubmit} id="submit">
          <TextField
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Number"
            name="number"
            fullWidth
            variant="outlined"
            margin="normal"
            value={form.number}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={toggle}
              color="secondary"
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const Index = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const toggle = () => {
    setModal(!modal);
    setUser({});
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setUsers(users.filter((user) => user.id !== id));
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const openModal = (item) => {
    setUser(item);
    setModal(true);
  };

  return (
    <Container>
      <UserModal
        open={modal}
        toggle={toggle}
        user={user}
        fetchUsers={fetchUsers}
      />
      <Typography
        variant="h4"
        sx={{ mt: "24px" }}
        component="h1"
        align="center"
        gutterBottom
      >
        Users
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModal(true)}
        sx={{ mb: 2 }}
      >
        Add user
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>T/R</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => openModal(item)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    component={Link}
                    to={`/users/${item.id}`}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Details
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteUser(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Index;
