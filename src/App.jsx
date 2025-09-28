import React, { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // ✅ import auth

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h1 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h1>;
  }

  // ✅ Protected Route component
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <ToastContainer theme="dark"/>
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/player/:id" element={<PrivateRoute><Player /></PrivateRoute>} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
    </div>
  );
};

export default App;
