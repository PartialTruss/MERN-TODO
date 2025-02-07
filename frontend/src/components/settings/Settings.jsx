import { ArrowDropDown } from "@mui/icons-material";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Horizontalline from "../common/Horizontal_line";
import Title from "../common/Title";
import LogOut from "../form/LogOut";
import AvatarImage from "./Avatar";
import Info from "./Info";
import Links from "./Links";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setEmail(decodedToken.email);
      setUsername(decodedToken.username);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
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
      <div className="mt-7">
        <Title section_title="Language" />
        <FormControl className="w-full sm:w-5/6 lg:w-1/2">
          <Select
            value={language}
            onChange={handleLanguageChange}
            className="mt-5"
            IconComponent={ArrowDropDown}
          >
            <MenuItem value="en">{t("Default")}</MenuItem>
            <MenuItem value="fa">{t("Persian")}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Horizontalline />
      <div className="mt-7">
        <Title section_title="Connect" />
        <div className="list flex flex-col gap-5 mt-5">
          <Links
            href="https://github.com/PartialTruss"
            src="brand-github.svg"
            description={t("Github")}
          />
          <Links
            href="https://www.linkedin.com/in/amirhosein-fallahan-224a2b27a/"
            src="brand-linkedin.svg"
            description={t("Linkedin")}
          />
          <Links src="brand-instagram.svg" description={t("Instagram")} />
        </div>
      </div>
      <Horizontalline />
      <div className="mb-5">
        <LogOut />
      </div>
    </>
  );
};

export default Settings;
