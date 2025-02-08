import {
  Box,
  Button,
  Container,
  Divider,
  Modal,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTasks } from "../../context/Taskcontext";
import TaskDatePicker from "./DatePicker";

const EditTask = ({ task, open, onCancel }) => {
  const { updateTaskStatus } = useTasks();
  const [editedTitle, setEditedTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState(null);
  const [description, setDescription] = useState("");

  // States to track edit mode
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [isEditingDueTime, setIsEditingDueTime] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title || "");
      setDueDate(task.dueDate ? dayjs(task.dueDate) : null);
      setDueTime(task.dueTime ? dayjs(task.dueTime, "HH:mm") : null);
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSave = async () => {
    if (!task) return;

    try {
      await updateTaskStatus(task._id, {
        title: editedTitle,
        dueDate:
          dueDate && dayjs(dueDate).isValid()
            ? dayjs(dueDate).format("YYYY-MM-DD")
            : null,
        dueTime:
          dueTime && dayjs(dueTime).isValid()
            ? dayjs(dueTime).format("HH:mm")
            : null,
        description,
      });

      onCancel();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  if (!task) return null;

  return (
    <Modal open={open} onClose={onCancel}>
      <Container
        maxWidth="sm"
        style={{
          backgroundColor: "#F4F1DE",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "20px",
        }}
      >
        <Box display="flex" flexDirection="column" gap="20px">
          <h1 className="text-xl">{t("Task Detail")}</h1>
          <section className="flex flex-col gap-5">
            <Box
              onClick={() => setIsEditingTitle(true)}
              sx={{ cursor: "pointer" }}
            >
              {!isEditingTitle ? (
                <p>{editedTitle || "Click to edit title"}</p>
              ) : (
                <TextField
                  label="Task Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  fullWidth
                  onBlur={() => setIsEditingTitle(false)}
                  autoFocus
                />
              )}
            </Box>
            <Divider className="bg-gray-400" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <section className="flex items-center w-full gap-3">
                <Box
                  onClick={() => setIsEditingDueDate(true)}
                  sx={{ cursor: "pointer" }}
                >
                  {!isEditingDueDate ? (
                    <p>
                      {dueDate
                        ? dueDate.format("MMMM D") // Format as "November 11"
                        : "Click to edit date"}
                    </p>
                  ) : (
                    <TaskDatePicker
                      value={dueDate}
                      onDateChange={(date) =>
                        setDueDate(date ? dayjs(date) : null)
                      }
                      onBlur={() => setIsEditingDueDate(false)}
                    />
                  )}
                </Box>

                <Box
                  onClick={() => setIsEditingDueTime(true)}
                  sx={{ cursor: "pointer" }}
                >
                  {!isEditingDueTime ? (
                    <p>
                      {dueTime ? dueTime.format("HH:mm") : "Click to edit time"}
                    </p>
                  ) : (
                    <TimePicker
                      label="Due Time"
                      value={dueTime}
                      onChange={(time) => setDueTime(time)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                      onBlur={() => setIsEditingDueTime(false)}
                    />
                  )}
                </Box>
              </section>
            </LocalizationProvider>
            <Divider className="bg-gray-400" />

            {/* Description */}
            <Box
              onClick={() => setIsEditingDescription(true)}
              sx={{ cursor: "pointer" }}
            >
              {!isEditingDescription ? (
                <p>{description || "Click to edit description"}</p>
              ) : (
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  onBlur={() => setIsEditingDescription(false)}
                  autoFocus
                />
              )}
            </Box>
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
              {t("Save")}
            </Button>
            <Button
              variant="contained"
              onClick={onCancel}
              sx={{ flexGrow: 1, backgroundColor: "#C46A64" }}
            >
              {t("Cancel")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default EditTask;
