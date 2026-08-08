import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitBranch, 
  Share2, 
  BookOpen, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Eye, 
  ShieldCheck, 
  Bot
} from 'lucide-react';
import { playSuccessChime, playTactileClick, playStreakFlameSound } from '../../utils/sound';
import { triggerSuccessConfetti } from '../../utils/confetti';

export const SubmissionSection: React.FC = () => {
  const { 
    submission, 
    dayMission,
    handleSaveReflection, 
    handleSubmitMission, 
    edgeCases,
    themeMode,
    setRoute,
  } = useApp();

  const isNight = themeMode === 'night';
  const [githubUrl, setGithubUrl] = useState(submission.githubUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(submission.linkedinUrl);
  const [reflection, setReflection] = useState(submission.reflection);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [savedTime, setSavedTime] = useState('Just now');
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [isAiEnhancing, setIsAiEnhancing] = useState(false);

  // Sync state if submission changes
  useEffect(() => {
    setGithubUrl(submission.githubUrl);
    setLinkedinUrl(submission.linkedinUrl);
    setReflection(submission.reflection);
  }, [submission]);

  // Auto-save reflection
  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setReflection(val);
    handleSaveReflection(val);
    setSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  // AI Enhancer for Reflection
  const handleAiEnhance = () => {
    playTactileClick();
    setIsAiEnhancing(true);
    setTimeout(() => {
      const enhanced = `${reflection.trim()}\n\nKey Takeaway: Redis atomic pipelines (MULTI/EXEC) eliminate distributed race conditions without requiring expensive distributed locks.`;
      setReflection(enhanced);
      handleSaveReflection(enhanced);
      setIsAiEnhancing(false);
      setSavedTime('Enhanced just now');
    }, 600);
  };

  // LinkedIn Storytelling Copy Generator
  const copyLinkedInDraft = () => {
    playTactileClick();
    const draft = `Day 12 of #ABTalks60Days 🚀

Today I built an industrial-grade Distributed Rate Limiter with Redis & Express from scratch.

💡 What I learned:
1. Token Bucket vs Sliding Window: Sliding window is resilient against burst spam.
2. Redis Concurrency: Using atomic INCR & EXPIRE in a single MULTI pipeline prevents race conditions.
3. RFC Contracts: Always set X-RateLimit-Limit, Remaining & Reset headers.

Check out my proof of work commit below:
🔗 GitHub: ${githubUrl || 'https://github.com/adityasharma_dev/rate-limiter-redis'}

#BuildInPublic #SystemDesign #Redis #ABTalks #WebDevelopment`;

    navigator.clipboard.writeText(draft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  // Submit Handler
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    setErrorMessage('');

    // Validation checks
    if (!githubUrl.trim()) {
      setErrorMessage('Please provide your public GitHub repository or commit URL.');
      return;
    }

    if (!githubUrl.includes('github.com')) {
      setErrorMessage('Invalid GitHub URL. Must be in the format: https://github.com/username/repository');
      return;
    }

    if (!linkedinUrl.trim()) {
      setErrorMessage('Please provide your LinkedIn proof-of-work post URL.');
      return;
    }

    if (!linkedinUrl.includes('linkedin.com')) {
      setErrorMessage('Invalid LinkedIn URL. Must be in the format: https://linkedin.com/posts/...');
      return;
    }

    if (edgeCases.isBrokenGitHubLink) {
      setErrorMessage('Validation Error: GitHub repository was not found or is set to private. Make sure your repo is public for recruiters!');
      return;
    }

    if (edgeCases.isBrokenLinkedInLink) {
      setErrorMessage('Validation Error: LinkedIn post could not be verified. Ensure you have included the #ABTalks60Days hashtag!');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const success = handleSubmitMission(githubUrl, linkedinUrl, reflection);
      if (success) {
        playSuccessChime();
        playStreakFlameSound();
        triggerSuccessConfetti();
      }
    }, 800);
  };

  return (
    <div className={`p-4 sm:p-7 rounded-3xl border-2 transition-all duration-300 space-y-5 sm:space-y-6 text-left ${
      isNight 
        ? 'bg-[#111827] border-purple-500/40 shadow-2xl text-white' 
        : 'bg-white border-purple-200 shadow-xl shadow-purple-500/5 text-slate-900'
    }`}>
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg font-extrabold ${isNight ? 'text-white' : 'text-slate-900'}`}>Daily Proof of Work Submission</h3>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Lock your Day {dayMission.day} streak & update public portfolio</p>
          </div>
        </div>

        {submission.isVerified && (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified & Submitted</span>
          </span>
        )}
      </div>

      {/* Error Message if any */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-200 flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="leading-snug">{errorMessage}</div>
        </div>
      )}

      {submission.isVerified ? (
        <div className={`p-6 rounded-2xl border text-center space-y-3 animate-scaleUp ${
          isNight ? 'bg-emerald-950/30 border-emerald-500/50 text-white' : 'bg-emerald-50 border-emerald-300 text-slate-900'
        }`}>
          <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
            <CheckCircle2 className="w-6 h-6" />
            <span>✓ DAY {dayMission.day} COMPLETE</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs font-bold">
            <span className="text-amber-500 font-mono">+{dayMission.xpReward} XP EARNED</span>
            <span>•</span>
            <span className="text-orange-500">🔥 STREAK PROTECTED</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Day {dayMission.day} verified commit [{submission.commitHash || 'e48a73b'}] attached to your live portfolio.
          </p>
          <button
            type="button"
            onClick={() => {
              playTactileClick();
              setRoute('/dashboard');
            }}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 mt-3 cursor-pointer"
          >
            <span>Back to Dashboard →</span>
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Proof Before You Forget 3-Stage Progress */}
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-bold ${
            isNight ? 'bg-[#0B1220] border-white/5 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Proof Checklist:</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Build</span>
              <span className={githubUrl ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}>
                {githubUrl ? '✓' : '○'} GitHub
              </span>
              <span className={linkedinUrl ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}>
                {linkedinUrl ? '✓' : '○'} LinkedIn
              </span>
            </div>
          </div>
          {/* Field 1: GitHub Commit URL */}
          <div className="space-y-1.5">
            <label className={`text-xs font-bold flex items-center justify-between ${isNight ? 'text-slate-200' : 'text-slate-800'}`}>
              <span className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>1. GitHub Repository / Commit URL</span>
              </span>
              <span className={`text-[11px] font-normal ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Must be public</span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/adityasharma_dev/rate-limiter-redis"
              className={`w-full px-4 py-3 rounded-2xl border text-xs font-mono focus:outline-none transition-colors ${
                isNight 
                  ? 'bg-[#0B1220] border-white/10 focus:border-purple-500 text-slate-200 placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 focus:border-purple-600 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Field 2: LinkedIn Post URL with Post Draft Generator */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold flex items-center gap-1.5 ${isNight ? 'text-slate-200' : 'text-slate-800'}`}>
                <Share2 className="w-3.5 h-3.5 text-blue-500" />
                <span>2. LinkedIn Post URL</span>
              </label>

              <button
                type="button"
                onClick={copyLinkedInDraft}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedDraft ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Post Draft Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Generate LinkedIn Post Copy</span>
                  </>
                )}
              </button>
            </div>

            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/posts/adityasharma-dev-day12"
              className={`w-full px-4 py-3 rounded-2xl border text-xs font-mono focus:outline-none transition-colors ${
                isNight 
                  ? 'bg-[#0B1220] border-white/10 focus:border-blue-500 text-slate-200 placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 focus:border-blue-600 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Field 3: Feature 3 - Reflection Journal */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold flex items-center gap-1.5 ${isNight ? 'text-slate-200' : 'text-slate-800'}`}>
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>3. Reflection Journal (Feature 3)</span>
              </label>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-mono ${isNight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Auto-saved ({savedTime})
                </span>

                <button
                  type="button"
                  onClick={handleAiEnhance}
                  disabled={isAiEnhancing}
                  className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Bot className="w-3 h-3" />
                  <span>{isAiEnhancing ? 'Enhancing...' : 'AI Insights'}</span>
                </button>
              </div>
            </div>

            <p className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
              "What did you learn today? What gave you a hard time?"
            </p>

            <textarea
              rows={3}
              value={reflection}
              onChange={handleReflectionChange}
              placeholder="Implemented Redis atomic sliding window counter. Handled race conditions with MULTI/EXEC pipeline..."
              className={`w-full px-4 py-3 rounded-2xl border text-xs focus:outline-none transition-colors leading-relaxed ${
                isNight 
                  ? 'bg-[#0B1220] border-white/10 focus:border-emerald-500 text-slate-200 placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 focus:border-emerald-600 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Feature 4: Live Recruiter Portfolio Preview */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            isNight ? 'bg-[#0B1220] border-white/5' : 'bg-purple-50/50 border-purple-100'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className={`flex items-center gap-1.5 ${isNight ? 'text-slate-300' : 'text-slate-800'}`}>
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                <span>Feature 4: Live Recruiter Portfolio Preview</span>
              </span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold">
                abtalks.dev/p/aditya-sharma
              </span>
            </div>

            <div className={`text-[11px] leading-snug ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
              Your verified commit <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">[c7f91a2]</span> (+142 lines) and reflection will be permanently attached to your public hiring profile.
            </div>
          </div>

          {/* Main Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Verifying Proof of Work with GitHub & LinkedIn...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Submit Day {dayMission.day} Mission & Lock Streak (+{dayMission.xpReward} XP)</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
