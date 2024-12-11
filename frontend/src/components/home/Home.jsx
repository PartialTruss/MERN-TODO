import { Add } from "@mui/icons-material";
import { Box, Button, Container, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useTasks } from "../../context/Taskcontext";
import NoTask from "./NoTask";
import TaskList from "./TaskList";
const Home = () => {
  const { tasks, addTask } = useTasks();

  const [newTask, setNewTask] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask("");
      setOpen(false);
    }
  };

  return (
    <div className="mt-10 h-screen">
      <Button
        onClick={handleOpen}
        variant="outlined"
        startIcon={<Add />}
        sx={{ backgroundColor: "#81B29A", border: "none", color: "#3D405B" }}
      >
        New Task
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Container
          maxWidth="sm"
          style={{ backgroundColor: "#F4F1DE" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div>
            <Box
              display="flex"
              flexDirection="column"
              gap="20px"
              padding="20px"
            >
              <TextField
                label="Task Title"
                onChange={(e) => setNewTask(e.target.value)}
                focused={false}
              />
              <Box
                display="flex"
                gap="10px"
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Button
                  variant="contained"
                  onClick={handleAddTask}
                  sx={{ flexGrow: 1, backgroundColor: "#81B29A" }}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{ flexGrow: 1, backgroundColor: "#C46A64" }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </div>
        </Container>
      </Modal>
      {tasks.length > 0 ? <TaskList /> : <NoTask />}
    </div>
  );
};

export default Home;
