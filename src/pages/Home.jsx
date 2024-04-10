import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function Home() {
  const { authenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1 style={{ paddingBottom: "1rem" }}>Home page</h1>
      <h3>ID: {authenticatedUser.id}</h3>
      <h3>NAME: {authenticatedUser.name}</h3>
      <button onClick={onLogout} style={{ marginTop: "2rem" }}>Logout</button>
    </div>
  )
}

export default Home;
