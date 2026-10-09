import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TrafficPage from './pages/TrafficPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrafficPage />} />
        <Route path="/traffic" element={<TrafficPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<Navigate to="/traffic" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
