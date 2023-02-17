import { useState, useEffect } from 'react';
import { loginUser } from '../api/user';
import { storageSave } from '../utils/storage'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Login({ onLogin }) {

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
      storageSave('user', userResponse); //saving the user into local storage
      setUser(userResponse);  //calling the user context
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin}>
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
