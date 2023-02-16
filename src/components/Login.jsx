import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('https://fc-assignment02-api-production.up.railway.app/users');
    const users = await response.json();
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      onLogin(existingUser);
    } else {
      const newUser = { username: username, favourites: [] };
      const createResponse = await fetch('https://fc-assignment02-api-production.up.railway.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const createdUser = await createResponse.json();
      onLogin(createdUser);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Name:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
