import React, { useState } from 'react';

// Strict Monochrome Palette & Glass Tokens are styled directly for self-contained elegance
export const TrafficPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDayIdx, setActiveDayIdx] = useState(2); // Wednesday default
  const [selectedMonth, setSelectedMonth] = useState('May 2025');

  // Toggle states in Settings Card
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [deepInspection, setDeepInspection] = useState(true);
  const [zeroTrustGuard, setZeroTrustGuard] = useState(false);

  // Weekly Activity Bar Chart Data
  const weeklyData = [
    { day: 'Mon', value: 38, kpi: '12.4k', label: 'Monday' },
    { day: 'Tue', value: 52, kpi: '14.1k', label: 'Tuesday' },
    { day: 'Wed', value: 88, kpi: '16.4k', label: 'Wednesday' },
    { day: 'Thu', value: 46, kpi: '11.8k', label: 'Thursday' },
    { day: 'Fri', value: 68, kpi: '15.2k', label: 'Friday' },
    { day: 'Sat', value: 28, kpi: '8.3k', label: 'Saturday' },
    { day: 'Sun', value: 22, kpi: '6.9k', label: 'Sunday' },
  ];

  const activeDay = weeklyData[activeDayIdx] || weeklyData[2];

  // Dynamic Theme Colors
  const theme = {
    bgImage: isDarkMode 
      ? 'radial-gradient(circle at 50% 20%, rgba(25, 26, 32, 0.95), rgba(10, 11, 14, 0.98)), url("/glass_bg.jpg")'
      : 'url("/glass_bg.jpg")',
    overlayBg: isDarkMode ? 'rgba(10, 11, 14, 0.72)' : 'rgba(246, 248, 252, 0.32)',
    textPrimary: isDarkMode ? '#f8f9fa' : '#121316',
    textMuted: isDarkMode ? 'rgba(255, 255, 255, 0.52)' : 'rgba(18, 19, 22, 0.52)',
    // Light glass card token
    lightGlassBg: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.48)',
    lightGlassBorder: isDarkMode ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.82)',
    lightGlassShadow: isDarkMode 
      ? '0 24px 50px -12px rgba(0, 0, 0, 0.6)' 
      : '0 20px 45px -12px rgba(15, 23, 42, 0.08)',
    // Dark smoked glass card token
    darkGlassBg: isDarkMode ? 'rgba(18, 19, 24, 0.92)' : 'rgba(30, 31, 36, 0.82)',
    darkGlassBorder: isDarkMode ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.16)',
    darkGlassShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundImage: theme.bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: "'Plus Jakarta Sans', Montserrat, sans-serif",
        color: theme.textPrimary,
        overflowX: 'hidden',
        paddingBottom: '130px',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Blurred Backdrop Layer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: theme.overlayBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Slim Vertical Left Dock Navigation */}
      <aside
        style={{
          position: 'fixed',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '12px 8px',
          borderRadius: '999px',
          background: 'rgba(30, 31, 36, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 24px 45px -10px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Dock Items */}
        <button
          title="Overview / Grid"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onClick={() => (window.location.href = '/')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
        </button>

        {/* Active Traffic Dock Icon */}
        <button
          title="Traffic (Active)"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: '#ffffff',
            color: '#0c0d0e',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(255, 255, 255, 0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </button>

        <button
          title="Users & RBAC"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onClick={() => (window.location.href = '/users')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </button>

        <button
          title="Theme Toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          {isDarkMode ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </aside>

      {/* Main Glass Content Container */}
      <main
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1420px',
          margin: '0 auto',
          padding: '36px 36px 40px 108px',
        }}
      >
        {/* Oversized Thin Page Title */}
        <header style={{ textAlign: 'center', marginBottom: '34px', position: 'relative' }}>
          <h1
            style={{
              fontSize: 'clamp(3rem, 6.2vw, 4.8rem)',
              fontWeight: 200,
              letterSpacing: '-0.04em',
              color: theme.textPrimary,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Traffic
          </h1>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: theme.textMuted,
              marginTop: '6px',
            }}
          >
            API Sentinel // Ingestion & Anomaly Stream
          </p>

          {/* Quick theme pill switch in header */}
          <div style={{ position: 'absolute', right: 0, top: '10px' }}>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                background: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
                border: '1px solid ' + (isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'),
                color: theme.textPrimary,
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
              }}
            >
              {isDarkMode ? '● Dark Glass' : '○ Light Glass'}
            </button>
          </div>
        </header>

        {/* 4-COLUMN ASYMMETRIC BENTO GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            width: '100%',
          }}
        >
          {/* ==============================================================
              ROW 1, CARD 1: DARK SMOKED GLASS - HERO 3D SCULPTURE CARD
              ============================================================== */}
          <div
            style={{
              background: theme.darkGlassBg,
              border: `1px solid ${theme.darkGlassBorder}`,
              boxShadow: theme.darkGlassShadow,
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '26px',
              padding: '22px 24px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '235px',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.015em' }}>
                Chaos Geometry
              </div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                Deterministic Pipeline
              </div>
            </div>

            {/* Central 3D Chrome Knot Sculpture Render */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px 0',
              }}
            >
              <div
                style={{
                  width: '104px',
                  height: '104px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at center, rgba(60,60,65,0.4), transparent 70%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                <img
                  src="/chrome_knot.jpg"
                  alt="Sentinel 3D Ingestion Knot"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
                  }}
                  onError={(e) => {
                    // Fallback to SVG if image not found
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.05em' }}>
                THREAT SHIELD
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  background: '#ffffff',
                  color: '#0c0d0e',
                  padding: '3px 10px',
                  borderRadius: '999px',
                }}
              >
                1.2k req/s
              </span>
            </div>
          </div>

          {/* ==============================================================
              ROW 1, CARD 2: LIGHT GLASS - WEEKLY BAR CHART (ROUNDED CAPS)
              ============================================================== */}
          <div
            style={{
              background: theme.lightGlassBg,
              border: `1px solid ${theme.lightGlassBorder}`,
              boxShadow: theme.lightGlassShadow,
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '26px',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '235px',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.015em' }}>
                  Weekly Ingestion
                </div>
                <div style={{ fontSize: '11.5px', color: theme.textMuted, marginTop: '2px' }}>
                  Traffic distribution load
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '34px', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {activeDay.kpi}
                </div>
                <div style={{ fontSize: '10.5px', color: theme.textMuted, marginTop: '3px' }}>
                  {activeDay.label}
                </div>
              </div>
            </div>

            {/* Vertical Bar Chart with Rounded Caps & Active Black Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: '115px',
                gap: '8px',
                padding: '0 2px',
              }}
            >
              {weeklyData.map((item, idx) => {
                const isActive = idx === activeDayIdx;
                return (
                  <div
                    key={item.day}
                    onClick={() => setActiveDayIdx(idx)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: 1,
                      cursor: 'pointer',
                      height: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Rounded Cap Bar Track */}
                    <div
                      style={{
                        width: '7px',
                        height: '84px',
                        borderRadius: '999px',
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                        display: 'flex',
                        alignItems: 'flex-end',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: `${item.value}%`,
                          borderRadius: '999px',
                          backgroundColor: isActive
                            ? (isDarkMode ? '#ffffff' : '#0c0d0e')
                            : (isDarkMode ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.95)'),
                          boxShadow: isActive
                            ? (isDarkMode ? '0 0 12px rgba(255,255,255,0.4)' : '0 4px 12px rgba(0,0,0,0.3)')
                            : '0 2px 5px rgba(0,0,0,0.06)',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </div>

                    {/* Day label and dot */}
                    <div style={{ marginTop: '9px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                      <div
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: isActive ? (isDarkMode ? '#ffffff' : '#0c0d0e') : 'transparent',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? theme.textPrimary : theme.textMuted,
                        }}
                      >
                        {item.day}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==============================================================
              ROW 1, CARD 3: LIGHT GLASS - CAPACITY & DUAL DONUT GAUGES
              ============================================================== */}
          <div
            style={{
              background: theme.lightGlassBg,
              border: `1px solid ${theme.lightGlassBorder}`,
              boxShadow: theme.lightGlassShadow,
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '26px',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '235px',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.015em' }}>
                Gateway Capacity
              </div>
              <div style={{ fontSize: '11.5px', color: theme.textMuted, marginTop: '2px' }}>
                Rate buffer utilization
              </div>
            </div>

            {/* Dual Donut Progress Gauges */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '6px 0' }}>
              {/* Donut 1: 90% */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', width: '68px', height: '68px' }}>
                  <svg width="68" height="68" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="34" cy="34" r="28" fill="transparent" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} strokeWidth="5" />
                    <circle
                      cx="34"
                      cy="34"
                      r="28"
                      fill="transparent"
                      stroke={isDarkMode ? '#ffffff' : '#0c0d0e'}
                      strokeWidth="5"
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={(2 * Math.PI * 28) * (1 - 0.90)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: theme.textPrimary,
                    }}
                  >
                    90%
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: theme.textMuted, marginTop: '4px', fontWeight: 500 }}>
                  Active Buffer
                </div>
              </div>

              {/* Donut 2: 65% */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', width: '68px', height: '68px' }}>
                  <svg width="68" height="68" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="34" cy="34" r="28" fill="transparent" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} strokeWidth="5" />
                    <circle
                      cx="34"
                      cy="34"
                      r="28"
                      fill="transparent"
                      stroke={isDarkMode ? '#ffffff' : '#0c0d0e'}
                      strokeWidth="5"
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={(2 * Math.PI * 28) * (1 - 0.65)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: theme.textPrimary,
                    }}
                  >
                    65%
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: theme.textMuted, marginTop: '4px', fontWeight: 500 }}>
                  Queue Health
                </div>
              </div>
            </div>

            {/* Horizontal Micro-Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: theme.textMuted }}>
                  <span>High-Throughput Ingestion</span>
                  <span style={{ fontWeight: 700, color: theme.textPrimary }}>80%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(0,0,0,0.08)', marginTop: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: isDarkMode ? '#ffffff' : '#0c0d0e', borderRadius: '999px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: theme.textMuted }}>
                  <span>Threat Engine Evaluation</span>
                  <span style={{ fontWeight: 700, color: theme.textPrimary }}>13%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(0,0,0,0.08)', marginTop: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '13%', height: '100%', background: isDarkMode ? '#ffffff' : '#0c0d0e', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              ROW 1, CARD 4: TOP RIGHT - ANALYTICS KPI PILLS & SETTINGS CARD
              ============================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* KPI Pill Badges Card */}
            <div
              style={{
                background: theme.lightGlassBg,
                border: `1px solid ${theme.lightGlassBorder}`,
                boxShadow: theme.lightGlassShadow,
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                borderRadius: '26px',
                padding: '18px 20px',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>
                Traffic Analytics
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{
                    flex: 1,
                    background: isDarkMode ? '#ffffff' : '#0c0d0e',
                    color: isDarkMode ? '#0c0d0e' : '#ffffff',
                    padding: '8px 6px',
                    borderRadius: '999px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1 }}>1065</div>
                  <div style={{ fontSize: '9px', opacity: 0.7, marginTop: '2px' }}>Endpoints</div>
                </div>

                <div
                  style={{
                    flex: 1,
                    background: isDarkMode ? '#ffffff' : '#0c0d0e',
                    color: isDarkMode ? '#0c0d0e' : '#ffffff',
                    padding: '8px 6px',
                    borderRadius: '999px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1 }}>∞</div>
                  <div style={{ fontSize: '9px', opacity: 0.7, marginTop: '2px' }}>Throughput</div>
                </div>

                <div
                  style={{
                    flex: 1,
                    background: isDarkMode ? '#ffffff' : '#0c0d0e',
                    color: isDarkMode ? '#0c0d0e' : '#ffffff',
                    padding: '8px 6px',
                    borderRadius: '999px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1 }}>7</div>
                  <div style={{ fontSize: '9px', opacity: 0.7, marginTop: '2px' }}>Regions</div>
                </div>
              </div>
            </div>

            {/* Dark Smoked Settings Card with Pill Toggles */}
            <div
              style={{
                background: theme.darkGlassBg,
                border: `1px solid ${theme.darkGlassBorder}`,
                boxShadow: theme.darkGlassShadow,
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                borderRadius: '26px',
                padding: '18px 20px',
                color: '#ffffff',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>Traffic Controls</div>
                <div style={{ fontSize: '10.5px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                  Pipeline security policies
                </div>
              </div>

              {/* Pill Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>Rate Limiter</span>
                  <div
                    onClick={() => setRateLimitEnabled(!rateLimitEnabled)}
                    style={{
                      width: '34px',
                      height: '18px',
                      borderRadius: '999px',
                      background: rateLimitEnabled ? '#ffffff' : 'rgba(255,255,255,0.2)',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: rateLimitEnabled ? '#0c0d0e' : '#ffffff',
                        position: 'absolute',
                        top: '3px',
                        left: rateLimitEnabled ? '18px' : '3px',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>Deep Inspection</span>
                  <div
                    onClick={() => setDeepInspection(!deepInspection)}
                    style={{
                      width: '34px',
                      height: '18px',
                      borderRadius: '999px',
                      background: deepInspection ? '#ffffff' : 'rgba(255,255,255,0.2)',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: deepInspection ? '#0c0d0e' : '#ffffff',
                        position: 'absolute',
                        top: '3px',
                        left: deepInspection ? '18px' : '3px',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>Zero-Trust Guard</span>
                  <div
                    onClick={() => setZeroTrustGuard(!zeroTrustGuard)}
                    style={{
                      width: '34px',
                      height: '18px',
                      borderRadius: '999px',
                      background: zeroTrustGuard ? '#ffffff' : 'rgba(255,255,255,0.2)',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: zeroTrustGuard ? '#0c0d0e' : '#ffffff',
                        position: 'absolute',
                        top: '3px',
                        left: zeroTrustGuard ? '18px' : '3px',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Progress Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>
                  <span>Isolation Forest Threshold</span>
                  <span style={{ fontWeight: 700, color: '#ffffff' }}>80%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', marginTop: '4px' }}>
                  <div style={{ width: '80%', height: '100%', background: '#ffffff', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              ROW 2, CARD 1: DARK SMOKED GLASS - SMOOTH GLOWING LINE CHART
              ============================================================== */}
          <div
            style={{
              background: theme.darkGlassBg,
              border: `1px solid ${theme.darkGlassBorder}`,
              boxShadow: theme.darkGlassShadow,
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '26px',
              padding: '22px 24px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '235px',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.015em' }}>
                Threat Velocity
              </div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                Anomaly detection rate
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
              {/* Minimal Y-axis labels */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '85px',
                  fontSize: '9.5px',
                  color: 'rgba(255, 255, 255, 0.45)',
                  fontWeight: 500,
                  userSelect: 'none',
                }}
              >
                <span>+90%</span>
                <span>+40%</span>
                <span>+10%</span>
                <span>-15%</span>
              </div>

              {/* SVG Glowing Curve Line */}
              <div style={{ flex: 1, position: 'relative' }}>
                <svg viewBox="0 0 240 100" style={{ width: '100%', height: '85px', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="trafficLineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <filter id="whiteGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.4" />
                    </filter>
                  </defs>

                  <path d="M 10 82 Q 40 78, 65 65 T 120 50 T 175 32 T 225 15 L 225 95 L 10 95 Z" fill="url(#trafficLineGrad)" />
                  <path
                    d="M 10 82 Q 40 78, 65 65 T 120 50 T 175 32 T 225 15"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#whiteGlow)"
                  />
                  <circle cx="225" cy="15" r="3.5" fill="#ffffff" />
                </svg>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 8px',
                    marginTop: '4px',
                    fontSize: '9.5px',
                    color: 'rgba(255, 255, 255, 0.45)',
                    fontWeight: 500,
                  }}
                >
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              ROW 2, CARDS 2 & 3: WIDE LIGHT GLASS - AUDIT SCHEDULE / TIMELINE
              (Spans 2 columns in Bento Grid)
              ============================================================== */}
          <div
            style={{
              gridColumn: 'span 2',
              background: theme.lightGlassBg,
              border: `1px solid ${theme.lightGlassBorder}`,
              boxShadow: theme.lightGlassShadow,
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '26px',
              padding: '22px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '235px',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Top Month Selector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <button
                onClick={() => setSelectedMonth('April 2025')}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: theme.textMuted,
                  background: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  cursor: 'pointer',
                }}
              >
                April
              </button>

              <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.02em', color: theme.textPrimary }}>
                {selectedMonth}
              </div>

              <button
                onClick={() => setSelectedMonth('June 2025')}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: theme.textMuted,
                  background: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  cursor: 'pointer',
                }}
              >
                June
              </button>
            </div>

            {/* Days Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '45px repeat(7, 1fr)',
                gap: '4px',
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: 600,
                color: theme.textMuted,
                paddingBottom: '8px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <div />
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Schedule Time Rows with Floating Black Pill Event Tags */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {/* 12:00 Slot */}
              <div style={{ display: 'grid', gridTemplateColumns: '45px repeat(7, 1fr)', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontSize: '10.5px', color: theme.textMuted }}>12.00</span>
                <div style={{ gridColumn: 'span 7', position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '8%',
                      background: isDarkMode ? '#ffffff' : '#0c0d0e',
                      color: isDarkMode ? '#0c0d0e' : '#ffffff',
                      padding: '3px 12px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Traffic Spike Audit 📹
                  </div>
                </div>
              </div>

              {/* 13.00 Slot */}
              <div style={{ display: 'grid', gridTemplateColumns: '45px repeat(7, 1fr)', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontSize: '10.5px', color: theme.textMuted }}>13.00</span>
                <div style={{ gridColumn: 'span 7', position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '52%',
                      background: isDarkMode ? '#ffffff' : '#0c0d0e',
                      color: isDarkMode ? '#0c0d0e' : '#ffffff',
                      padding: '3px 12px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    SQLi & Ingestion Filter 📊
                  </div>
                </div>
              </div>

              {/* 14.00 Slot */}
              <div style={{ display: 'grid', gridTemplateColumns: '45px repeat(7, 1fr)', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontSize: '10.5px', color: theme.textMuted }}>14.00</span>
                <div style={{ gridColumn: 'span 7', position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '26%',
                      background: isDarkMode ? '#ffffff' : '#0c0d0e',
                      color: isDarkMode ? '#0c0d0e' : '#ffffff',
                      padding: '3px 12px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Isolation Forest Retrain 🤖
                  </div>
                </div>
              </div>

              {/* 15.00 Slot */}
              <div style={{ display: 'grid', gridTemplateColumns: '45px repeat(7, 1fr)', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontSize: '10.5px', color: theme.textMuted }}>15.00</span>
                <div style={{ gridColumn: 'span 7', position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '60%',
                      background: isDarkMode ? '#ffffff' : '#0c0d0e',
                      color: isDarkMode ? '#0c0d0e' : '#ffffff',
                      padding: '3px 12px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Edge Latency Sync 📁
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              ROW 3, CARDS 1 & 2: WIDE LIGHT GLASS - MOUNTAIN AREA CHART
              (Throughput vs Latency)
              ============================================================== */}
          <div
            style={{
              gridColumn: 'span 2',
              background: theme.lightGlassBg,
              border: `1px solid ${theme.lightGlassBorder}`,
              boxShadow: theme.lightGlassShadow,
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '26px',
              padding: '22px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '235px',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.015em' }}>
                Peak Ingestion VS Latency
              </div>
              <div style={{ fontSize: '11.5px', color: theme.textMuted, marginTop: '2px' }}>
                Hourly volumetric distribution curve
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginTop: '16px' }}>
              {/* Y Axis Ticks */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '95px',
                  fontSize: '9.5px',
                  color: theme.textMuted,
                  fontWeight: 500,
                  paddingBottom: '16px',
                  userSelect: 'none',
                }}
              >
                <span>21:00</span>
                <span>18:00</span>
                <span>15:00</span>
                <span>12:00</span>
                <span>9:00</span>
              </div>

              {/* Silhouette Mountain SVG Chart */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', width: '100%', height: '95px' }}>
                  <svg viewBox="0 0 320 110" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="peakMountainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isDarkMode ? '#ffffff' : '#141518'} stopOpacity="0.95" />
                        <stop offset="60%" stopColor={isDarkMode ? '#adb5bd' : '#2a2c33'} stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
                      </linearGradient>

                      <linearGradient id="backMountainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isDarkMode ? '#6c757d' : '#4a4d56'} stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    {/* Background Peak */}
                    <path
                      d="M 10 110 L 10 80 Q 40 50, 75 60 T 140 30 T 210 65 T 280 40 L 310 70 L 310 110 Z"
                      fill="url(#backMountainGrad)"
                    />

                    {/* Foreground Sharp Peak */}
                    <path
                      d="M 5 110 L 5 88 Q 35 85, 65 55 T 100 12 T 140 70 T 190 8 T 240 60 T 290 85 L 315 90 L 315 110 Z"
                      fill="url(#peakMountainGrad)"
                    />

                    {/* Peak Crisp Edge */}
                    <path
                      d="M 5 88 Q 35 85, 65 55 T 100 12 T 140 70 T 190 8 T 240 60 T 290 85 L 315 90"
                      fill="none"
                      stroke={isDarkMode ? '#ffffff' : '#121316'}
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* X Axis Percentage Ticks */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 8px',
                    marginTop: '6px',
                    fontSize: '9.5px',
                    color: theme.textMuted,
                    fontWeight: 500,
                  }}
                >
                  <span>30%</span>
                  <span>40%</span>
                  <span>50%</span>
                  <span>60%</span>
                  <span>70%</span>
                  <span>80%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              ROW 3, CARD 3: LIGHT GLASS - DUAL LARGE PROGRESS RINGS
              (20% Blocked, 93% Verified)
              ============================================================== */}
          <div
            style={{
              background: theme.lightGlassBg,
              border: `1px solid ${theme.lightGlassBorder}`,
              boxShadow: theme.lightGlassShadow,
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '26px',
              padding: '22px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              minHeight: '235px',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Ring 1: 20% Blocked */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '92px', height: '92px' }}>
                <svg width="92" height="92" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="46" cy="46" r="38" fill="transparent" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} strokeWidth="7" />
                  <circle
                    cx="46"
                    cy="46"
                    r="38"
                    fill="transparent"
                    stroke={isDarkMode ? '#ffffff' : '#0c0d0e'}
                    strokeWidth="7"
                    strokeDasharray={2 * Math.PI * 38}
                    strokeDashoffset={(2 * Math.PI * 38) * (1 - 0.20)}
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: theme.textPrimary,
                    letterSpacing: '-0.02em',
                  }}
                >
                  20%
                </div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '10px', color: theme.textPrimary }}>
                Filtered
              </div>
              <div style={{ fontSize: '10.5px', color: theme.textMuted }}>Anomalies</div>
            </div>

            {/* Ring 2: 93% Verified */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '92px', height: '92px' }}>
                <svg width="92" height="92" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="46" cy="46" r="38" fill="transparent" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} strokeWidth="7" />
                  <circle
                    cx="46"
                    cy="46"
                    r="38"
                    fill="transparent"
                    stroke={isDarkMode ? '#ffffff' : '#0c0d0e'}
                    strokeWidth="7"
                    strokeDasharray={2 * Math.PI * 38}
                    strokeDashoffset={(2 * Math.PI * 38) * (1 - 0.93)}
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: theme.textPrimary,
                    letterSpacing: '-0.02em',
                  }}
                >
                  93%
                </div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '10px', color: theme.textPrimary }}>
                Verified
              </div>
              <div style={{ fontSize: '10.5px', color: theme.textMuted }}>Clean Traffic</div>
            </div>
          </div>

          {/* ==============================================================
              ROW 3, CARD 4: LIGHT GLASS - DOTTED MONOCHROME WORLD MAP
              ============================================================== */}
          <div
            style={{
              background: theme.lightGlassBg,
              border: `1px solid ${theme.lightGlassBorder}`,
              boxShadow: theme.lightGlassShadow,
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '26px',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '235px',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.015em' }}>
                  Regional Nodes
                </div>
                <div style={{ fontSize: '11.5px', color: theme.textMuted, marginTop: '2px' }}>
                  Global API ingress points
                </div>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: theme.textPrimary,
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                }}
              >
                Offset: +5h
              </span>
            </div>

            {/* Dotted World Map Graphic with Ping Nodes */}
            <div style={{ position: 'relative', width: '100%', height: '120px', marginTop: '10px' }}>
              <svg viewBox="0 0 320 130" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <filter id="trafficPingGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor={isDarkMode ? '#ffffff' : '#000000'} floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Continents */}
                <path d="M 25 35 Q 38 20, 60 22 T 95 35 T 80 55 T 45 60 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.9" />
                <path d="M 68 70 Q 82 72, 85 88 T 78 115 T 62 95 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.88" />
                <path d="M 130 25 Q 155 22, 165 32 T 150 48 T 132 40 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.9" />
                <path d="M 135 52 Q 165 52, 165 75 T 155 105 T 138 85 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.88" />
                <path d="M 172 22 Q 220 18, 260 28 T 275 58 T 240 70 T 195 50 T 175 32 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.94" />
                <path d="M 245 88 Q 275 85, 278 102 T 252 110 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.85" />

                {/* Location Ping Nodes */}
                <g>
                  <circle cx="68" cy="38" r="4" fill={isDarkMode ? '#0c0d0e' : '#ffffff'} stroke={isDarkMode ? '#ffffff' : '#0c0d0e'} strokeWidth="2.2" filter="url(#trafficPingGlow)" />
                  <text x="68" y="28" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={theme.textPrimary}>US-East</text>
                </g>
                <g>
                  <circle cx="145" cy="32" r="4" fill={isDarkMode ? '#0c0d0e' : '#ffffff'} stroke={isDarkMode ? '#ffffff' : '#0c0d0e'} strokeWidth="2.2" filter="url(#trafficPingGlow)" />
                  <text x="145" y="22" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={theme.textPrimary}>Frankfurt</text>
                </g>
                <g>
                  <circle cx="262" cy="42" r="4.5" fill={isDarkMode ? '#0c0d0e' : '#ffffff'} stroke={isDarkMode ? '#ffffff' : '#0c0d0e'} strokeWidth="2.5" filter="url(#trafficPingGlow)" />
                  <text x="262" y="32" textAnchor="middle" fontSize="8" fontWeight="800" fill={theme.textPrimary}>Tokyo</text>
                </g>
                <g>
                  <circle cx="225" cy="72" r="3.5" fill={isDarkMode ? '#0c0d0e' : '#ffffff'} stroke={isDarkMode ? '#ffffff' : '#0c0d0e'} strokeWidth="1.8" filter="url(#trafficPingGlow)" />
                  <text x="225" y="84" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={theme.textPrimary}>Singapore</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Pill Bottom Navigation Dock */}
      <nav
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 8px',
          borderRadius: '999px',
          background: 'rgba(30, 31, 36, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 24px 50px -10px rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      >
        <button
          onClick={() => (window.location.href = '/')}
          style={{
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.7)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Overview
        </button>

        {/* Active Pill in Solid White / Black */}
        <button
          style={{
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 700,
            background: '#ffffff',
            color: '#0c0d0e',
            border: 'none',
            cursor: 'default',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
          }}
        >
          Traffic
        </button>

        <button
          onClick={() => (window.location.href = '/users')}
          style={{
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.7)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Users
        </button>

        <button
          onClick={() => (window.location.href = '/incidents')}
          style={{
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.7)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Incidents
        </button>

        {/* Plus Button Action */}
        <button
          title="New Ingestion Probe"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.14)',
            color: '#ffffff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginLeft: '4px',
            fontSize: '18px',
            fontWeight: 300,
          }}
          onClick={() => alert('Add New Traffic Source / Custom Probe')}
        >
          +
        </button>
      </nav>
    </div>
  );
};

export default TrafficPage;
