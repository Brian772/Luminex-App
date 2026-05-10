'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { useDocumentStore } from '@/stores/useDocumentStore';
import { useLayoutStore } from '@/stores/useLayoutStore';

interface SelectionToolbarState {
  visible: boolean;
  x: number;
  y: number;
}

export default function MainPanel({ zenMode }: { zenMode: boolean }) {
  const panelRef = useRef<HTMLElement | null>(null);
  const [toolbar, setToolbar] = useState<SelectionToolbarState>({
    visible: false,
    x: 0,
    y: 0,
  });

  const { documents, activeDocumentId } = useDocumentStore();
  const { setUploadModalOpen } = useLayoutStore();

  const activeDoc = documents.find((d) => d.id === activeDocumentId) ?? null;

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim() ?? '';

      if (!selection || selection.rangeCount === 0 || selectedText.length === 0) {
        setToolbar((prev) => ({ ...prev, visible: false }));
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (!panelRef.current) return;

      const containerRect = panelRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2 - containerRect.left;
      const y = rect.top - containerRect.top - 44;

      setToolbar({
        visible: true,
        x,
        y: Math.max(8, y),
      });
    };

    const handleScroll = () => {
      setToolbar((prev) => ({ ...prev, visible: false }));
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const handleSelectionAction = (action: 'rangkum' | 'flashcard') => {
    const selectionText = window.getSelection()?.toString().trim() ?? '';
    if (!selectionText) return;

    if (action === 'rangkum') {
      console.log('Rangkum selection:', selectionText);
    } else {
      console.log('Buat Flashcard dari selection:', selectionText);
    }
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Baru saja ditambahkan';
    if (diffMins < 60) return `Ditambahkan ${diffMins} menit lalu`;
    if (diffHours < 24) return `Ditambahkan ${diffHours} jam lalu`;
    return `Ditambahkan ${diffDays} hari lalu`;
  };

  // ── Empty State ──────────────────────────────────────────────────────────────
  if (!activeDoc) {
    return (
      <main
        className={`relative flex-1 overflow-y-auto bg-[var(--color-bg-primary)] transition-all duration-300 flex items-center justify-center ${
          zenMode ? 'px-8 md:px-24' : 'px-6'
        } py-8`}
      >
        <div className="flex flex-col items-center text-center gap-4 max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-border-subtle)] flex items-center justify-center">
            <FileText size={28} className="text-[var(--color-text-primary)] opacity-30" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Belum ada dokumen</h2>
            <p className="text-sm text-[var(--color-text-primary)] opacity-50 leading-relaxed">
              Klik <strong>Unggah / Ekstrak</strong> di sidebar untuk menambahkan dokumen pertamamu.
            </p>
          </div>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            <Upload size={15} />
            Unggah / Ekstrak
          </button>
        </div>
      </main>
    );
  }

  // ── Document View ────────────────────────────────────────────────────────────
  return (
    <main
      ref={panelRef}
      className={`relative flex-1 overflow-y-auto bg-[var(--color-bg-primary)] transition-all duration-300 ${
        zenMode ? 'px-8 md:px-24' : 'px-6'
      } py-8`}
    >
      {toolbar.visible && (
        <div
          className="absolute z-20 -translate-x-1/2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] shadow-lg p-1 flex items-center gap-1 transition-all duration-200"
          style={{ left: toolbar.x, top: toolbar.y }}
        >
          <button
            onClick={() => handleSelectionAction('rangkum')}
            className="px-2.5 py-1 text-xs rounded-full hover:bg-[var(--color-border-subtle)] text-[var(--color-text-primary)] transition-colors"
          >
            Rangkum
          </button>
          <button
            onClick={() => handleSelectionAction('flashcard')}
            className="px-2.5 py-1 text-xs rounded-full hover:bg-[var(--color-border-subtle)] text-[var(--color-text-primary)] transition-colors"
          >
            Buat Flashcard
          </button>
        </div>
      )}

      <div className="max-w-[800px] mx-auto">
        {/* Document Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2 leading-tight">
            {activeDoc.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-primary)] opacity-60">
            <span>{formatDate(activeDoc.addedAt)}</span>
            <span>•</span>
            <span>{activeDoc.fileType} ({activeDoc.fileSize})</span>
          </div>
        </div>

        {/* Document Content */}
        <div className="text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap text-[0.9375rem]">
          {activeDoc.content}
        </div>
      </div>
    </main>
  );
}
