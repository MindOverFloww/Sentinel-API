import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import IncidentsPage from './pages/IncidentsPage';
import IncidentDetailsPage from './pages/IncidentDetailsPage';
import DashboardPage from './pages/DashboardPage';
import TrafficPage from './pages/TrafficPage';
import RulesPage from './pages/RulesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/incidents" replace />} />
          <Route path="overview" element={<DashboardPage />} />
          <Route path="incidents" element={<IncidentsPage />} />
          <Route path="incidents/:id" element={<IncidentDetailsPage />} />
          <Route path="traffic" element={<TrafficPage />} />
          <Route path="rules" element={<RulesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
