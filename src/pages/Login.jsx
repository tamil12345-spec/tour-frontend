import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAIL = 'admin@tourapp.com';
  const ADMIN_PASSWORD = 'admin1234';

  const fillAdminCreds = () => {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASSWORD);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/tours');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <span className="eyebrow">Welcome back</span>
      <h2>Log in</h2>

      <div
        style={{
          background: 'rgba(201, 138, 44, 0.1)',
          border: '1px solid var(--color-ochre)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
          marginBottom: 18,
          fontSize: '0.85rem',
        }}
      >
        <strong style={{ color: 'var(--color-ochre)' }}>Demo admin account</strong>
        <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          {ADMIN_EMAIL} / {ADMIN_PASSWORD}
        </div>
        <button
          type="button"
          onClick={fillAdminCreds}
          className="btn btn-outline btn-sm"
          style={{ marginTop: 8 }}
        >
          Autofill admin login
        </button>
      </div>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p style={{ marginTop: 18, fontSize: '0.9rem' }}>
        New here? <Link to="/register" style={{ color: 'var(--color-forest)', fontWeight: 600 }}>Create an account</Link>
      </p>
    </div>
  );
};

export default Login;