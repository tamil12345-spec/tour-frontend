import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" />
          Wayfarer
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/tours" className={({ isActive }) => (isActive ? 'active' : '')}>
            Tours
          </NavLink>
          {user && user.role !== 'admin' && (
            <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? 'active' : '')}>
              My Bookings
            </NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <span style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)' }}>
                Hi, {user.name.split(' ')[0]}
              </span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                Log in
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;