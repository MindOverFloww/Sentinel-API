import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Monochrome Glassmorphism Theme Types
type ActiveTab = 'overview' | 'traffic' | 'incidents' | 'rules' | 'ml';
type FilterType = 'all' | 'flagged' | 'errors' | 'critical';

interface StreamEvent {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  sourceIp: string;
  statusCode: number;
  ruleTriggered: string;
  mlAnomalyScore: number;
  riskScore: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

const INITIAL_EVENTS: StreamEvent[] = [
  {
    id: 'EVT-9041',
    timestamp: '14:26:08',
    method: 'POST',
    endpoint: '/api/v1/auth/login',
    sourceIp: '185.220.101.5',
    statusCode: 401,
    ruleTriggered: 'Excessive Login Failures (42/min)',
    mlAnomalyScore: 0.94,
    riskScore: 94,
    severity: 'CRITICAL',
  },
  {
    id: 'EVT-9040',
    timestamp: '14:26:05',
    method: 'GET',
    endpoint: "/api/v1/search?q=' OR 1=1 --",
    sourceIp: '45.154.255.89',
    statusCode: 400,
    ruleTriggered: 'SQL Injection Signature Match',
    mlAnomalyScore: 0.88,
    riskScore: 89,
    severity: 'CRITICAL',
  },
  {
    id: 'EVT-9039',
    timestamp: '14:25:59',
    method: 'GET',
    endpoint: '/api/v1/users/1042',
    sourceIp: '192.168.1.45',
    statusCode: 200,
    ruleTriggered: 'None (Nominal Traffic)',
    mlAnomalyScore: 0.12,
    riskScore: 14,
    severity: 'LOW',
  },
  {
    id: 'EVT-9038',
    timestamp: '14:25:52',
    method: 'GET',
    endpoint: '/api/v1/products',
    sourceIp: '103.251.167.22',
    statusCode: 200,
    ruleTriggered: 'High Frequency Burst (500 req/s)',
    mlAnomalyScore: 0.79,
    riskScore: 76,
    severity: 'HIGH',
  },
  {
    id: 'EVT-9037',
    timestamp: '14:25:44',
    method: 'DELETE',
    endpoint: '/api/v1/accounts/883',
    sourceIp: '89.208.29.114',
    statusCode: 403,
    ruleTriggered: 'Repeated 403 Forbidden Access',
    mlAnomalyScore: 0.65,
    riskScore: 68,
    severity: 'MEDIUM',
  },
  {
    id: 'EVT-9036',
    timestamp: '14:25:31',
    method: 'POST',
    endpoint: '/api/v1/payment/checkout',
    sourceIp: '172.16.0.8',
    statusCode: 201,
    ruleTriggered: 'None (Nominal Traffic)',
    mlAnomalyScore: 0.08,
    riskScore: 9,
    severity: 'LOW',
  },
];

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [eventFilter, setEventFilter] = useState<FilterType>('all');
  const [currentTime, setCurrentTime] = useState<string>('14:26:15 UTC');
  const [events] = useState<StreamEvent[]>(INITIAL_EVENTS);

  // Policy switch toggles state
  const [policies, setPolicies] = useState({
    bruteForce: true,
    sqlInjection: true,
    rateBurst: true,
    isolationForest: true,
    credentialAbuse: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toTimeString().split(' ')[0] + ' UTC'
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const togglePolicy = (key: keyof typeof policies) => {
    setPolicies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredEvents = events.filter((evt) => {
    if (eventFilter === 'flagged') return evt.severity !== 'LOW';
    if (eventFilter === 'errors') return evt.statusCode >= 400;
    if (eventFilter === 'critical') return evt.severity === 'CRITICAL';
    return true;
  });

  return (
    <div style={styles.container}>
      {/* Light gradient ambient background mesh */}
      <div style={styles.ambientLight} />
      <div style={styles.gridOverlay} />

      {/* Slim Floating Left Icon Dock */}
      <aside style={styles.leftDock} aria-label="Quick Dock">
        <div style={styles.dockLogo}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div style={styles.dockSeparator} />
        
        <button
          style={{ ...styles.dockButton, ...(activeTab === 'overview' ? styles.dockButtonActive : {}) }}
          onClick={() => setActiveTab('overview')}
          title="Overview"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>

        <button
          style={{ ...styles.dockButton, ...(activeTab === 'traffic' ? styles.dockButtonActive : {}) }}
          onClick={() => setActiveTab('traffic')}
          title="Traffic Stream"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </button>

        <button
          style={{ ...styles.dockButton, ...(activeTab === 'incidents' ? styles.dockButtonActive : {}) }}
          onClick={() => setActiveTab('incidents')}
          title="Incidents"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>

        <button
          style={{ ...styles.dockButton, ...(activeTab === 'rules' ? styles.dockButtonActive : {}) }}
          onClick={() => setActiveTab('rules')}
          title="Detection Rules"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </button>

        <button
          style={{ ...styles.dockButton, ...(activeTab === 'ml' ? styles.dockButtonActive : {}) }}
          onClick={() => setActiveTab('ml')}
          title="ML Diagnostics"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" />
            <line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" />
            <line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" />
            <line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" />
            <line x1="1" y1="14" x2="4" y2="14" />
          </svg>
        </button>
      </aside>

      {/* Main Console Content */}
      <main style={styles.mainWrapper}>
        {/* Top Header */}
        <header style={styles.header}>
          <div>
            <div style={styles.breadcrumb}>SYSTEM SURVEILLANCE // IDS CONSOLE</div>
            <h1 style={styles.pageTitle}>API SENTINEL</h1>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.statusPill}>
              <span style={styles.statusPulse} />
              <span style={styles.statusText}>SHIELD ACTIVE</span>
              <span style={styles.headerDivider}>|</span>
              <span style={styles.timestampText}>{currentTime}</span>
            </div>

            <div style={styles.ratePill}>
              <span style={styles.rateLabel}>INGESTION RATE</span>
              <span style={styles.rateValue}>1,420 req/s</span>
            </div>
          </div>
        </header>

        {/* Asymmetric 4-Column Bento Grid */}
        <div style={styles.bentoGrid}>
          {/* CARD 1: HERO TALL SMOKED GLASS - ML & RISK ENGINE */}
          <div style={{ ...styles.card, ...styles.smokedCard, ...styles.colSpan1, ...styles.rowSpan2 }}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitleLight}>ML & RISK ENGINE</div>
              <span style={styles.badgeSmoked}>CORE v1.2</span>
            </div>
            <div style={styles.cardCaptionLight}>Concentric Anomaly & Rule Telemetry</div>

            {/* Dual Donut Gauge */}
            <div style={styles.gaugeContainer}>
              <svg width="180" height="180" viewBox="0 0 100 100" style={styles.donutSvg}>
                {/* Background tracks */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
                <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />

                {/* Outer Ring: Rule findings load (84%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="7"
                  strokeDasharray="263.8"
                  strokeDashoffset="42.2"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />

                {/* Inner Ring: ML Isolation Forest (91%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="31"
                  fill="none"
                  stroke="rgba(255,255,255,0.65)"
                  strokeWidth="6"
                  strokeDasharray="194.7"
                  strokeDashoffset="17.5"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>

              <div style={styles.gaugeCenter}>
                <span style={styles.gaugeNumber}>88</span>
                <span style={styles.gaugeLabel}>RISK SCORE</span>
                <span style={styles.gaugeSublabel}>CRITICAL</span>
              </div>
            </div>

            {/* Gauge Legend */}
            <div style={styles.gaugeLegend}>
              <div style={styles.legendItem}>
                <span style={{ ...styles.legendDot, background: '#FFFFFF' }} />
                <span style={styles.legendText}>Rule Trigger Severity (84%)</span>
              </div>
              <div style={styles.legendItem}>
                <span style={{ ...styles.legendDot, background: 'rgba(255,255,255,0.65)' }} />
                <span style={styles.legendText}>ML Isolation Score (0.91)</span>
              </div>
            </div>

            {/* Realtime Telemetry Rows */}
            <div style={styles.telemetryBox}>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryKey}>4xx Error Ratio</span>
                <span style={styles.telemetryVal}>14.2%</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryKey}>Failed Auth / min</span>
                <span style={styles.telemetryVal}>42 req</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryKey}>Unique Endpoints</span>
                <span style={styles.telemetryVal}>38 paths</span>
              </div>
              <div style={styles.telemetryRow}>
                <span style={styles.telemetryKey}>Inference Latency</span>
                <span style={styles.telemetryVal}>1.18 ms</span>
              </div>
            </div>
          </div>

          {/* CARD 2: WIDE AREA CHART - LIGHT GLASS (Col 2-3, Span 2) */}
          <div style={{ ...styles.card, ...styles.lightCard, ...styles.colSpan2 }}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitleDark}>TRAFFIC VELOCITY & ANOMALIES</div>
                <div style={styles.cardCaptionDark}>Real-time requests/sec with ML flagged anomalies</div>
              </div>
              <div style={styles.chartTagGroup}>
                <span style={styles.pillTagActive}>24 HOURS</span>
                <span style={styles.pillTagMuted}>PEAK: 1,890 r/s</span>
              </div>
            </div>

            {/* Smooth SVG Monochrome Gradient Area Chart */}
            <div style={styles.chartWrapper}>
              <svg viewBox="0 0 500 150" style={styles.areaChartSvg} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="blackAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.22" />
                    <stop offset="60%" stopColor="#000000" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Shaded Area */}
                <path
                  d="M 0,110 Q 60,95 100,120 T 200,60 T 300,95 T 370,25 T 440,75 T 500,65 L 500,150 L 0,150 Z"
                  fill="url(#blackAreaGrad)"
                />

                {/* Primary Trend Line */}
                <path
                  d="M 0,110 Q 60,95 100,120 T 200,60 T 300,95 T 370,25 T 440,75 T 500,65"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />

                {/* Spike Marker Points */}
                <circle cx="370" cy="25" r="4.5" fill="#000000" />
                <circle cx="370" cy="25" r="9" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="2,2" />
                <circle cx="200" cy="60" r="3.5" fill="#333333" />
              </svg>

              {/* Minimalist Axis Labels */}
              <div style={styles.chartAxisRow}>
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span style={{ fontWeight: 700, color: '#000000' }}>14:25 (BURST SPIKE)</span>
                <span>18:00</span>
                <span>22:00</span>
              </div>
            </div>

            {/* Bottom mini stats banner */}
            <div style={styles.chartBottomRow}>
              <div>
                <span style={styles.chartMetricLabel}>TOTAL INGESTED: </span>
                <strong style={styles.chartMetricValue}>1,248,392</strong>
              </div>
              <div>
                <span style={styles.chartMetricLabel}>ANOMALY BURSTS: </span>
                <strong style={styles.chartMetricValue}>14 Detected</strong>
              </div>
              <div>
                <span style={styles.chartMetricLabel}>MEAN RESPONSE: </span>
                <strong style={styles.chartMetricValue}>42 ms</strong>
              </div>
            </div>
          </div>

          {/* CARD 3: CRITICAL INCIDENTS KPI - SMOKED GLASS (Col 4, Row 1 top) */}
          <div style={{ ...styles.card, ...styles.smokedCard, ...styles.colSpan1 }}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitleLight}>CRITICAL INCIDENTS</div>
              <span style={styles.badgeSmokedAlert}>ACTION REQ</span>
            </div>
            <div style={styles.kpiValueSmoked}>07</div>
            <div style={styles.kpiFooterSmoked}>
              <span style={styles.kpiPillWhite}>+2 in last 15m</span>
              <span style={styles.kpiSubtextWhite}>Requires triage</span>
            </div>
          </div>

          {/* CARD 4: ANOMALOUS IPs KPI - LIGHT GLASS (Col 4, Row 1 bottom) */}
          <div style={{ ...styles.card, ...styles.lightCard, ...styles.colSpan1 }}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitleDark}>FLAGGED IPs</div>
              <span style={styles.badgeLightMono}>LIVE</span>
            </div>
            <div style={styles.kpiValueLight}>84</div>
            <div style={styles.kpiFooterLight}>
              <span style={styles.kpiPillDark}>ISO FOREST</span>
              <span style={styles.kpiSubtextDark}>Suspicious clustering</span>
            </div>
          </div>

          {/* CARD 5: DOTTED WORLD MAP & GEO VECTORS - LIGHT GLASS (Col 2) */}
          <div style={{ ...styles.card, ...styles.lightCard, ...styles.colSpan1 }}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitleDark}>ATTACK VECTORS</div>
                <div style={styles.cardCaptionDark}>Origin coordinates</div>
              </div>
              <span style={styles.badgeLightMono}>GLOBAL</span>
            </div>

            {/* Minimalist Dotted Map Representation */}
            <div style={styles.dottedMapContainer}>
              <svg width="100%" height="110" viewBox="0 0 240 100" style={{ overflow: 'visible' }}>
                {/* Dotted Grid World Silhouette */}
                {Array.from({ length: 12 }).map((_, r) =>
                  Array.from({ length: 24 }).map((__, c) => (
                    <circle
                      key={`${r}-${c}`}
                      cx={c * 10 + 5}
                      cy={r * 8 + 6}
                      r="1.2"
                      fill={(r + c) % 3 === 0 ? '#C4C4C4' : '#E5E5E5'}
                    />
                  ))
                )}

                {/* Hotspot Pulsing Rings */}
                {/* North America */}
                <circle cx="55" cy="38" r="4" fill="#000000" />
                <circle cx="55" cy="38" r="8" fill="none" stroke="#000000" strokeWidth="1" opacity="0.6" />

                {/* Europe */}
                <circle cx="120" cy="32" r="5" fill="#000000" />
                <circle cx="120" cy="32" r="11" fill="none" stroke="#000000" strokeWidth="1" opacity="0.8" />

                {/* East Asia */}
                <circle cx="195" cy="44" r="3.5" fill="#000000" />
                <circle cx="195" cy="44" r="7" fill="none" stroke="#000000" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>

            <div style={styles.geoDetailBox}>
              <div style={styles.geoDetailRow}>
                <span style={styles.geoIp}>185.220.101.5</span>
                <span style={styles.geoTag}>Brute-Force</span>
              </div>
              <div style={styles.geoDetailRow}>
                <span style={styles.geoIp}>45.154.255.89</span>
                <span style={styles.geoTag}>SQLi Probe</span>
              </div>
            </div>
          </div>

          {/* CARD 6: 7-DAY INCIDENT PULSE BAR CHART - LIGHT GLASS (Col 3) */}
          <div style={{ ...styles.card, ...styles.lightCard, ...styles.colSpan1 }}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitleDark}>WEEKLY PULSE</div>
                <div style={styles.cardCaptionDark}>7-Day threat velocity</div>
              </div>
              <span style={styles.badgeLightMono}>HISTORICAL</span>
            </div>

            {/* Vertical Bar Chart with Rounded Caps, Active Day in Solid Black */}
            <div style={styles.barChartContainer}>
              {[
                { day: 'MON', val: 32, active: false },
                { day: 'TUE', val: 48, active: false },
                { day: 'WED', val: 24, active: false },
                { day: 'THU', val: 65, active: false },
                { day: 'FRI', val: 51, active: false },
                { day: 'SAT', val: 29, active: false },
                { day: 'SUN', val: 92, active: true },
              ].map((item) => (
                <div key={item.day} style={styles.barColumn}>
                  <span style={item.active ? styles.barValueActive : styles.barValue}>
                    {item.val}
                  </span>
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        ...styles.barFill,
                        height: `${item.val}%`,
                        background: item.active ? '#000000' : 'rgba(0,0,0,0.12)',
                      }}
                    />
                  </div>
                  <span style={item.active ? styles.barLabelActive : styles.barLabel}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 7: DETECTION RULES MATRIX - SMOKED GLASS (Col 4) */}
          <div style={{ ...styles.card, ...styles.smokedCard, ...styles.colSpan1 }}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitleLight}>RULE MATRIX</div>
              <span style={styles.badgeSmoked}>POLICIES</span>
            </div>
            <div style={styles.cardCaptionLight}>Deterministic & ML Engines</div>

            <div style={styles.ruleList}>
              <div style={styles.ruleItem}>
                <div>
                  <div style={styles.ruleName}>Brute-Force Shield</div>
                  <div style={styles.ruleMeta}>Threshold &gt; 10/min</div>
                </div>
                <button
                  type="button"
                  onClick={() => togglePolicy('bruteForce')}
                  style={{
                    ...styles.pillToggle,
                    background: policies.bruteForce ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                    color: policies.bruteForce ? '#000000' : '#888888',
                  }}
                >
                  {policies.bruteForce ? 'ON' : 'OFF'}
                </button>
              </div>

              <div style={styles.ruleItem}>
                <div>
                  <div style={styles.ruleName}>SQLi Pattern Filter</div>
                  <div style={styles.ruleMeta}>RegEx signature scanner</div>
                </div>
                <button
                  type="button"
                  onClick={() => togglePolicy('sqlInjection')}
                  style={{
                    ...styles.pillToggle,
                    background: policies.sqlInjection ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                    color: policies.sqlInjection ? '#000000' : '#888888',
                  }}
                >
                  {policies.sqlInjection ? 'ON' : 'OFF'}
                </button>
              </div>

              <div style={styles.ruleItem}>
                <div>
                  <div style={styles.ruleName}>Isolation Forest ML</div>
                  <div style={styles.ruleMeta}>Unsupervised anomaly model</div>
                </div>
                <button
                  type="button"
                  onClick={() => togglePolicy('isolationForest')}
                  style={{
                    ...styles.pillToggle,
                    background: policies.isolationForest ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                    color: policies.isolationForest ? '#000000' : '#888888',
                  }}
                >
                  {policies.isolationForest ? 'ON' : 'OFF'}
                </button>
              </div>

              <div style={styles.ruleItem}>
                <div>
                  <div style={styles.ruleName}>Endpoint Enumeration</div>
                  <div style={styles.ruleMeta}>404 rate sliding window</div>
                </div>
                <button
                  type="button"
                  onClick={() => togglePolicy('rateBurst')}
                  style={{
                    ...styles.pillToggle,
                    background: policies.rateBurst ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                    color: policies.rateBurst ? '#000000' : '#888888',
                  }}
                >
                  {policies.rateBurst ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* CARD 8: WIDE BOTTOM ROW - REAL-TIME INGESTION FEED (Col 1-4, Span 4) */}
          <div style={{ ...styles.card, ...styles.lightCard, ...styles.colSpan4 }}>
            <div style={styles.tableTopHeader}>
              <div>
                <div style={styles.cardTitleDark}>REAL-TIME API EVENT INGESTION FEED</div>
                <div style={styles.cardCaptionDark}>
                  Structured metadata and security telemetry passing through API Sentinel Gateway
                </div>
              </div>

              {/* Minimalist Filter Pill Group */}
              <div style={styles.filterPills}>
                <button
                  type="button"
                  style={{ ...styles.filterPillBtn, ...(eventFilter === 'all' ? styles.filterPillActive : {}) }}
                  onClick={() => setEventFilter('all')}
                >
                  ALL TRAFFIC
                </button>
                <button
                  type="button"
                  style={{ ...styles.filterPillBtn, ...(eventFilter === 'flagged' ? styles.filterPillActive : {}) }}
                  onClick={() => setEventFilter('flagged')}
                >
                  FLAGGED ONLY
                </button>
                <button
                  type="button"
                  style={{ ...styles.filterPillBtn, ...(eventFilter === 'errors' ? styles.filterPillActive : {}) }}
                  onClick={() => setEventFilter('errors')}
                >
                  4xx / 5xx STATUS
                </button>
                <button
                  type="button"
                  style={{ ...styles.filterPillBtn, ...(eventFilter === 'critical' ? styles.filterPillActive : {}) }}
                  onClick={() => setEventFilter('critical')}
                >
                  CRITICAL RISK
                </button>
              </div>
            </div>

            {/* Ingested Stream Table */}
            <div style={styles.tableScroll}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.trHead}>
                    <th style={styles.th}>TIME</th>
                    <th style={styles.th}>METHOD</th>
                    <th style={styles.th}>ENDPOINT</th>
                    <th style={styles.th}>SOURCE IP</th>
                    <th style={styles.th}>HTTP STATUS</th>
                    <th style={styles.th}>DETECTION RULE TRIGGER</th>
                    <th style={styles.th}>ML SCORE</th>
                    <th style={styles.th}>RISK SCORE</th>
                    <th style={styles.thRight}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((evt) => (
                    <tr key={evt.id} style={styles.trBody}>
                      <td style={styles.tdMono}>{evt.timestamp}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.methodPill,
                            ...(evt.method === 'POST' ? styles.methodPost : {}),
                            ...(evt.method === 'GET' ? styles.methodGet : {}),
                            ...(evt.method === 'DELETE' ? styles.methodDelete : {}),
                          }}
                        >
                          {evt.method}
                        </span>
                      </td>
                      <td style={styles.tdEndpoint}>{evt.endpoint}</td>
                      <td style={styles.tdMono}>{evt.sourceIp}</td>
                      <td style={styles.td}>
                        <span style={evt.statusCode >= 400 ? styles.statusBadgeErr : styles.statusBadgeOk}>
                          {evt.statusCode}
                        </span>
                      </td>
                      <td style={styles.td}>{evt.ruleTriggered}</td>
                      <td style={styles.tdMono}>{(evt.mlAnomalyScore * 100).toFixed(0)}%</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.riskBadge,
                            ...(evt.severity === 'CRITICAL' ? styles.riskCritical : {}),
                            ...(evt.severity === 'HIGH' ? styles.riskHigh : {}),
                            ...(evt.severity === 'MEDIUM' ? styles.riskMedium : {}),
                            ...(evt.severity === 'LOW' ? styles.riskLow : {}),
                          }}
                        >
                          {evt.riskScore} • {evt.severity}
                        </span>
                      </td>
                      <td style={styles.tdRight}>
                        <Link to="/incidents" style={styles.investigateLink}>
                          Inspect →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Pill Bottom Navigation */}
      <nav style={styles.bottomNav} aria-label="Bottom Dock Navigation">
        <button
          type="button"
          style={{ ...styles.navPill, ...(activeTab === 'overview' ? styles.navPillActive : {}) }}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          type="button"
          style={{ ...styles.navPill, ...(activeTab === 'traffic' ? styles.navPillActive : {}) }}
          onClick={() => setActiveTab('traffic')}
        >
          Live Traffic
        </button>
        <button
          type="button"
          style={{ ...styles.navPill, ...(activeTab === 'incidents' ? styles.navPillActive : {}) }}
          onClick={() => setActiveTab('incidents')}
        >
          Incidents <span style={styles.navCounter}>7</span>
        </button>
        <button
          type="button"
          style={{ ...styles.navPill, ...(activeTab === 'rules' ? styles.navPillActive : {}) }}
          onClick={() => setActiveTab('rules')}
        >
          Rules
        </button>
        <button
          type="button"
          style={{ ...styles.navPill, ...(activeTab === 'ml' ? styles.navPillActive : {}) }}
          onClick={() => setActiveTab('ml')}
        >
          ML Model
        </button>
      </nav>
    </div>
  );
};

// Pure Vanilla CSS In-JS styling for 100% portable zero-dependency rendering
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'radial-gradient(circle at 50% 0%, #FFFFFF 0%, #F5F6F8 50%, #ECEFF2 100%)',
    color: '#121212',
    fontFamily: "'Plus Jakarta Sans', 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
    paddingBottom: '96px',
    overflowX: 'hidden',
  },
  ambientLight: {
    position: 'fixed',
    top: 0,
    left: '20%',
    width: '60vw',
    height: '400px',
    background: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  gridOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  leftDock: {
    position: 'fixed',
    top: '50%',
    left: '20px',
    transform: 'translateY(-50%)',
    width: '54px',
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.85)',
    borderRadius: '32px',
    padding: '16px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)',
    zIndex: 30,
  },
  dockLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
  },
  dockSeparator: {
    width: '24px',
    height: '1px',
    background: 'rgba(0, 0, 0, 0.08)',
  },
  dockButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '16px',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666666',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  dockButtonActive: {
    background: '#000000',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  mainWrapper: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1420px',
    margin: '0 auto',
    padding: '36px 32px 36px 92px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '28px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  breadcrumb: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: '#71717A',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  pageTitle: {
    margin: 0,
    fontSize: '36px',
    fontWeight: 200,
    letterSpacing: '-0.04em',
    color: '#111111',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  statusPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    borderRadius: '24px',
    padding: '8px 16px',
    fontSize: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },
  statusPulse: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#000000',
  },
  statusText: {
    fontWeight: 700,
    fontSize: '11px',
    letterSpacing: '0.06em',
  },
  headerDivider: {
    color: '#D4D4D8',
  },
  timestampText: {
    color: '#71717A',
    fontFamily: 'monospace',
    fontSize: '11px',
  },
  ratePill: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    background: 'rgba(28, 28, 30, 0.82)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '20px',
    padding: '6px 14px',
    color: '#FFFFFF',
  },
  rateLabel: {
    fontSize: '9px',
    fontWeight: 600,
    color: '#A1A1AA',
    letterSpacing: '0.08em',
  },
  rateValue: {
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },

  // Bento Grid Layout
  bentoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '18px',
  },
  card: {
    borderRadius: '26px',
    padding: '24px',
    transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.24s ease',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  lightCard: {
    background: 'rgba(255, 255, 255, 0.52)',
    backdropFilter: 'blur(26px)',
    WebkitBackdropFilter: 'blur(26px)',
    border: '1px solid rgba(255, 255, 255, 0.85)',
    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255,255,255,0.8)',
    color: '#121212',
  },
  smokedCard: {
    background: 'rgba(28, 28, 30, 0.84)',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    color: '#FFFFFF',
  },
  colSpan1: {
    gridColumn: 'span 1',
  },
  colSpan2: {
    gridColumn: 'span 2',
  },
  colSpan4: {
    gridColumn: 'span 4',
  },
  rowSpan2: {
    gridRow: 'span 2',
  },

  // Card Internal Styles
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px',
  },
  cardTitleDark: {
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    color: '#111111',
    textTransform: 'uppercase',
  },
  cardTitleLight: {
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  cardCaptionDark: {
    fontSize: '12px',
    color: '#71717A',
  },
  cardCaptionLight: {
    fontSize: '12px',
    color: '#A1A1AA',
    marginBottom: '18px',
  },

  // Badges & Pills
  badgeSmoked: {
    fontSize: '10px',
    fontWeight: 600,
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    padding: '3px 8px',
    borderRadius: '12px',
  },
  badgeSmokedAlert: {
    fontSize: '10px',
    fontWeight: 700,
    background: '#FFFFFF',
    color: '#000000',
    padding: '3px 8px',
    borderRadius: '12px',
  },
  badgeLightMono: {
    fontSize: '10px',
    fontWeight: 600,
    background: 'rgba(0, 0, 0, 0.06)',
    color: '#333333',
    padding: '3px 8px',
    borderRadius: '12px',
  },

  // Gauge Layout
  gaugeContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px 0 20px',
  },
  donutSvg: {
    transform: 'scale(1)',
  },
  gaugeCenter: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gaugeNumber: {
    fontSize: '44px',
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    color: '#FFFFFF',
  },
  gaugeLabel: {
    fontSize: '9px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: '#A1A1AA',
    marginTop: '4px',
  },
  gaugeSublabel: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#FFFFFF',
    marginTop: '2px',
  },
  gaugeLegend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  legendText: {
    fontSize: '11px',
    color: '#D4D4D8',
  },
  telemetryBox: {
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: 'auto',
  },
  telemetryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
  },
  telemetryKey: {
    color: '#A1A1AA',
  },
  telemetryVal: {
    fontFamily: 'monospace',
    fontWeight: 600,
    color: '#FFFFFF',
  },

  // Area Chart
  chartTagGroup: {
    display: 'flex',
    gap: '6px',
  },
  pillTagActive: {
    fontSize: '10px',
    fontWeight: 700,
    background: '#000000',
    color: '#FFFFFF',
    padding: '4px 10px',
    borderRadius: '14px',
  },
  pillTagMuted: {
    fontSize: '10px',
    fontWeight: 500,
    background: 'rgba(0, 0, 0, 0.05)',
    color: '#555555',
    padding: '4px 10px',
    borderRadius: '14px',
  },
  chartWrapper: {
    marginTop: '16px',
  },
  areaChartSvg: {
    width: '100%',
    height: '140px',
  },
  chartAxisRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
    color: '#888888',
    marginTop: '6px',
    fontFamily: 'monospace',
  },
  chartBottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
    paddingTop: '14px',
    marginTop: '16px',
    fontSize: '12px',
  },
  chartMetricLabel: {
    color: '#71717A',
    fontSize: '11px',
  },
  chartMetricValue: {
    color: '#000000',
    fontWeight: 600,
  },

  // KPI Tiles
  kpiValueSmoked: {
    fontSize: '48px',
    fontWeight: 300,
    color: '#FFFFFF',
    letterSpacing: '-0.04em',
    margin: '12px 0 8px',
  },
  kpiFooterSmoked: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: 'auto',
  },
  kpiPillWhite: {
    fontSize: '10px',
    fontWeight: 700,
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#FFFFFF',
    padding: '3px 8px',
    borderRadius: '12px',
  },
  kpiSubtextWhite: {
    fontSize: '11px',
    color: '#A1A1AA',
  },
  kpiValueLight: {
    fontSize: '48px',
    fontWeight: 600,
    color: '#111111',
    letterSpacing: '-0.04em',
    margin: '12px 0 8px',
  },
  kpiFooterLight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: 'auto',
  },
  kpiPillDark: {
    fontSize: '10px',
    fontWeight: 700,
    background: '#000000',
    color: '#FFFFFF',
    padding: '3px 8px',
    borderRadius: '12px',
  },
  kpiSubtextDark: {
    fontSize: '11px',
    color: '#71717A',
  },

  // Map
  dottedMapContainer: {
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  geoDetailBox: {
    borderTop: '1px solid rgba(0,0,0,0.06)',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: 'auto',
  },
  geoDetailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
  },
  geoIp: {
    fontFamily: 'monospace',
    color: '#222222',
  },
  geoTag: {
    fontWeight: 600,
    color: '#71717A',
  },

  // Bar Chart
  barChartContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '140px',
    marginTop: '16px',
    paddingBottom: '6px',
  },
  barColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    width: '28px',
  },
  barTrack: {
    width: '12px',
    height: '80px',
    background: 'rgba(0,0,0,0.04)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
    margin: '4px 0',
  },
  barFill: {
    width: '100%',
    borderRadius: '12px',
    transition: 'height 0.4s ease',
  },
  barValue: {
    fontSize: '9px',
    color: '#999999',
    fontFamily: 'monospace',
  },
  barValueActive: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#000000',
    fontFamily: 'monospace',
  },
  barLabel: {
    fontSize: '9px',
    fontWeight: 600,
    color: '#888888',
  },
  barLabelActive: {
    fontSize: '9px',
    fontWeight: 700,
    color: '#000000',
  },

  // Rule Switches
  ruleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '10px',
  },
  ruleItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  ruleName: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#FFFFFF',
  },
  ruleMeta: {
    fontSize: '10px',
    color: '#8E8E93',
  },
  pillToggle: {
    border: 'none',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '10px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  // Wide Table
  tableTopHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  filterPills: {
    display: 'flex',
    gap: '6px',
  },
  filterPillBtn: {
    background: 'rgba(0,0,0,0.04)',
    border: 'none',
    borderRadius: '18px',
    padding: '6px 14px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#555555',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  filterPillActive: {
    background: '#000000',
    color: '#FFFFFF',
  },
  tableScroll: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
  },
  trHead: {
    borderBottom: '1px solid rgba(0,0,0,0.08)',
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#71717A',
  },
  thRight: {
    textAlign: 'right',
    padding: '10px 12px',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#71717A',
  },
  trBody: {
    borderBottom: '1px solid rgba(0,0,0,0.04)',
  },
  td: {
    padding: '12px',
    color: '#1F1F1F',
  },
  tdMono: {
    padding: '12px',
    fontFamily: 'monospace',
    color: '#4B5563',
  },
  tdEndpoint: {
    padding: '12px',
    fontFamily: 'monospace',
    fontWeight: 600,
    color: '#111111',
  },
  tdRight: {
    padding: '12px',
    textAlign: 'right',
  },
  methodPill: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: 700,
    background: 'rgba(0,0,0,0.06)',
    color: '#111111',
  },
  methodPost: {
    background: '#111111',
    color: '#FFFFFF',
  },
  methodGet: {
    background: 'rgba(0,0,0,0.08)',
    color: '#222222',
  },
  methodDelete: {
    background: '#333333',
    color: '#FFFFFF',
  },
  statusBadgeOk: {
    fontFamily: 'monospace',
    color: '#222222',
    fontWeight: 600,
  },
  statusBadgeErr: {
    fontFamily: 'monospace',
    color: '#000000',
    fontWeight: 700,
    background: 'rgba(0,0,0,0.07)',
    padding: '2px 6px',
    borderRadius: '6px',
  },
  riskBadge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '14px',
    fontSize: '10px',
    fontWeight: 700,
  },
  riskCritical: {
    background: '#000000',
    color: '#FFFFFF',
  },
  riskHigh: {
    background: '#2A2A2A',
    color: '#FFFFFF',
  },
  riskMedium: {
    background: 'rgba(0,0,0,0.12)',
    color: '#111111',
  },
  riskLow: {
    background: 'rgba(0,0,0,0.05)',
    color: '#555555',
  },
  investigateLink: {
    color: '#000000',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '11px',
    borderBottom: '1px solid #000000',
    paddingBottom: '1px',
  },

  // Floating Bottom Nav Dock
  bottomNav: {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(28, 28, 30, 0.88)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    borderRadius: '34px',
    padding: '6px',
    display: 'flex',
    gap: '4px',
    boxShadow: '0 24px 48px -10px rgba(0, 0, 0, 0.45)',
    zIndex: 40,
  },
  navPill: {
    background: 'transparent',
    border: 'none',
    borderRadius: '26px',
    padding: '8px 18px',
    fontSize: '12px',
    fontWeight: 500,
    color: '#A1A1AA',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  navPillActive: {
    background: '#FFFFFF',
    color: '#000000',
    fontWeight: 700,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  navCounter: {
    background: '#000000',
    color: '#FFFFFF',
    borderRadius: '10px',
    fontSize: '9px',
    padding: '1px 6px',
    fontWeight: 700,
  },
};

export default DashboardPage;
