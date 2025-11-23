import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchMovies() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/api/movies?limit=1000`);

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || `Failed to load movies (status ${res.status})`);
      }

      let json;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error(
          "Server did not return valid JSON. Response starts with: " +
            text.slice(0, 80)
        );
      }

      const data = Array.isArray(json.data) ? json.data : [];
      setMovies(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await fetch(`${API_URL}/api/movies/${id}`, {
        method: "DELETE",
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "Failed to delete movie");
      }

      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete movie");
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Movies</h1>
        <p className="page-subtitle">
          Browse and manage your movie collection.
        </p>
      </div>

      {error && <p className="error-text">{error}</p>}

      {movies.length === 0 ? (
        <p>No movies found. Try adding one!</p>
      ) : (
        <table className="movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Rating</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>
                  <Link to={`/movies/${movie._id}`} className="movie-link">
                    {movie.title}
                  </Link>
                </td>
                <td>{movie.rating}</td>
                <td className="actions-col">
                  <Link
                    to={`/movies/${movie._id}/edit`}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MovieListPage;