import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service/index.js";
import VarifyModal from "../varify-modal.jsx";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Avatar,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [modal, setModal] = useState(false);
  
  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.sign_up(form);
      if (response.status === 200) {
        setModal(true);
        localStorage.setItem("email", form.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setModal(false);
    navigate('/somewhere'); // Redirect to a page after closing the modal, adjust the path as necessary
  };

  return (
    <Container component="main" maxWidth="xs">
      <VarifyModal open={modal} toggle={handleModalClose} />
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        <Card
          style={{
            minWidth: "300px",
            padding: "16px",
          }}
        >
          <Avatar
            style={{
              margin: "8px",
              backgroundColor: "#1976d2",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <CardHeader title="Sign Up" />
          <CardContent>
            <form id="submit" onSubmit={handleSubmit}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                id="email"
                onChange={handleChange}
              />
              <TextField
                type="text"
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="full_name"
                id="full_name"
                onChange={handleChange}
              />
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <TextField
                type="tel"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                name="phone_number"
                id="phone_number"
                onChange={handleChange}
              />
            </form>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              form="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </CardActions>
        </Card>
      </div>
    </Container>
  );
};

export default SignUp;
