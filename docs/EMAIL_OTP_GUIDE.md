# Email OTP Authentication Guide

This guide explains how to use the Email OTP (One-Time Password) authentication feature implemented with Better Auth.

## Overview

The Email OTP plugin allows users to authenticate by receiving a time-limited OTP code via email. This provides a passwordless authentication method that's secure and user-friendly.

## Configuration

### Environment Variables

Add the following to your `.env` file:

```bash
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@yourdomain.com"  # Must be from a verified domain in Resend
```

### Server Configuration

The email OTP plugin is configured in `packages/auth/src/index.ts` with the following settings:

- **OTP Length**: 6 digits
- **Expiration**: 5 minutes (300 seconds)
- **Allowed Attempts**: 3 (default)
- **Email Templates**: Includes styled HTML and plain text formats

## Usage

### Client-Side API

The email OTP client is available on both Next.js and Expo apps via the `authClient` object.

#### Request an OTP

To send an OTP code to a user's email:

```typescript
import { authClient } from "~/auth/client"; // or from your auth utils

// Request OTP for sign-in
await authClient.emailOtp.sendVerificationOtp({
  email: "user@example.com",
  type: "sign-in",
});

// Request OTP for email verification
await authClient.emailOtp.sendVerificationOtp({
  email: "user@example.com",
  type: "email-verification",
});

// Request OTP for password reset
await authClient.emailOtp.sendVerificationOtp({
  email: "user@example.com",
  type: "forget-password",
});
```

#### Verify OTP and Sign In

After the user receives the OTP code, verify it:

```typescript
import { authClient } from "~/auth/client";

// Verify and sign in with OTP
const { data, error } = await authClient.emailOtp.signInEmailOtp({
  email: "user@example.com",
  otp: "123456",
});

if (error) {
  console.error("Invalid or expired OTP:", error);
} else {
  console.log("Signed in successfully:", data);
}
```

#### Verify Email with OTP

For email verification (without signing in):

```typescript
import { authClient } from "~/auth/client";

const { data, error } = await authClient.emailOtp.verifyEmailOtp({
  email: "user@example.com",
  otp: "123456",
});

if (error) {
  console.error("Verification failed:", error);
} else {
  console.log("Email verified successfully:", data);
}
```

## Example UI Flow

### Next.js Example

```tsx
"use client";

import { useState } from "react";
import { authClient } from "~/auth/client";

export function OTPSignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState("");

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });
      setStep("otp");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const { error: signInError } = await authClient.emailOtp.signInEmailOtp({
      email,
      otp,
    });

    if (signInError) {
      setError("Invalid or expired OTP. Please try again.");
    } else {
      // Redirect to dashboard or refresh the page
      window.location.href = "/dashboard";
    }
  };

  if (step === "email") {
    return (
      <form onSubmit={handleRequestOTP}>
        <h2>Sign In with Email OTP</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send OTP</button>
        {error && <p className="error">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyOTP}>
      <h2>Enter OTP</h2>
      <p>We sent a code to {email}</p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit code"
        maxLength={6}
        required
      />
      <button type="submit">Verify</button>
      <button type="button" onClick={() => setStep("email")}>
        Change Email
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
```

### React Native (Expo) Example

```tsx
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { authClient } from "~/utils/auth";

export function OTPSignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState("");

  const handleRequestOTP = async () => {
    setError("");
    
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });
      setStep("otp");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    
    const { error: signInError } = await authClient.emailOtp.signInEmailOtp({
      email,
      otp,
    });

    if (signInError) {
      setError("Invalid or expired OTP. Please try again.");
    }
    // Navigation handled by Better Auth
  };

  if (step === "email") {
    return (
      <View>
        <Text>Sign In with Email OTP</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="Send OTP" onPress={handleRequestOTP} />
        {error ? <Text>{error}</Text> : null}
      </View>
    );
  }

  return (
    <View>
      <Text>Enter OTP</Text>
      <Text>We sent a code to {email}</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter 6-digit code"
        keyboardType="number-pad"
        maxLength={6}
      />
      <Button title="Verify" onPress={handleVerifyOTP} />
      <Button title="Change Email" onPress={() => setStep("email")} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
}
```

## Security Features

The email OTP implementation includes several security features:

1. **Time-Limited Codes**: OTPs expire after 5 minutes
2. **Attempt Limiting**: Maximum of 3 verification attempts per OTP (default)
3. **Secure Storage**: OTPs are stored securely in the database
4. **Email Verification**: Ensures the user has access to the provided email address
5. **Rate Limiting**: Built into Better Auth to prevent abuse

## OTP Types

Three types of OTP flows are supported:

1. **sign-in**: Passwordless authentication - sends OTP for signing in
2. **email-verification**: Verify user email address without signing in
3. **forget-password**: Password reset flow via OTP

## Troubleshooting

### OTP Email Not Received

1. Check that `RESEND_API_KEY` is valid
2. Ensure `EMAIL_FROM` is from a verified domain in Resend
3. Check spam/junk folders
4. Verify email service logs in Resend dashboard

### Invalid or Expired OTP

1. OTPs expire after 5 minutes - request a new one
2. Each OTP can only be used once
3. Maximum of 3 verification attempts per OTP

### Type Errors

If you encounter TypeScript errors, ensure:
1. The `emailOTPClient()` plugin is added to your auth client
2. Run `pnpm typecheck` to verify all types are correct

## API Reference

### Server-Side Endpoints

The following endpoints are automatically created by the email OTP plugin:

- `POST /api/auth/email-otp/send-verification-otp` - Send OTP email
- `POST /api/auth/email-otp/verify` - Verify OTP code
- `POST /api/auth/email-otp/sign-in` - Sign in with OTP

### Client Methods

#### `authClient.emailOtp.sendVerificationOtp(options)`

Send an OTP to the user's email.

**Parameters:**
- `email: string` - The recipient's email address
- `type: "sign-in" | "email-verification" | "forget-password"` - The purpose of the OTP

**Returns:** Promise that resolves when email is sent

#### `authClient.emailOtp.signInEmailOtp(options)`

Verify OTP and sign in the user.

**Parameters:**
- `email: string` - The user's email address
- `otp: string` - The 6-digit OTP code

**Returns:** Promise with user session data or error

#### `authClient.emailOtp.verifyEmailOtp(options)`

Verify OTP without signing in (for email verification).

**Parameters:**
- `email: string` - The user's email address
- `otp: string` - The 6-digit OTP code

**Returns:** Promise with verification result or error

## Further Reading

- [Better Auth Email OTP Documentation](https://www.better-auth.com/docs/plugins/email-otp)
- [Better Auth Core Concepts](https://www.better-auth.com/docs/concepts)
- [Resend Documentation](https://resend.com/docs)
