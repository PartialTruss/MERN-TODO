import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { useTasks } from "../../context/Taskcontext"; 
import StatisticsCards from "./Statistics_Cards";

const Statistics = () => {
  const { tasks } = useTasks();
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [incompleteTasksCount, setIncompleteTasksCount] = useState(0);

  useEffect(() => {
    setCompletedTasksCount(tasks.filter((task) => task.completed).length);
    setIncompleteTasksCount(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-3 mt-10">
        <StatisticsCards
          bg_color="bg-[#81B29A]"
          TasksCount={completedTasksCount}
          Task_Status={"Completed"}
        />
        <StatisticsCards
          bg_color="bg-[#EAB69F]"
          TasksCount={incompleteTasksCount}
          Task_Status={"In Progress"}
        />
        <StatisticsCards bg_color="bg-[#F2CC8F]" Task_Status={"Starred"} />
      </div>
      <div className="mt-28">
        <BarChart
          series={[
            {
              data: [completedTasksCount],
              color: "#81B29A",
            },
            {
              data: [incompleteTasksCount],
              color: "#EAB69F",
            },
          ]}
          height={300}
          xAxis={[
            {
              data: ["Tasks"],
              scaleType: "band",
              categoryGapRatio: 0.1,
              barGapRatio: 1,
            },
          ]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </div>
    </>
  );
};

export default Statistics;
