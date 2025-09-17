import { useState } from "react";

import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import {auth} from "./firebase/firebaseconfig"
import { useSelector } from "react-redux";


 function App() {
  const { user, loading } = useSelector((state) => state.auth);
  
  return (
    <>
      <div>
        
      <Routes>
        {/* default route → if user logged in go to dashboard, else login */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    
      </div>
    </>
  );
}

export default App;
