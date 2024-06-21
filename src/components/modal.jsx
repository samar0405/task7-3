import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

const UserModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    group: "open",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      name: "",
      group: "open",
    });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modalTitle" aria-describedby="modalDescription">
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
          Add Task
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
            select
            label="Group"
            name="group"
            fullWidth
            variant="outlined"
            margin="normal"
            value={form.group}
            onChange={handleChange}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="inprog">In Progress</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </TextField>
        </form>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} color="secondary" variant="outlined" sx={{ mr: 1 }}>
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
