import react from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import Notfound from "./pages/Notfound"
function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<Home />} />
        <Route path ="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
