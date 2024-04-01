import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const tokenCookie = document.cookie
          .split("; ")
          .find(item => item.startsWith("token"))

        if (tokenCookie) {
          const [, token] = tokenCookie.split("=");

          const { data: { id, name } } = await api.get('/validateuser',
            {
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              }
            }
          );

          setAuthenticatedUser({ id, name })
        }
      } catch (error) {
        console.error("error", error.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [])

  return (
    <AuthContext.Provider value={
      {
        authenticatedUser,
        setAuthenticatedUser,
        loading,
        setLoading
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export { AuthProvider, AuthContext };
