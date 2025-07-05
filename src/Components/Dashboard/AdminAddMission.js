import React, { useState, useEffect } from 'react';
import './AdminAddMission.css';

export default function AdminDashboard() {
  const [seasons, setSeasons] = useState([]);
  const [missions, setMissions] = useState([]);
  const [seasonForm, setSeasonForm] = useState({ title: "", description: "", image_url: "" });
  const [editSeasonId, setEditSeasonId] = useState(null);
  const [editSeasonForm, setEditSeasonForm] = useState({ title: "", description: "", image_url: "" });

  const [missionForm, setMissionForm] = useState({
    season_id: "",
    title: "",
    description: "",
    image_url: "",
    question: "",
    hint: "",
    starter_code: "",
    difficulty: "",
    is_locked: false
  });

  // Load all seasons and missions
  function loadSeasons() {
    fetch('http://localhost:5000/api/seasons')
      .then(res => res.json())
      .then(setSeasons);
  }
  function loadMissions() {
    fetch('http://localhost:5000/api/missions')
      .then(res => res.json())
      .then(setMissions);
  }
  useEffect(() => { loadSeasons(); loadMissions(); }, []);

  // ---------- MISSIONS ----------
  function handleMissionChange(e) {
    const { name, value, type, checked } = e.target;
    setMissionForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  }
  function handleMissionSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5000/api/missions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(missionForm)
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          alert("Mission added!");
          setMissionForm({
            season_id: "",
            title: "",
            description: "",
            image_url: "",
            question: "",
            hint: "",
            starter_code: "",
            difficulty: "",
            is_locked: false
          });
          loadMissions();
        } else {
          alert("Failed to add mission");
        }
      });
  }
  function deleteMission(id) {
    if (!window.confirm("Delete this mission?")) return;
    fetch(`http://localhost:5000/api/missions/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) loadMissions();
      });
  }

  // ---------- SEASONS ----------
  function handleSeasonChange(e) {
    const { name, value } = e.target;
    setSeasonForm(f => ({ ...f, [name]: value }));
  }
  function handleAddSeason(e) {
    e.preventDefault();
    fetch('http://localhost:5000/api/seasons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seasonForm)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSeasonForm({ title: "", description: "", image_url: "" });
          loadSeasons();
        }
      });
  }
  function startEditSeason(season) {
    setEditSeasonId(season.id);
    setEditSeasonForm({
      title: season.title,
      description: season.description,
      image_url: season.image_url || ""
    });
  }
  function handleEditSeasonChange(e) {
    const { name, value } = e.target;
    setEditSeasonForm(f => ({ ...f, [name]: value }));
  }
  function handleEditSeasonSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/api/seasons/${editSeasonId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editSeasonForm)
    })
      .then(res => res.json())
      .then(data => {
        setEditSeasonId(null);
        loadSeasons();
      });
  }
  function deleteSeason(id) {
    if (!window.confirm("Delete this season?")) return;
    fetch(`http://localhost:5000/api/seasons/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        if (data.success) loadSeasons();
      });
  }

  // ---------------- UI --------------
  return (
    <div className="admin-add-mission">
      <h2>مدیریت فصل‌ها</h2>
      <form onSubmit={handleAddSeason} style={{ marginBottom: 16 }}>
        <input name="title" value={seasonForm.title} onChange={handleSeasonChange} placeholder="عنوان فصل" required />
        <input name="description" value={seasonForm.description} onChange={handleSeasonChange} placeholder="توضیح" />
        <input name="image_url" value={seasonForm.image_url} onChange={handleSeasonChange} placeholder="آدرس عکس" />
        <button type="submit">افزودن فصل</button>
      </form>
      <table border="1" cellPadding="4" cellSpacing="0">
        <thead>
          <tr>
            <th>عنوان</th>
            <th>توضیح</th>
            <th>آدرس عکس</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map(season =>
            editSeasonId === season.id ? (
              <tr key={season.id}>
                <td><input name="title" value={editSeasonForm.title} onChange={handleEditSeasonChange} /></td>
                <td><input name="description" value={editSeasonForm.description} onChange={handleEditSeasonChange} /></td>
                <td><input name="image_url" value={editSeasonForm.image_url} onChange={handleEditSeasonChange} /></td>
                <td>
                  <button onClick={handleEditSeasonSubmit}>ذخیره</button>
                  <button onClick={() => setEditSeasonId(null)}>انصراف</button>
                </td>
              </tr>
            ) : (
              <tr key={season.id}>
                <td>{season.title}</td>
                <td>{season.description}</td>
                <td>{season.image_url}</td>
                <td>
                  <button onClick={() => startEditSeason(season)}>ویرایش</button>
                  <button onClick={() => deleteSeason(season.id)}>حذف</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr style={{ margin: "32px 0" }} />

      <h2>افزودن ماموریت جدید</h2>
      <form onSubmit={handleMissionSubmit}>
        <label>
          فصل:
          <select name="season_id" value={missionForm.season_id} onChange={handleMissionChange} required>
            <option value="">انتخاب فصل</option>
            {seasons.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </label>
        <br />
        <label>عنوان ماموریت:
          <input name="title" value={missionForm.title} onChange={handleMissionChange} required />
        </label>
        <br />
        <label>توضیح:
          <textarea name="description" value={missionForm.description} onChange={handleMissionChange} />
        </label>
        <br />
        <label>آدرس عکس:
          <input name="image_url" value={missionForm.image_url} onChange={handleMissionChange} />
        </label>
        <br />
        <label>سوال:
          <textarea name="question" value={missionForm.question} onChange={handleMissionChange} />
        </label>
        <br />
        <label>راهنما:
          <input name="hint" value={missionForm.hint} onChange={handleMissionChange} />
        </label>
        <br />
        <label>کد اولیه:
          <input name="starter_code" value={missionForm.starter_code} onChange={handleMissionChange} />
        </label>
        <br />
        <label>درجه سختی:
          <input name="difficulty" value={missionForm.difficulty} onChange={handleMissionChange} />
        </label>
        <br />
        <label>
          قفل باشد؟
          <input type="checkbox" name="is_locked" checked={missionForm.is_locked} onChange={handleMissionChange} />
        </label>
        <br />
        <button type="submit">افزودن ماموریت</button>
      </form>

      <h2>ماموریت‌ها</h2>
      <table border="1" cellPadding="4" cellSpacing="0">
        <thead>
          <tr>
            <th>عنوان</th>
            <th>فصل</th>
            <th>درجه سختی</th>
            <th>قفل؟</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {missions.map(m => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{seasons.find(s => s.id == m.season_id)?.title || m.season_id}</td>
              <td>{m.difficulty}</td>
              <td>{m.is_locked ? "بله" : "خیر"}</td>
              <td>
                <button onClick={() => deleteMission(m.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
