import { Box, Skeleton } from "@mui/material";

const TaskSkeleton = () => {
  return (
    <div>
      <li>
        <Box
          display={"flex"}
          alignItems={"center"}
          px={"10px"}
          sx={{ color: "#fff" }}
          bgcolor={"#474973"}
          height={"48px"}
          width={"83%"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="50%" height={24} />
          </Box>
          <Box display="flex" gap="10px">
            <Skeleton variant="rectangular" width={60} height={36} />
            <Skeleton variant="rectangular" width={60} height={36} />
          </Box>
        </Box>
      </li>
    </div>
  );
};

export default TaskSkeleton;
