import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from "./components/NavBar";
import HomePage from '/client/src/pages/HomePage';
import LogInPage from '/client/src/pages/LogInPage.jsx';
import SignUpPage from '/client/src/pages/SignUpPage';
import SettingsPage from '/client/src/pages/SettingsPage';
import ProfilePage from '/client/src/pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore.js';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth, isCheckingAuth , onlineUsers } = useAuthStore();
  console.log({onlineUsers})
  useEffect(() => {
     checkAuth(); // ✅ Ensures it runs only if needed
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate replace to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate replace to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate replace to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate replace to="/login" />} />
        <Route path="*" element={<Navigate replace to="/" />} />  {/* ✅ Handles unknown routes */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
