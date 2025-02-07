import { useState } from "react";

const AuthInput = ({
  label,
  placeholdertext,
  input_type,
  icon,
  value,
  onChange,
  onBlur,
  error,
  name,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const toggleVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  // Determine input border color based on validity
  const inputBorderClass = error
    ? "border-red-500 focus-within:ring-red-500"
    : value
    ? "border-green-500 focus-within:ring-green-500"
    : "border-gray-300 focus-within:ring-blue-600";

  return (
    <>
      <label
        className={`relative block rounded-md border-[1px] ${
          error
            ? "border-red-500 focus-within:ring-red-500"
            : value
            ? "border-green-500 focus-within:ring-green-500"
            : "border-gray-300 focus-within:ring-blue-600"
        } focus-within:ring-1 w-full`}
      >
        {icon && (
          <img
            src={icon}
            alt="Input Icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-700"
          />
        )}

        <input
          name={name}
          type={
            passwordVisibility && input_type === "password"
              ? "password"
              : "text"
          }
          className="peer border-none bg-transparent focus:border-transparent focus:outline-none focus:ring-0 placeholder:text-sm placeholder:font-thin px-10 h-[46px]"
          placeholder={placeholdertext}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />

        <span className="pointer-events-none absolute start-[1.9rem] top-0 -translate-y-[65%] bg-white p-0.5 text-gray-700 transition-all text-sm font-semibold">
          {label}
        </span>

        {input_type === "password" && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <img
              src={passwordVisibility ? "eye.svg" : "eye-off.svg"}
              alt="Toggle Password Visibility"
              className="w-5 h-5 text-gray-400"
            />
          </button>
        )}
      </label>
      {error && (
        <div className="text-red-600 text-sm font-semibold -mt-5">{error}</div>
      )}
    </>
  );
};

export default AuthInput;
