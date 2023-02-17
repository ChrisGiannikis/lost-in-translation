import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav>
      {user !== null && 
        <ul>
          <NavLink to="/translation"><li>Translations</li></NavLink>
          <NavLink to="/profile"><li>Profile</li></NavLink> 
        </ul>
      }
    </nav>
  );
};

export default Navbar;
