import { Add } from "@mui/icons-material";
import { Box, Button, Container, Modal, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import TaskDatePicker from "../../components/home/DatePicker";
import { useTasks } from "../../context/Taskcontext";
import FilterButton from "../common/FilterButton";
import NoTask from "./NoTask";
import TaskList from "./TaskList";

const Home = () => {
  const { tasks, addTask } = useTasks();
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState(null);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewTask("");
    setDueDate(null);
    setDueTime(null);
    setDescription("");
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const formattedDueTime = dueTime
          ? dayjs(dueTime).format("HH:mm")
          : null; // Ensure proper format
        await addTask(newTask, dueDate, formattedDueTime, description);
        setNewTask("");
        setDueDate(null);
        setDueTime(null);
        setDescription("");
        setOpen(false);
        toast.success(t("Task created successfully!"));
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error(t("Failed to add task."));
      }
    } else {
      toast.error(t("Task title is required."));
    }
  };

  return (
    <div className={`mt-10 h-screen ${isRTL ? "rtl" : ""}`}>
      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
      <div className="flex justify-between items-center mb-2 xl:w-5/6">
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<Add />}
          sx={{
            backgroundColor: "#81B29A",
            border: "none",
            color: "#3D405B",
          }}
        >
          <p>{t("New Task")}</p>
        </Button>
        <FilterButton
          filterValue={filter}
          handleFunction={(newFilter) => setFilter(newFilter)}
        />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Container
          maxWidth="sm"
          style={{ backgroundColor: "#F4F1DE" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
        >
          <div>
            <Box
              display="flex"
              flexDirection="column"
              gap="20px"
              padding="20px"
            >
              <h1 className="text-xl">{t("Add new task")}</h1>
              <section className="flex flex-col gap-5">
                <TextField
                  label={t("Task Title")}
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <section className="flex w-full gap-3">
                    <TaskDatePicker onDateChange={(date) => setDueDate(date)} />
                    <TimePicker
                      label={t("Due Time")}
                      value={dueTime}
                      onChange={(time) => setDueTime(time)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </section>
                </LocalizationProvider>
                <TextField
                  label={t("Description")}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </section>

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
                  {t("Save")}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{ flexGrow: 1, backgroundColor: "#C46A64" }}
                >
                  {t("Cancel")}
                </Button>
              </Box>
            </Box>
          </div>
        </Container>
      </Modal>

      {tasks.length > 0 ? <TaskList filter={filter} /> : <NoTask />}
    </div>
  );
};

export default Home;
