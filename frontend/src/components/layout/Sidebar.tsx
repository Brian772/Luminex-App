 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, CheckSquare, Layers, Folder, Plus } from 'lucide-react';
import { useLayoutStore } from '@/stores/useLayoutStore';

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const { setUploadModalOpen } = useLayoutStore();

  const baseLinkClass =
    'flex items-center gap-3 px-2 py-1.5 rounded-md text-[var(--color-text-primary)] transition-colors';

  const getLinkClass = (href: string) =>
    `${baseLinkClass} ${
      pathname === href
        ? 'bg-[var(--color-border-subtle)] font-medium'
        : 'hover:bg-[var(--color-border-subtle)]'
    }`;

  return (
    <aside
      className={`border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] flex-shrink-0 flex flex-col h-[calc(100vh-3.5rem)] transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'
      }`}
    >
      <div className="p-4">
        <button
          className="w-full bg-[var(--color-accent-primary)] hover:opacity-90 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 font-medium transition-opacity shadow-sm"
          onClick={() => setUploadModalOpen(true)}
        >
          <Plus size={18} />
          Unggah / Ekstrak
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          <div className="text-xs font-semibold text-[var(--color-text-primary)] opacity-50 uppercase tracking-wider mb-2 px-2">Menu Utama</div>
          <nav className="space-y-1">
            <Link href="/dashboard/semua-dokumen" className={getLinkClass('/dashboard/semua-dokumen')}>
              <FileText size={18} className="opacity-70" />
              Semua Dokumen
            </Link>
            <Link href="/dashboard/todo-list" className={getLinkClass('/dashboard/todo-list')}>
              <CheckSquare size={18} className="opacity-70" />
              To-Do List
            </Link>
            <Link href="/dashboard/flashcards" className={getLinkClass('/dashboard/flashcards')}>
              <Layers size={18} className="opacity-70" />
              Flashcards
            </Link>
          </nav>
        </div>

        <div>
          <div className="text-xs font-semibold text-[var(--color-text-primary)] opacity-50 uppercase tracking-wider mb-2 px-2">Folder Saya</div>
          <nav className="space-y-1">
            <Link href="/dashboard/folders/project-ai" className={getLinkClass('/dashboard/folders/project-ai')}>
              <Folder size={18} className="text-[var(--color-accent-secondary)] opacity-80" />
              Project AI
            </Link>
            <Link href="/dashboard/folders/materi-kuliah" className={getLinkClass('/dashboard/folders/materi-kuliah')}>
              <Folder size={18} className="opacity-50" />
              Materi Kuliah
            </Link>
            <Link href="/dashboard/folders/buku-jurnal" className={getLinkClass('/dashboard/folders/buku-jurnal')}>
              <Folder size={18} className="opacity-50" />
              Buku & Jurnal
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
