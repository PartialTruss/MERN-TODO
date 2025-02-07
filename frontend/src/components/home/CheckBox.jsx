import { useState } from "react";

const CheckBox = ({ isChecked, changeStatus, disabled }) => {
  const [localChecked, setLocalChecked] = useState(isChecked);

  const handleChange = () => {
    const newState = !localChecked;
    setLocalChecked(newState); // Update local state
    changeStatus(newState); // Trigger parent handler for backend update
  };

  return (
    <div>
      <div className="checkbox-wrapper-12">
        <div className={`cbx`}>
          <input
            type="checkbox"
            id="cbx-12"
            checked={localChecked}
            onChange={handleChange}
            disabled={disabled}
          />
          <label htmlFor="cbx-12"></label>
          <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
