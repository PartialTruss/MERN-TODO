import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <button
        className="bg-[#C46A64] text-[#3D405B] mt-10 w-2/4 md:w-1/6 h-10 rounded-md hover:bg-[#ac6863]"
        onClick={handleLogOut}
      >
        <p> {t("Sign out")}</p>
      </button>
    </div>
  );
};

export default LogOut;
