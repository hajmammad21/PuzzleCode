import React, { useEffect, useState } from 'react';
import './SeasonMissions.css';
import { useParams } from 'react-router-dom';
import PuzzleLoading from '../../Components/PuzzleLoading/PuzzleLoading';

const SeasonMissions = () => {
  const { seasonId } = useParams();
  const [season, setSeason] = useState(null);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:5000/api/seasons/${seasonId}`).then(r => r.json()),
      fetch(`http://localhost:5000/api/seasons/${seasonId}/missions`).then(r => r.json())
    ]).then(([seasonData, missionsData]) => {
      setSeason(seasonData);
      setMissions(missionsData);
      setLoading(false);
    });
  }, [seasonId]);

 if (loading) return <PuzzleLoading />;
  if (!season) return <div className="py-center">فصل پیدا نشد.</div>;

  return (
    <div className="py-mission-list">
      <div className="season-top-box">
        <h2 className="season-title">{season.title}</h2>
        <p className="season-desc">{season.description}</p>
      </div>
      <div className="missions-box">
        {missions.map((mission, idx) => (
          <div
            className={`mission-row${mission.is_locked ? ' locked' : mission.is_solved ? ' solved' : ''}`}
            key={mission.id}
            onClick={() => !mission.is_locked && (window.location.href = `/python/mission/${mission.id}`)}
            style={{cursor: mission.is_locked ? 'not-allowed' : 'pointer'}}
          >
            <span className="mission-index">{idx + 1}</span>
            <span className="mission-title2">{mission.title}</span>
            <span className="mission-difficulty">{mission.difficulty}</span>
            {mission.is_solved && <span className="mission-status solved">حل شد</span>}
            {mission.is_locked && <span className="mission-status locked">🔒</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonMissions;
