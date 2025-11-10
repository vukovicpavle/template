# Module Layout Examples

This document provides examples of common module structures in the T3 Turbo monorepo.

## tRPC Router Module

### Structure

```
packages/api/src/router/
├── user.ts          # User-related endpoints
├── post.ts          # Post-related endpoints
└── index.ts         # Re-export all routers (optional)
```

### Example: User Router

```typescript
// packages/api/src/router/user.ts
import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";
import { eq } from "@acme/db";
import { User } from "@acme/db/schema";
import { protectedProcedure, publicProcedure } from "../trpc";

// Input schemas
const GetUserSchema = z.object({
  id: z.string(),
});

const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
});

// Router definition
export const userRouter = {
  // Public endpoint
  byId: publicProcedure
    .input(GetUserSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.query.User.findFirst({
        where: eq(User.id, input.id),
      });
    }),

  // Protected endpoint
  profile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.User.findFirst({
      where: eq(User.id, ctx.session.userId),
    });
  }),

  // Protected mutation
  update: protectedProcedure
    .input(UpdateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;
      
      // Verify ownership
      if (id !== ctx.session.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot update other users",
        });
      }

      return ctx.db
        .update(User)
        .set(updates)
        .where(eq(User.id, id))
        .returning();
    }),
} satisfies TRPCRouterRecord;
```

### Export in Root Router

```typescript
// packages/api/src/root.ts
import { router } from "../trpc";
import { userRouter } from "./router/user";
import { postRouter } from "./router/post";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
```

## Database Schema Module

### Structure

```
packages/db/src/
├── schema.ts        # Main schema definitions
├── auth-schema.ts   # Auth-related schemas (generated)
└── index.ts         # Exports
```

### Example: Schema Definition

```typescript
// packages/db/src/schema.ts
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const User = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Type exports
export type User = typeof User.$inferSelect;
export type NewUser = typeof User.$inferInsert;
```

### Export Types

```typescript
// packages/db/src/index.ts
export * from "./schema";
export * from "./client";

// Re-export commonly used types
export type { User, NewUser } from "./schema";
```

## React Component Module

### Structure

```
apps/nextjs/src/components/
├── user/
│   ├── UserProfile.tsx
│   ├── UserProfile.test.tsx (optional)
│   └── index.ts
└── shared/
    └── Button.tsx
```

### Example: User Profile Component

```typescript
// apps/nextjs/src/components/user/UserProfile.tsx
import type { User } from "@acme/db/schema";
import { Button } from "@acme/ui";

interface UserProfileProps {
  user: User;
  onEdit?: () => void;
}

export function UserProfile({ user, onEdit }: UserProfileProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
      {onEdit && (
        <Button onClick={onEdit}>Edit Profile</Button>
      )}
    </div>
  );
}
```

### Export

```typescript
// apps/nextjs/src/components/user/index.ts
export { UserProfile } from "./UserProfile";
```

## Zustand Store Module

### Structure

```
packages/store/src/
├── user-store.ts
├── types.ts
└── index.ts
```

### Example: User Store

```typescript
// packages/store/src/user-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@acme/db/schema";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);

// Convenience hook
export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  
  return { user, setUser, clearUser };
};
```

### Export

```typescript
// packages/store/src/index.ts
export { useUserStore, useUser } from "./user-store";
export type { UserState } from "./user-store";
```

## UI Component Module (shadcn/ui)

### Structure

```
packages/ui/src/
├── button.tsx
├── input.tsx
└── index.ts
```

### Example: Custom Button Variant

```typescript
// packages/ui/src/button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## Validator Module

### Structure

```
packages/validators/src/
├── user.ts
├── post.ts
└── index.ts
```

### Example: User Validators

```typescript
// packages/validators/src/user.ts
import { z } from "zod/v4";

export const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
});

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
```

## Best Practices

### File Organization

1. **One concept per file**: Each file should have a single responsibility
2. **Co-locate related files**: Keep related files together (component + test)
3. **Use index.ts for exports**: Simplify imports with barrel exports
4. **Group by feature**: Organize by feature, not by type

### Naming Conventions

- **Files**: kebab-case for utilities, PascalCase for components
- **Exports**: Match file name (PascalCase for components, camelCase for functions)
- **Types**: PascalCase, descriptive names

### Import Patterns

```typescript
// Type imports first
import type { User } from "@acme/db/schema";

// React/Next.js
import { useState } from "react";

// Third-party
import { z } from "zod/v4";

// @acme packages
import { Button } from "@acme/ui";

// Local imports
import { getUser } from "~/utils";
```
