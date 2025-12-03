import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { saveAuth } from '../utils/auth';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function OtpPage({ setAuth }) {
  const location = useLocation();
  const navigate = useNavigate();

  const initialEmail = location.state?.email || '';

  const [email, setEmail] = useState(initialEmail);
  const [otp,   setOtp]   = useState('');

  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState('');
  const [error,   setError]     = useState('');
  const [success, setSuccess]   = useState(false); 

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to verify OTP');
      } else {
        if (data.token && data.user) {
          saveAuth(data.token, data.user);

          if (typeof setAuth === 'function') {
            setAuth({ token: data.token, user: data.user });
          }
        }

        setMessage('OTP verified! You are now logged in.');
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError('Network error while verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ maxWidth: '420px', margin: '2rem auto' }}>
        <h1>Login Successful</h1>
        <p style={{ marginTop: '1rem' }}>
          OTP verified. You are now logged in.
        </p>
        <button
          onClick={() => navigate('/movies')}
          style={{
            padding: '0.5rem 1rem',
            marginTop: '1.5rem',
            cursor: 'pointer',
          }}
        >
          Go to Movies
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '420px', margin: '2rem auto' }}>
      <h1>Verify OTP</h1>
      <p>Enter the OTP sent to your email.</p>

      <form
        onSubmit={handleVerify}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
      >
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
          OTP
          <input
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit code"
            style={{ width: '100%', padding: '0.5rem', letterSpacing: '0.3em' }}
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
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
      {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}
    </div>
  );
}

export default OtpPage;
