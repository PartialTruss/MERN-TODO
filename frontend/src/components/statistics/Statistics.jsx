import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useTasks } from "../../context/Taskcontext";
import StatisticsCards from "./Statistics_Cards";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Statistics = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const { tasks } = useTasks();
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [incompleteTasksCount, setIncompleteTasksCount] = useState(0);
  const [starredTaskCount, setStarredTaskCount] = useState(0);

  useEffect(() => {
    setCompletedTasksCount(tasks.filter((task) => task.completed).length);
    setIncompleteTasksCount(tasks.filter((task) => !task.completed).length);
    setStarredTaskCount(tasks.filter((task) => task.starred).length);
  }, [tasks]);

  const data = {
    labels: [t("Completed"), t("In Progress"), t("Starred")], // Translate labels
    datasets: [
      {
        label: t("Tasks"),
        data: [completedTasksCount, incompleteTasksCount, starredTaskCount],
        backgroundColor: ["#81B29A", "#EAB69F", "#F2CC8F"],
        barThickness: 100,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#F4F1DE",
          callback: (value) => value,
        },
      },
      x: {
        ticks: {
          color: "#F4F1DE",
        },
        grid: {
          display: false,
        },
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
    },
  };

  return (
    <>
      <div className={`grid sm:grid-cols-3 gap-3 mt-10 ${isRTL ? "rtl" : ""}`}>
        <StatisticsCards
          bg_color="bg-[#81B29A]"
          TasksCount={completedTasksCount}
          Task_Status={t("Completed")}
        />
        <StatisticsCards
          bg_color="bg-[#EAB69F]"
          TasksCount={incompleteTasksCount}
          Task_Status={t("In Progress")}
        />
        <StatisticsCards
          bg_color="bg-[#F2CC8F]"
          Task_Status={t("Starred")}
          TasksCount={starredTaskCount}
        />
      </div>
      <div className=" w-11/12 lg:w-full mt-10">
        <Bar data={data} options={options} className="h-96" />
      </div>
    </>
  );
};

export default Statistics;
