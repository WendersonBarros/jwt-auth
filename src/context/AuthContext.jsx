import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const tokenCookie = document.cookie
          .split("; ")
          .find(item => item.startsWith("token"))

        if (tokenCookie) {
          const [, token] = tokenCookie.split("=");

          const authenticatedUser = await api.get('/validateuser',
            {
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              }
            }
          );

          console.log(authenticatedUser.response.data)
        }
      } catch (error) {
        console.error("error", error.response.data);
      }
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ authenticatedUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export { AuthProvider, AuthContext };
