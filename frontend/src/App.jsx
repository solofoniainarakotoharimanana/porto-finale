
// import heroImg from './assets/hero.png'
import './App.css'


import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./route/protectedRoute.jsx"
import HomeUser from './pages/home/HomeUser.jsx';
import HomeCompany from './pages/home/HomeCompany.jsx';
import useAuthStore from './store/store.js';
import { useEffect, useState } from 'react';
import ProjectAccordingStatus from './pages/user/ProjectAccordingStatus.jsx';
import RequestCompletion from './components/projects/RequestCompletion.jsx';

function App() {
  const { token, user } = useAuthStore(state => state)

  return (
    <>
      <Router>
        <Routes>
          {/* PUBLIC ROUTE */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* PROTECTED ROUTE */}

          <Route element={<ProtectedRoute token={token} />}>
            <Route path="/" element={<HomeUser />} />
            <Route path="/user-dashboard" element={<HomeUser />} />
            <Route path="/projects-according-status" element={<ProjectAccordingStatus />} />
            <Route path="/user-company" element={<HomeCompany />} />
            <Route path="/completion-request/:projectId" element={<RequestCompletion />} />
          </Route>

        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App
