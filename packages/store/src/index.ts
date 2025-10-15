// Import stores for convenience hooks
import { useAppStore } from "./app-store";
import { useUserStore } from "./user-store";

// Re-export all stores
export { useUserStore } from "./user-store";
export { useAppStore } from "./app-store";
export { useCounterStore } from "./counter-store";

// Re-export types
export type * from "./types";

// Convenience hooks for common patterns
export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  return { user, setUser, clearUser };
};

export const useTheme = () => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  return { theme, setTheme };
};

export const useLoading = () => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setLoading = useAppStore((state) => state.setLoading);

  return { isLoading, setLoading };
};
