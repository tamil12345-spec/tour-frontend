import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import TourCard from '../components/TourCard';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/tours/featured/list');
        setFeatured(data.tours);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/tours${destination ? `?destination=${encodeURIComponent(destination)}` : ''}`);
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Guided Expeditions Worldwide</span>
            <h1>Every good story starts with a departure.</h1>
            <p style={{ fontSize: '1.05rem', maxWidth: 480 }}>
              From the base camps of the Himalayas to whitewashed cliffs on the
              Aegean, Wayfarer plans small-group trips led by local experts —
              you just show up with your boots on.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <span className="hero-stamp">Small Groups</span>
              <span className="hero-stamp" style={{ transform: 'rotate(3deg)' }}>
                Local Guides
              </span>
            </div>
          </div>

          <form className="hero-search" onSubmit={handleSearch}>
            <span className="eyebrow" style={{ marginBottom: 0 }}>Find a tour</span>
            <div className="field" style={{ marginBottom: 0 }}>
              <label htmlFor="destination">Destination</label>
              <input
                id="destination"
                placeholder="e.g. Nepal, Greece, Japan..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Search Tours
            </button>
          </form>
        </div>
      </section>

      <section className="container mt-lg">
        <div className="section-head">
          <div>
            <span className="eyebrow">Handpicked</span>
            <h2>Featured Expeditions</h2>
          </div>
          <a href="/tours" className="btn btn-outline btn-sm">
            View all tours
          </a>
        </div>

        {loading ? (
          <div className="spinner-wrap">Loading tours…</div>
        ) : featured.length === 0 ? (
          <div className="empty-state">
            No featured tours yet. Run the seed script or add tours from the admin panel.
          </div>
        ) : (
          <div className="tour-grid">
            {featured.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
