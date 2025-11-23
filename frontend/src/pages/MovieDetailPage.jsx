import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/movies/${id}`);
        const text = await res.text();

        if (!res.ok) {
          throw new Error(text || `Failed to load movie (status ${res.status})`);
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(
            "Server did not return valid JSON. Response starts with: " +
              text.slice(0, 80)
          );
        }

        setMovie(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <p>Loading movie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="error-text">{error}</p>
        <button className="btn" onClick={() => navigate("/movies")}>
          Back to list
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="page">
        <p>Movie not found.</p>
        <button className="btn" onClick={() => navigate("/movies")}>
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>{movie.title}</h1>
        <p className="page-subtitle">Details for this movie.</p>
      </div>

      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>

      <p>
        <strong>Genre:</strong> {movie.genre || "N/A"}
      </p>

      <p>
        <strong>Director:</strong> {movie.director || "N/A"}
      </p>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <Link to={`/movies/${id}/edit`} className="btn btn-secondary btn-sm">
          Edit
        </Link>
        <button className="btn btn-sm" onClick={() => navigate("/movies")}>
          Back to list
        </button>
      </div>
    </div>
  );
}

export default MovieDetailPage;