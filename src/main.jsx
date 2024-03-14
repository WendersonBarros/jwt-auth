import React from 'react'
import ReactDOM from 'react-dom/client'
import CustomRouter from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <CustomRouter />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
