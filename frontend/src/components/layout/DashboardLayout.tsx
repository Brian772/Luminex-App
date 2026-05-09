'use client';

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import UploadModal from '../ui/UploadModal';
import { useLayoutStore } from '@/stores/useLayoutStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, isZenMode, toggleZenMode } = useLayoutStore();

  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg-primary)] overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen && !isZenMode} />

        <div className="flex-1 flex flex-col relative">
          <button
            onClick={toggleZenMode}
            className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-full text-xs font-medium text-[var(--color-text-primary)] shadow-sm hover:border-[var(--color-accent-primary)] transition-colors opacity-50 hover:opacity-100"
          >
            {isZenMode ? 'Exit Zen Mode' : 'Zen Mode'}
          </button>

          {children}
        </div>

        <RightPanel isOpen={!isZenMode} />
      </div>

      <UploadModal />
    </div>
  );
}
