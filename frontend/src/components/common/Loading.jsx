import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <CircularProgress sx={"color:#EAB69F"} />
    </div>
  );
};

export default Loading;
