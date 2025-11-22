import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import MovieListPage from "./pages/MovieListPage.jsx";
import MovieCreatePage from "./pages/MovieCreatePage.jsx";
import MovieDetailPage from "./pages/MovieDetailPage.jsx";
import MovieEditPage from "./pages/MovieEditPage.jsx";

import "./App.css";

function App() {
  return (
    <div className="app-root">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<MovieListPage />} />
          <Route path="/movies/add" element={<MovieCreatePage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/movies/:id/edit" element={<MovieEditPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;