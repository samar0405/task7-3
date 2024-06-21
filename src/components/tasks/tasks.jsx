import React, { useState } from "react";
import UserModal from "../modal";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import "./tasks.css";
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const openModal = (index = null) => {
    setEditingIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingIndex(null);
  };

  const handleSaveTask = (newTask) => {
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = newTask;
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, newTask]);
    }
    closeModal();
  };

  const handleEditTask = (index) => {
    openModal(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    closeModal();
  };

  const groupTasks = (status) => {
    return tasks.filter((task) => task.group === status);
  };

  const renderTaskList = (status) => {
    const groupedTasks = groupTasks(status);
    return (
      <List>
        {groupedTasks.map((task, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Box display="flex" flexDirection="column" width="100%">
                <ListItemText primary={task.name} />
                <Box display="flex" gap={1} mt={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="info"
                    onClick={() => handleEditTask(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </ListItem>
            {index < groupedTasks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    );
  };

  return (
    <>
      <UserModal
        open={modalOpen}
        onClose={closeModal}
        car={editingIndex !== null ? tasks[editingIndex] : null}
        onSave={handleSaveTask}
      />
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom className="namesi">
          TASKS
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => openModal()}
          >
            Add Task
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search..."
            sx={{ width: "300px" }}
          />
        </Box>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {["open", "inprog", "complete", "pending"].map((status) => (
            <Grid item xs={12} sm={6} md={3} key={status}>
              <Card
                sx={{
                  backgroundColor: "#e0f7fa",
                  borderRadius: 2,
                  boxShadow: 3,
                  p: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Typography>
                  {renderTaskList(status)}
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => openModal()}
                  >
                    Add Task
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Tasks;
