import { Box, Container, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useTasks } from "../../context/Taskcontext";

const EditTask = ({ task, onCancel }) => {
  const { updateTaskStatus } = useTasks(); // Access context method
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title || "");
    }
  }, [task]);

  const handleSave = async () => {
    if (!task) return; // Prevent saving if task is undefined
    try {
      await updateTaskStatus(task._id, { title: editedTitle });
      onCancel(); // Exit edit mode
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  if (!task) return null;

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap="20px" padding="20px">
        <h2>Edit Task</h2>
        <TextField
          label="Task Name"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          fullWidth
        />
        <Box
          display="flex"
          gap="10px"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ flexGrow: 1, backgroundColor: "#A1C084" }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={onCancel}
            sx={{ flexGrow: 1, backgroundColor: "#E05263" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditTask;
