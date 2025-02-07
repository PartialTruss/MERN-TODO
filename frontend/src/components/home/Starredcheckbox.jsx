import { Star, StarBorder } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function StarredCheckBox({ isChecked, changeStatus, disabled }) {
  const [localChecked, setLocalChecked] = useState(isChecked);

  useEffect(() => {
    setLocalChecked(isChecked);
  }, [isChecked]);

  const handleChange = () => {
    const newState = !localChecked;
    setLocalChecked(newState);
    changeStatus(newState);
  };

  return (
    <div>
      <Checkbox
        className="h-0"
        {...label}
        icon={<StarBorder sx={{ color: "#F2CC8F", marginLeft: "-10px" }} />}
        checkedIcon={<Star style={{ color: "#F2CC8F", marginLeft: "-10px" }} />}
        checked={localChecked}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}
