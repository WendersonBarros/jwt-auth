import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function Register() {
  const [account, setAccount] = useState({
    name: "",
    login: "",
    password: ""
  });

  const navigate = useNavigate();

  const onChange = (event, key) => {
    setAccount(account => (
      {
        ...account,
        [key]: event.target.value
      }
    ));
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!account.name.trim().length) {
      alert("Name input not filled in correctly!");
      return;
    }

    if (!account.login.trim().length) {
      alert("Login input not filled in correctly!");
      return;
    }

    if (!account.password.trim().length) {
      alert("Password input not filled in correctly!");
      return;
    }

    try {
      await api.post("/register", account);

      alert("Account registered successfully!")

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  }

  const onLoginPageClick = () => {
    navigate("/login");
  }

  return (
    <main>
      <h1>Register your account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            type='text'
            value={account.name}
            onChange={(e) => onChange(e, "name")}
            required
          />
        </div>
        <div>
          <label>Login</label>
          <input
            type='text'
            value={account.login}
            onChange={(e) => onChange(e, "login")}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={account.password}
            onChange={(e) => onChange(e, "password")}
            required
          />
        </div>
        <div>
          <button type='submit' onClick={onsubmit}>Register</button>
          <button type='button' onClick={onLoginPageClick}>Login Page</button>
        </div>
      </form>
    </main>
  )
}
export default Register;
