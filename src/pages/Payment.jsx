import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const formatCardNumber = (value) =>
  value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/bookings/${id}`);
        setBooking(data.booking);
        if (data.booking.paid) setSuccess(true);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load booking');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handlePay = async (e) => {
    e.preventDefault();
    setPayError('');

    const digitsOnly = cardNumber.replace(/\s/g, '');
    if (digitsOnly.length !== 16) {
      setPayError('Enter a valid 16-digit card number');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setPayError('Enter expiry as MM/YY');
      return;
    }
    if (!/^\d{3,4}$/.test(cvc)) {
      setPayError('Enter a valid CVC');
      return;
    }
    if (!cardName.trim()) {
      setPayError('Enter the name on the card');
      return;
    }

    setPaying(true);
    try {
      // This calls a mock "pay" endpoint on the backend that simply marks
      // the booking as paid. No real card data is transmitted or stored --
      // swap this for a real payment gateway (Stripe, Razorpay, etc.) when
      // you're ready to accept live payments.
      const { data } = await api.put(`/bookings/${id}/pay`);
      setBooking(data.booking);
      setSuccess(true);
    } catch (err) {
      setPayError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <div className="spinner-wrap">Loading…</div>;
  if (error) return <div className="container mt-lg form-error">{error}</div>;
  if (!booking) return null;

  if (success) {
    return (
      <section className="container mt-lg">
        <div className="form-card text-center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Payment confirmed</span>
          <h2>You're all booked!</h2>
          <p>
            Your trip to <strong>{booking.tour?.title}</strong> is confirmed. A
            receipt has been added to your bookings.
          </p>
          <div className="ticket-meta" style={{ padding: '14px 0', borderTop: '1px dashed var(--color-line-strong)', borderBottom: '1px dashed var(--color-line-strong)', margin: '20px 0' }}>
            <span>Booking ID</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{booking._id}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Link to="/my-bookings" className="btn btn-primary">View My Bookings</Link>
            <Link to="/tours" className="btn btn-outline">Browse More Tours</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mt-lg">
      <span className="eyebrow">Secure checkout</span>
      <h1>Complete your payment</h1>

      <div className="detail-grid">
        <form className="form-card" style={{ margin: 0 }} onSubmit={handlePay}>
          <h3>Card details</h3>
          {payError && <div className="form-error">{payError}</div>}

          <div className="field">
            <label htmlFor="cardName">Name on card</label>
            <input
              id="cardName"
              placeholder="Alex Traveler"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="cardNumber">Card number</label>
            <input
              id="cardNumber"
              placeholder="4242 4242 4242 4242"
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="field">
              <label htmlFor="expiry">Expiry (MM/YY)</label>
              <input
                id="expiry"
                placeholder="12/28"
                inputMode="numeric"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="cvc">CVC</label>
              <input
                id="cvc"
                placeholder="123"
                inputMode="numeric"
                maxLength={4}
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                required
              />
            </div>
          </div>

          <p style={{ fontSize: '0.78rem', marginTop: -4 }}>
            This is a demo checkout — no real card is charged, and card details
            aren't transmitted or stored.
          </p>

          <button className="btn btn-primary btn-block" type="submit" disabled={paying}>
            {paying ? 'Processing…' : `Pay $${booking.totalPrice}`}
          </button>
        </form>

        <aside className="booking-panel">
          <h3>Order summary</h3>
          <div className="info-item" style={{ marginBottom: 14 }}>
            <span className="label">Tour</span>
            <span className="value">{booking.tour?.title}</span>
          </div>
          <div className="info-strip" style={{ margin: '14px 0' }}>
            <div className="info-item">
              <span className="label">Destination</span>
              <span className="value">{booking.tour?.destination}</span>
            </div>
            <div className="info-item">
              <span className="label">Travelers</span>
              <span className="value">{booking.numberOfPeople}</span>
            </div>
            <div className="info-item">
              <span className="label">Start date</span>
              <span className="value">{new Date(booking.startDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginTop: 16 }}>
            <span>Total</span>
            <span className="ticket-price">${booking.totalPrice}</span>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Payment;
