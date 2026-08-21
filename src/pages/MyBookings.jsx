import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/bookings/my');
      setBookings(data.bookings);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await api.put(`/bookings/${id}/cancel`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not cancel booking');
    }
  };

  return (
    <section className="container mt-lg">
      <span className="eyebrow">Your itinerary</span>
      <h1>My Bookings</h1>

      {loading ? (
        <div className="spinner-wrap">Loading…</div>
      ) : error ? (
        <div className="form-error">{error}</div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          No bookings yet. <Link to="/tours" style={{ color: 'var(--color-forest)', fontWeight: 600 }}>Browse tours</Link> to plan your next trip.
        </div>
      ) : (
        <div style={{ marginTop: 24 }}>
          {bookings.map((b) => (
            <div className="booking-row" key={b._id}>
              <div>
                <h3 style={{ marginBottom: 4 }}>{b.tour?.title || 'Tour removed'}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', fontFamily: 'var(--font-mono)' }}>
                  {new Date(b.startDate).toLocaleDateString()} · {b.numberOfPeople} traveler(s)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span className={`badge badge-${b.status}`}>{b.status}</span>
                <span className="ticket-price">${b.totalPrice}</span>
                {!b.paid && b.status !== 'cancelled' && (
                  <Link to={`/payment/${b._id}`} className="btn btn-ochre btn-sm">
                    Pay Now
                  </Link>
                )}
                {b.status !== 'cancelled' && (
                  <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b._id)}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBookings;
