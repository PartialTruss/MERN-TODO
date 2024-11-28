import { Box, Typography } from "@mui/material";
const NoTask = () => {
  return (
    <>
      <Box
        marginTop={"20px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <img className="No-Task-Image" src="man-working.svg" alt="" />
        <Typography variant="h5" color="#F4F1DE">
          Tasks you write show up here!
        </Typography>
      </Box>
    </>
  );
};

export default NoTask;
