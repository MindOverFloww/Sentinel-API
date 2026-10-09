import React, { useState, useEffect } from 'react';
import { SidebarDock } from './components/layout/SidebarDock';
import { FloatingBottomNav } from './components/layout/FloatingBottomNav';
import { DashboardPage } from './pages/DashboardPage';
import { RulesPage } from './pages/RulesPage';
import { LoginPage } from './pages/LoginPage';
import { PostmanQuickTestModal } from './components/dashboard/PostmanQuickTestModal';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isPostmanModalOpen, setIsPostmanModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-300">
      {/* Background Architectural Mesh & Diffuse White Light Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/40 dark:bg-white/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-neutral-200/50 dark:bg-neutral-800/[0.08] rounded-full blur-[130px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 lg:pl-16">
        {activeTab === 'overview' && <DashboardPage />}
        {activeTab === 'rules' && <RulesPage />}
        {activeTab === 'login' && (
          <LoginPage
            onLoginSuccess={(role) => {
              setActiveTab('overview');
            }}
            onNavigateHome={() => setActiveTab('overview')}
          />
        )}
      </div>

      {/* Slim Vertical Icon Dock on Left */}
      <SidebarDock
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        openPostmanModal={() => setIsPostmanModalOpen(true)}
      />

      {/* Floating Pill-Shaped Bottom Navigation */}
      <FloatingBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openPostmanModal={() => setIsPostmanModalOpen(true)}
      />

      {/* Global Postman Modal */}
      <PostmanQuickTestModal
        isOpen={isPostmanModalOpen}
        onClose={() => setIsPostmanModalOpen(false)}
        onSimulateAttack={() => setIsPostmanModalOpen(false)}
      />
    </div>
  );
}

export default App;
