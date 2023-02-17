import { useState, useEffect } from 'react';
import { loginUser } from '../api/user';
import { storageSave } from '../utils/storage'
import { userHistory } from 'react-router-dom';

function Login({ onLogin }) {

  //Local State
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  //Side Effects
  useEffect( () => {}, []);

  //Event handlers
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const [error, user] = await loginUser(username);
    if (error !== null){  //if an error happen when user tried to log in
      setApiError(error);
    }
    if (user !== null){
      storageSave('user', user);
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
