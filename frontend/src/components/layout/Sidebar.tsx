"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, CheckSquare, Layers, Folder, Plus, BrainCircuit } from "lucide-react";
import { useLayoutStore } from "@/stores/useLayoutStore";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const { setUploadModalOpen } = useLayoutStore();

  const isActive = (href: string) => pathname === href;

  const getLinkClass = (href: string) =>
    `flex items-center gap-3 py-1.5 pl-3 pr-2 text-sm transition-all duration-200ms relative whitespace-nowrap ${
      isActive(href)
        ? "text-[var(--color-accent-primary)] translate-x-[6px] font-medium border-l-2 border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/[0.06] rounded-r-md"
        : "text-[var(--color-text-primary)] opacity-70 hover:opacity-100 hover:bg-[var(--color-border-subtle)] border-l-2 border-transparent rounded-r-md"
    }`;

  const getIconClass = (href: string) =>
    isActive(href) ? "text-[var(--color-accent-primary)]" : "text-[var(--color-text-primary)] opacity-60";

  return (
    <aside
      className={`border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] flex-shrink-0 h-[calc(100vh-3.5rem)] transition-all duration-300 overflow-hidden ${
        isOpen ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-64 flex flex-col h-full">
        <div className="p-4">
          <button
            className="w-full bg-[var(--color-accent-primary)] hover:opacity-90 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 font-medium transition-opacity shadow-sm whitespace-nowrap"
            onClick={() => setUploadModalOpen(true)}
          >
            <Plus size={18} className="flex-shrink-0" />
            Unggah / Ekstrak
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 space-y-5">
          <div>
            <div className="text-xs font-semibold text-[var(--color-text-primary)] opacity-40 uppercase tracking-wider mb-1 px-5 whitespace-nowrap">
              Menu Utama
            </div>
            <nav className="space-y-0.5 px-3">
              <Link href="/dashboard/semua-dokumen" className={getLinkClass("/dashboard/semua-dokumen")}>
                <FileText size={16} className={`flex-shrink-0 ${getIconClass("/dashboard/semua-dokumen")}`} />
                Semua Dokumen
              </Link>
              <Link href="/dashboard/ai-extract" className={getLinkClass("/dashboard/ai-extract")}>
                <BrainCircuit size={16} className={`flex-shrink-0 ${getIconClass("/dashboard/ai-extract")}`} />
                AI Brain Extractor
              </Link>
              <Link href="/dashboard/flashcards" className={getLinkClass("/dashboard/flashcards")}>
                <Layers size={16} className={`flex-shrink-0 ${getIconClass("/dashboard/flashcards")}`} />
                Flashcards
              </Link>
              <Link href="/dashboard/todo-list" className={getLinkClass("/dashboard/todo-list")}>
                <CheckSquare size={16} className={`flex-shrink-0 ${getIconClass("/dashboard/todo-list")}`} />
                To-Do List
              </Link>
            </nav>
          </div>

          <div>
            <div className="text-xs font-semibold text-[var(--color-text-primary)] opacity-40 uppercase tracking-wider mb-1 px-5 whitespace-nowrap">
              Folder Saya
            </div>
            <nav className="space-y-0.5 px-3">
              <Link href="/dashboard/folders/project-ai" className={getLinkClass("/dashboard/folders/project-ai")}>
                <Folder size={16} className={`flex-shrink-0 ${isActive("/dashboard/folders/project-ai") ? "text-[var(--color-accent-primary)]" : "text-[var(--color-accent-secondary)] opacity-80"}`} />
                Project AI
              </Link>
              <Link href="/dashboard/folders/materi-kuliah" className={getLinkClass("/dashboard/folders/materi-kuliah")}>
                <Folder size={16} className={`flex-shrink-0 ${getIconClass("/dashboard/folders/materi-kuliah")}`} />
                Materi Kuliah
              </Link>
              <Link href="/dashboard/folders/buku-jurnal" className={getLinkClass("/dashboard/folders/buku-jurnal")}>
                <Folder size={16} className={`flex-shrink-0 ${getIconClass("/dashboard/folders/buku-jurnal")}`} />
                Buku & Jurnal
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
