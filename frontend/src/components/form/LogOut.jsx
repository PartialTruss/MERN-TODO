import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <button
        className="bg-[#C46A64] text-[#3D405B] mt-10 w-1/6 h-10 rounded-md hover:bg-[#ac6863]"
        onClick={handleLogOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default LogOut;
