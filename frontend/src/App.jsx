import react from "react";
import { useEffect } from "react";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./assets/components/registration/Login";
import SignUp from "./assets/components/registration/SignUp";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import KhatmahPage from "./pages/KhatmahPage";
import UserDashboard from "./pages/UserDashboard";

import "./App.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />

        {/* مهمه متحذفهاش 2- دي لسه مش مفهوم المنطق بتاعها هتظهر امتي وهكذا ولكن هي خلصانه */}
         <Route path="/KhatmahPage" element={<KhatmahPage />} /> 
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Notfound />} />

        <Route
          path="/UserDashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // تعمل scroll كل ما تتغير الصفحة

  return null; // مفيش مخرجات، هو بس مكون لمتابعة الموقع
}

export default App;
