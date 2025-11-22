import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Movie Review Hub</div>
      <div className="navbar-links">
        <NavLink to="/movies" className="nav-link">
          Movies
        </NavLink>
        <NavLink to="/movies/add" className="nav-link">
          Add Movie
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;