'use client';

import React, { useCallback, useRef, useState } from 'react';
import { FileText, Upload, X, AlignLeft } from 'lucide-react';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useDocumentStore } from '@/stores/useDocumentStore';

type TabMode = 'file' | 'text';

export default function UploadModal() {
  const { isUploadModalOpen, setUploadModalOpen } = useLayoutStore();
  const { addDocument } = useDocumentStore();

  const [mode, setMode] = useState<TabMode>('file');
  const [isDragging, setIsDragging] = useState(false);
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setMode('file');
    setIsDragging(false);
    setTextTitle('');
    setTextContent('');
    setSelectedFile(null);
    setIsProcessing(false);
    // Increment key to force-remount the file input as a fresh uncontrolled element
    setFileInputKey((k) => k + 1);
  };

  const handleClose = () => {
    setUploadModalOpen(false);
    resetState();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const readFileAsText = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string ?? '');
      reader.onerror = reject;
      reader.readAsText(file, 'UTF-8');
    });

  const handleFile = (file: File) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/markdown'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!allowed.includes(file.type) && !['pdf', 'docx', 'txt', 'md'].includes(ext ?? '')) {
      alert('Format tidak didukung. Gunakan PDF, DOCX, TXT, atau MD.');
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const getFileType = (file: File): string => {
    const ext = file.name.split('.').pop()?.toUpperCase() ?? 'FILE';
    return ext;
  };

  const handleSubmitFile = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      let content = '';
      const ext = selectedFile.name.split('.').pop()?.toLowerCase();
      if (ext === 'pdf') {
        // For PDF, store placeholder — backend will process later
        content = `[Konten PDF: "${selectedFile.name}"]\n\nFile ini akan diproses oleh AI untuk mengekstrak teks, ringkasan, dan wawasan utama.\n\nUkuran: ${formatFileSize(selectedFile.size)}`;
      } else {
        content = await readFileAsText(selectedFile);
      }

      addDocument({
        title: selectedFile.name.replace(/\.[^.]+$/, ''),
        content,
        fileType: getFileType(selectedFile),
        fileSize: formatFileSize(selectedFile.size),
      });

      handleClose();
    } catch {
      alert('Gagal membaca file. Coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitText = () => {
    const title = textTitle.trim() || 'Dokumen Tanpa Judul';
    const content = textContent.trim();
    if (!content) return;

    addDocument({
      title,
      content,
      fileType: 'TEKS',
      fileSize: `${content.length} karakter`,
    });

    handleClose();
  };

  if (!isUploadModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] w-full max-w-lg rounded-xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-subtle)]">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Unggah / Ekstrak Dokumen</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-[var(--color-text-primary)] opacity-50 hover:opacity-100 hover:bg-[var(--color-border-subtle)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b border-[var(--color-border-subtle)]">
          {(['file', 'text'] as TabMode[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab)}
              className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors border-b-2 ${
                mode === tab
                  ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]'
                  : 'border-transparent text-[var(--color-text-primary)] opacity-50 hover:opacity-80'
              }`}
            >
              {tab === 'file' ? <><Upload size={14} /> Unggah File</> : <><AlignLeft size={14} /> Tempel Teks</>}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          {mode === 'file' ? (
            <>
              {/* Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-10 px-4 cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/[0.06] scale-[0.99]'
                    : selectedFile
                    ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/[0.04]'
                    : 'border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]/60'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  key={fileInputKey}
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,.md"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />

                {selectedFile ? (
                  <div className="text-center">
                    <FileText size={32} className="text-[var(--color-accent-primary)] mx-auto mb-2" />
                    <p className="font-semibold text-[var(--color-text-primary)]">{selectedFile.name}</p>
                    <p className="text-xs text-[var(--color-text-primary)] opacity-50 mt-1">{formatFileSize(selectedFile.size)}</p>
                    <button
                      className="mt-3 text-xs text-[var(--color-text-primary)] opacity-40 hover:opacity-80 transition-colors underline"
                      onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setFileInputKey((k) => k + 1); }}
                    >
                      Ganti file
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={32} className="text-[var(--color-text-primary)] opacity-30 mx-auto mb-3" />
                    <p className="font-medium text-[var(--color-text-primary)]">Drag & drop atau klik untuk memilih</p>
                    <p className="text-xs text-[var(--color-text-primary)] opacity-40 mt-1">PDF, DOCX, TXT, MD didukung</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmitFile}
                disabled={!selectedFile || isProcessing}
                className="w-full py-2.5 rounded-lg bg-[var(--color-accent-primary)] text-white font-medium text-sm transition-opacity disabled:opacity-40 hover:opacity-90"
              >
                {isProcessing ? 'Memproses...' : 'Buka Dokumen'}
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Judul dokumen (opsional)"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border border-[var(--color-border-subtle)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent-primary)] text-[var(--color-text-primary)] transition-colors"
                />
                <textarea
                  placeholder="Tempel atau ketik teks dokumen kamu di sini..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 bg-transparent border border-[var(--color-border-subtle)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent-primary)] text-[var(--color-text-primary)] transition-colors resize-none leading-relaxed"
                />
              </div>
              <button
                onClick={handleSubmitText}
                disabled={!textContent.trim()}
                className="w-full py-2.5 rounded-lg bg-[var(--color-accent-primary)] text-white font-medium text-sm transition-opacity disabled:opacity-40 hover:opacity-90"
              >
                Buka Dokumen
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
