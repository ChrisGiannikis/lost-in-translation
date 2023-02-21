import { Link } from "react-router-dom";
import { translationClearhistory } from "../../api/translate";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageDelete, storageSave} from "../../utils/storage";

const ProfileActions = () => {
  const { user, setUser } = useUser();
  const handleLogoutClick = () => {
    if (window.confirm("Are you sure?")) {
      //send an event to the parent
      storageDelete(STORAGE_KEY_USER);
      setUser(null);
    }
  };
  const handleClearHistoryClick = async () => {
    if(!window.confirm('Are you sure?')){
      return
    }
    const[clearError] = await translationClearhistory(user.id)
    if (clearError !==null){
      return
    }

    const updatedUser= {...user,translations:[]}
    setUser(updatedUser)  //sets the user with the empty translations list
    window.location.reload(false);  //reload the page
  }
  return (
    <ul>
      <li id="btn-li">
        <button  onClick={handleClearHistoryClick}>Clear History</button>
      </li>
      <li id="btn-li">
        <button  onClick={handleLogoutClick}>Logout</button>
      </li>
    </ul>
  );
};
export default ProfileActions;
