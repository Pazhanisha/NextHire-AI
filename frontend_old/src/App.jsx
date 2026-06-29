import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="resume-analyzer" element={<div className="p-6 text-white">Resume Analyzer page</div>} />
        <Route path="ai-interview" element={<div className="p-6 text-white">AI Interview page</div>} />
        <Route path="career-mentor" element={<div className="p-6 text-white">Career Mentor page</div>} />
        <Route path="analytics" element={<div className="p-6 text-white">Analytics page</div>} />
        <Route path="skill-tracker" element={<div className="p-6 text-white">Skill Tracker page</div>} />
        <Route path="saved-jobs" element={<div className="p-6 text-white">Saved Jobs page</div>} />
        <Route path="profile" element={<div className="p-6 text-white">Profile page</div>} />
        <Route path="settings" element={<div className="p-6 text-white">Settings page</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}