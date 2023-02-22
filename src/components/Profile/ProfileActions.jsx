import { translationClearhistory } from "../../api/translate";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageDelete} from "../../utils/storage";

// ProfileActions Component Definition
const ProfileActions = () => {
  // Accessing user and setUser functions from UserContext using custom hook
  const { user, setUser } = useUser();

  // Function to handle logout button click
  const handleLogoutClick = () => {
    if (window.confirm("Are you sure?")) {
      storageDelete(STORAGE_KEY_USER);  // Deleting user data from local storage
      setUser(null);  // Setting user to null to log out
    }
  };

  // Function to handle clear history button click
  const handleClearHistoryClick = async () => {
    if(!window.confirm('Are you sure?')){
      return  // If user cancels confirmation, do not clear history
    }
    const [clearError] = await translationClearhistory(user.id);  // API call to clear user's translation history
    if (clearError !==null){
      return  // If there is an error, do not update user and reload page
    }

    const updatedUser= {...user,translations:[]};  // Updating user with empty translations list
    setUser(updatedUser);  // Updating user in UserContext
    window.location.reload(false);  // Reloading the page to display updated user information
  }

  // Rendering clear history and logout buttons
  return (
    <ul>
      <li id="btn-li">
        <button onClick={handleClearHistoryClick}>Clear History</button>
      </li>
      <li id="btn-li">
        <button onClick={handleLogoutClick}>Logout</button>
      </li>
    </ul>
  );
};

// Exporting ProfileActions component
export default ProfileActions;
