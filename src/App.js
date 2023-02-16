import { useState } from "react";
import LoginPage from "./components/Login";
import TranslationPage from "./components/Translation";
import ProfilePage from "./components/Profile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username) => {
    // Store the username in the API and set the loggedIn state variable to true
    fetch("https://fc-assignment02-api-production.up.railway.app/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("username", username);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = () => {
    // Clear the username from the browser storage and set the loggedIn state variable to false
    localStorage.removeItem("username");
    setLoggedIn(false);
  };

  return (
    <div>
      <h1>Sign Language Translation App</h1>
      {loggedIn ? (
        <>
          <TranslationPage onLogout={handleLogout} />
          <ProfilePage onLogout={handleLogout} />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

