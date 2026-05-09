'use client';

import { useLayoutStore } from '@/stores/useLayoutStore';

interface DashboardPlaceholderProps {
  title: string;
  description: string;
}

export default function DashboardPlaceholder({ title, description }: DashboardPlaceholderProps) {
  const { isZenMode } = useLayoutStore();

  return (
    <main
      className={`flex-1 overflow-y-auto bg-[var(--color-bg-primary)] transition-all duration-300 ${
        isZenMode ? 'px-8 md:px-24' : 'px-6'
      } py-8`}
    >
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">{title}</h1>
        <p className="text-[var(--color-text-primary)] opacity-70">{description}</p>
      </div>
    </main>
  );
}
