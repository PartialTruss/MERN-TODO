import {
  DeleteOutlined,
  InfoOutlined,
  RestoreOutlined,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import { Reorder } from "motion/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useTasks } from "../../context/Taskcontext";
import LongMenu from "../common/LongMenu";
import CheckBox from "../home/CheckBox";
import EditTask from "../home/EditTask";
import TaskSkeleton from "../skeleton/TaskSkeleton";

const Archive = () => {
  const {
    tasks,
    loading,
    updateTaskStatus,
    deleteTaskById,
    updateTaskOrder,
    loadTasks,
    setTasks,
    updateTaskArchived,
  } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  useEffect(() => {
    const cachedTasks = sessionStorage.getItem("archivedTasks");
    if (cachedTasks) {
      setTasks(JSON.parse(cachedTasks));
    } else {
      loadTasks(true);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("archivedTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTaskById(taskId);
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
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

  const handleReorder = (newTasks) => {
    updateTaskOrder(newTasks);
  };

  const handleRestore = async (taskId) => {
    try {
      setLoadingTaskId(taskId);
      await updateTaskArchived(taskId, false);
      await loadTasks(); // ✅ Refresh tasks after restoring
      toast.success("Task restored successfully!");
    } catch (error) {
      console.error("Error restoring task:", error);
      toast.error("Failed to restore task.");
    } finally {
      setLoadingTaskId(null);
    }
  };

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const archivedTasks = tasks.filter((task) => task.archived);

  return (
    <div>
      {loading ? (
        <ul className="mt-10 space-y-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <TaskSkeleton />
            </li>
          ))}
        </ul>
      ) : archivedTasks.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          {t("No archived tasks available")}
        </p>
      ) : (
        <ul className="mt-10 space-y-8">
          <Reorder.Group
            axis="y"
            values={archivedTasks}
            onReorder={handleReorder}
          >
            {archivedTasks.map((task) => (
              <Reorder.Item key={task._id} value={task}>
                <div className="flex flex-col px-3 mt-5 text-white bg-[#474973] rounded-xl w-5/6 justify-between py-3">
                  <Box display="flex" justifyContent="space-between">
                    <div className="flex items-center gap-3">
                      <CheckBox
                        isChecked={task.completed}
                        changeStatus={() =>
                          handleCheck(task._id, task.completed)
                        }
                        disabled={loadingTaskId === task._id}
                      />
                      <section className="opacity-60 transition-all duration-500 ease-in-out">
                        {task.title}
                      </section>
                    </div>
                    <div className="flex">
                      <Box display="flex" alignItems="center">
                        {task.dueDate && (
                          <p className="text-sm text-gray-300 mt-1 bg-[#777ab6] px-3 py-1 rounded-md">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </Box>
                      <LongMenu>
                        <MenuList disablePadding>
                          <MenuItem onClick={() => handleEditClick(task)}>
                            <ListItemIcon>
                              <InfoOutlined
                                className="text-gray-500"
                                fontSize="small"
                              />
                            </ListItemIcon>
                            <ListItemText className="text-gray-500">
                              Detail
                            </ListItemText>
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(task._id)}>
                            <ListItemIcon>
                              <DeleteOutlined
                                sx={{ color: "red" }}
                                fontSize="small"
                              />
                            </ListItemIcon>
                            <ListItemText className="text-red-600">
                              Delete
                            </ListItemText>
                          </MenuItem>
                          <MenuItem onClick={() => handleRestore(task._id)}>
                            <ListItemIcon>
                              <RestoreOutlined
                                className="text-green-500"
                                fontSize="small"
                              />
                            </ListItemIcon>
                            <ListItemText className="text-green-500">
                              Restore
                            </ListItemText>
                          </MenuItem>
                        </MenuList>
                      </LongMenu>
                    </div>
                  </Box>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </ul>
      )}
      <Dialog open={!!editingTask} onClose={handleCloseDialog}>
        <DialogContent>
          {editingTask && (
            <EditTask
              task={editingTask}
              open={!!editingTask}
              onCancel={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Archive;
