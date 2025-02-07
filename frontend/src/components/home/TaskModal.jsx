import { Box, Button, Container, Modal, TextField } from "@mui/material";
import TaskDatePicker from "../../components/home/DatePicker";

const TaskModal = ({
  open,
  handleClose,
  taskTitle,
  taskDate,
  setTaskTitle,
  setTaskDate,
  handleSave,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Container
        maxWidth="sm"
        style={{ backgroundColor: "#F4F1DE" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Box display="flex" flexDirection="column" gap="20px" padding="20px">
          <h1 className="text-xl">
            {taskTitle ? "Edit Task" : "Add New Task"}
          </h1>
          <section className="flex flex-col gap-5">
            <TextField
              label="Task Title"
              onChange={(e) => setTaskTitle(e.target.value)}
              value={taskTitle}
              fullWidth
            />
            <TaskDatePicker
              onDateChange={(date) => setTaskDate(date)}
              value={taskDate}
            />
          </section>
          <Box
            display="flex"
            gap="10px"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ flexGrow: 1, backgroundColor: "#81B29A" }}
            >
              Save
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
      </Container>
    </Modal>
  );
};

export default TaskModal;
