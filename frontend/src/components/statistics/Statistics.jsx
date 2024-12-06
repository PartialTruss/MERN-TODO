import { useEffect, useState } from "react";
import { useTasks } from "../../context/Taskcontext"; // To access tasks
import StatisticsCards from "./Statistics_Cards";

const Statistics = () => {
  const { tasks } = useTasks();
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [incompleteTasksCount, setIncompleteTasksCount] = useState(0);

  useEffect(() => {
    // Calculate completed tasks
    setCompletedTasksCount(tasks.filter((task) => task.completed).length);
  }, [tasks]); // Dependency on tasks ensures it updates dynamically

  useEffect(() => {
    // Calculate incomplete tasks
    setIncompleteTasksCount(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  return (
    <div className="grid grid-cols-3 gap-3 mt-10">
      <StatisticsCards
        bg_color="bg-[#81B29A]"
        TasksCount={completedTasksCount}
        Task_Status={"Completed"} // Pass completed tasks count
      />
      <StatisticsCards
        bg_color="bg-[#EAB69F]"
        TasksCount={incompleteTasksCount}
        Task_Status={"In Progress"} // Pass incomplete tasks count
      />
    </div>
  );
};

export default Statistics;
