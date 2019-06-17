import React, { useState } from 'react';

// we can write function components also as a declaration (not only expression), which can be exported immediately (we can't do it with arrow function):
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      username,
      password
    };
    setUser(userData);
    // clear the form:
    setUsername('');
    setPassword('');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <form
        action=""
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyItems: 'center'
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        {/* With hooks we use inline arrow function to handle onChange with separate setter */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
