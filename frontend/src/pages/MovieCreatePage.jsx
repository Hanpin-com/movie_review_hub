import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function MovieCreatePage() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");

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
    if (!genre.trim()) {
      setError("Genre is required");
      return;
    }

    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders.Authorization) {
        setError("You must be logged in as admin to add a movie.");
        return;
      }

      const res = await fetch(`${API_URL}/api/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        body: JSON.stringify({
          title: title.trim(),
          rating: Number(rating),
          director: director.trim() || undefined,
          genre: genre.trim(),
        }),
      });

      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || "Failed to create movie");
      }

      setSuccess("🎉 Movie created successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create movie");
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Add Movie</h1>
        <p className="page-subtitle">
          Create a new movie record by filling in the form below.
        </p>
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
          <span>Genre (required)</span>
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. Action, Drama"
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

      <div style={{ marginTop: "1rem" }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/movies")}
        >
          Back to list
        </button>
      </div>
    </div>
  );
}

export default MovieCreatePage;
