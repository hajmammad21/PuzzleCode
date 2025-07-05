import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import './MissionView.css';

const MissionView = () => {
  const { missionId } = useParams();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/missions/${missionId}`)
      .then(res => res.json())
      .then(data => {
        setMission(data);
        setCode(data.starter_code || '');
        setLoading(false);
      });
  }, [missionId]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult('');
    try {
      const res = await fetch(`http://localhost:5000/api/missions/${missionId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      setResult(data.result || 'نتیجه‌ای دریافت نشد.');
    } catch (e) {
      setResult('خطا در ارتباط با سرور');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="py-center">در حال بارگذاری ...</div>;
  if (!mission || mission.error) return <div className="py-center">ماموریت پیدا نشد.</div>;

  return (
    <div className="py-mission-view">
      {/* Mission Title & Image */}
      <div className="mission-title">{mission.title}</div>
<div className="mission-meta-bar">
  <span>درجه سختی: {mission.difficulty}</span>
</div>
{mission.image_url && (
  <div className="mission-image-wide-wrap">
    <img src={`http://localhost:5000${mission.image_url}`} className="mission-image-wide" alt={mission.title} />
  </div>
)}

      {/* Mission Description */}
      <div className="mission-desc">
        {mission.description}
      </div>

      {/* Question */}
      <div className="mission-question-box">
        <b>سوال:</b>
        <div>{mission.question}</div>
      </div>

      {/* Hint */}
      {mission.hint && (
        <div className="mission-hint-box">
          <button className="hint-toggle-btn" onClick={() => setShowHint(v => !v)}>
            {showHint ? "پنهان کردن راهنما" : "نمایش راهنما"}
          </button>
          {showHint && <div className="hint-content">{mission.hint}</div>}
        </div>
      )}

      {/* Code Editor */}
      <div className="mission-code-editor" style={{ direction: 'ltr' }}>
        <MonacoEditor
          height="220px"
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            fontFamily: "Fira Mono, Consolas, monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            scrollbar: { vertical: "auto" },
            wordWrap: "on",
            contextmenu: false,
            tabSize: 4,
          }}
        />
      </div>

      <div className="mission-actions">
        <button
          className="mission-submit-btn"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "در حال بررسی..." : "بررسی کد"}
        </button>
      </div>

      {result && (
        <div className="mission-io-section" style={{ background: "#2b343c" }}>
          <span className="mission-io-label">نتیجه:</span>
          <div className="mission-io-example" style={{ color: "#fff", background: "#181a2a" }}>
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionView;
