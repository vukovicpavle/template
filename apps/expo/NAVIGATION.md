# Expo App Navigation Structure

This document describes the complete navigation structure of the Expo mobile application using Expo Router.

## Overview

The app uses **Expo Router** for file-based routing with a well-organized folder structure that includes route groups for logical separation of concerns.

## Route Structure

### Root Level Routes
Located in `src/app/`:

- **`index.tsx`** - Main home/entry screen
- **`splash.tsx`** - Splash screen shown during app initialization
- **`language-selection.tsx`** - Language selection screen
- **`aux.tsx`** - Auxiliary functionality screen
- **`onboarding.tsx`** - Onboarding flow for new users

### Route Groups

#### 1. Authentication Group `(auth)`
Located in `src/app/(auth)/`:

Contains all authentication-related screens:
- **`login.tsx`** - User login
- **`register.tsx`** - New user registration
- **`forgot-password.tsx`** - Password reset request
- **`register-verify-email.tsx`** - Email verification for new registrations
- **`forgot-password-verify-email.tsx`** - Email verification for password reset
- **`change-password.tsx`** - Password change form

**Layout**: `_layout.tsx` - Stack navigation with back button

#### 2. Main App Group `(main)`
Located in `src/app/(main)/`:

Contains the main app features with tab navigation:
- **`home.tsx`** - Main dashboard (Tab 1)
- **`feature-1.tsx`** - First main feature (Tab 2)
- **`feature-2.tsx`** - Second main feature (Tab 3)
- **`feature-3.tsx`** - Third main feature (Tab 4)

**Layout**: `_layout.tsx` - Tab navigation with Ionicons for each tab

#### 3. Settings Group `(settings)`
Located in `src/app/(settings)/`:

Contains all settings and configuration screens:
- **`profile.tsx`** - User profile management
- **`change-password.tsx`** - Password change from settings
- **`logout.tsx`** - Logout confirmation
- **`delete-account.tsx`** - Account deletion
- **`terms-and-conditions.tsx`** - Terms and conditions viewer
- **`privacy-policy.tsx`** - Privacy policy viewer
- **`cookie-policy.tsx`** - Cookie policy viewer
- **`theme.tsx`** - Theme/appearance settings
- **`subscription.tsx`** - Subscription management
- **`rate-app.tsx`** - App store rating prompt
- **`language.tsx`** - Language selection
- **`about.tsx`** - App information and version
- **`report-issue.tsx`** - Bug reporting
- **`help.tsx`** - Help and support
- **`notification-settings.tsx`** - Notification preferences

**Layout**: `_layout.tsx` - Stack navigation with back button

#### 4. Legal Group `(legal)`
Located in `src/app/(legal)/`:

Contains legal documentation screens:
- **`privacy-policy.tsx`** - Privacy policy
- **`terms-and-conditions.tsx`** - Terms and conditions
- **`cookie-policy.tsx`** - Cookie policy

**Layout**: `_layout.tsx` - Stack navigation with back button

### Feature Routes

#### Notifications
Located in `src/app/notifications/`:
- **`index.tsx`** - Notifications list and management

#### Search
Located in `src/app/search/`:
- **`index.tsx`** - Global search functionality

## Navigation Patterns

### Stack Navigation
Used for linear navigation flows (auth, settings, legal):
```typescript
<Stack
  screenOptions={{
    headerShown: true,
    headerBackTitle: "Back",
  }}
/>
```

### Tab Navigation
Used for main app features:
```typescript
<Tabs
  screenOptions={{
    headerShown: true,
    tabBarActiveTintColor: "#3b82f6",
  }}
>
  {/* Tab screens with icons */}
</Tabs>
```

### Root Layout
Located in `src/app/_layout.tsx`:
- Wraps the entire app with QueryClientProvider
- Configures theme-aware styling
- Defines screen titles and navigation options

## Placeholder Component

All screens currently use a reusable `PlaceholderScreen` component located in `src/components/placeholder-screen.tsx`.

### Features:
- Displays screen title
- Optional description text
- Optional icon (using Ionicons)
- Centered layout with ScrollView
- Theme-aware styling (dark/light mode)
- Clear indication that it's a placeholder

### Usage Example:
```typescript
import { Ionicons } from "@expo/vector-icons";
import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function ExampleScreen() {
  return (
    <PlaceholderScreen
      title="Screen Title"
      description="Screen description"
      icon={<Ionicons name="icon-name" size={64} color="#3b82f6" />}
    />
  );
}
```

## Navigation Flow Examples

### Authentication Flow
```
splash → login → register → register-verify-email → (main)/home
                 ↓
          forgot-password → forgot-password-verify-email → change-password
```

### Main App Flow
```
(main)/home ←→ (main)/feature-1 ←→ (main)/feature-2 ←→ (main)/feature-3
     ↓
  settings → (settings)/[various settings screens]
     ↓
  notifications
     ↓
  search
```

## Future Enhancements

The following items should be implemented in future iterations:

1. **Authentication Logic**
   - Implement actual authentication with Better Auth
   - Add protected routes
   - Handle session management

2. **Navigation Guards**
   - Add auth guards to protected routes
   - Implement onboarding flow detection
   - Handle deep linking

3. **Business Logic**
   - Replace placeholder screens with functional components
   - Implement actual features in feature-1, feature-2, feature-3
   - Add real data fetching with tRPC

4. **UI/UX Enhancements**
   - Add animations and transitions
   - Implement gesture handlers
   - Add loading states

5. **Internationalization**
   - Add i18n keys for all screen titles
   - Support dynamic language switching
   - RTL support

## File Naming Conventions

- **Route files**: kebab-case (e.g., `forgot-password.tsx`)
- **Component names**: PascalCase (e.g., `ForgotPasswordScreen`)
- **Layout files**: `_layout.tsx`
- **Index files**: `index.tsx`
- **Route groups**: `(group-name)`

## TypeScript Usage

All screens are fully typed with:
- Proper default exports for Expo Router
- Type-safe navigation props
- Consistent component structure

## Testing Navigation

To test navigation between screens, use the Expo Router Link component or imperative navigation:

```typescript
import { Link, router } from "expo-router";

// Declarative
<Link href="/(auth)/login">Go to Login</Link>

// Imperative
router.push("/(auth)/login");
router.replace("/(main)/home");
router.back();
```

## Related Documentation

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [Project Developer Guide](../../docs/DEVELOPER_GUIDE.md)
- [AI Context](../../docs/AI_CONTEXT.md)
