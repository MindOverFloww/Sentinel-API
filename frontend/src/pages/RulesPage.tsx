import React, { useState } from 'react';
import { Sliders, ShieldCheck, Play, Plus, RefreshCw, CheckCircle2, AlertTriangle, Terminal, Code2 } from 'lucide-react';
import { INITIAL_RULES } from '../services/mockData';
import { DetectionRuleItem } from '../types/sentinel';

export const RulesPage: React.FC = () => {
  const [rules, setRules] = useState<DetectionRuleItem[]>(INITIAL_RULES);
  const [testPayload, setTestPayload] = useState("' OR '1'='1");
  const [testTarget, setTestTarget] = useState('/api/demo/products');
  const [inspectionResult, setInspectionResult] = useState<{
    triggered: boolean;
    ruleName?: string;
    type?: string;
    reason?: string;
    points?: number;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = !r.enabled;
          showToast(`Rule ${r.name} is now ${updated ? 'ENABLED' : 'DISABLED'}`);
          return { ...r, enabled: updated };
        }
        return r;
      })
    );
  };

  const handleTestInspection = () => {
    const payload = testPayload.toLowerCase();
    const target = testTarget.toLowerCase();

    if (payload.includes("' or '1'='1") || payload.includes('union select') || payload.includes('drop table')) {
      setInspectionResult({
        triggered: true,
        ruleName: 'SQL Injection-Like Pattern Detection',
        type: 'SQL_INJECTION_PATTERN',
        reason: "Detected tautology payload: ' OR '1'='1 in query parameter. Signature match: Boolean Tautology.",
        points: 30,
      });
    } else if (target.includes('/login') && payload.includes('fail')) {
      setInspectionResult({
        triggered: true,
        ruleName: 'Brute Force Detection',
        type: 'BRUTE_FORCE',
        reason: 'Velocity threshold exceeded: > 5 failed logins within 60s window from same IP.',
        points: 50,
      });
    } else if (payload.includes('flood') || payload.includes('100')) {
      setInspectionResult({
        triggered: true,
        ruleName: 'Excessive API Usage / API Abuse',
        type: 'API_ABUSE',
        reason: 'Rate limit breach: > 100 requests within 60s window from same IP.',
        points: 35,
      });
    } else {
      setInspectionResult({
        triggered: false,
        reason: 'Input analyzed: No known malicious signatures or velocity thresholds violated.',
      });
    }
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

      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
              Rule Enforcement Registry
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-400" />
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              Signature & Velocity Engine
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-neutral-900 dark:text-white leading-tight">
            Detection Rules
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light mt-1 max-w-2xl leading-relaxed">
            Rule-based intrusion detection engine specifications. Define velocity thresholds, time windows, and regex patterns evaluated on incoming traffic.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => showToast('All rules synchronized with backend engine')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-medium shadow-md hover:opacity-85 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Rule Set</span>
          </button>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Engine Health & Rule Enforcement Core (Col-Span 2, Dark Smoked Glass) */}
        <div className="glass-dark p-6 md:p-7 col-span-1 md:col-span-2 flex flex-col justify-between rounded-[26px] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Engine Orchestration
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white">
                Zero-Restart Hot Reload
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-4xl sm:text-5xl font-light tracking-tight text-white">
                {rules.filter((r) => r.enabled).length} / {rules.length}
              </span>
              <span className="text-xs font-medium text-neutral-300">
                Rules Active & Enforced
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-light max-w-md mt-1 leading-relaxed">
              Monitored requests pass sequentially through the OncePerRequestFilter pipeline. Violations immediately spawn an explainable incident.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-3">
            <div className="p-2.5 rounded-2xl bg-white/[0.04]">
              <span className="text-[10px] text-neutral-400 block uppercase">Eval Speed</span>
              <span className="text-sm font-semibold text-white">&lt; 1.2 ms</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/[0.04]">
              <span className="text-[10px] text-neutral-400 block uppercase">Total Triggers</span>
              <span className="text-sm font-semibold text-white">1,147</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/[0.04]">
              <span className="text-[10px] text-neutral-400 block uppercase">Architecture</span>
              <span className="text-sm font-semibold text-white">Rule-Based</span>
            </div>
          </div>
        </div>

        {/* Card 2: Interactive Rule Sandbox & Payload Inspector (Col-Span 2, Light Glass) */}
        <div className="glass-light p-6 md:p-7 col-span-1 md:col-span-2 flex flex-col justify-between rounded-[26px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                <h3 className="text-sm md:text-base font-semibold text-neutral-900 dark:text-white">
                  Live Rule Evaluation Sandbox
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-neutral-800 dark:text-neutral-200">
                Interactive Test Bench
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-3">
              Test suspicious request payloads against configured rule signatures before firing external traffic.
            </p>

            <div className="space-y-2.5 mb-3">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block mb-1">
                  Test Endpoint
                </label>
                <input
                  type="text"
                  value={testTarget}
                  onChange={(e) => setTestTarget(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 text-xs font-mono text-neutral-900 dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block mb-1">
                  Query String / Payload String
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testPayload}
                    onChange={(e) => setTestPayload(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 text-xs font-mono text-neutral-900 dark:text-white focus:outline-hidden"
                  />
                  <button
                    onClick={handleTestInspection}
                    className="px-3.5 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3" />
                    <span>Evaluate</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Verdict Output */}
            {inspectionResult && (
              <div
                className={`p-3 rounded-2xl border text-xs ${
                  inspectionResult.triggered
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md'
                    : 'bg-black/[0.03] dark:bg-white/[0.04] border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[11px] uppercase tracking-wider">
                    {inspectionResult.triggered ? '⚠️ RULE TRIGGERED' : '✅ CLEAN PAYLOAD'}
                  </span>
                  {inspectionResult.points && (
                    <span className="font-mono font-bold text-[10px]">
                      +{inspectionResult.points} Risk Points
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">{inspectionResult.reason}</p>
              </div>
            )}
          </div>

          <div className="pt-2 text-[10px] text-neutral-400 flex justify-between items-center">
            <span>Fast AST Pattern Parser</span>
            <span className="font-mono">Local Mock Sandbox</span>
          </div>
        </div>

        {/* Card 3: Rule A - Brute Force Detection (Col-Span 2, Light Glass) */}
        <div className="glass-light p-6 md:p-7 col-span-1 md:col-span-2 flex flex-col justify-between rounded-[26px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-bold text-neutral-800 dark:text-neutral-200">
                RULE-01 • BRUTE_FORCE
              </span>
              <button
                type="button"
                onClick={() => toggleRule('RULE-01')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  rules.find((r) => r.id === 'RULE-01')?.enabled
                    ? 'bg-black dark:bg-white'
                    : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
                role="switch"
                aria-checked={rules.find((r) => r.id === 'RULE-01')?.enabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-black shadow-sm transition duration-200 ${
                    rules.find((r) => r.id === 'RULE-01')?.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white mb-1.5">
              Brute Force Velocity Detector
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Identifies repetitive 401 Unauthorized responses targeting authentication endpoints within a tight time window.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase font-medium">Threshold</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">&gt; 5 Failed Logins</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase font-medium">Time Window</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">60 Seconds</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] text-[11px] text-neutral-700 dark:text-neutral-300 space-y-1">
              <div className="flex justify-between">
                <span>Risk Contribution:</span>
                <span className="font-bold font-mono">+50 Base Points</span>
              </div>
              <div className="flex justify-between">
                <span>Default Severity:</span>
                <span className="font-bold uppercase text-neutral-900 dark:text-white">CRITICAL</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Target: /api/demo/login</span>
            <span className="font-mono text-neutral-700 dark:text-neutral-300">401 Trigger Fired: 401x</span>
          </div>
        </div>

        {/* Card 4: Rule B - Excessive API Usage / API Abuse (Col-Span 2, Dark Smoked Glass) */}
        <div className="glass-dark p-6 md:p-7 col-span-1 md:col-span-2 flex flex-col justify-between rounded-[26px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/15 font-bold text-white">
                RULE-02 • API_ABUSE
              </span>
              <button
                type="button"
                onClick={() => toggleRule('RULE-02')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  rules.find((r) => r.id === 'RULE-02')?.enabled
                    ? 'bg-white'
                    : 'bg-neutral-600'
                }`}
                role="switch"
                aria-checked={rules.find((r) => r.id === 'RULE-02')?.enabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow-sm transition duration-200 ${
                    rules.find((r) => r.id === 'RULE-02')?.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-white mb-1.5">
              Abnormal API Request Frequency
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              Detects abnormal high-frequency request volume originating from an unauthenticated IP across all demo endpoints.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase font-medium">Threshold</span>
                <span className="text-sm font-semibold text-white">&gt; 100 Requests</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase font-medium">Time Window</span>
                <span className="text-sm font-semibold text-white">60 Seconds</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.04] text-[11px] text-neutral-300 space-y-1">
              <div className="flex justify-between">
                <span>Risk Contribution:</span>
                <span className="font-bold font-mono text-white">+35 Base Points</span>
              </div>
              <div className="flex justify-between">
                <span>Default Severity:</span>
                <span className="font-bold uppercase text-white">HIGH</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Target: All Monitored Routes</span>
            <span className="font-mono text-white">Burst Window: 100/60s</span>
          </div>
        </div>

        {/* Card 5: Rule C - SQL Injection-Like Pattern Detection (Col-Span 2, Light Glass) */}
        <div className="glass-light p-6 md:p-7 col-span-1 md:col-span-2 flex flex-col justify-between rounded-[26px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-bold text-neutral-800 dark:text-neutral-200">
                RULE-03 • SQL_INJECTION_PATTERN
              </span>
              <button
                type="button"
                onClick={() => toggleRule('RULE-03')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  rules.find((r) => r.id === 'RULE-03')?.enabled
                    ? 'bg-black dark:bg-white'
                    : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
                role="switch"
                aria-checked={rules.find((r) => r.id === 'RULE-03')?.enabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-black shadow-sm transition duration-200 ${
                    rules.find((r) => r.id === 'RULE-03')?.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white mb-1.5">
              Malicious SQL Payload Pattern Matcher
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
              Deep regex inspection on query parameters and JSON payloads for SQL injection signatures.
            </p>

            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] mb-3">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">
                Active Signatures
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black">
                  &apos; OR &apos;1&apos;=&apos;1
                </span>
                <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-neutral-800 dark:text-neutral-200">
                  UNION SELECT
                </span>
                <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-neutral-800 dark:text-neutral-200">
                  DROP TABLE
                </span>
              </div>
            </div>

            {/* Disclaimer Callout Box */}
            <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[11px] text-neutral-700 dark:text-neutral-300">
              <span className="font-bold block text-neutral-900 dark:text-white mb-0.5">
                Important Security Distinction:
              </span>
              <span>
                System asserts &quot;SQL injection-like malicious pattern detected&quot; — this identifies hostile client input, not whether the backend SQL layer is vulnerable.
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Risk Contribution: +30 Points</span>
            <span className="font-mono text-neutral-800 dark:text-neutral-200">Severity: HIGH</span>
          </div>
        </div>

        {/* Card 6: Rule D - Heuristic Proxy Isolation (Col-Span 2, Light Glass) */}
        <div className="glass-light p-6 md:p-7 col-span-1 md:col-span-2 flex flex-col justify-between rounded-[26px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-bold text-neutral-800 dark:text-neutral-200">
                RULE-04 • HEURISTIC_PROXY
              </span>
              <button
                type="button"
                onClick={() => toggleRule('RULE-04')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  rules.find((r) => r.id === 'RULE-04')?.enabled
                    ? 'bg-black dark:bg-white'
                    : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
                role="switch"
                aria-checked={rules.find((r) => r.id === 'RULE-04')?.enabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-black shadow-sm transition duration-200 ${
                    rules.find((r) => r.id === 'RULE-04')?.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white mb-1.5">
              Heuristic Proxy & Spoofing Isolation
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Cross-references X-Forwarded-For chain integrity, suspicious curl/headless User-Agent headers, and IP rotation speeds.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase font-medium">Threshold</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">&gt; 10 Anomalies</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase font-medium">Window</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">120 Seconds</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] text-[11px] text-neutral-700 dark:text-neutral-300 flex justify-between">
              <span>Status:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                {rules.find((r) => r.id === 'RULE-04')?.enabled ? 'ACTIVE ENFORCEMENT' : 'STANDBY MODE'}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Heuristic Anomaly Engine</span>
            <span className="font-mono text-[10px]">Beta Stage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
