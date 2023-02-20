import { useState, useEffect } from 'react';
import { loginUser } from '../api/user';
import { storageSave } from '../utils/storage'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { STORAGE_KEY_USER } from '../const/storageKeys';

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
      <section id='Login_Header'>
      <img src=".\LostInTranslation_Resources\Splash.svg" alt="" />
      <img src="./LostInTranslation_Resources/Logo-Hello.png" alt="Hello_img" />
      <h1>Lost in Translation</h1>
      <h2>Get Started</h2>
      </section>
      <fieldset>
        <label>
          Name:
          <input type="text" placeholder='Whats your name?' value={username} onChange={(event) => setUsername(event.target.value)} required/>
        
      <button className='login_btn' type="submit" disabled={loading}>Login</button>
      {loading && <p>Logging in...</p>}
      {apiError && <p>{apiError}</p>}
        </label>
        
      </fieldset>
      
    
    </form>
  );
}

export default Login;
