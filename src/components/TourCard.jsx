import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  const image =
    tour.coverImage ||
    'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800';

  return (
    <Link to={`/tours/${tour.slug || tour._id}`} className="ticket-card">
      <div style={{ position: 'relative' }}>
        <img src={image} alt={tour.title} className="ticket-image" />
        <span className="ticket-badge">{tour.duration} days</span>
      </div>

      <div className="ticket-body">
        <span className="ticket-dest">{tour.destination}</span>
        <h3>{tour.title}</h3>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          {tour.summary?.length > 90 ? `${tour.summary.slice(0, 90)}…` : tour.summary}
        </p>
        <span className={`badge badge-${tour.difficulty}`} style={{ marginTop: 8, width: 'fit-content' }}>
          {tour.difficulty}
        </span>
      </div>

      <div className="ticket-perforation" />
      <div className="ticket-meta">
        <span>★ {tour.ratingsAverage?.toFixed(1) || '4.5'} ({tour.ratingsQuantity || 0})</span>
        <span className="ticket-price">${tour.price}</span>
      </div>
    </Link>
  );
};

export default TourCard;
