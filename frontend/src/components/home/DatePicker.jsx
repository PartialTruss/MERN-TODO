import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const TaskDatePicker = ({ onDateChange, initialDate = null }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date?.toISOString() || null); // Ensure the date is passed as ISO string
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default TaskDatePicker;
