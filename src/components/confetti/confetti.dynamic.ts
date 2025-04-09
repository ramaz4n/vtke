import dynamic from 'next/dynamic';

export const DynamicConfetti = dynamic(
  () => import('./confetti').then((res) => res.Confetti),
  { ssr: false },
);
