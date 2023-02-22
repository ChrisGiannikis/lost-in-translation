import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import TranslationPage from "./pages/TranslationPage";
import ProfilePage from "./pages/ProfilePage";
import {BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar/Navbar";

function App() {

  const [setLoggedIn] = useState(false);

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
          <Route path='*' element={
              <>
                <h1>There's nothing here 👻</h1>
                <NavLink to="/">Return Home</NavLink>
              </>
            } />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

