 'use client';

import React, { FormEvent, KeyboardEvent, useState } from 'react';
import { Send, Settings2 } from 'lucide-react';

type TabType = 'ringkasan' | 'tugas' | 'flashcards';

export default function RightPanel({ isOpen }: { isOpen: boolean }) {
  const [activeTab, setActiveTab] = useState<TabType>('ringkasan');
  const [chatInput, setChatInput] = useState('');

  const submitChatMessage = (event?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
    event?.preventDefault();
    const message = chatInput.trim();
    if (!message) return;
    console.log('Chat prompt:', message);
    setChatInput('');
  };

  return (
    <aside
      className={`border-l border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] flex-shrink-0 h-[calc(100vh-3.5rem)] overflow-hidden transition-all duration-300 ${
        isOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 pointer-events-none'
      }`}
    >
      {/* Fixed-width inner container prevents text wrapping during width animation */}
      <div className="w-80 flex flex-col h-full">
        {/* Tabs */}
        <div className="flex border-b border-[var(--color-border-subtle)] px-2 pt-2">
          {(['ringkasan', 'tugas', 'flashcards'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-2 pt-1 px-1 text-sm font-medium capitalize transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]'
                  : 'border-transparent text-[var(--color-text-primary)] opacity-60 hover:opacity-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'ringkasan' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[var(--color-text-primary)] opacity-50 uppercase tracking-wider whitespace-nowrap">Poin Utama</span>
                <button className="text-[var(--color-text-primary)] opacity-50 hover:opacity-100 p-1 rounded hover:bg-[var(--color-border-subtle)] transition-colors">
                  <Settings2 size={16} />
                </button>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] mt-1.5 flex-shrink-0" />
                  <span>AI bertindak sebagai &quot;Second Brain&quot; untuk mempercepat pengambilan keputusan strategis.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] mt-1.5 flex-shrink-0" />
                  <span>Evolusi pengelompokan manual ke otomatisasi menggunakan LLM.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] mt-1.5 flex-shrink-0" />
                  <span>3 pilar utama: Ekstraksi Konteks, Aksi Otomatis, dan Pemahaman Aktif.</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'tugas' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Placeholder Tugas</h4>
              <p className="text-sm text-[var(--color-text-primary)] opacity-70">
                Daftar tugas AI-generated akan ditampilkan di sini.
              </p>
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] p-5 rounded-xl shadow-sm">
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Placeholder Flashcards</h4>
                <p className="text-sm text-[var(--color-text-primary)] opacity-70">
                  Kumpulan flashcards hasil ekstraksi dokumen akan muncul pada panel ini.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]">
          <form className="relative" onSubmit={submitChatMessage}>
            <input
              type="text"
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  submitChatMessage(event);
                }
              }}
              placeholder="Tanya sesuatu tentang dokumen ini..."
              className="w-full pl-3 pr-10 py-2.5 bg-transparent border border-[var(--color-border-subtle)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent-primary)] text-[var(--color-text-primary)] transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 p-1 text-[var(--color-accent-primary)] hover:opacity-80 transition-opacity"
              aria-label="Kirim pesan"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}

