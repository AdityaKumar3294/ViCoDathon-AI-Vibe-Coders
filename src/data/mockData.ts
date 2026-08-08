import type { DayMission, StudentProfile, TrackInfo, HeatmapDay, AchievementBadge, LeaderboardUser } from '../types/challenge';

export const initialProfile: StudentProfile = {
  id: 'usr_abt_7749',
  name: 'Aditya Sharma',
  username: 'adityasharma_dev',
  email: 'aditya.sharma@engg.edu.in',
  college: 'MIT Academy of Engineering, Pune',
  branch: 'Computer Science & Engineering',
  graduationYear: 2026,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  track: 'systems',
  currentDay: 12,
  streakDays: 11,
  longestStreak: 11,
  totalXp: 2450,
  level: 4,
  levelTitle: 'Distributed Systems Architect',
  globalRank: 42,
  totalParticipants: 14200,
  percentile: 99.7,
  streakFreezesAvailable: 2,
  streakFreezeUsed: false,
  weeklyCommits: 6,
  publicPortfolioSlug: 'abtalks.dev/p/aditya-sharma',
  recruitersViewed: 18,
};

export const tracksList: TrackInfo[] = [
  {
    id: 'systems',
    name: 'Backend & Systems',
    tagline: 'Build distributed databases, rate limiters, caching layers, and high-scale APIs.',
    icon: 'Server',
    color: '#8B5CF6',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    totalDays: 60,
    difficulty: 'Intermediate',
    techStack: ['Node.js', 'Go', 'Redis', 'PostgreSQL', 'Docker', 'Kafka'],
  },
  {
    id: 'fullstack',
    name: 'Fullstack SaaS & Web3',
    tagline: 'Ship production-ready SaaS apps, multi-tenant billing, and real-time collaboration engines.',
    icon: 'Layers',
    color: '#06B6D4',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    totalDays: 60,
    difficulty: 'Beginner',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Prisma', 'Stripe', 'Supabase'],
  },
  {
    id: 'ai',
    name: 'Applied AI & Agents',
    tagline: 'Build autonomous coding agents, RAG vector search, and multimodal AI pipelines.',
    icon: 'Cpu',
    color: '#EC4899',
    gradient: 'from-pink-500/20 to-purple-500/20',
    totalDays: 60,
    difficulty: 'Advanced',
    techStack: ['Python', 'LangChain', 'FastAPI', 'Qdrant', 'OpenAI', 'Ollama'],
  },
];

export const day12Mission: DayMission = {
  day: 12,
  title: 'Distributed Rate Limiter with Redis & Token Bucket',
  trackId: 'systems',
  trackName: 'Backend & Systems Track',
  difficulty: 'Intermediate',
  estimatedMinutes: 35,
  xpReward: 150,
  summary: 'Design and implement an industrial-grade API rate limiter middleware using Redis atomic operations and the Token Bucket algorithm to protect microservices against DDoS and API throttling.',
  recruiterWhy: 'Why Indian tech recruiters care: 78% of backend system design interviews at Uber, Swiggy, Razorpay, and Stripe test concurrency, Redis atomic operations (INCR/EXPIRE), and HTTP 429 response contracts.',
  objectives: [
    'Understand Token Bucket vs Leaky Bucket vs Sliding Window Log algorithms',
    'Execute atomic multi-key Redis transactions using MULTI/EXEC or Lua scripts',
    'Set proper RFC standard response headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)',
    'Handle distributed clock drift and concurrent race conditions safely',
  ],
  requirements: [
    {
      id: 'req-1',
      text: 'Create an Express/Fastify middleware accepting windowMs and maxRequests options',
      completed: true,
      hint: 'Default to 60,000ms window with 10 max requests per IP key',
    },
    {
      id: 'req-2',
      text: 'Store request counters in Redis using key format `ratelimit:{ip}:{window}` with atomic TTL',
      completed: true,
      hint: 'Use redis.incr() and redis.expire() or a single multi pipeline',
    },
    {
      id: 'req-3',
      text: 'Return HTTP 429 Too Many Requests with Retry-After header when limit exceeded',
      completed: true,
      hint: 'Include JSON payload: { error: "Rate limit exceeded. Try again in X seconds." }',
    },
    {
      id: 'req-4',
      text: 'Write automated unit test simulating 15 concurrent requests to verify 10 allowed and 5 blocked',
      completed: false,
      hint: 'Use Jest / Vitest with Promise.all() for concurrent firing',
    },
  ],
  starterCode: [
    {
      language: 'typescript',
      filename: 'rateLimiter.middleware.ts',
      code: `import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

interface RateLimitOptions {
  windowMs: number; // e.g. 60000 (1 minute)
  maxRequests: number; // e.g. 10 requests per window
}

export function createRateLimiter(options: RateLimitOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const key = \`ratelimit:\${clientIp}\`;

    try {
      // Execute atomic transaction in Redis
      const multi = redis.multi();
      multi.incr(key);
      multi.ttl(key);

      const results = await multi.exec();
      if (!results) {
        return next();
      }

      const count = results[0][1] as number;
      let ttl = results[1][1] as number;

      // If key is fresh (ttl is -1), set the expiration window
      if (ttl === -1) {
        await redis.pexpire(key, options.windowMs);
        ttl = Math.ceil(options.windowMs / 1000);
      }

      const remaining = Math.max(0, options.maxRequests - count);

      // RFC Standard Rate Limiting Headers
      res.setHeader('X-RateLimit-Limit', options.maxRequests);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', Date.now() + (ttl * 1000));

      if (count > options.maxRequests) {
        res.setHeader('Retry-After', ttl);
        return res.status(429).json({
          status: 'error',
          code: 'RATE_LIMIT_EXCEEDED',
          message: \`Too many requests from this IP. Please try again in \${ttl} seconds.\`,
          retryAfterSeconds: ttl,
        });
      }

      next();
    } catch (err) {
      console.error('Rate Limiter Redis Error:', err);
      // Fail open in production so Redis downtime does not bring down API
      next();
    }
  };
}`,
    },
    {
      language: 'typescript',
      filename: 'rateLimiter.test.ts',
      code: `import request from 'supertest';
import express from 'express';
import { createRateLimiter } from './rateLimiter.middleware';

describe('Distributed Redis Rate Limiter', () => {
  const app = express();
  app.use(createRateLimiter({ windowMs: 10000, maxRequests: 5 }));
  app.get('/api/resource', (req, res) => res.json({ success: true }));

  it('should allow 5 requests and block the 6th with 429', async () => {
    for (let i = 1; i <= 5; i++) {
      const res = await request(app).get('/api/resource');
      expect(res.status).toBe(200);
      expect(res.headers['x-ratelimit-remaining']).toBe(String(5 - i));
    }

    const blockedRes = await request(app).get('/api/resource');
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.body.code).toBe('RATE_LIMIT_EXCEEDED');
  });
});`,
    },
  ],
  resources: [
    {
      title: 'Redis Official: Pattern for Atomic Rate Limiting',
      url: 'https://redis.io/glossary/rate-limiting/',
      type: 'docs',
      readTime: '6 min read',
    },
    {
      title: 'System Design Primer: Token Bucket vs Leaky Bucket',
      url: 'https://github.com/donnemartin/system-design-primer',
      type: 'github',
      readTime: '10 min read',
    },
    {
      title: 'Cloudflare Engineering: How We Rate Limit 50M Requests/sec',
      url: 'https://blog.cloudflare.com/how-we-built-rate-limiting/',
      type: 'article',
      readTime: '8 min read',
    },
  ],
  sampleSolutionPreview: 'https://github.com/adityasharma_dev/abtalks-60days-challenge/tree/main/day-12-rate-limiter',
  tags: ['Redis', 'Distributed Systems', 'System Design', 'Express', 'HTTP 429'],
};

export const day1Mission: DayMission = {
  day: 1,
  title: 'Node.js Event Loop, Libuv & Microtask Priority',
  trackId: 'systems',
  trackName: 'Backend & Systems Track',
  difficulty: 'Beginner',
  estimatedMinutes: 30,
  xpReward: 100,
  summary: 'Dive deep into the Node.js runtime architecture. Understand how the event loop, thread pool (Libuv), and microtask queues execute non-blocking asynchronous I/O under high concurrency.',
  recruiterWhy: 'Why Indian tech recruiters care: 92% of backend system design interviews test microtask execution order (process.nextTick vs Promise vs setTimeout) to verify concurrency fundamentals.',
  objectives: [
    'Understand call stack, Libuv thread pool, and event loop phases',
    'Master microtask queue priority (process.nextTick > Promise.resolve)',
    'Prevent event loop starvation from synchronous CPU-bound operations',
    'Write deterministic execution test cases verifying event loop ticks',
  ],
  requirements: [
    {
      id: 'req-1',
      text: 'Create event loop logger demonstrating microtask vs macrotask execution order',
      completed: false,
      hint: 'Compare process.nextTick, Promise.then, setImmediate, and setTimeout',
    },
    {
      id: 'req-2',
      text: 'Implement non-blocking chunk processor using setImmediate for CPU tasks',
      completed: false,
      hint: 'Yield execution to the event loop between array chunk iterations',
    },
    {
      id: 'req-3',
      text: 'Measure event loop lag under heavy synthetic workload using perf_hooks',
      completed: false,
      hint: 'Use performance.now() to measure lag deltas',
    },
    {
      id: 'req-4',
      text: 'Write automated unit test verifying async execution order deterministically',
      completed: false,
      hint: 'Collect execution markers in array and assert order',
    },
  ],
  starterCode: [
    {
      language: 'typescript',
      filename: 'eventLoop.demo.ts',
      code: `// Day 1 Genesis: Node.js Event Loop & Microtask Priority
console.log('1. Synchronous Mainline');

setTimeout(() => {
  console.log('5. Macrotask (setTimeout 0ms)');
}, 0);

setImmediate(() => {
  console.log('6. Macrotask (setImmediate Check Phase)');
});

Promise.resolve().then(() => {
  console.log('3. Microtask (Promise.then)');
});

process.nextTick(() => {
  console.log('2. Priority Microtask (process.nextTick)');
});

console.log('4. Synchronous End');`,
    },
    {
      language: 'typescript',
      filename: 'eventLoop.test.ts',
      code: `import { runEventLoopOrder } from './eventLoop.demo';

describe('Day 1: Node.js Event Loop Priority', () => {
  it('should execute nextTick before Promise and macrotasks', async () => {
    const order = await runEventLoopOrder();
    expect(order).toEqual(['sync-start', 'sync-end', 'nextTick', 'promise', 'timeout', 'immediate']);
  });
});`,
    },
  ],
  resources: [
    {
      title: 'Node.js Official: The Event Loop, Timers, and process.nextTick()',
      url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick',
      type: 'docs',
      readTime: '5 min read',
    },
    {
      title: 'Deep Dive: Libuv Architecture and Async I/O in C++',
      url: 'https://github.com/libuv/libuv',
      type: 'github',
      readTime: '8 min read',
    },
  ],
  sampleSolutionPreview: 'https://github.com/adityasharma_dev/abtalks-60days-challenge/tree/main/day-01-event-loop',
  tags: ['Node.js', 'Libuv', 'Event Loop', 'Concurrency', 'Microtasks'],
};

export const sampleCurriculumRoadmap = [
  { week: 1, title: 'Foundations & Concurrency', days: 'Day 1 - 7', status: 'completed', focus: 'Event Loop, Streams, Buffers, Multi-threading' },
  { week: 2, title: 'Distributed Caching & Redis', days: 'Day 8 - 14', status: 'in-progress', focus: 'Cache Aside, Rate Limiters, Redis Pub/Sub, Key Evictions' },
  { week: 3, title: 'Database Internals & Indexing', days: 'Day 15 - 21', status: 'upcoming', focus: 'B-Trees, WAL, ACID transactions, Connection Pooling' },
  { week: 4, title: 'Message Queues & Event Streaming', days: 'Day 22 - 28', status: 'upcoming', focus: 'Kafka partitions, Idempotency, Dead Letter Queues' },
  { week: 5, title: 'Microservices & Service Discovery', days: 'Day 29 - 35', status: 'upcoming', focus: 'gRPC, Envoy Proxies, Circuit Breakers, Docker Swarm' },
  { week: 6, title: 'Security, Auth & Zero-Trust', days: 'Day 36 - 42', status: 'upcoming', focus: 'JWT Refresh Rotation, OAuth2, RBAC, KMS Encryption' },
  { week: 7, title: 'Capstone Scaled System (10k RPS)', days: 'Day 43 - 52', status: 'upcoming', focus: 'Load Testing with k6, Horizontal Autoscaling, Grafana' },
  { week: 8, title: 'Recruiter Demo Day & Portfolio Polish', days: 'Day 53 - 60', status: 'upcoming', focus: 'Live Deployment, Architecture Docs, LinkedIn Blitz' },
];

export const mockHeatmapData: HeatmapDay[] = Array.from({ length: 60 }, (_, i) => {
  const dayNum = i + 1;
  const isCompleted = dayNum < 12;
  const isToday = dayNum === 12;

  let count = 0;
  let status: HeatmapDay['status'] = 'upcoming';

  if (isCompleted) {
    status = 'completed';
    count = (dayNum % 3) + 2;
  } else if (isToday) {
    status = 'today';
    count = 1;
  }

  const dateObj = new Date(2026, 6, 28 + dayNum);
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const missionTitles = [
    'Node.js Event Loop & Libuv Deep Dive',
    'Custom High-Throughput HTTP Server from Scratch',
    'Streaming Large 5GB Files with Backpressure',
    'Worker Threads & CPU-Bound Crypto Hashing',
    'Building a Custom In-Memory Key-Value Store',
    'LRU Cache with Doubly Linked List & O(1) ops',
    'Week 1 Capstone: Zero-Dependency JSON Parser',
    'Redis Connection Pooling & Pipelining',
    'Cache Stampede Prevention with Mutex Locks',
    'Redis Geospatial Queries for Delivery Tracking',
    'Distributed Lock with Redis Redlock Algorithm',
    'Distributed Rate Limiter with Redis & Token Bucket',
    'Real-time Chat with Redis Pub/Sub & WebSockets',
    'Redis HyperLogLog for 10M Unique Page Visitors',
  ];

  return {
    date: dateStr,
    dayNumber: dayNum,
    count,
    status,
    missionTitle: missionTitles[i % missionTitles.length],
    xp: isCompleted ? 150 + (dayNum * 10) : isToday ? 150 : 0,
    commitMessage: isCompleted
      ? `feat(day-${dayNum}): ship ${missionTitles[i % missionTitles.length].toLowerCase()} with unit tests`
      : undefined,
    linkedinUrl: isCompleted
      ? `https://linkedin.com/feed/update/urn:li:activity:72294819283749102${dayNum}`
      : undefined,
  };
});

export const mockAchievements: AchievementBadge[] = [
  {
    id: 'badge-first-commit',
    name: 'Day 1 Genesis',
    description: 'Pushed your very first verified challenge commit to GitHub.',
    icon: 'GitCommit',
    category: 'milestone',
    unlocked: true,
    unlockedDate: 'July 29, 2026',
    xpBonus: 100,
    progressPercent: 100,
  },
  {
    id: 'badge-streak-7',
    name: 'Week 1 Flame',
    description: 'Maintained an unbroken 7-day coding streak without missing a night.',
    icon: 'Flame',
    category: 'streak',
    unlocked: true,
    unlockedDate: 'August 4, 2026',
    xpBonus: 300,
    progressPercent: 100,
  },
  {
    id: 'badge-night-owl',
    name: 'Night Owl Engineer',
    description: 'Shipped 5 mission commits between 10:00 PM and 1:00 AM.',
    icon: 'Moon',
    category: 'quality',
    unlocked: true,
    unlockedDate: 'August 6, 2026',
    xpBonus: 200,
    progressPercent: 100,
  },
  {
    id: 'badge-linkedin-viral',
    name: 'Recruiter Magnet',
    description: 'Shared 10 daily proof-of-work posts on LinkedIn with #ABTalks60Days.',
    icon: 'Share2',
    category: 'social',
    unlocked: true,
    unlockedDate: 'August 7, 2026',
    xpBonus: 250,
    progressPercent: 100,
  },
  {
    id: 'badge-clean-code',
    name: 'Zero Tech Debt',
    description: 'Completed 10 missions with 100% requirements checklist checked.',
    icon: 'Sparkles',
    category: 'quality',
    unlocked: true,
    unlockedDate: 'August 7, 2026',
    xpBonus: 250,
    progressPercent: 100,
  },
  {
    id: 'badge-streak-30',
    name: 'Halfway Titan',
    description: 'Reach Day 30 without breaking your streak.',
    icon: 'ShieldCheck',
    category: 'streak',
    unlocked: false,
    xpBonus: 1000,
    progressPercent: 36.6,
  },
  {
    id: 'badge-recruiter-offer',
    name: 'Top 1% Recruiter Tier',
    description: 'Rank in the top 50 across all 14,000+ participating college engineers.',
    icon: 'Award',
    category: 'milestone',
    unlocked: true,
    unlockedDate: 'August 7, 2026',
    xpBonus: 500,
    progressPercent: 100,
  },
  {
    id: 'badge-sixty-days',
    name: 'The 60-Day Legend',
    description: 'Finish all 60 days. Become impossible for hiring managers to ignore.',
    icon: 'Crown',
    category: 'milestone',
    unlocked: false,
    xpBonus: 5000,
    progressPercent: 18.3,
  },
];

export const mockLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Rohan Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    college: 'IIT Bombay',
    streak: 12,
    xp: 3120,
    level: 5,
    badgeCount: 8,
    track: 'Systems',
    githubUsername: 'rohan-deshmukh',
  },
  {
    rank: 2,
    name: 'Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    college: 'BITS Pilani',
    streak: 12,
    xp: 2980,
    level: 5,
    badgeCount: 7,
    track: 'AI Agents',
    githubUsername: 'ananya-iyer',
  },
  {
    rank: 3,
    name: 'Tanmay Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    college: 'COEP Pune',
    streak: 12,
    xp: 2890,
    level: 4,
    badgeCount: 7,
    track: 'Fullstack',
    githubUsername: 'tanmay-k',
  },
  {
    rank: 42,
    name: 'Aditya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    college: 'MIT Academy of Engineering, Pune',
    streak: 11,
    xp: 2450,
    level: 4,
    badgeCount: 6,
    isCurrentUser: true,
    track: 'Systems',
    githubUsername: 'adityasharma_dev',
  },
  {
    rank: 43,
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    college: 'NIT Surathkal',
    streak: 11,
    xp: 2440,
    level: 4,
    badgeCount: 6,
    track: 'Systems',
    githubUsername: 'sneha-patel',
  },
  {
    rank: 44,
    name: 'Vikram Mehta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    college: 'VIT Vellore',
    streak: 11,
    xp: 2420,
    level: 4,
    badgeCount: 5,
    track: 'Fullstack',
    githubUsername: 'vikram-m',
  },
];

export const weeklyConsistencyData = [
  { dayName: 'Mon', commits: 3, xp: 180, time: '10:45 PM', status: 'completed' },
  { dayName: 'Tue', commits: 4, xp: 210, time: '11:15 PM', status: 'completed' },
  { dayName: 'Wed', commits: 2, xp: 150, time: '10:10 PM', status: 'completed' },
  { dayName: 'Thu', commits: 3, xp: 190, time: '11:50 PM', status: 'completed' },
  { dayName: 'Fri', commits: 5, xp: 250, time: '11:05 PM', status: 'completed' },
  { dayName: 'Sat', commits: 4, xp: 220, time: '09:30 PM', status: 'completed' },
  { dayName: 'Sun', commits: 1, xp: 150, time: 'In Progress', status: 'today' },
];

export const testimonialsList = [
  {
    id: 't1',
    name: 'Priyanshu Verma',
    role: 'SDE 1 @ Razorpay',
    college: 'AKTU Tier-3 College, Lucknow',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    quote: 'From a tier-3 college with zero campus placements to 3 top SDE offers. By Day 35 of ABTalks, my LinkedIn posts were getting 40k+ impressions. A Razorpay engineering manager reached out directly via DM because my GitHub was filled with real distributed systems code, not generic todo apps.',
    stats: {
      streak: '60 Days 🔥',
      commits: '240+ Commits',
      offers: '3 SDE Offers',
    },
    track: 'Backend & Systems',
  },
  {
    id: 't2',
    name: 'Kavya Nambiar',
    role: 'Frontend Engineer @ CRED',
    college: 'CET Trivandrum',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    quote: 'College taught us 10-year-old C++ and turbo compilers. ABTalks forced me to code modern TypeScript, WebSockets, and Framer Motion every single night. The consistency engine is addictive like Duolingo but pays off with a 24 LPA career.',
    stats: {
      streak: '60 Days 🔥',
      commits: '180+ Commits',
      offers: 'CRED & Swiggy',
    },
    track: 'Fullstack SaaS',
  },
  {
    id: 't3',
    name: 'Aman Deep',
    role: 'AI Engineer @ InVideo',
    college: 'Thapar University, Patiala',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    quote: 'The Night Focus mode was my secret weapon. Coding between 10 PM and 11:30 PM after college lectures transformed my discipline. Recruiters literally mentioned reading my daily reflection journals during my technical interviews!',
    stats: {
      streak: '60 Days 🔥',
      commits: '210+ Commits',
      offers: 'InVideo AI Team',
    },
    track: 'AI & Agents',
  },
];

export const faqList = [
  {
    q: 'I have college exams and assignments. How much time does each day take?',
    a: 'Each daily mission is strictly designed to take 30 to 45 minutes. We know college students have exams and labs, so missions focus on 1 high-impact concept (e.g., Redis Rate Limiter, JWT Rotation, Vector Embeddings) rather than endless fluff.',
  },
  {
    q: 'How does ABTalks verify my daily GitHub commit and LinkedIn post?',
    a: 'Our proof-of-work pipeline verifies your public GitHub repository commit timestamp, lines changed, and checks your LinkedIn post with the required #ABTalks60Days hashtag. Everything is automatically aggregated onto your live public recruiter portfolio.',
  },
  {
    q: 'What happens if I miss a day? Is my entire streak lost forever?',
    a: 'You are equipped with 2 Streak Freezes per month to protect against family emergencies or semester exam nights. You can also complete a Weekend Recovery Bounty to restore a frozen streak.',
  },
  {
    q: 'I am a beginner in 2nd or 3rd year. Is this too advanced for me?',
    a: 'No! You can choose between 3 tracks: Fullstack SaaS (beginner friendly), Backend Systems (intermediate), or AI & Agents (advanced). Each day comes with curated starter code, architecture diagrams, and test cases.',
  },
  {
    q: 'Do top Indian tech companies and startups actually hire from ABTalks?',
    a: 'Yes! Over 120+ tech companies and startups actively browse the ABTalks Top 5% Recruiter Leaderboard. When you have 60 consecutive days of verified commits and technical reflections, you stand out above 99.9% of generic resume submitters.',
  },
];
