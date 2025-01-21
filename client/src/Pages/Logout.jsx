import "../Styles/Register.css";
import { useNavigate } from "react-router-dom";

function LogoutButton({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
