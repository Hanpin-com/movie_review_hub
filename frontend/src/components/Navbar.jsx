import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, currentUser, onLogout }) {
  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    backgroundColor: '#222',
    color: '#fff',
    marginBottom: '1rem',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '1rem',
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/movies" style={linkStyle}>
          Movie Review Hub
        </Link>
        <Link to="/movies/new" style={linkStyle}>
          Add Movie
        </Link>
      </div>

      <div>
        {isLoggedIn && currentUser ? (
          <>
            <span style={{ marginRight: '1rem', fontSize: '0.9rem' }}>
              Logged in as <strong>{currentUser.email}</strong>
              {currentUser.role && ` (${currentUser.role})`}
            </span>
            <button
              onClick={onLogout}
              style={{
                padding: '0.25rem 0.75rem',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
