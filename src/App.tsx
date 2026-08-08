import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DeviceFrameWrapper } from './components/common/DeviceFrameWrapper';
import { StateSimulatorDrawer } from './components/common/StateSimulatorDrawer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChallengePage } from './pages/ChallengePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const MainContent: React.FC = () => {
  const { currentRoute, themeMode } = useApp();
  const isNight = themeMode === 'night';

  return (
    <div className={isNight ? 'theme-night' : 'theme-day'}>
      <DeviceFrameWrapper>
        <div className={`min-h-screen flex flex-col transition-colors duration-300 pb-20 md:pb-0 ${
          isNight 
            ? 'bg-[#080D18] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200' 
            : 'bg-[#F7F8FC] text-[#111827] selection:bg-purple-600/20 selection:text-purple-900'
        }`}>
          <Navbar />

          <main className="flex-1 w-full">
            {currentRoute === '/' && <LandingPage />}
            {currentRoute === '/login' && <LoginPage />}
            {currentRoute === '/register' && <RegisterPage />}
            {currentRoute === '/dashboard' && <DashboardPage />}
            {currentRoute === '/day/12' && <ChallengePage />}
          </main>

          <Footer />
          <StateSimulatorDrawer />
        </div>
      </DeviceFrameWrapper>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
