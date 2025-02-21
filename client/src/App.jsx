import React from 'react';
import NavBar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage.jsx';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';


function App() {
  const {authUser,checkAuth , isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth(); 
//     a special function in React that runs code when a component loads,
// updates, or unmounts. EX; (connecting Database).
  }, [checkAuth])
  console.log({authUser});

  if (isCheckingAuth && !authUser) return (
    <div className = "flex items-center justify-center h-screen ">
    <Loader className = "size-10 animate-spin"/>
    </div>
  )

  return (
    <>
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/"/> } />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
    </>
  )
}

export default App
