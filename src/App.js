import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import TranslationPage from "./pages/TranslationPage";
import ProfilePage from "./pages/ProfilePage";
import {BrowserRouter, Routes, Route, Router } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar/Navbar";

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
        <Navbar/>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/translation" element={<TranslationPage onLogout={handleLogout} />} />
          <Route path="/profile" element={<ProfilePage onLogout={handleLogout} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

