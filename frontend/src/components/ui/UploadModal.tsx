 'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useLayoutStore } from '@/stores/useLayoutStore';

export default function UploadModal() {
  const { isUploadModalOpen, setUploadModalOpen } = useLayoutStore();

  if (!isUploadModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setUploadModalOpen(false)}
    >
      <div
        className="bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] w-full max-w-md rounded-xl shadow-lg flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-subtle)]">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Unggah Dokumen</h2>
          <button 
            onClick={() => setUploadModalOpen(false)}
            className="p-1 rounded-md text-[var(--color-text-primary)] opacity-50 hover:opacity-100 hover:bg-[var(--color-border-subtle)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8">
          <div className="border-2 border-dashed border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)] transition-colors rounded-lg flex flex-col items-center justify-center py-12 px-4 cursor-pointer group">
            <div className="w-12 h-12 mb-4 rounded-full bg-[var(--color-border-subtle)] group-hover:bg-[var(--color-accent-primary)] group-hover:bg-opacity-20 flex items-center justify-center transition-colors">
              <span className="text-2xl opacity-50 group-hover:opacity-100 group-hover:text-[var(--color-accent-primary)]">+</span>
            </div>
            <p className="text-[var(--color-text-primary)] font-medium text-center">Area Drag & Drop File Upload</p>
            <p className="text-sm text-[var(--color-text-primary)] opacity-50 text-center mt-1">atau klik untuk memilih file (PDF, DOCX, TXT)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
