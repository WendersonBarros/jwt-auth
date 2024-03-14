import React, { useContext } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthContext } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';

function AuthRoutesWrapper() {
  const { authenticatedUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  if (authenticatedUser) {
    return <Outlet />;
  }

  return <Navigate to="/login" />
}

export default function CustomRouter() {
  return (
    <Routes>
      <Route element={<AuthRoutesWrapper />} >
        <Route exact path='/' element={<Home />} />
      </Route>
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
    </Routes>
  )
}
