import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

const FilterButton = ({ filterValue, handleFunction }) => {
  return (
    <div>
      <Box mb={2} display="flex" justifyContent="center">
        <ToggleButtonGroup
          value={filterValue}
          exclusive
          onChange={handleFunction}
          aria-label="task filter"
        >
          <ToggleButton value="all" aria-label="all tasks">
            All
          </ToggleButton>
          <ToggleButton value="completed" aria-label="completed tasks">
            Completed
          </ToggleButton>
          <ToggleButton value="notCompleted" aria-label="not completed tasks">
            Not Completed
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </div>
  );
};

export default FilterButton;
