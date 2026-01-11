import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoggedRoute from './pages/protectRouts/LoggedRoute.jsx'
import Home from './pages/Home/Home.jsx'
import UserHome from './pages/layout/UserHome.jsx'
import AuthPage from './pages/auth/AuthPage.jsx'
import LoggedOutRote from './pages/protectRouts/LoggedOutRote.jsx'
import NotFound from './pages/NotFount/NotFound.jsx'
import Login from './pages/auth/Login.jsx'




function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        limit={1}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          {/* Protected routes - user must be logged in */}
          <Route element={<LoggedRoute />}>
            <Route element={<UserHome />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Route>

          {/* Public routes - user must be logged out */}
          <Route element={<LoggedOutRote />}>
            <Route element={<AuthPage />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
