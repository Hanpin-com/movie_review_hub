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
        setError("You are not logged in. Please log in first.");
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
        <p className="page-subtitle">Fill out the form to add a new movie.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
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
