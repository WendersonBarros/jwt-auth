import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { authenticatedUser } = useContext(AuthContext);
  console.log(authenticatedUser)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1 style={{paddingBottom: "1rem"}}>Home page</h1>
      <h3>ID: {authenticatedUser.id}</h3>
      <h3>NAME: {authenticatedUser.name}</h3>
    </div>
  )
}

export default Home;
