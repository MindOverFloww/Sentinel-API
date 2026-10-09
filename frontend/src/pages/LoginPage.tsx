import React, { useState } from 'react';
import { Shield, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess?: (role: string) => void;
  onNavigateHome?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'ANALYST' | 'VIEWER'>('ADMIN');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const demoAccounts = [
    {
      role: 'ADMIN' as const,
      user: 'admin',
      pass: 'admin123',
      permissions: 'Full privileges: manage rules, investigate incidents, audit users',
    },
    {
      role: 'ANALYST' as const,
      user: 'analyst',
      pass: 'analyst123',
      permissions: 'Triage & investigate incidents, update lifecycle status',
    },
    {
      role: 'VIEWER' as const,
      user: 'viewer',
      pass: 'viewer123',
      permissions: 'Read-only access: view dashboard & telemetry events',
    },
  ];

  const handleQuickFill = (acc: typeof demoAccounts[0]) => {
    setUsername(acc.user);
    setPassword(acc.pass);
    setSelectedRole(acc.role);
    setStatusMessage(`Populated ${acc.role} demo credentials`);
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(selectedRole);
      } else if (onNavigateHome) {
        onNavigateHome();
      }
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden animate-fade-slide">
      {/* Background ambient diffuse white light glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-white/50 dark:bg-white/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-neutral-200/50 dark:bg-neutral-800/[0.08] rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: Dark Smoked Glass Showcase Card */}
        <div className="lg:col-span-5 glass-dark p-7 md:p-8 flex flex-col justify-between rounded-[28px] relative overflow-hidden order-2 lg:order-1">
          <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-neutral-300">
                Security Gateway
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-3">
              Protected by Sentinel Core
            </h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
              Authentication endpoints are continuously audited. Every failed login attempt is recorded and evaluated against the 60-second velocity detection window.
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                  Active Enforcement Rule
                </div>
                <div className="text-xs font-semibold text-white mt-0.5">
                  Brute Force Trigger: &gt; 5 Fails / 60s
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                  Cryptographic Standard
                </div>
                <div className="text-xs font-semibold text-white mt-0.5 font-mono">
                  HMAC-SHA256 JWT + BCrypt Salt
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Role-Based Access Control</span>
            <span className="text-white font-mono">Spring Security 6</span>
          </div>
        </div>

        {/* Right Card: Light Frosted Glass Login Form */}
        <div className="lg:col-span-7 glass-light p-7 md:p-10 rounded-[28px] flex flex-col justify-between order-1 lg:order-2">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                Console Authentication
              </span>
              {onNavigateHome && (
                <button
                  onClick={onNavigateHome}
                  className="text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  ← Back to Dashboard
                </button>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight text-neutral-900 dark:text-white mb-2">
              Sign In
            </h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light mb-6">
              Select a preset role or enter credentials to access security telemetry.
            </p>

            {/* Status Toast */}
            {statusMessage && (
              <div className="mb-4 flex items-center gap-2 p-2.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-medium shadow-sm animate-fade-slide">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Demo Role Pills */}
            <div className="mb-6">
              <div className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                Quick-Select Role:
              </div>
              <div className="grid grid-cols-3 gap-2">
                {demoAccounts.map((acc) => {
                  const isSelected = selectedRole === acc.role;
                  return (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleQuickFill(acc)}
                      className={`p-2.5 rounded-2xl text-left border transition-all duration-200 ${
                        isSelected
                          ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md'
                          : 'bg-black/[0.02] dark:bg-white/[0.04] border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:bg-black/[0.05]'
                      }`}
                    >
                      <div className="text-xs font-bold">{acc.role}</div>
                      <div className="text-[10px] opacity-75 font-mono truncate">{acc.user}</div>
                    </button>
                  );
                })}
              </div>

              {/* Permission description */}
              <div className="mt-2 text-[10px] text-neutral-500 dark:text-neutral-400 italic">
                {demoAccounts.find((a) => a.role === selectedRole)?.permissions}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:border-black dark:focus:border-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded-sm border-neutral-300 accent-black dark:accent-white"
                  />
                  <span className="text-[11px]">Remember credentials</span>
                </label>
                <span className="text-[11px] text-neutral-400 font-mono">BTech Evaluator Access</span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-5 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to API Sentinel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Single-Sign-On: Disabled</span>
            <span className="font-mono text-[10px]">Version 1.4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
