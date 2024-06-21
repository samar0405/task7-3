import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const UserModal = (props) => {
  const { open, toggle, user } = props;
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
          window.location.reload();
        }
      });
    } else {
      const payload = {
        name: form.name || user.name,
        number: form.number || user.number,
        email: form.email || user.email,
      };
      axios.put(`http://localhost:8000/users/${user.id}`, payload).then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
    }
  };

  return (
    <Modal open={open} onClose={toggle} aria-labelledby="modalTitle" aria-describedby="modalDescription">
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
        <Typography id="modalTitle" variant="h6" component="h2" textAlign="center">
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
        </form>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={toggle} color="secondary" variant="outlined" sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" form="submit" color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;
