import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import TourCard from '../components/TourCard';

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState('');

  const keyword = searchParams.get('keyword') || '';
  const destination = searchParams.get('destination') || '';
  const difficulty = searchParams.get('difficulty') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError('');
      try {
        const params = { page, limit: 9 };
        if (keyword) params.keyword = keyword;
        if (destination) params.destination = destination;
        if (difficulty) params.difficulty = difficulty;
        if (sort) params.sort = sort;

        const { data } = await api.get('/tours', { params });
        setTours(data.tours);
        setPages(data.pages || 1);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load tours');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [keyword, destination, difficulty, sort, page]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set('page', '1');
    setSearchParams(next);
  };

  const goToPage = (p) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(p));
    setSearchParams(next);
  };

  return (
    <section className="container mt-lg">
      <span className="eyebrow">Browse</span>
      <h1>All Tours</h1>

      <div className="filters-bar">
        <input
          placeholder="Search keyword..."
          defaultValue={keyword}
          onKeyDown={(e) => {
            if (e.key === 'Enter') updateParam('keyword', e.target.value);
          }}
        />
        <input
          placeholder="Destination..."
          defaultValue={destination}
          onKeyDown={(e) => {
            if (e.key === 'Enter') updateParam('destination', e.target.value);
          }}
        />
        <select value={difficulty} onChange={(e) => updateParam('difficulty', e.target.value)}>
          <option value="">All difficulties</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="challenging">Challenging</option>
        </select>
        <select value={sort} onChange={(e) => updateParam('sort', e.target.value)}>
          <option value="">Sort: Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {loading ? (
        <div className="spinner-wrap">Loading tours…</div>
      ) : error ? (
        <div className="form-error">{error}</div>
      ) : tours.length === 0 ? (
        <div className="empty-state">No tours match your search. Try adjusting your filters.</div>
      ) : (
        <>
          <div className="tour-grid">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>

          {pages > 1 && (
            <div className="pagination">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={p === page ? 'active' : ''}
                  onClick={() => goToPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Tours;
