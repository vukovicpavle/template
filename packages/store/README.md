# @acme/store

Shared Zustand state management package for the ACME monorepo.

## Features

- 🔧 **Shared State Management**: Works seamlessly across Next.js and React Native (Expo) apps
- 💾 **Persistence**: User and app settings persist using `zustand/middleware`
- 🛠️ **Developer Tools**: Counter store includes devtools integration
- 📦 **TypeScript**: Full TypeScript support with proper type definitions
- 🎯 **Convenience Hooks**: Pre-built hooks for common patterns

## Installation

This package is already included in the monorepo workspace. Both apps can import it using:

```bash
pnpm add @acme/store
```

## Usage

### Counter Store (with DevTools)

```tsx
import { useCounterStore } from '@acme/store';

function CounterComponent() {
  const { count, increment, decrement, reset } = useCounterStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### User Store (with Persistence)

```tsx
import { useUser } from '@acme/store';
// or
import { useUserStore } from '@acme/store';

function UserComponent() {
  const { user, setUser, clearUser } = useUser();
  
  const handleLogin = () => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    });
  };
  
  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={clearUser}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### App Settings Store (with Persistence)

```tsx
import { useTheme, useLoading } from '@acme/store';
// or
import { useAppStore } from '@acme/store';

function AppSettingsComponent() {
  const { theme, setTheme } = useTheme();
  const { isLoading, setLoading } = useLoading();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      
      <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
      <button onClick={() => setLoading(!isLoading)}>
        Toggle Loading
      </button>
    </div>
  );
}
```

## Store Architecture

### Available Stores

1. **useUserStore**: Manages user authentication state with localStorage persistence
2. **useAppStore**: Manages app-wide settings (theme, loading) with localStorage persistence  
3. **useCounterStore**: Simple counter example with Redux DevTools integration

### Convenience Hooks

- `useUser()`: Simplified access to user state and actions
- `useTheme()`: Simplified access to theme state and actions
- `useLoading()`: Simplified access to loading state and actions

## Cross-Platform Compatibility

This package works seamlessly across:

- ✅ **Next.js** (Web)
- ✅ **React Native (Expo)** (Mobile)

The persistence middleware automatically adapts to the platform:
- Web: Uses `localStorage`
- React Native: Uses `AsyncStorage` (automatically detected)

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type { User, AppState, CounterState } from '@acme/store';
```

## Development

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Formatting
pnpm format
```