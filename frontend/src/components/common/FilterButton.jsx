import { SortSharp } from "@mui/icons-material";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

const FilterButton = ({ filterValue, handleFunction }) => {
  const { t } = useTranslation();

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
            <p>{t("All")}</p>
          </MenuItem>
          <MenuItem value="completed">
            <p>{t("Completed")}</p>
          </MenuItem>
          <MenuItem value="notCompleted">
            <p>{t("Not Completed")}</p>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterButton;
