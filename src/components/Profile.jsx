import React, { useState, useEffect } from 'react';

function Profile({ onLogout }) {
  const [translations, setTranslations] = useState([]);

  const handleClearTranslations = () => {
    // Delete the translations for the current user in the API
    fetch(`https://fc-assignment02-api-production.up.railway.app/translations?username=${localStorage.getItem("username")}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTranslations([]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Get the last 10 translations for the current user from the API
    fetch(`https://fc-assignment02-api-production.up.railway.app/translations?username=${localStorage.getItem("username")}&_limit=10&_sort=id&_order=desc`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTranslations(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Last 10 Translations</h2>
      <ul>
        {translations.map((translation) => (
          <li key={translation.id}>{translation.originalText}</li>
        ))}
      </ul>
      <button onClick={handleClearTranslations}>Clear Translations</button>
      <br />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}


export default Profile;