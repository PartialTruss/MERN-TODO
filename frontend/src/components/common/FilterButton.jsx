import { SortSharp } from "@mui/icons-material";
import { Box, FormControl, MenuItem, Select } from "@mui/material";

const FilterButton = ({ filterValue, handleFunction }) => {
  return (
    <Box display="flex" justifyContent="center">
      <FormControl size="small">
        <Select
          value={filterValue}
          onChange={(e) => handleFunction(e.target.value)}
          displayEmpty
          sx={{
            bgcolor: "#F4F1DE",
            paddingRight: "10px",
          }}
          IconComponent={SortSharp}
        >
          <MenuItem value="all">
            <p>All</p>
          </MenuItem>
          <MenuItem value="completed">
            <p>Completed</p>
          </MenuItem>
          <MenuItem value="notCompleted">
            <p>Not Completed</p>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterButton;
