import { create } from 'zustand';

interface LayoutState {
  isSidebarOpen: boolean;
  isZenMode: boolean;
  isDarkMode: boolean;
  isUploadModalOpen: boolean;
  toggleSidebar: () => void;
  toggleZenMode: () => void;
  toggleDarkMode: () => void;
  setUploadModalOpen: (isOpen: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isSidebarOpen: true,
  isZenMode: false,
  isDarkMode: false,
  isUploadModalOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleZenMode: () => set((state) => ({ isZenMode: !state.isZenMode })),
  toggleDarkMode: () =>
    set((state) => {
      const nextDarkMode = !state.isDarkMode;

      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', nextDarkMode);
        document.body.classList.toggle('dark', nextDarkMode);
      }

      return { isDarkMode: nextDarkMode };
    }),
  setUploadModalOpen: (isOpen: boolean) => set({ isUploadModalOpen: isOpen }),
}));
