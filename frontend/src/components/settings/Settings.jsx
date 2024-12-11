import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import Horizontalline from "../common/Horizontal_line";
import Title from "../common/Title";
import LogOut from "../form/LogOut";
import AvatarImage from "./Avatar";
import Info from "./Info";
import Links from "./Links";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Store the email
  const [age, setAge] = useState("");

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Decode the token (assuming it's a JWT)
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
      setEmail(decodedToken.email);
      setUsername(decodedToken.username); // Get the username from the token // Assuming the email is in the payload
    }
  }, []); // Empty dependency array to run this effect once

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="flex mt-10 gap-10 items-center">
        <AvatarImage username={username} />
        <section className="flex flex-col gap-1">
          <Info information={username} />
          <Info information={email} />
        </section>
      </div>
      <Horizontalline />
      <Title section_title="Theme" />
      <FormControl className="w-1/2">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Horizontalline />
      <Title section_title="Connect" />
      <div className="list flex flex-col gap-5 mt-5">
        <Links src="brand-github.svg" description="Find me on Github" />
        <Links src="brand-linkedin.svg" description="Checkout my Linkedin" />
        <Links src="brand-instagram.svg" description="Follow me on Instagram" />
      </div>
      <Horizontalline />
      <LogOut />
    </>
  );
};

export default Settings;
