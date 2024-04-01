import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { setAuthenticatedUser } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

    try {
      const { data: { id, name, token } } = await api.post(
        "/login",
        { login, password }
      );
      setAuthenticatedUser({ id, name })

      // 2hr = 2*60*60 = 7200
      document.cookie = `token=${token}; max-age=7200; path=/;`;
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  }

  const onRegisterClick = () => {
    navigate("/register");
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
