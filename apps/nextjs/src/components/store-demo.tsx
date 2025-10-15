"use client";

import React from "react";

import type { User } from "@acme/store";
import { useCounterStore, useLoading, useTheme, useUser } from "@acme/store";

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
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLoading = () => {
    setLoading(!isLoading);
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
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
            className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Increment
          </button>
          <button
            onClick={decrement}
            className="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            Decrement
          </button>
          <button
            onClick={reset}
            className="rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* User Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          User: {user ? user.name : "Not logged in"}
        </h3>
        {user && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Email: {user.email}
          </p>
        )}
        <div className="flex space-x-2">
          <button
            onClick={handleSetUser}
            className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            Set User
          </button>
          <button
            onClick={clearUser}
            className="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
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
          className="rounded bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
        >
          Toggle Theme
        </button>
      </div>

      {/* Loading Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Loading: {isLoading ? "Yes" : "No"}
        </h3>
        <button
          onClick={toggleLoading}
          className="rounded bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
        >
          Toggle Loading
        </button>
      </div>
    </div>
  );
}
