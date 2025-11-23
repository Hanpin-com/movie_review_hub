import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function MovieCreatePage() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [director, setDirector] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

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
      const res = await fetch(`${API_URL}/api/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          rating: Number(rating),
          director: director.trim() || undefined,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "Failed to create movie");
      }

      setSuccess("Movie created successfully!");

      setTimeout(() => {
        navigate("/movies");
      }, 800);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create movie");
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Add Movie</h1>
        <p className="page-subtitle">Fill out the form to add a new movie.</p>
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
          Create
        </button>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
      </form>
    </div>
  );
}

export default MovieCreatePage;