import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        // 後端會寄 OTP（或在 console log），這裡只顯示訊息，然後導到 OTP 頁面
        setMessage(data.message || 'OTP has been sent to your email.');
        // 把 email 帶去 OTP 頁面
        setTimeout(() => {
          navigate('/otp', { state: { email } });
        }, 800);
      }
    } catch (err) {
      console.error(err);
      setError('Network error while logging in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '2rem auto' }}>
      <h1>Login</h1>
      <p>Enter your email and password to receive an OTP.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
      {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
