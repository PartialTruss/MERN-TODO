import { useTasks } from "../../context/Taskcontext";

const DeleteTask = ({ taskId }) => {
  const { deleteTaskById } = useTasks(); // Access context method

  const handleDelete = async () => {
    try {
      await deleteTaskById(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500">
      Delete
    </button>
  );
};

export default DeleteTask;
