"use client";

import React from "react";
import { 
  useCounterStore, 
  useUser, 
  useTheme, 
  useLoading,
  type User 
} from "@acme/store";

export function StoreDemo() {
  const { count, increment, decrement, reset } = useCounterStore();
  const { user, setUser, clearUser } = useUser();
  const { theme, setTheme } = useTheme();
  const { isLoading, setLoading } = useLoading();

  const handleSetUser = () => {
    const newUser: User = {
      id: "1",
      name: "Jane Smith",
      email: "jane@example.com",
    };
    setUser(newUser);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLoading = () => {
    setLoading(!isLoading);
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Zustand Store Demo
      </h2>
      
      {/* Counter Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Counter: {count}
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={increment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Increment
          </button>
          <button 
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Decrement
          </button>
          <button 
            onClick={reset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* User Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          User: {user ? user.name : 'Not logged in'}
        </h3>
        {user && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Email: {user.email}
          </p>
        )}
        <div className="flex space-x-2">
          <button 
            onClick={handleSetUser}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            Set User
          </button>
          <button 
            onClick={clearUser}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Clear User
          </button>
        </div>
      </div>

      {/* Theme Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Theme: {theme}
        </h3>
        <button 
          onClick={toggleTheme}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
        >
          Toggle Theme
        </button>
      </div>

      {/* Loading Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Loading: {isLoading ? 'Yes' : 'No'}
        </h3>
        <button 
          onClick={toggleLoading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
        >
          Toggle Loading
        </button>
      </div>
    </div>
  );
}