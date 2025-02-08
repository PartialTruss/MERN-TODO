import {
  ArchiveOutlined,
  DeleteOutlined,
  InfoOutlined,
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
import { motion, Reorder } from "motion/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useTasks } from "../../context/Taskcontext";
import LongMenu from "../common/LongMenu";
import StarredCheckBox from "../home/Starredcheckbox";
import TaskSkeleton from "../skeleton/TaskSkeleton";
import CheckBox from "./CheckBox";
import EditTask from "./EditTask";

const TaskList = ({ filter }) => {
  const {
    tasks,
    loading,
    updateTaskStatus,
    deleteTaskById,
    updateTaskOrder,
    loadTasks,
    updateTaskArchived,
  } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  useEffect(() => {
    if (!tasks.length) {
      loadTasks(); // Only fetch from API if tasks are empty
    }
  }, [filter, tasks]);

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
      await updateTaskStatus(taskId, { completed: !currentState });
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleStar = async (taskId, currentState) => {
    try {
      setLoadingTaskId(taskId);
      await updateTaskStatus(taskId, { starred: !currentState });
    } catch (error) {
      console.error("Error starring task:", error);
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleReorder = (newTasks) => {
    updateTaskOrder(newTasks);
  };

  const handleArchive = async (taskId) => {
    try {
      setLoadingTaskId(taskId);
      await updateTaskArchived(taskId, true);
      toast.success("Task archived successfully!");
    } catch (error) {
      console.error("Error archiving task:", error);
      toast.error("Failed to archive task.");
    } finally {
      setLoadingTaskId(null);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed && !task.archived;
    if (filter === "notCompleted") return !task.completed && !task.archived;
    return !task.archived; // "all" (default case) - shows non-archived tasks
  });

  return (
    <div>
      <ul className="mt-10 space-y-8">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <TaskSkeleton />
            </li>
          ))
        ) : (
          <Reorder.Group
            axis="y"
            values={filteredTasks}
            onReorder={handleReorder}
          >
            {filteredTasks.map((task) => (
              <Reorder.Item key={task._id} value={task}>
                <motion.div
                  className="flex flex-col px-3 mt-5 text-white bg-[#474973] rounded-xl xl:w-5/6 justify-between py-3 "
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Box display="flex" justifyContent="space-between">
                    <div className="flex items-center gap-3">
                      <CheckBox
                        isChecked={task.completed}
                        changeStatus={() =>
                          handleCheck(task._id, task.completed)
                        }
                        disabled={loadingTaskId === task._id}
                      />
                      <section
                        className={
                          task.completed
                            ? "line-through opacity-60 transition-all duration-500 ease-in-out"
                            : "none"
                        }
                      >
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
                              {t("Detail")}
                            </ListItemText>
                          </MenuItem>
                          <MenuItem>
                            <StarredCheckBox
                              isChecked={task.starred}
                              changeStatus={() =>
                                handleStar(task._id, task.starred)
                              }
                            />
                            <ListItemText className="text-[#F2CC8F] ml-1">
                              {t("Mark")}
                            </ListItemText>
                          </MenuItem>
                          <MenuItem onClick={() => handleArchive(task._id)}>
                            <ListItemIcon>
                              <ArchiveOutlined
                                className="text-blue-500"
                                fontSize="small"
                              />
                            </ListItemIcon>
                            <ListItemText className="text-blue-500">
                              {t("Archive")}
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
                              {t("Delete")}
                            </ListItemText>
                          </MenuItem>
                        </MenuList>
                      </LongMenu>
                    </div>
                  </Box>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
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
      </ul>
    </div>
  );
};

export default TaskList;
