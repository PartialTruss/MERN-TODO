import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import { useState } from "react";
import { useTasks } from "../../context/Taskcontext";
import FilterButton from "../common/FilterButton";
import LongMenu from "../common/LongMenu";
import TaskSkeleton from "../skeleton/TaskSkeleton";
import CheckBox from "./CheckBox";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";

const TaskList = () => {
  const { tasks, loading, updateTaskStatus } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleCloseDialog = () => {
    setEditingTask(null);
  };

  const handleCheck = async (taskId, currentState) => {
    try {
      setLoadingTaskId(taskId);
      const updatedState = !currentState;
      await updateTaskStatus(taskId, { completed: updatedState });
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setLoadingTaskId(null);
    }
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.completed === (filter === "completed"));

  return (
    <div>
      <FilterButton
        filterValue={filter}
        handleFunction={(e, newFilter) => setFilter(newFilter)}
      />

      <ul className="mt-10 space-y-8">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <TaskSkeleton />
              </li>
            ))
          : filteredTasks.map((task) => (
              <li key={task._id}>
                <Box
                  display="flex"
                  alignItems="center"
                  px="10px"
                  sx={{ color: "#fff" }}
                  bgcolor="#474973"
                  height="48px"
                  width="83%"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center" gap="10px">
                    <CheckBox
                      isChecked={task.completed}
                      changeStatus={() => handleCheck(task._id, task.completed)}
                      disabled={loadingTaskId === task._id}
                    />
                    <section>{task.title}</section>
                  </Box>
                  <LongMenu>
                    <MenuList>
                      <MenuItem onClick={() => handleEditClick(task)}>
                        <ListItemIcon>
                          <Edit className="text-blue-600" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <Delete sx={{ color: "red" }} fontSize="small" />
                        </ListItemIcon>
                        <DeleteTask taskId={task._id} />
                      </MenuItem>
                    </MenuList>
                  </LongMenu>
                </Box>
              </li>
            ))}

        <Dialog open={!!editingTask} onClose={handleCloseDialog}>
          <DialogContent>
            {editingTask && (
              <EditTask task={editingTask} onCancel={handleCloseDialog} />
            )}
          </DialogContent>
        </Dialog>
      </ul>
    </div>
  );
};

export default TaskList;
