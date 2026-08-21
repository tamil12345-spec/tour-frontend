import { useEffect, useState } from 'react';
import api from '../api/axios';

const emptyForm = {
  title: '',
  summary: '',
  description: '',
  destination: '',
  price: '',
  duration: '',
  maxGroupSize: 10,
  difficulty: 'easy',
  coverImage: '',
  featured: false,
};

const AdminDashboard = () => {
  const [tab, setTab] = useState('tours');
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTours = async () => {
    const { data } = await api.get('/tours', { params: { limit: 100 } });
    setTours(data.tours);
  };

  const fetchBookings = async () => {
    const { data } = await api.get('/bookings');
    setBookings(data.bookings);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchTours(), fetchBookings()]);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        duration: Number(form.duration),
        maxGroupSize: Number(form.maxGroupSize),
      };

      if (editingId) {
        await api.put(`/tours/${editingId}`, payload);
        setSuccess('Tour updated');
      } else {
        await api.post('/tours', payload);
        setSuccess('Tour created');
      }
      resetForm();
      fetchTours();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save tour');
    }
  };

  const handleEdit = (tour) => {
    setEditingId(tour._id);
    setForm({
      title: tour.title,
      summary: tour.summary,
      description: tour.description,
      destination: tour.destination,
      price: tour.price,
      duration: tour.duration,
      maxGroupSize: tour.maxGroupSize,
      difficulty: tour.difficulty,
      coverImage: tour.coverImage || '',
      featured: tour.featured,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tour permanently?')) return;
    try {
      await api.delete(`/tours/${id}`);
      fetchTours();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete tour');
    }
  };

  const handleBookingStatus = async (booking, status) => {
    if (status === 'confirmed' && !booking.paid) {
      alert('This booking has not been paid yet, so it cannot be confirmed. You can cancel it instead.');
      return;
    }
    try {
      await api.put(`/bookings/${booking._id}/status`, { status });
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not update booking');
    }
  };

  return (
    <section className="container mt-lg">
      <span className="eyebrow">Control room</span>
      <h1>Admin Dashboard</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <button className={`btn btn-sm ${tab === 'tours' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab('tours')}>
          Manage Tours
        </button>
        <button className={`btn btn-sm ${tab === 'bookings' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab('bookings')}>
          All Bookings
        </button>
      </div>

      {loading ? (
        <div className="spinner-wrap">Loading…</div>
      ) : tab === 'tours' ? (
        <div className="detail-grid">
          <div>
            <h3>Existing Tours ({tours.length})</h3>
            {tours.map((t) => (
              <div className="booking-row" key={t._id}>
                <div>
                  <strong>{t.title}</strong>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-soft)' }}>
                    {t.destination} · ${t.price} · {t.duration}d
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => handleEdit(t)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="booking-panel">
            <h3>{editingId ? 'Edit Tour' : 'Create Tour'}</h3>
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Destination</label>
                <input name="destination" value={form.destination} onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Summary</label>
                <input name="summary" value={form.summary} onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Description</label>
                <textarea name="description" rows={3} value={form.description} onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Cover image URL</label>
                <input name="coverImage" value={form.coverImage} onChange={handleChange} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="field">
                  <label>Price (USD)</label>
                  <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label>Duration (days)</label>
                  <input name="duration" type="number" min="1" value={form.duration} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label>Max group size</label>
                  <input name="maxGroupSize" type="number" min="1" value={form.maxGroupSize} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Difficulty</label>
                  <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                  </select>
                </div>
              </div>
              <div className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  style={{ width: 'auto' }}
                />
                <label htmlFor="featured" style={{ margin: 0 }}>Featured on homepage</label>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-primary" type="submit">
                  {editingId ? 'Update Tour' : 'Create Tour'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-outline" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </aside>
        </div>
      ) : (
        <div>
          <h3>All Bookings ({bookings.length})</h3>
          {bookings.map((b) => (
            <div className="booking-row" key={b._id}>
              <div>
                <strong>{b.tour?.title || 'Tour removed'}</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-soft)' }}>
                  {b.user?.name} ({b.user?.email})
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  className="badge"
                  style={{ color: b.paid ? 'var(--color-forest)' : 'var(--color-rust)' }}
                >
                  {b.paid ? 'Paid' : 'Unpaid'}
                </span>
                <span className={`badge badge-${b.status}`}>{b.status}</span>
                <select
                  value={b.status}
                  onChange={(e) => handleBookingStatus(b, e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: 4, border: '1.5px solid var(--color-line)' }}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed" disabled={!b.paid}>
                    Confirmed{!b.paid ? ' (requires payment)' : ''}
                  </option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;