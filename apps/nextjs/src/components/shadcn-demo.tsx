"use client";

import { useState } from "react";

import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";

export function ShadcnDemo() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  const handleSubmit = () => {
    setSubmittedValue(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col gap-8 rounded-lg border border-border bg-card p-8 shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">ShadCN UI Components Demo</h2>
        <p className="text-muted-foreground">
          Demonstrating Button and Input components from @acme/ui
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Button Variants Demo */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Button Variants</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* Button Sizes Demo */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Input Demo */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Input Component</h3>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter some text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="max-w-sm"
              />
              <Button onClick={handleSubmit} disabled={!inputValue.trim()}>
                Submit
              </Button>
            </div>
            {submittedValue && (
              <p className="text-sm text-muted-foreground">
                Submitted value: <span className="font-medium">{submittedValue}</span>
              </p>
            )}
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Interactive Example</h3>
          <div className="flex flex-col gap-3 rounded-md border border-border bg-muted/50 p-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="max-w-sm"
            />
            <Input
              type="password"
              placeholder="Enter your password"
              className="max-w-sm"
            />
            <div className="flex gap-3">
              <Button variant="primary">Sign In</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
