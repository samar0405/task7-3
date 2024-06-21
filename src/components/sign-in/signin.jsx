import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Link,
  Avatar,
  Grid,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    if (username === "Samariddin" && password === "samar0405") {
      navigate("/main");
    } else {
      alert("Invalid credentials");
    }
  };
  const moveRegister = () => {
    navigate("/signup");
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <CardHeader title="Login" />
          <CardContent>
            <form id="submit" onSubmit={handleSubmit}>
              <TextField
                type="text"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                name="username"
                onChange={handleChange}
              />
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                name="password"
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
              Sign In
            </Button>
          </CardActions>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link>
                <p onClick={moveRegister}>Register</p>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Container>
  );
};

export default SignIn;
