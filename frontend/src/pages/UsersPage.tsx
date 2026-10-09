import React, { useState } from 'react';

// Self-contained Modern Glassmorphism UI for UsersPage
export const UsersPage: React.FC = () => {
  const isDarkMode = false;
  const [activeDayIdx, setActiveDayIdx] = useState(2); // Wednesday default
  const [selectedMonth, setSelectedMonth] = useState('May 2025');

  // Policy toggles in settings card
  const [enforceMfa, setEnforceMfa] = useState(true);
  const [bruteForceLock, setBruteForceLock] = useState(true);
  const [strictJwtExpiry, setStrictJwtExpiry] = useState(false);

  // Weekly Authentication Volume Data
  const weeklyAuthData = [
    { day: 'Mon', value: 34, kpi: '11.2k', label: 'Monday' },
    { day: 'Tue', value: 48, kpi: '13.5k', label: 'Tuesday' },
    { day: 'Wed', value: 84, kpi: '14.8k', label: 'Wednesday' },
    { day: 'Thu', value: 42, kpi: '10.9k', label: 'Thursday' },
    { day: 'Fri', value: 62, kpi: '13.9k', label: 'Friday' },
    { day: 'Sat', value: 24, kpi: '7.1k', label: 'Saturday' },
    { day: 'Sun', value: 18, kpi: '5.8k', label: 'Sunday' },
  ];

  const activeDay = weeklyAuthData[activeDayIdx] || weeklyAuthData[2];

  // Fixed Light Palette
  const theme = {
    textPrimary: '#121316',
    textMuted: 'rgba(18, 19, 22, 0.52)',
    // Light glass card token
    lightGlassBg: 'rgba(255, 255, 255, 0.72)',
    lightGlassBorder: 'rgba(255, 255, 255, 0.9)',
    lightGlassShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
    // Dark smoked glass card token
    darkGlassBg: '#222225',
    darkGlassBorder: 'rgba(255, 255, 255, 0.1)',
    darkGlassShadow: '0 12px 36px rgba(0, 0, 0, 0.22)',
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="min-w-0 w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-zinc-500">
              Identity & Access Control
            </span>
          <h1
            className="text-4xl lg:text-5xl font-extralight text-zinc-950 mt-1"
          >
            Users
          </h1>
          <p className="text-sm text-zinc-600 mt-1 max-w-xl">
            Monitor account activity, authentication posture, and role-based access.
          </p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
          {/* ==============================================================
              ROW 1, CARD 1: DARK SMOKED GLASS - IDENTITY 3D HERO CARD
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
                Identity Core
              </div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                RBAC Access Sentinel
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
                  alt="Identity Knot"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.05em' }}>
                ACTIVE SESSIONS
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
                142 Authenticated
              </span>
            </div>
          </div>

          {/* ==============================================================
              ROW 1, CARD 2: LIGHT GLASS - WEEKLY AUTH VOLUME (BAR CHART)
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
                  Weekly Logins
                </div>
                <div style={{ fontSize: '11.5px', color: theme.textMuted, marginTop: '2px' }}>
                  Authentication attempts
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

            {/* Vertical Bar Chart with Rounded Caps */}
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
              {weeklyAuthData.map((item, idx) => {
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
              ROW 1, CARD 3: LIGHT GLASS - SECURITY POSTURE & DUAL DONUTS
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
                Security Posture
              </div>
              <div style={{ fontSize: '11.5px', color: theme.textMuted, marginTop: '2px' }}>
                Credential integrity ratio
              </div>
            </div>

            {/* Dual Donut Progress Gauges */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '6px 0' }}>
              {/* Donut 1: 96% MFA */}
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
                      strokeDashoffset={(2 * Math.PI * 28) * (1 - 0.96)}
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
                    96%
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: theme.textMuted, marginTop: '4px', fontWeight: 500 }}>
                  MFA Adoption
                </div>
              </div>

              {/* Donut 2: 88% Token Health */}
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
                      strokeDashoffset={(2 * Math.PI * 28) * (1 - 0.88)}
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
                    88%
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: theme.textMuted, marginTop: '4px', fontWeight: 500 }}>
                  Valid JWTs
                </div>
              </div>
            </div>

            {/* Horizontal Micro-Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: theme.textMuted }}>
                  <span>Role Integrity Verification</span>
                  <span style={{ fontWeight: 700, color: theme.textPrimary }}>95%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(0,0,0,0.08)', marginTop: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '95%', height: '100%', background: isDarkMode ? '#ffffff' : '#0c0d0e', borderRadius: '999px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: theme.textMuted }}>
                  <span>Token Expiration Audit</span>
                  <span style={{ fontWeight: 700, color: theme.textPrimary }}>82%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(0,0,0,0.08)', marginTop: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: isDarkMode ? '#ffffff' : '#0c0d0e', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              ROW 1, CARD 4: TOP RIGHT - USER ANALYTICS & ACCESS POLICIES
              ============================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* KPI Badges Card */}
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
                User Analytics
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
                  <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1 }}>842</div>
                  <div style={{ fontSize: '9px', opacity: 0.7, marginTop: '2px' }}>Users</div>
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
                  <div style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1 }}>3</div>
                  <div style={{ fontSize: '9px', opacity: 0.7, marginTop: '2px' }}>Roles</div>
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
                  <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1 }}>24</div>
                  <div style={{ fontSize: '9px', opacity: 0.7, marginTop: '2px' }}>Revoked</div>
                </div>
              </div>
            </div>

            {/* Dark Smoked Access Policies Settings Card */}
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
                <div style={{ fontSize: '14px', fontWeight: 700 }}>Access Policies</div>
                <div style={{ fontSize: '10.5px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                  RBAC identity governance
                </div>
              </div>

              {/* Pill Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>Enforce MFA</span>
                  <div
                    onClick={() => setEnforceMfa(!enforceMfa)}
                    style={{
                      width: '34px',
                      height: '18px',
                      borderRadius: '999px',
                      background: enforceMfa ? '#ffffff' : 'rgba(255,255,255,0.2)',
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
                        background: enforceMfa ? '#0c0d0e' : '#ffffff',
                        position: 'absolute',
                        top: '3px',
                        left: enforceMfa ? '18px' : '3px',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>Brute-Force Lock</span>
                  <div
                    onClick={() => setBruteForceLock(!bruteForceLock)}
                    style={{
                      width: '34px',
                      height: '18px',
                      borderRadius: '999px',
                      background: bruteForceLock ? '#ffffff' : 'rgba(255,255,255,0.2)',
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
                        background: bruteForceLock ? '#0c0d0e' : '#ffffff',
                        position: 'absolute',
                        top: '3px',
                        left: bruteForceLock ? '18px' : '3px',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>Strict JWT Expiry</span>
                  <div
                    onClick={() => setStrictJwtExpiry(!strictJwtExpiry)}
                    style={{
                      width: '34px',
                      height: '18px',
                      borderRadius: '999px',
                      background: strictJwtExpiry ? '#ffffff' : 'rgba(255,255,255,0.2)',
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
                        background: strictJwtExpiry ? '#0c0d0e' : '#ffffff',
                        position: 'absolute',
                        top: '3px',
                        left: strictJwtExpiry ? '18px' : '3px',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Progress Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>
                  <span>Policy Compliance</span>
                  <span style={{ fontWeight: 700, color: '#ffffff' }}>92%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', marginTop: '4px' }}>
                  <div style={{ width: '92%', height: '100%', background: '#ffffff', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              ROW 2, CARD 1: DARK SMOKED GLASS - FAILED LOGIN TRAJECTORY
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
                Auth Anomaly Rate
              </div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                Failed credentials velocity
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
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

              {/* Glowing Line SVG */}
              <div style={{ flex: 1, position: 'relative' }}>
                <svg viewBox="0 0 240 100" style={{ width: '100%', height: '85px', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="userLineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <filter id="whiteGlowUser" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.4" />
                    </filter>
                  </defs>

                  <path d="M 10 82 Q 40 78, 65 65 T 120 50 T 175 32 T 225 15 L 225 95 L 10 95 Z" fill="url(#userLineGrad)" />
                  <path
                    d="M 10 82 Q 40 78, 65 65 T 120 50 T 175 32 T 225 15"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#whiteGlowUser)"
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
              ROW 2, CARDS 2 & 3: WIDE LIGHT GLASS - USER ACCESS TIMELINE
              (Spans 2 Columns in Bento Grid)
              ============================================================== */}
          <div
            className="xl:col-span-2"
            style={{
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
                      left: '10%',
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
                    Analyst Roles Audit 📹
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
                      left: '48%',
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
                    Token Revocation Sweep 📊
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
                      left: '25%',
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
                    Privileged Session Review 🛡️
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
                      left: '64%',
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
                    Directory SSO Sync 📁
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              ROW 3, CARDS 1 & 2: WIDE LIGHT GLASS - MOUNTAIN AREA CHART
              (User Sessions vs Concurrent Logins)
              ============================================================== */}
          <div
            className="xl:col-span-2"
            style={{
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
                User Concurrency VS Session Lifetime
              </div>
              <div style={{ fontSize: '11.5px', color: theme.textMuted, marginTop: '2px' }}>
                Active user load curve distribution
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginTop: '16px' }}>
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
                      <linearGradient id="userMountainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isDarkMode ? '#ffffff' : '#141518'} stopOpacity="0.95" />
                        <stop offset="60%" stopColor={isDarkMode ? '#adb5bd' : '#2a2c33'} stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
                      </linearGradient>

                      <linearGradient id="userBackMountainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isDarkMode ? '#6c757d' : '#4a4d56'} stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 10 110 L 10 80 Q 40 50, 75 60 T 140 30 T 210 65 T 280 40 L 310 70 L 310 110 Z"
                      fill="url(#userBackMountainGrad)"
                    />

                    <path
                      d="M 5 110 L 5 88 Q 35 85, 65 55 T 100 12 T 140 70 T 190 8 T 240 60 T 290 85 L 315 90 L 315 110 Z"
                      fill="url(#userMountainGrad)"
                    />

                    <path
                      d="M 5 88 Q 35 85, 65 55 T 100 12 T 140 70 T 190 8 T 240 60 T 290 85 L 315 90"
                      fill="none"
                      stroke={isDarkMode ? '#ffffff' : '#121316'}
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

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
              (4% Suspicious, 96% Clean)
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
            {/* Ring 1: 4% Suspicious */}
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
                    strokeDashoffset={(2 * Math.PI * 38) * (1 - 0.04)}
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
                  4%
                </div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '10px', color: theme.textPrimary }}>
                Suspicious
              </div>
              <div style={{ fontSize: '10.5px', color: theme.textMuted }}>Brute-Force Flags</div>
            </div>

            {/* Ring 2: 96% Clean */}
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
                    strokeDashoffset={(2 * Math.PI * 38) * (1 - 0.96)}
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
                  96%
                </div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '10px', color: theme.textPrimary }}>
                Clean
              </div>
              <div style={{ fontSize: '10.5px', color: theme.textMuted }}>Valid Sessions</div>
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
                  User Locations
                </div>
                <div style={{ fontSize: '11.5px', color: theme.textMuted, marginTop: '2px' }}>
                  Geographic login access points
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
                Delta: +5h
              </span>
            </div>

            {/* Dotted World Map Graphic with Ping Nodes */}
            <div style={{ position: 'relative', width: '100%', height: '120px', marginTop: '10px' }}>
              <svg viewBox="0 0 320 130" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <filter id="userPingGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor={isDarkMode ? '#ffffff' : '#000000'} floodOpacity="0.4" />
                  </filter>
                </defs>

                <path d="M 25 35 Q 38 20, 60 22 T 95 35 T 80 55 T 45 60 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.9" />
                <path d="M 68 70 Q 82 72, 85 88 T 78 115 T 62 95 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.88" />
                <path d="M 130 25 Q 155 22, 165 32 T 150 48 T 132 40 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.9" />
                <path d="M 135 52 Q 165 52, 165 75 T 155 105 T 138 85 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.88" />
                <path d="M 172 22 Q 220 18, 260 28 T 275 58 T 240 70 T 195 50 T 175 32 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.94" />
                <path d="M 245 88 Q 275 85, 278 102 T 252 110 Z" fill={isDarkMode ? '#ffffff' : '#121316'} opacity="0.85" />

                {/* Location Ping Nodes */}
                <g>
                  <circle cx="68" cy="38" r="4" fill={isDarkMode ? '#0c0d0e' : '#ffffff'} stroke={isDarkMode ? '#ffffff' : '#0c0d0e'} strokeWidth="2.2" filter="url(#userPingGlow)" />
                  <text x="68" y="28" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={theme.textPrimary}>New York</text>
                </g>
                <g>
                  <circle cx="145" cy="32" r="4" fill={isDarkMode ? '#0c0d0e' : '#ffffff'} stroke={isDarkMode ? '#ffffff' : '#0c0d0e'} strokeWidth="2.2" filter="url(#userPingGlow)" />
                  <text x="145" y="22" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={theme.textPrimary}>London</text>
                </g>
                <g>
                  <circle cx="262" cy="42" r="4.5" fill={isDarkMode ? '#0c0d0e' : '#ffffff'} stroke={isDarkMode ? '#ffffff' : '#0c0d0e'} strokeWidth="2.5" filter="url(#userPingGlow)" />
                  <text x="262" y="32" textAnchor="middle" fontSize="8" fontWeight="800" fill={theme.textPrimary}>Tokyo</text>
                </g>
                <g>
                  <circle cx="225" cy="72" r="3.5" fill={isDarkMode ? '#0c0d0e' : '#ffffff'} stroke={isDarkMode ? '#ffffff' : '#0c0d0e'} strokeWidth="1.8" filter="url(#userPingGlow)" />
                  <text x="225" y="84" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={theme.textPrimary}>Singapore</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
