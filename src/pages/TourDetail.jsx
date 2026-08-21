import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const TourDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [bookingErr, setBookingErr] = useState('');
  const [booking, setBooking] = useState(false);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewErr, setReviewErr] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/tours/${id}`);
      setTour(data.tour);
      const revRes = await api.get(`/tours/${data.tour._id}/reviews`);
      setReviews(revRes.data.reviews);
    } catch (err) {
      setError(err.response?.data?.message || 'Tour not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingErr('');

    if (!user) {
      navigate('/login');
      return;
    }
    if (!startDate) {
      setBookingErr('Please select a start date');
      return;
    }

    setBooking(true);
    try {
      const { data } = await api.post('/bookings', {
        tourId: tour._id,
        numberOfPeople,
        startDate,
      });
      navigate(`/payment/${data.booking._id}`);
    } catch (err) {
      setBookingErr(err.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setReviewErr('');

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post(`/tours/${tour._id}/reviews`, {
        rating: Number(reviewRating),
        comment: reviewComment,
      });
      setReviewComment('');
      setReviewRating(5);
      fetchAll();
    } catch (err) {
      setReviewErr(err.response?.data?.message || 'Could not submit review');
    }
  };

  if (loading) return <div className="spinner-wrap">Loading…</div>;
  if (error) return <div className="container mt-lg form-error">{error}</div>;
  if (!tour) return null;

  return (
    <section className="container mt-lg">
      <span className="eyebrow">{tour.destination}</span>
      <h1>{tour.title}</h1>

      <img
        src={tour.coverImage || 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200'}
        alt={tour.title}
        className="detail-hero"
      />

      <div className="detail-grid">
        <div>
          <p style={{ fontSize: '1.05rem' }}>{tour.description}</p>

          <div className="info-strip">
            <div className="info-item">
              <span className="label">Duration</span>
              <span className="value">{tour.duration} days</span>
            </div>
            <div className="info-item">
              <span className="label">Difficulty</span>
              <span className="value" style={{ textTransform: 'capitalize' }}>{tour.difficulty}</span>
            </div>
            <div className="info-item">
              <span className="label">Group Size</span>
              <span className="value">Up to {tour.maxGroupSize}</span>
            </div>
            <div className="info-item">
              <span className="label">Rating</span>
              <span className="value">★ {tour.ratingsAverage?.toFixed(1)} ({tour.ratingsQuantity})</span>
            </div>
          </div>

          {tour.included?.length > 0 && (
            <>
              <h3>What's included</h3>
              <ul>
                {tour.included.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {tour.excluded?.length > 0 && (
            <>
              <h3>Not included</h3>
              <ul>
                {tour.excluded.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}

          <h3 className="mt-lg">Reviews</h3>
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to share your experience.</p>
          ) : (
            reviews.map((r) => (
              <div key={r._id} className="review-item">
                <div className="review-head">
                  <span>{r.user?.name || 'Traveler'}</span>
                  <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p style={{ margin: 0 }}>{r.comment}</p>
              </div>
            ))
          )}

          <form onSubmit={handleReview} style={{ marginTop: 20 }}>
            <h3>Leave a review</h3>
            {reviewErr && <div className="form-error">{reviewErr}</div>}
            <div className="field">
              <label htmlFor="rating">Rating</label>
              <select id="rating" value={reviewRating} onChange={(e) => setReviewRating(e.target.value)}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                rows={3}
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience..."
              />
            </div>
            <button className="btn btn-outline" type="submit">Submit Review</button>
          </form>
        </div>

        <aside className="booking-panel">
          <span className="ticket-price" style={{ fontSize: '1.6rem' }}>${tour.price}</span>
          <span style={{ color: 'var(--color-ink-soft)', fontSize: '0.85rem' }}> / person</span>

          <form onSubmit={handleBooking} style={{ marginTop: 18 }}>
            {bookingErr && <div className="form-error">{bookingErr}</div>}

            <div className="field">
              <label htmlFor="startDate">Start date</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="field">
              <label htmlFor="people">Travelers</label>
              <input
                id="people"
                type="number"
                min={1}
                max={tour.maxGroupSize}
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(Number(e.target.value))}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 0', fontWeight: 600 }}>
              <span>Total</span>
              <span>${tour.price * numberOfPeople}</span>
            </div>

            <button className="btn btn-primary btn-block" type="submit" disabled={booking}>
              {booking ? 'Booking…' : user ? 'Book this tour' : 'Log in to book'}
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
};

export default TourDetail;