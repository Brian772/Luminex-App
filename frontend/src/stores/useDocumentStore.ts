import { create } from 'zustand';

export interface Document {
  id: string;
  title: string;
  content: string;
  fileType: string;
  fileSize: string;
  addedAt: Date;
}

interface DocumentState {
  documents: Document[];
  activeDocumentId: string | null;
  addDocument: (doc: Omit<Document, 'id' | 'addedAt'>) => void;
  setActiveDocument: (id: string) => void;
  removeDocument: (id: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  activeDocumentId: null,

  addDocument: (doc) => {
    const newDoc: Document = {
      ...doc,
      id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      addedAt: new Date(),
    };
    set((state) => ({
      documents: [...state.documents, newDoc],
      activeDocumentId: newDoc.id,
    }));
  },

  setActiveDocument: (id) => set({ activeDocumentId: id }),

  removeDocument: (id) =>
    set((state) => {
      const remaining = state.documents.filter((d) => d.id !== id);
      return {
        documents: remaining,
        activeDocumentId:
          state.activeDocumentId === id
            ? (remaining[remaining.length - 1]?.id ?? null)
            : state.activeDocumentId,
      };
    }),
}));
