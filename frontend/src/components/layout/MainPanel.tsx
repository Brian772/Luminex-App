 'use client';

import React, { useEffect, useRef, useState } from 'react';

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Masa Depan AI dalam Produktivitas</h1>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-primary)] opacity-60">
            <span>Ditambahkan 2 jam lalu</span>
            <span>•</span>
            <span>PDF (2.4 MB)</span>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-[var(--color-text-primary)] leading-relaxed space-y-6">
          <p>
            Kecerdasan Buatan (AI) bukan lagi sekadar alat bantu; ia telah menjadi &apos;Second Brain&apos; atau otak kedua bagi para profesional modern.
            <span className="bg-[var(--color-accent-secondary)] bg-opacity-20 rounded px-1 cursor-pointer hover:bg-opacity-40 transition-colors">Dengan kemampuannya mengekstrak konteks dari ribuan halaman dalam hitungan detik</span>,
            AI memungkinkan kita untuk fokus pada pengambilan keputusan strategis daripada terjebak dalam proses membaca manual yang memakan waktu.
          </p>
          
          <p>
            Konsep &quot;Second Brain&quot; yang diperkenalkan oleh Tiago Forte kini berevolusi. Dulu, kita harus secara manual menyusun, mengelompokkan, dan menandai catatan kita.
            Sekarang, dengan dukungan model bahasa besar (LLMs), sistem dapat secara otomatis mengenali pola, menghasilkan ringkasan yang relevan, dan bahkan memprediksi informasi apa yang akan kita butuhkan selanjutnya.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Tiga Pilar Produktivitas Baru</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Ekstraksi Konteks:</strong> Mengubah dokumen panjang menjadi inti sari yang mudah dicerna.</li>
            <li><strong>Aksi Otomatis:</strong> Mengubah poin-poin diskusi menjadi To-Do list yang dapat dilacak.</li>
            <li><strong>Pemahaman Aktif:</strong> Membantu pembelajaran melalui flashcards yang di-generate dari teks.</li>
          </ul>

          <p>
            Bayangkan sebuah ruang kerja di mana informasi tidak lagi menjadi beban (information overload), melainkan menjadi aliran pengetahuan yang siap digunakan kapan saja.
            Inilah yang ditawarkan oleh alat produktivitas berbasis AI generasi berikutnya.
          </p>
        </div>
      </div>
    </main>
  );
}
