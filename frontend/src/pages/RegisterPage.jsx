import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
        setMessage('Account created');
        setTimeout(() => navigate('/login'), 800);
      }
    } catch (err) {
      setError('Network error while registering.');
    } finally {
      setLoading(false);
    }
  };

  const goLogin = () => navigate('/login');

  return (
    <div style={{ maxWidth: '420px', margin: '2rem auto' }}>
      <h1>Register</h1>
      <p>Create a new account.</p>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label>
          Username
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            marginTop: '0.5rem',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <button
        onClick={goLogin}
        style={{
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          width: '100%',
          background: '#444',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Back to Login
      </button>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
      {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}
    </div>
  );
}

export default RegisterPage;
