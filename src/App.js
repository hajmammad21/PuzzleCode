import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Landing from './Components/Landing/Landing';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Contact from './pages/Contact/Contact';
import Dashboard from './Components/Dashboard/Dashboard';
import SeasonList from './pages/SeasonList/SeasonList';
import SeasonMissions from './pages/SeasonMissions/SeasonMissions';
import MissionView from './pages/MissionView/MissionView';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/python" element={<SeasonList />} />
        <Route path="/python/season/:seasonId" element={<SeasonMissions />} />
        <Route path="/python/mission/:missionId" element={<MissionView />} />
      </Routes>
    </Router>
  );
}

export default App;
