import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  theme: "light" | "dark";
  isLoading: boolean;
  setTheme: (theme: "light" | "dark") => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: "light",
      isLoading: false,
      setTheme: (theme) => set({ theme }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "acme-app-storage", // unique name for localStorage key
    },
  ),
);
