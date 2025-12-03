import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar.jsx';

import MovieListPage from "./pages/MovieListPage.jsx";
import MovieCreatePage from "./pages/MovieCreatePage.jsx";
import MovieDetailPage from "./pages/MovieDetailPage.jsx";
import MovieEditPage from "./pages/MovieEditPage.jsx";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from './pages/LoginPage.jsx';
import OtpPage from './pages/OtpPage.jsx';

import "./App.css";

import { getAuth, clearAuth } from './utils/auth.js';

function App() {
  const [auth, setAuth] = useState(() => getAuth());
  const isLoggedIn = !!auth?.token;
  const currentUser = auth?.user;

  const handleLogout = () => {
    clearAuth();
    setAuth(null); 
    window.location.href = '/movies';
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />

          <Route path="/movies" element={<MovieListPage />} />

          <Route
            path="/movies/new"
            element={
              isLoggedIn ? <MovieCreatePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/movies/:id/edit"
            element={
              isLoggedIn ? <MovieEditPage /> : <Navigate to="/login" replace />
            }
          />

          <Route path="/movies/:id" element={<MovieDetailPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/otp" element={<OtpPage setAuth={setAuth} />} />

          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
