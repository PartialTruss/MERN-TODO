import Title from "../components/common/Title";
import Statistics from "../components/statistics/Statistics";

const StatisticsPage = () => {
  return (
    <div className=" lg:h-screen p-5 lg:p-0">
      <Title section_title="Statistics" />
      <Statistics />
    </div>
  );
};

export default StatisticsPage;
