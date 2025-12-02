import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

import MovieListPage from "./pages/MovieListPage.jsx";
import MovieCreatePage from "./pages/MovieCreatePage.jsx";
import MovieDetailPage from "./pages/MovieDetailPage.jsx";
import MovieEditPage from "./pages/MovieEditPage.jsx";

import LoginPage from './pages/LoginPage.jsx';
import OtpPage from './pages/OtpPage.jsx';

import "./App.css";

import { getAuth, clearAuth } from './utils/auth.js';

function App() {
  const auth = getAuth();
  const isLoggedIn = !!auth?.token;
  const currentUser = auth?.user;

  const handleLogout = () => {
    clearAuth();
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
          <Route path="/movies/new" element={<MovieCreatePage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/movies/:id/edit" element={<MovieEditPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OtpPage />} />

          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
