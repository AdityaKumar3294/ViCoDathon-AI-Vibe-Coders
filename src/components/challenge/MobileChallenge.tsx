import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Flame, 
  Clock, 
  Check, 
  Copy, 
  GitBranch, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Terminal
} from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../../utils/sound';

export const MobileChallenge: React.FC = () => {
  const { 
    dayMission, 
    submission, 
    handleSubmitMission, 
    handleSaveReflection, 
    toggleRequirement, 
    profile, 
    themeMode, 
    setRoute 
  } = useApp();

  const isNight = themeMode === 'night';

  const [githubUrl, setGithubUrl] = useState(submission.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(submission.linkedinUrl || '');
  const [reflection, setReflection] = useState(submission.reflection || '');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Keep fields synced with global submission state
  React.useEffect(() => {
    setGithubUrl(submission.githubUrl || '');
    setLinkedinUrl(submission.linkedinUrl || '');
    setReflection(submission.reflection || '');
  }, [submission]);

  const totalDays = 60;
  const progressPercent = Math.round((profile.currentDay / totalDays) * 100);

  const handleToggleReq = (reqId: string) => {
    playTactileClick();
    toggleRequirement(reqId);
  };

  const handleCopyStarter = () => {
    playTactileClick();
    const code = `// Day 12: Distributed Token Bucket Rate Limiter
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

export async function checkRateLimit(key: string, limit = 10, windowSec = 60) {
  const current = Math.floor(Date.now() / 1000);
  const multi = redis.multi();
  multi.zremrangebyscore(key, 0, current - windowSec);
  multi.zadd(key, current, String(current) + '-' + String(Math.random()));
  multi.zcard(key);
  multi.expire(key, windowSec);
  const results = await multi.exec();
  const count = results[2][1] as number;
  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleGenerateLinkedinDraft = () => {
    playTactileClick();
    const draft = `Day 12/60 with ABTalks: Implemented a Distributed Token Bucket Rate Limiter in Redis & Node.js 🚀

Today's architectural breakthrough:
1. Used atomic Redis sliding window counters (MULTI/EXEC pipeline) to eliminate race conditions under concurrent load.
2. Formatted accurate HTTP 429 Too Many Requests with Retry-After and X-RateLimit-Reset headers.
3. Wrote automated concurrency test suite verifying 10 req/min thresholds.

Proof of work committed to GitHub: ${githubUrl || 'https://github.com/adityasharma_dev/rate-limiter-redis'}

#ABTalks #BuildEveryDay #DistributedSystems #Redis #BackendEngineering`;
    navigator.clipboard.writeText(draft);
    if (!linkedinUrl) {
      setLinkedinUrl('https://linkedin.com/posts/aditya-day12-redis-rate-limiter');
    }
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    setValidationError('');

    if (!githubUrl.trim()) {
      setValidationError('Add your GitHub repository so we can record today\'s proof of work.');
      return;
    }
    if (!linkedinUrl.trim()) {
      setValidationError('Add your LinkedIn reflection post URL so recruiters can verify your work.');
      return;
    }
    if (!reflection.trim()) {
      setValidationError('Write a short 1-line reflection on what you learned today.');
      return;
    }

    const success = handleSubmitMission(githubUrl, linkedinUrl, reflection);
    if (success) {
      playSuccessChime();
    }
  };

  return (
    <div className="w-full space-y-6 pb-28 text-left animate-fadeIn">
      {/* 1. MOBILE HEADER: Navigation & Top Progress */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              playTactileClick();
              setRoute('/dashboard');
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
              isNight 
                ? 'bg-[#111827] border-white/10 text-slate-300 hover:text-white' 
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-300">
              Day {dayMission.day} / {totalDays}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-lg border border-orange-500/20">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>{profile.streakDays}d</span>
            </div>
          </div>
        </div>

        {/* Compact Progress Bar */}
        <div className="space-y-1">
          <div className={`w-full rounded-full h-1.5 overflow-hidden border ${
            isNight ? 'bg-slate-800 border-white/5' : 'bg-slate-100 border-slate-200'
          }`}>
            <div 
              className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. MISSION HERO: What am I building today? */}
      <div className={`p-4 rounded-3xl border transition-all space-y-3 ${
        isNight 
          ? 'bg-gradient-to-br from-[#162033] to-[#0B1220] border-purple-500/30 text-white shadow-xl' 
          : 'bg-white border-purple-200/90 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
              isNight ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-800 border border-purple-200'
            }`}>
              DAY {dayMission.day}
            </span>
            <span className={`text-[10px] font-bold ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
              BUILD
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">
              +{dayMission.xpReward} XP
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className={`text-xl font-extrabold leading-tight tracking-tight ${
            isNight ? 'text-white' : 'text-slate-900'
          }`}>
            {dayMission.title}
          </h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>{dayMission.difficulty}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span>{dayMission.estimatedMinutes} min</span>
            </span>
            <span>•</span>
            <span>{dayMission.trackName}</span>
          </div>
        </div>
      </div>

      {/* 3. MISSION SUMMARY & WHAT YOU'LL LEARN (Clean compact rows, not giant cards) */}
      <div className="space-y-3 px-1">
        <div className="space-y-1.5">
          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
            isNight ? 'text-slate-400' : 'text-slate-500'
          }`}>
            MISSION
          </span>
          <p className={`text-xs leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
            {dayMission.summary}
          </p>
        </div>

        {/* Learning Points */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-white/5">
          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
            isNight ? 'text-slate-400' : 'text-slate-500'
          }`}>
            WHAT YOU'LL LEARN
          </span>
          <div className="grid grid-cols-1 gap-1 text-xs">
            {dayMission.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                <span className={isNight ? 'text-slate-300' : 'text-slate-700'}>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. TODAY'S CHECKLIST (Interactive, visually changes on tap) */}
      <div className={`p-4 rounded-3xl border space-y-3 transition-all ${
        isNight ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
            isNight ? 'text-slate-400' : 'text-slate-500'
          }`}>
            TODAY'S CHECKLIST
          </span>
          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {dayMission.requirements.filter(r => r.completed).length} / {dayMission.requirements.length} Done
          </span>
        </div>

        {/* Interactive Checklist Rows */}
        <div className="space-y-2">
          {dayMission.requirements.map((req) => (
            <button
              key={req.id}
              type="button"
              onClick={() => handleToggleReq(req.id)}
              className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-3 active:scale-98 cursor-pointer ${
                req.completed
                  ? isNight 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                    : 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-xs'
                  : isNight 
                    ? 'bg-[#0B1220] border-white/5 text-slate-300 hover:border-purple-500/40' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                req.completed
                  ? 'bg-emerald-500 border-emerald-400 text-white'
                  : isNight ? 'bg-slate-800 border-white/10 text-transparent' : 'bg-white border-slate-300 text-transparent'
              }`}>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="space-y-0.5 flex-1">
                <span className={`text-xs font-bold leading-snug block ${
                  req.completed ? 'line-through opacity-80' : ''
                }`}>
                  {req.text}
                </span>
                <span className={`text-[10px] ${
                  req.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                }`}>
                  +25 XP
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. STARTER CODE REFERENCE (Compact with 1-click copy) */}
      <div className={`p-4 rounded-3xl border space-y-2.5 transition-all ${
        isNight ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
              isNight ? 'text-slate-400' : 'text-slate-500'
            }`}>
              STARTER CODE REFERENCE
            </span>
          </div>
          <button
            onClick={handleCopyStarter}
            className="flex items-center gap-1 text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
          >
            {copiedCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>{copiedCode ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className={`p-3 rounded-2xl font-mono text-[11px] overflow-x-auto leading-relaxed border ${
          isNight ? 'bg-[#080D18] border-white/5 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <div className="text-purple-500 dark:text-purple-400 font-bold">// Redis Token Bucket Interface</div>
          <div>export async function checkRateLimit(key, limit=10, windowSec=60)</div>
          <div className="text-slate-400">// MULTI / EXEC atomic pipeline implementation</div>
        </div>
      </div>

      {/* 6. PROOF OF WORK & SUBMISSION */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="space-y-1.5 px-1">
          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
            isNight ? 'text-slate-400' : 'text-slate-500'
          }`}>
            PROOF OF WORK
          </span>
          <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
            Enter your public links so our engine and recruiters can verify your commit.
          </p>
        </div>

        {/* Proof Before You Forget 3-Stage Progress */}
        <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-bold ${
          isNight ? 'bg-[#0B1220] border-white/5 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="text-[11px]">Proof Status:</span>
          </div>
          <div className="flex items-center gap-2.5 text-[10px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Build</span>
            <span className={githubUrl ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}>
              {githubUrl ? '✓' : '○'} GitHub
            </span>
            <span className={linkedinUrl ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}>
              {linkedinUrl ? '✓' : '○'} LinkedIn
            </span>
          </div>
        </div>

        {/* Validation Warning */}
        {validationError && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-semibold">
            {validationError}
          </div>
        )}

        {/* GitHub Repo Input */}
        <div className="space-y-1.5">
          <label className={`text-xs font-bold flex items-center justify-between ${
            isNight ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>GitHub Repository URL</span>
            </span>
            <span className="text-[10px] text-rose-500 font-normal">*Required</span>
          </label>
          <input
            type="url"
            required
            value={githubUrl}
            onChange={(e) => {
              setGithubUrl(e.target.value);
              setValidationError('');
            }}
            placeholder="https://github.com/username/rate-limiter-redis"
            className={`w-full px-4 h-12 rounded-2xl text-xs font-medium focus:outline-none transition-all ${
              isNight 
                ? 'bg-[#111827] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15 shadow-xs'
            }`}
          />
        </div>

        {/* LinkedIn Post URL Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className={`text-xs font-bold flex items-center gap-1.5 ${
              isNight ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <Share2 className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn Post URL</span>
            </label>
            <button
              type="button"
              onClick={handleGenerateLinkedinDraft}
              className="text-[10px] text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{copiedDraft ? 'Draft Copied!' : 'Generate Draft'}</span>
            </button>
          </div>
          <input
            type="url"
            required
            value={linkedinUrl}
            onChange={(e) => {
              setLinkedinUrl(e.target.value);
              setValidationError('');
            }}
            placeholder="https://linkedin.com/posts/username-day12"
            className={`w-full px-4 h-12 rounded-2xl text-xs font-medium focus:outline-none transition-all ${
              isNight 
                ? 'bg-[#111827] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15 shadow-xs'
            }`}
          />
        </div>

        {/* Reflection */}
        <div className="space-y-1.5">
          <label className={`text-xs font-bold ${isNight ? 'text-slate-300' : 'text-slate-700'}`}>
            What did you learn today?
          </label>
          <textarea
            rows={3}
            value={reflection}
            onChange={(e) => {
              setReflection(e.target.value);
              handleSaveReflection(e.target.value);
            }}
            placeholder="Implemented Redis atomic sliding window counter. Handled race conditions with MULTI/EXEC pipeline..."
            className={`w-full p-3.5 rounded-2xl text-xs font-medium focus:outline-none transition-all resize-none ${
              isNight 
                ? 'bg-[#111827] border border-white/10 text-white placeholder-slate-500 focus:border-purple-500' 
                : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15 shadow-xs'
            }`}
          />
        </div>

        {/* 7. SUBMIT BUTTON — THE STRONGEST PRIMARY CTA */}
        <div className="pt-2">
          {submission.isVerified ? (
            <div className={`p-4 rounded-2xl border text-center space-y-2 animate-scaleUp ${
              isNight ? 'bg-emerald-950/30 border-emerald-500/50 text-white' : 'bg-emerald-50 border-emerald-300 text-slate-900'
            }`}>
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>✓ DAY {dayMission.day} COMPLETE</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-xs font-bold">
                <span className="text-amber-500 font-mono">+{dayMission.xpReward} XP EARNED</span>
                <span>•</span>
                <span className="text-orange-500">🔥 STREAK PROTECTED</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Another day. Another proof of work.
              </p>
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  setRoute('/dashboard');
                }}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>Back to Dashboard →</span>
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full h-12 sm:h-13 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Complete Day {dayMission.day} →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
