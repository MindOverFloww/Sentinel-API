import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldAlert,
  Activity,
  Sliders,
  Cpu,
  ShieldCheck,
  User as UserIcon,
} from 'lucide-react';

export const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: '/overview', label: 'Overview', icon: LayoutDashboard },
    { to: '/incidents', label: 'Incidents', icon: ShieldAlert },
    { to: '/traffic', label: 'Traffic', icon: Activity },
    { to: '/rules', label: 'Rules', icon: Sliders },
    { to: '/users', label: 'Users', icon: UserIcon },
  ];

  return (
    <div className="relative min-h-screen flex flex-col antialiased">
      {/* Top Header Glass Strip */}
      <header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b border-white/60 bg-white/35 backdrop-blur-[24px]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-black flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-zinc-950">
              API SENTINEL
            </span>
            <span className="ml-2.5 text-[11px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/5 border border-black/10 text-zinc-700">
              IDS ACTIVE
            </span>
          </div>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md">
            <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-semibold">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold leading-tight text-zinc-900">Security Analyst</div>
              <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                ADMIN • ROLE
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body with Slim Left Dock and Page Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 gap-6">
        {/* Left Slim Vertical Icon Dock */}
        <aside className="hidden lg:flex flex-col items-center py-6 px-3 rounded-[28px] bg-white/40 border border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-[26px] h-fit sticky top-24 gap-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                title={item.label}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-black text-white shadow-lg shadow-black/20 scale-105'
                    : 'text-zinc-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Icon className="w-5 h-5" />
              </NavLink>
            );
          })}
        </aside>

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Floating Pill-shaped Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-900/85 text-white border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-[24px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                isActive
                  ? 'bg-white text-zinc-950 font-semibold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
