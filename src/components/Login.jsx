import { useState, useEffect } from 'react';
import { loginUser } from '../api/user';
import { storageSave } from '../utils/storage'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { STORAGE_KEY_USER } from '../const/storageKeys';
import '../Login.css'

function Login() {

  //Hooks
  const { user, setUser} = useUser();
  const navigate = useNavigate();

  //Local State
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  //Side Effects
  useEffect( () => {  //when user signed in
    if (user !== null){  //if user is not null
      navigate('translation'); //navigate to translation
    }
  }, [user, navigate]);

  //Event handlers
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const [error, userResponse] = await loginUser(username);
    if (error !== null){  //if an error happen when user tried to log in
      setApiError(error);
    }
    if (userResponse !== null){
      storageSave(STORAGE_KEY_USER, userResponse); //saving the user into local storage
      setUser(userResponse);  //calling the user context
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <ul>
          <li><img src={require("../Logo.png")} alt="Logo image"/></li>
          <li>
            <h2> Lost in Translation </h2>
            <h3>  Get started </h3>
          </li>
        </ul>
      </div>
      <fieldset>
        <label>
          Name:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
      </fieldset>
      <button type="submit" disabled={loading}>Login</button>
      {loading && <p>Logging in...</p>}
      {apiError && <p>{apiError}</p>}
    </form>
  );
}

export default Login;
