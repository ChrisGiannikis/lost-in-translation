import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav>
      {user ? (
        <ul>
          <img src="./LostInTranslation_Resources/Logo.png" alt="" />
          <h1 >Lost in Translation</h1>
          <NavLink to="/translation"><li>Translations</li></NavLink>
          <NavLink to="/profile"><li>Profile</li></NavLink> 
        </ul>
      ):(      
          <h1>Lost in Translation</h1>
      )}
    </nav>
  );
};

export default Navbar;
