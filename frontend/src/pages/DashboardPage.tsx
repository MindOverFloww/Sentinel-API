import React, { useState } from 'react';
import { RefreshCw, Terminal, Shield, Bell, CheckCircle2 } from 'lucide-react';
import { HeroThreatShieldCard } from '../components/dashboard/HeroThreatShieldCard';
import { WeeklyBarChartCard } from '../components/dashboard/WeeklyBarChartCard';
import { RiskAreaChartCard } from '../components/dashboard/RiskAreaChartCard';
import { LatencyLineChartCard } from '../components/dashboard/LatencyLineChartCard';
import { AttackVectorCard } from '../components/dashboard/AttackVectorCard';
import { RuleSettingsCard } from '../components/dashboard/RuleSettingsCard';
import { WeeklyScheduleCard } from '../components/dashboard/WeeklyScheduleCard';
import { WorldMapCard } from '../components/dashboard/WorldMapCard';
import { KpiPillCards } from '../components/dashboard/KpiPillCards';
import { IncidentsTableCard } from '../components/dashboard/IncidentsTableCard';
import { IncidentDetailModal } from '../components/dashboard/IncidentDetailModal';
import { PostmanQuickTestModal } from '../components/dashboard/PostmanQuickTestModal';
import { INITIAL_INCIDENTS } from '../services/mockData';
import { Incident } from '../types/sentinel';

export const DashboardPage: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isPostmanModalOpen, setIsPostmanModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStatusChange = (id: string, newStatus: 'OPEN' | 'INVESTIGATING' | 'RESOLVED') => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: newStatus } : inc))
    );
    if (selectedIncident && selectedIncident.id === id) {
      setSelectedIncident((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Incident ${id} status updated to ${newStatus}`);
  };

  const handleSimulateAttack = (type: 'BRUTE_FORCE' | 'SQL_INJECTION' | 'API_ABUSE') => {
    const newId = `INC-00${incidents.length + 1}`;
    let newIncident: Incident;

    if (type === 'BRUTE_FORCE') {
      newIncident = {
        id: newId,
        type: 'BRUTE_FORCE',
        title: 'Burst Authentication Failure Trigger',
        riskScore: 85,
        severity: 'CRITICAL',
        sourceIp: '192.168.1.105',
        endpoint: '/api/demo/login',
        method: 'POST',
        description: 'Simulated 6 failed login attempts detected in 18 seconds from Postman client.',
        detectionRule: 'Excessive Failed Login Attempts (Threshold: 5 / 60s)',
        status: 'OPEN',
        createdAt: 'Just now',
        updatedAt: 'Just now',
        requestCount: 6,
        samplePayload: 'POST /api/demo/login -> 401 Unauthorized [6x]',
        factors: [
          { factor: 'Velocity spike on auth route', points: 50 },
          { factor: '100% 401 HTTP response ratio', points: 20 },
          { factor: 'IP frequency concentration', points: 15 },
        ],
      };
    } else if (type === 'SQL_INJECTION') {
      newIncident = {
        id: newId,
        type: 'SQL_INJECTION_PATTERN',
        title: 'SQL Injection-Like Tautology Input Pattern',
        riskScore: 75,
        severity: 'HIGH',
        sourceIp: '10.0.4.12',
        endpoint: '/api/demo/products',
        method: 'GET',
        description: 'Query string contained SQL meta-characters and boolean tautology: ?search=\' OR \'1\'=\'1',
        detectionRule: 'Malicious SQL Payload Pattern Matcher',
        status: 'OPEN',
        createdAt: 'Just now',
        updatedAt: 'Just now',
        requestCount: 1,
        samplePayload: "GET /api/demo/products?search=%27%20OR%20%271%27=%271",
        factors: [
          { factor: 'Malicious SQL input pattern detected', points: 30 },
          { factor: 'Keyword syntax (OR 1=1)', points: 30 },
          { factor: 'Public unauthenticated endpoint query', points: 15 },
        ],
      };
    } else {
      newIncident = {
        id: newId,
        type: 'API_ABUSE',
        title: 'Abnormal API Rate Flood Anomaly',
        riskScore: 65,
        severity: 'HIGH',
        sourceIp: '172.16.0.44',
        endpoint: '/api/demo/orders',
        method: 'GET',
        description: 'Received 112 requests in 25 seconds exceeding 100 req/60s abuse threshold.',
        detectionRule: 'Abnormal API Request Frequency Rule',
        status: 'OPEN',
        createdAt: 'Just now',
        updatedAt: 'Just now',
        requestCount: 112,
        samplePayload: 'GET /api/demo/orders [Flood 112x]',
        factors: [
          { factor: 'Volume exceeded rate threshold', points: 35 },
          { factor: 'Rapid cadence (< 200ms delta)', points: 15 },
          { factor: 'Headless client fingerprint', points: 15 },
        ],
      };
    }

    setIncidents([newIncident, ...incidents]);
    showToast(`New ${newIncident.severity} Incident Created: ${newIncident.id}`);
    setIsPostmanModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-28 pt-6 px-4 sm:px-6 lg:px-8 animate-fade-slide">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold shadow-2xl animate-fade-slide">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Section */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {/* Muted Captions */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
              API Sentinel Platform
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-400" />
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              BTech 5th-Sem Capstone Project
            </span>
          </div>

          {/* Oversized Thin Page Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-neutral-900 dark:text-white leading-tight">
            API Sentinel
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light mt-1 max-w-2xl leading-relaxed">
            Rule-Based API Intrusion Detection and Security Monitoring System. Autonomous request interception, signature matching, and explainable risk scoring.
          </p>
        </div>

        {/* Controls / Header Badges */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => setIsPostmanModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-medium shadow-md hover:opacity-85 transition-all"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Postman Test Guide</span>
          </button>

          <button
            onClick={() => showToast('Refreshed telemetry pipeline')}
            className="p-2.5 rounded-full glass-light hover:bg-black/5 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Asymmetric 4-Column Bento Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Tall Hero Card (Col-Span 2, Row-Span 2, Dark Smoked Glass) */}
        <HeroThreatShieldCard onInvestigateClick={() => setSelectedIncident(incidents[0])} />

        {/* 2. Weekly Bar Chart (Col-Span 2, Light Glass) */}
        <WeeklyBarChartCard />

        {/* 3. Black Gradient Area Chart (Col-Span 2, Light Glass) */}
        <RiskAreaChartCard />

        {/* 4. Small KPI Tiles (4x Col-Span 1, Alternating Light & Dark Glass) */}
        <KpiPillCards onIncidentFilter={(sev) => showToast(`Filtered incidents: ${sev}`)} />

        {/* 5. Latency Line Chart (Col-Span 2, Dark Smoked Glass) */}
        <LatencyLineChartCard />

        {/* 6. Attack Vector Horizontal Progress Bars (Col-Span 2, Light Glass) */}
        <AttackVectorCard />

        {/* 7. Dotted World Map (Col-Span 2, Dark Smoked Glass) */}
        <WorldMapCard />

        {/* 8. Rule Settings with Pill Switches (Col-Span 2, Light Glass) */}
        <RuleSettingsCard />

        {/* 9. Weekly Schedule with Black Pill Tags (Col-Span 2, Light Glass) */}
        <WeeklyScheduleCard />

        {/* 10. One Wide Bottom Row: Incidents Table (Col-Span Full, Light Glass) */}
        <IncidentsTableCard
          incidents={incidents}
          onSelectIncident={(inc) => setSelectedIncident(inc)}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Modals */}
      <IncidentDetailModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onStatusChange={handleStatusChange}
      />

      <PostmanQuickTestModal
        isOpen={isPostmanModalOpen}
        onClose={() => setIsPostmanModalOpen(false)}
        onSimulateAttack={handleSimulateAttack}
      />
    </div>
  );
};

export default DashboardPage;
