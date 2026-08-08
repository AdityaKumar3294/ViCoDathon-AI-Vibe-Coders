import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Terminal, 
  GitBranch, 
  Share2, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Code2
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const HowItWorksSection: React.FC = () => {
  const { setRoute, themeMode } = useApp();
  const isNight = themeMode === 'night';
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '1. Unlock Nightly Mission',
      time: '10:00 PM',
      icon: Terminal,
      color: 'text-purple-600 dark:text-purple-400',
      badge: '35 Mins Est.',
      desc: 'At 9:00 PM every night, your next mission unlocks. Read real system design requirements, architectural diagrams, and starter constraints.',
      codeSnippet: `// Day 12 Mission Preview:
// Build Distributed Token Bucket Rate Limiter
app.use(createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10,
  storage: new RedisClient()
}));`,
    },
    {
      title: '2. Code & Verify Locally',
      time: '10:25 PM',
      icon: Code2,
      color: 'text-cyan-600 dark:text-cyan-400',
      badge: 'Run Test Suite',
      desc: 'Implement the solution in your local IDE. Run automated test suites to ensure edge cases like Redis race conditions and HTTP 429 Retry-After headers pass.',
      codeSnippet: `✓ Rate limiter permits 10 concurrent requests (24ms)
✓ 11th request receives HTTP 429 Too Many Requests
✓ X-RateLimit-Reset header formatted accurately
✓ Test suite: 4 passed, 0 failed (100% coverage)`,
    },
    {
      title: '3. Push Commit to GitHub',
      time: '10:40 PM',
      icon: GitBranch,
      color: 'text-emerald-600 dark:text-emerald-400',
      badge: 'Verified Commit',
      desc: 'Commit with high-signal conventional commit messages. Our validator extracts your commit hash, lines added, and lights up your 60-day heatmap.',
      codeSnippet: `git commit -m "feat(rate-limiter): implement atomic Redis sliding window counter"
git push origin main
→ Verified by ABTalks Proof-of-Work engine [Hash: c7f91a2]`,
    },
    {
      title: '4. Post Reflection on LinkedIn',
      time: '10:50 PM',
      icon: Share2,
      color: 'text-blue-600 dark:text-blue-400',
      badge: '#ABTalks60Days',
      desc: 'Summarize 1 technical challenge you conquered today. This turns your consistent output into recruiter inbound messages and founder visibility.',
      codeSnippet: `Day 12 of #ABTalks60Days 🚀
Today I built an industrial-grade Redis rate limiter from scratch.
Key realization: Without atomic MULTI/EXEC transactions, concurrent requests cause race conditions.
Repo: github.com/aditya/rate-limiter-redis`,
    },
  ];

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
      isNight ? 'border-white/8 bg-[#0B1220]' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>35-Minute Daily Rhythm</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>
            How ABTalks Works In Practice
          </h2>
          <p className={`text-sm ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
            A frictionless routine that fits right into your late-night hostel or college schedule.
          </p>
        </div>

        {/* Interactive Step Switcher & Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Step Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isSelected = activeStep === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    playTactileClick();
                    setActiveStep(index);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? isNight
                        ? 'bg-[#111827] border-purple-500/60 shadow-lg shadow-purple-500/10'
                        : 'bg-purple-50/70 border-purple-300 shadow-md shadow-purple-500/5 ring-1 ring-purple-200'
                      : isNight
                        ? 'bg-[#0B1220] border-white/5 text-slate-400 hover:bg-[#111827]/60 hover:text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${
                    isSelected 
                      ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300' 
                      : isNight ? 'bg-white/5 text-slate-500' : 'bg-slate-200/70 text-slate-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${
                        isSelected 
                          ? isNight ? 'text-white' : 'text-purple-950' 
                          : isNight ? 'text-slate-300' : 'text-slate-800'
                      }`}>
                        {s.title}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isNight ? 'bg-white/5 text-slate-400' : 'bg-slate-200/80 text-slate-700'
                      }`}>
                        {s.time}
                      </span>
                    </div>
                    <p className={`text-xs leading-snug line-clamp-2 ${
                      isNight ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {s.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Code / Visual Preview Box */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl border p-6 shadow-2xl space-y-4 text-left ${
              isNight ? 'bg-[#111827] border-white/10' : 'bg-slate-900 border-slate-800 text-slate-200 shadow-slate-900/20'
            }`}>
              {/* Window Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono pl-2">
                    step-{activeStep + 1}-proof-of-work.sh
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {steps[activeStep].badge}
                </span>
              </div>

              {/* Code Preview */}
              <div className="bg-[#0B1220] p-4 rounded-2xl border border-white/5 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                <pre>{steps[activeStep].codeSnippet}</pre>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Streak Protected for Day {activeStep + 1}</span>
                </div>

                <button
                  onClick={() => {
                    playTactileClick();
                    setRoute('/day/12');
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <span>Test Day 12 Mission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
