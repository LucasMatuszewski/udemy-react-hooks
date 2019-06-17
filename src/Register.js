import React, { useState } from 'react';

const initialFormState = {
  username: '',
  email: '',
  password: ''
};
export default function Register() {
  const [form, setForm] = useState(initialFormState);
  const [user, setUser] = useState(null);

  const handleForm = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUser(form);
    setForm(initialFormState);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Register</h2>
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
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleForm}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleForm}
        />
        {/* With hooks we use inline arrow function to handle onChange with separate setter */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleForm}
        />
        <button type="submit">Submit</button>
      </form>

      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
