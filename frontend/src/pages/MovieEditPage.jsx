import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function MovieEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [director, setDirector] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/movies/${id}`);
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

        setTitle(data.title || "");
        setRating(data.rating ?? "");
        setDirector(data.director || "");
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!rating || isNaN(Number(rating))) {
      setError("Rating must be a valid number");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          rating: Number(rating),
          director: director.trim() || undefined,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "Failed to update movie");
      }

      setSuccess("Movie updated successfully!");

      setTimeout(() => {
        navigate(`/movies/${id}`);
      }, 800);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update movie");
    }
  }

  if (loading) {
    return (
      <div className="page">
        <p>Loading movie...</p>
      </div>
    );
  }

  if (error && !title && !rating && !director) {
    return (
      <div className="page">
        <p className="error-text">{error}</p>
        <button className="btn" onClick={() => navigate("/movies")}>
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Edit Movie</h1>
        <p className="page-subtitle">Update the fields and save changes.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        <label className="form-field">
          <span>Title (required)</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Movie title"
          />
        </label>

        <label className="form-field">
          <span>Rating (number)</span>
          <input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="e.g. 8.5"
          />
        </label>

        <label className="form-field">
          <span>Director</span>
          <input
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="Director name"
          />
        </label>

        <button type="submit" className="btn">
          Save changes
        </button>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
      </form>
    </div>
  );
}

export default MovieEditPage;