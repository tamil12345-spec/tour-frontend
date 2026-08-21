import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container empty-state">
    <h2>404 — Off the map</h2>
    <p>This trail doesn't exist. Let's get you back on route.</p>
    <Link to="/" className="btn btn-primary">Back home</Link>
  </div>
);

export default NotFound;
