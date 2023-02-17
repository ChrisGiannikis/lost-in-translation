import { useState } from "react";
import LoginPage from "./components/Login";
import TranslationPage from "./components/Translation";
import ProfilePage from "./components/Profile";
import {BrowserRouter, Routes, Route, Router } from "react-router-dom";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    // Clear the username from the browser storage and set the loggedIn state variable to false
    localStorage.removeItem("username");
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/translation" element={<TranslationPage onLogout={handleLogout} />} />
          <Route path="/profile" element={<ProfilePage onLogout={handleLogout} />} />
        </Routes>
        {/* <h1>Sign Language Translation App</h1>
        {loggedIn ? (
          <>
            <TranslationPage onLogout={handleLogout} />
            <ProfilePage onLogout={handleLogout} />
          </>
        ) : (
          <LoginPage onLogin={handleLogin} />
        )} */}
      </div>
    </BrowserRouter>
  );
}

export default App;

