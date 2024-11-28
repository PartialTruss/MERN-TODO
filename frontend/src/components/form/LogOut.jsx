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
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default LogOut;
