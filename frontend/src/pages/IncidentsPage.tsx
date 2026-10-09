import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { SeverityBadge } from '../components/SeverityBadge';
import { StatusPill } from '../components/StatusPill';
import { MOCK_INCIDENTS } from '../utils/mockData';
import { IncidentStatus } from '../types';
import {
  Search,
  Filter,
  ArrowUpRight,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Cpu,
  Clock,
  Globe2,
} from 'lucide-react';

export const IncidentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredIncidents = MOCK_INCIDENTS.filter((item) => {
    const matchesStatus =
      selectedStatus === 'ALL' || item.status === selectedStatus;
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceIp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetEndpoint.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const criticalCount = MOCK_INCIDENTS.filter((i) => i.severity === 'CRITICAL').length;
  const openCount = MOCK_INCIDENTS.filter((i) => i.status === 'OPEN').length;
  const mlAnomaliesCount = MOCK_INCIDENTS.filter((i) => i.detectionSource === 'ML' || i.detectionSource === 'HYBRID').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-zinc-500">
            Threat Register & Forensics
          </span>
          <h1 className="text-4xl lg:text-5xl font-extralight tracking-tight text-zinc-950 mt-1">
            Incidents
          </h1>
          <p className="text-sm text-zinc-600 mt-1 max-w-xl">
            Correlated threat detections across Rule-based signatures and Unsupervised ML models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-all shadow-md flex items-center gap-2">
            <span>Export Forensic Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bento Row 1: 4 KPI Cards (Alternating Glass Variants) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Critical (Dark Smoked Glass) */}
        <GlassCard variant="smoked" className="flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Critical Threats</span>
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div className="my-3">
            <div className="text-4xl font-light tracking-tighter text-white">0{criticalCount}</div>
            <div className="text-[11px] text-zinc-400 mt-1">Immediate mitigation required</div>
          </div>
          <div className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/10 w-fit text-zinc-300">
            ▲ +2 in last hour
          </div>
        </GlassCard>

        {/* KPI 2: Open Queue (Light Frosted Glass) */}
        <GlassCard variant="light" className="flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Open Triage</span>
            <ShieldAlert className="w-4 h-4 text-zinc-800" />
          </div>
          <div className="my-3">
            <div className="text-4xl font-light tracking-tighter text-zinc-950">{openCount}</div>
            <div className="text-[11px] text-zinc-500 mt-1">Pending analyst resolution</div>
          </div>
          <div className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-black/5 w-fit text-zinc-700">
            Priority Queue
          </div>
        </GlassCard>

        {/* KPI 3: Resolution Rate (Light Frosted Glass) */}
        <GlassCard variant="light" className="flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Resolution Rate</span>
            <CheckCircle2 className="w-4 h-4 text-zinc-800" />
          </div>
          <div className="my-3">
            <div className="text-4xl font-light tracking-tighter text-zinc-950">86.4%</div>
            <div className="text-[11px] text-zinc-500 mt-1">Mean triage time: 14m</div>
          </div>
          <div className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-black/5 w-fit text-zinc-700">
            Within SLA
          </div>
        </GlassCard>

        {/* KPI 4: ML Anomalies (Dark Smoked Glass) */}
        <GlassCard variant="smoked" className="flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">ML Outliers</span>
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <div className="my-3">
            <div className="text-4xl font-light tracking-tighter text-white">{mlAnomaliesCount}</div>
            <div className="text-[11px] text-zinc-400 mt-1">Isolation Forest flags</div>
          </div>
          <div className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/10 w-fit text-zinc-300">
            Hybrid Detection
          </div>
        </GlassCard>
      </div>

      {/* Filter and Search Pill Dock */}
      <GlassCard variant="light" className="!p-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Status Pill Toggles */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'ALL', label: 'All Incidents' },
            { id: 'OPEN', label: 'Open' },
            { id: 'INVESTIGATING', label: 'Investigating' },
            { id: 'RESOLVED', label: 'Resolved' },
          ].map((tab) => {
            const active = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white/50 text-zinc-700 hover:bg-white/80 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search IP, endpoint, or ID..."
            className="w-full pl-9 pr-4 py-1.5 rounded-full text-xs bg-white/70 border border-white focus:outline-none focus:ring-1 focus:ring-black text-zinc-900 placeholder-zinc-400 transition-all"
          />
        </div>
      </GlassCard>

      {/* Incident Cards Registry */}
      <div className="space-y-4">
        {filteredIncidents.length === 0 ? (
          <GlassCard variant="light" className="text-center py-16">
            <ShieldAlert className="w-10 h-10 mx-auto text-zinc-400 mb-2" />
            <h3 className="text-base font-semibold text-zinc-800">No Incidents Found</h3>
            <p className="text-xs text-zinc-500 mt-1">No security events match the current filter criteria.</p>
          </GlassCard>
        ) : (
          filteredIncidents.map((incident) => {
            const isSmoked = incident.severity === 'CRITICAL';

            return (
              <GlassCard
                key={incident.id}
                variant={isSmoked ? 'smoked' : 'light'}
                onClick={() => navigate(`/incidents/${incident.id}`)}
                className="group relative cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left Column: ID, Title, Target and Triggers */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`font-mono text-xs font-bold ${isSmoked ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        {incident.id}
                      </span>
                      <SeverityBadge severity={incident.severity} size="sm" />
                      <StatusPill status={incident.status} variant={isSmoked ? 'smoked' : 'light'} />
                      <span className={`text-[11px] flex items-center gap-1 ${isSmoked ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        <Clock className="w-3 h-3" />
                        {incident.detectedAt}
                      </span>
                    </div>

                    <h2 className={`text-lg font-semibold tracking-tight ${isSmoked ? 'text-white' : 'text-zinc-950'}`}>
                      {incident.title}
                    </h2>

                    {/* Metadata line */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-medium ${isSmoked ? 'text-zinc-400' : 'text-zinc-500'}`}>Target:</span>
                        <span className={`font-mono px-2 py-0.5 rounded-md ${isSmoked ? 'bg-white/10 text-white' : 'bg-black/5 text-zinc-900'}`}>
                          {incident.httpMethod} {incident.targetEndpoint}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe2 className={`w-3.5 h-3.5 ${isSmoked ? 'text-zinc-400' : 'text-zinc-500'}`} />
                        <span className={`font-mono ${isSmoked ? 'text-zinc-300' : 'text-zinc-800'}`}>
                          {incident.sourceIp}
                        </span>
                        {incident.location && (
                          <span className={`text-[11px] ${isSmoked ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            ({incident.location})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Trigger Snippet */}
                    <p className={`text-xs line-clamp-1 pt-1 ${isSmoked ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {incident.ruleFindings[0]}
                    </p>
                  </div>

                  {/* Right Column: Large Numeric Risk Score & Details Arrow */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10">
                    <div className="text-right">
                      <div className={`text-[10px] uppercase tracking-wider font-semibold ${isSmoked ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Risk Score
                      </div>
                      <div className={`text-4xl font-light tracking-tighter ${isSmoked ? 'text-white' : 'text-zinc-950'}`}>
                        {incident.riskScore}
                        <span className={`text-xs font-normal ml-1 ${isSmoked ? 'text-zinc-500' : 'text-zinc-400'}`}>/100</span>
                      </div>
                      <div className={`text-[11px] font-medium ${isSmoked ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {incident.requestCount} reqs ({incident.failedCount} fails)
                      </div>
                    </div>

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSmoked
                        ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'
                        : 'bg-black/5 text-zinc-800 group-hover:bg-black group-hover:text-white'
                    }`}>
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
};

export default IncidentsPage;
