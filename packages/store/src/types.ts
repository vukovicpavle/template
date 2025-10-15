// Common types for the store

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  isLoading: boolean;
}

export interface CounterState {
  count: number;
}

// Actions interface for better type safety
export interface UserActions {
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export interface AppActions {
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
}

export interface CounterActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}