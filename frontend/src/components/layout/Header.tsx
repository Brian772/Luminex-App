'use client';

import { Search, Bell, Sun, Moon, PanelLeft } from 'lucide-react';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useDocumentStore } from '@/stores/useDocumentStore';
import { usePathname } from 'next/navigation';

const PAGE_LABELS: Record<string, string> = {
  '/dashboard/semua-dokumen': 'Semua Dokumen',
  '/dashboard/todo-list': 'To-Do List',
  '/dashboard/flashcards': 'Flashcards',
};

export default function Header() {
  const { toggleSidebar, toggleDarkMode } = useLayoutStore();
  const { documents, activeDocumentId } = useDocumentStore();
  const pathname = usePathname();

  const activeDoc = documents.find((d) => d.id === activeDocumentId) ?? null;

  // Determine breadcrumb label for current route
  const pageLabel = PAGE_LABELS[pathname] ?? (pathname.startsWith('/dashboard/folders/')
    ? pathname.split('/').pop()?.split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')
    : 'Dashboard');

  return (
    <header className="h-14 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] flex items-center justify-between px-4 sticky top-0 z-10 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-[var(--color-border-subtle)] rounded-md transition-colors"
        >
          <PanelLeft size={20} className="text-[var(--color-text-primary)]" />
        </button>
        <div className="font-bold text-lg tracking-tight text-[var(--color-text-primary)] flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[var(--color-accent-primary)] flex items-center justify-center text-white text-xs">L</div>
          Luminex
        </div>
        <div className="hidden md:flex items-center text-sm text-[var(--color-text-primary)] opacity-70 ml-4 gap-2">
          <span>/</span>
          <span>{pageLabel}</span>
          {activeDoc && (
            <>
              <span>/</span>
              <span className="font-medium opacity-100 max-w-[200px] truncate">{activeDoc.title}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-2.5 top-2 text-[var(--color-text-primary)] opacity-50" />
          <input
            type="text"
            placeholder="Cari..."
            className="pl-8 pr-3 py-1.5 bg-transparent border border-[var(--color-border-subtle)] rounded-md text-sm focus:outline-none focus:border-[var(--color-accent-secondary)] w-48 text-[var(--color-text-primary)]"
          />
        </div>
        <button className="p-1.5 hover:bg-[var(--color-border-subtle)] rounded-md transition-colors text-[var(--color-text-primary)]">
          <Bell size={18} />
        </button>
        <button
          className="p-1.5 hover:bg-[var(--color-border-subtle)] rounded-md transition-colors text-[var(--color-text-primary)]"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <Sun size={18} className="hidden dark:block" />
          <Moon size={18} className="block dark:hidden" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[var(--color-accent-secondary)] text-white flex items-center justify-center ml-2 cursor-pointer text-sm font-medium">
          U
        </div>
      </div>
    </header>
  );
}

