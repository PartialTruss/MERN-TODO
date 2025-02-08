import { motion } from "motion/react";

const StatisticsCards = ({ bg_color, TasksCount, Task_Status }) => {
  return (
    <motion.div
      initial={false}
      animate={{ scale: 1 }}
      className={`rounded-b-[36px] rounded-tr-3xl h-32   lg:w-11/12 p-5 ${bg_color} text-[#3D405B] font-medium text-lg`}
    >
      <h1> {TasksCount}</h1>
      <p>{Task_Status}</p>
    </motion.div>
  );
};

export default StatisticsCards;
