# Phone Number Authentication

This guide explains how to use phone number authentication in your application using the Better Auth phone number plugin.

## Overview

Phone number authentication allows users to sign in by providing their phone number and verifying it with an OTP (One-Time Password) code sent via SMS.

## Features

- **6-digit OTP codes** for verification
- **5-minute expiration** for security
- **SMS delivery** via Twilio (configurable)
- **Development mode** with console logging
- **Production mode** with actual SMS delivery
- **Rate limiting** and retry behavior built-in
- **Works on both web (Next.js) and mobile (Expo)**

## Configuration

### 1. Environment Variables

Add the following environment variables to your `.env` file:

```bash
# Required for Better Auth
AUTH_SECRET='your-secret-key'

# Optional: Twilio configuration for SMS delivery
TWILIO_ACCOUNT_SID='your-twilio-account-sid'
TWILIO_AUTH_TOKEN='your-twilio-auth-token'
TWILIO_PHONE_NUMBER='+1234567890'
```

**Note**: In development mode, OTP codes will be logged to the console if Twilio is not configured.

### 2. Database Schema

The phone number plugin adds the following fields to the `user` table:
- `phoneNumber` (text, unique)
- `phoneNumberVerified` (boolean)

Push the schema changes to your database:

```bash
pnpm db:push
```

## Usage

### Client-Side (Next.js)

The phone number authentication client is already configured in `apps/nextjs/src/auth/client.ts`.

#### Sending OTP

```typescript
import { authClient } from "~/auth/client";

// Request OTP for a phone number
async function sendOTP(phoneNumber: string) {
  try {
    await authClient.phoneNumber.sendOtp({
      phoneNumber: phoneNumber, // E.g., "+1234567890"
    });
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Failed to send OTP:", error);
  }
}
```

#### Verifying OTP and Signing In

```typescript
import { authClient } from "~/auth/client";

// Verify OTP and sign in
async function verifyAndSignIn(phoneNumber: string, code: string) {
  try {
    await authClient.phoneNumber.verifyOtp({
      phoneNumber: phoneNumber,
      code: code,
    });
    console.log("Successfully signed in");
  } catch (error) {
    console.error("Failed to verify OTP:", error);
  }
}
```

### Client-Side (Expo)

The phone number authentication client is already configured in `apps/expo/src/utils/auth.ts`.

Usage is identical to Next.js:

```typescript
import { authClient } from "~/utils/auth";

// Send OTP
await authClient.phoneNumber.sendOtp({
  phoneNumber: "+1234567890",
});

// Verify OTP
await authClient.phoneNumber.verifyOtp({
  phoneNumber: "+1234567890",
  code: "123456",
});
```

### Server-Side (Next.js)

The phone number plugin is configured on the server side in `apps/nextjs/src/auth/server.ts`.

Access user phone number information through the session:

```typescript
import { getSession } from "~/auth/server";

export default async function MyPage() {
  const session = await getSession();
  
  if (session?.user) {
    console.log("Phone Number:", session.user.phoneNumber);
    console.log("Verified:", session.user.phoneNumberVerified);
  }
  
  return <div>...</div>;
}
```

## Example: Complete Sign-In Flow

### Next.js Component

```typescript
"use client";

import { useState } from "react";
import { authClient } from "~/auth/client";

export function PhoneSignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await authClient.phoneNumber.sendOtp({ phoneNumber });
      setStep("code");
    } catch (error) {
      console.error("Failed to send OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await authClient.phoneNumber.verifyOtp({ phoneNumber, code });
      // User is now signed in
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Failed to verify OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  if (step === "phone") {
    return (
      <form onSubmit={handleSendOTP}>
        <input
          type="tel"
          placeholder="+1234567890"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Send Code
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyOTP}>
      <p>Enter the code sent to {phoneNumber}</p>
      <input
        type="text"
        placeholder="123456"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        maxLength={6}
      />
      <button type="submit" disabled={loading}>
        Verify
      </button>
      <button type="button" onClick={() => setStep("phone")}>
        Change Phone Number
      </button>
    </form>
  );
}
```

## SMS Provider Setup (Twilio)

### 1. Create a Twilio Account

1. Sign up at [twilio.com](https://www.twilio.com/)
2. Complete phone verification
3. Get a phone number for SMS

### 2. Get Credentials

1. Go to your [Twilio Console](https://console.twilio.com/)
2. Copy your **Account SID** and **Auth Token**
3. Copy your **Twilio Phone Number**

### 3. Configure Environment Variables

Add the credentials to your `.env` file:

```bash
TWILIO_ACCOUNT_SID='ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
TWILIO_AUTH_TOKEN='your_auth_token'
TWILIO_PHONE_NUMBER='+1234567890'
```

### 4. Verify Setup

When configured correctly, OTP codes will be sent via SMS in production. In development, they'll still be logged to the console for easier testing.

## Customization

### Custom OTP Length

Edit `packages/auth/src/index.ts`:

```typescript
phoneNumber({
  otpLength: 8, // Change from 6 to 8 digits
  // ...
})
```

### Custom Expiration Time

Edit `packages/auth/src/index.ts`:

```typescript
phoneNumber({
  expiresIn: 600, // Change from 300 (5 min) to 600 (10 min)
  // ...
})
```

### Custom SMS Message

Edit `packages/auth/src/phone.ts` to customize the SMS message:

```typescript
await client.messages.create({
  to: phoneNumber,
  from: config.twilioPhoneNumber,
  body: `Your MyApp verification code is: ${code}. Valid for 5 minutes.`,
});
```

### Phone Number Validation

Edit `packages/auth/src/index.ts` to add phone number validation:

```typescript
phoneNumber({
  phoneNumberValidator: (phoneNumber) => {
    // Must be E.164 format
    return /^\+[1-9]\d{1,14}$/.test(phoneNumber);
  },
  // ...
})
```

## Security Best Practices

1. **Always use HTTPS** in production
2. **Rate limit** OTP requests (built-in with Better Auth)
3. **Use E.164 format** for phone numbers (e.g., `+1234567890`)
4. **Keep Twilio credentials secure** (never commit to version control)
5. **Monitor SMS costs** through Twilio console
6. **Implement retry limits** on the client side

## Troubleshooting

### OTP Not Received

1. Check phone number format (must include country code, e.g., `+1234567890`)
2. Verify Twilio credentials are correct
3. Check Twilio console for delivery logs
4. Ensure sufficient Twilio account balance
5. Check spam/blocked messages on the phone

### Development Mode

In development mode without Twilio configured:
- OTP codes are logged to the server console
- Look for `[Phone Auth] OTP for +1234567890: 123456`
- Use these codes to test the verification flow

### Type Errors

If you see type errors after adding phone number authentication:
```bash
pnpm typecheck
```

If types are not recognized, restart your TypeScript server in your IDE.

## API Reference

### Client Methods

#### `authClient.phoneNumber.sendOtp()`

Send OTP to a phone number.

```typescript
await authClient.phoneNumber.sendOtp({
  phoneNumber: string, // E.164 format required
});
```

#### `authClient.phoneNumber.verifyOtp()`

Verify OTP and sign in.

```typescript
await authClient.phoneNumber.verifyOtp({
  phoneNumber: string,
  code: string, // 6-digit code
});
```

### Session Data

After successful authentication, the session includes:

```typescript
interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    phoneNumberVerified: boolean | null;
    // ...
  }
}
```

## Resources

- [Better Auth Phone Number Plugin Documentation](https://www.better-auth.com/docs/plugins/phone-number)
- [Twilio SMS Documentation](https://www.twilio.com/docs/sms)
- [E.164 Phone Number Format](https://en.wikipedia.org/wiki/E.164)
