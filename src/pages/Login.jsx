import React, { useState } from 'react';
import api from '../utils/api';

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    if (event.target.type === "text") {
      setLogin(event.target.value);
      return;
    }

    setPassword(event.target.value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!login.trim().length) {
      alert("Login input not filled in correctly!");
      return;
    }

    if (!password.trim().length) {
      alert("Password input not filled in correctly!");
      return;
    }

    const response = await api.post("/login", { login, password });
    console.log({response})
  }

  const onRegisterClick = () => {
    console.log("on register")
  }

  return (
    <main>
      <h1>Log in to your account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Login</label>
          <input
            type='text'
            value={login}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <button type='submit' onClick={onsubmit}>Enter</button>
          <button type='button' onClick={onRegisterClick}>Register</button>
        </div>
      </form>
    </main>
  )
}

export default Login;
