import "../Styles/Register.css";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any cleanup logic here, like removing auth tokens
    navigate("/login"); // Redirect to login page after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
