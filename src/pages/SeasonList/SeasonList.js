import React, { useEffect, useState } from 'react';
import './SeasonList.css';
import PuzzleLoading from '../../Components/PuzzleLoading/PuzzleLoading';
import PuzzleBackground from './PuzzleBackground';

const PER_PAGE = 12;

const SeasonList = () => {
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:5000/api/seasons')
      .then(res => res.json())
      .then(data => {
        setSeasons(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <PuzzleLoading />;

  const totalPages = Math.ceil(seasons.length / PER_PAGE);
  const currentSeasons = seasons.slice((page-1)*PER_PAGE, page*PER_PAGE);

  return (
    <div className="py-lesson-list">
      <PuzzleBackground />
      <div className="py-lesson-content">
        <h1 className="py-lesson-header">فصل‌های پایتون</h1>
        <div className="lesson-cards-grid">
          {currentSeasons.map(season => (
            <div className="lesson-card" key={season.id}>
              <div className="lesson-card-img">
                <img
                  src={`http://localhost:5000${season.image_url}`}
                  alt={season.title}
                  style={{ width: "260px", height: "260px", objectFit: "contain" }}
                />
              </div>
              <div className="lesson-card-body">
                <div className="lesson-title">{season.title}</div>
                <div className="lesson-info">{season.description}</div>
                <button
                  className="lesson-start-btn"
                  onClick={() => window.location.href = `/python/season/${season.id}`}
                >
                  شروع
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="py-lesson-pagination">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
          >قبلی</button>
          <span>صفحه {page} از {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          >بعدی</button>
        </div>
      </div>
    </div>
  );
};

export default SeasonList;