import confetti from 'canvas-confetti';

export const triggerSuccessConfetti = () => {
  // Center burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#8B5CF6', '#A78BFA', '#22C55E', '#F59E0B', '#38BDF8', '#FFFFFF'],
    disableForReducedMotion: true,
  });

  // Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#8B5CF6', '#EC4899', '#22C55E'],
    });
  }, 150);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#8B5CF6', '#06B6D4', '#F59E0B'],
    });
  }, 300);
};

export const triggerStreakFlameConfetti = () => {
  confetti({
    particleCount: 60,
    spread: 80,
    origin: { y: 0.5 },
    colors: ['#F97316', '#EF4444', '#FDE047', '#8B5CF6'],
    shapes: ['circle'],
  });
};
