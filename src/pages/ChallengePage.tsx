import React from 'react';
import { MissionHeader } from '../components/challenge/MissionHeader';
import { MissionDescription } from '../components/challenge/MissionDescription';
import { RequirementsChecklist } from '../components/challenge/RequirementsChecklist';
import { StarterCodeTabs } from '../components/challenge/StarterCodeTabs';
import { RecommendedResources } from '../components/challenge/RecommendedResources';
import { SubmissionSection } from '../components/challenge/SubmissionSection';
import { SuccessCelebrationModal } from '../components/challenge/SuccessCelebrationModal';
import { MobileChallenge } from '../components/challenge/MobileChallenge';

export const ChallengePage: React.FC = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 animate-fadeIn">
      {/* 1. Dedicated Mobile-First Challenge Workspace (390px / 430px) */}
      <div className="md:hidden">
        <MobileChallenge />
      </div>

      {/* 2. Desktop & Tablet 2-Column IDE Workspace (768px, 1024px, 1280px+) */}
      <div className="hidden md:block space-y-6 sm:space-y-8">
        {/* Header */}
        <MissionHeader />

        {/* Responsive Composition: 2-Column on Desktop (lg:), 1-Column Stack on Mobile/Tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Mission Context, Requirements Checklist, Starter Code, Resources */}
          <div className="lg:col-span-7 space-y-6">
            <MissionDescription />
            <RequirementsChecklist />
            <StarterCodeTabs />
            <RecommendedResources />
          </div>

          {/* Right Column: Submission Area (Sticky on Desktop, Full-Width on Mobile) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <SubmissionSection />
          </div>
        </div>

        {/* Post-submission Celebration Modal */}
        <SuccessCelebrationModal />
      </div>
    </div>
  );
};
