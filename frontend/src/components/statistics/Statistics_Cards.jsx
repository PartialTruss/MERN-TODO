const StatisticsCards = ({ bg_color, TasksCount, Task_Status }) => {
  return (
    <div
      className={`rounded-b-[36px] rounded-tr-3xl h-32 w-11/12 p-5 ${bg_color}`}
    >
      <h1> {TasksCount}</h1>
      <p>{Task_Status}</p>
    </div>
  );
};

export default StatisticsCards;
