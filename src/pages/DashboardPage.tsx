import React from 'react';
import { GreetingHeader } from '../components/dashboard/GreetingHeader';
import { MomentumMeterCard } from '../components/dashboard/MomentumMeterCard';
import { TodayMissionCard } from '../components/dashboard/TodayMissionCard';
import { CircularProgressRings } from '../components/dashboard/CircularProgressRings';
import { HeatmapContribution } from '../components/dashboard/HeatmapContribution';
import { WeeklyConsistencyChart } from '../components/dashboard/WeeklyConsistencyChart';
import { AICoachCard } from '../components/dashboard/AICoachCard';
import { AchievementsGrid } from '../components/dashboard/AchievementsGrid';
import { LeaderboardPreview } from '../components/dashboard/LeaderboardPreview';
import { PortfolioPreviewCard } from '../components/dashboard/PortfolioPreviewCard';
import { MobileDashboard } from '../components/dashboard/MobileDashboard';

export const DashboardPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 animate-fadeIn">
      {/* 1. Dedicated Mobile-First Dashboard (390px / 430px) */}
      <div className="md:hidden">
        <MobileDashboard />
      </div>

      {/* 2. Desktop & Tablet Multi-Column Dashboard (768px, 1024px, 1280px+) */}
      <div className="hidden md:block space-y-6 sm:space-y-8">
        {/* Header: Greeting & Streak Status */}
        <GreetingHeader />

        {/* Primary Focal Row: Today's Mission & Momentum Meter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
          <div className="md:col-span-7 lg:col-span-7">
            <TodayMissionCard />
          </div>
          <div className="md:col-span-5 lg:col-span-5">
            <MomentumMeterCard />
          </div>
        </div>

        {/* Progress & AI Coach: 3-Ring SVG Visualizer & Commit Format Advice */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
          <div className="md:col-span-6">
            <CircularProgressRings />
          </div>
          <div className="md:col-span-6">
            <AICoachCard />
          </div>
        </div>

        {/* Full-Width 60-Day Verified Contribution Heatmap */}
        <HeatmapContribution />

        {/* Weekly Consistency Rhythm & Live Recruiter Portfolio Preview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
          <div className="md:col-span-6">
            <WeeklyConsistencyChart />
          </div>
          <div className="md:col-span-6">
            <PortfolioPreviewCard />
          </div>
        </div>

        {/* Achievements Badges & National Engineering College Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
          <div className="md:col-span-7">
            <AchievementsGrid />
          </div>
          <div className="md:col-span-5">
            <LeaderboardPreview />
          </div>
        </div>
      </div>
    </div>
  );
};
