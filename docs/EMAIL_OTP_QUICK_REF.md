# Email OTP Quick Reference

## Configuration

### Environment Variables
```bash
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@yourdomain.com"
```

## Client API

### Request OTP
```typescript
await authClient.emailOtp.sendVerificationOtp({
  email: "user@example.com",
  type: "sign-in" | "email-verification" | "forget-password"
});
```

### Sign In with OTP
```typescript
const { data, error } = await authClient.emailOtp.signInEmailOtp({
  email: "user@example.com",
  otp: "123456"
});
```

### Verify Email (without sign-in)
```typescript
const { data, error } = await authClient.emailOtp.verifyEmailOtp({
  email: "user@example.com",
  otp: "123456"
});
```

## Settings

- **OTP Length**: 6 digits
- **Expiration**: 5 minutes
- **Max Attempts**: 3 per OTP
- **Supported Types**:
  - `sign-in` - Passwordless authentication
  - `email-verification` - Verify email address
  - `forget-password` - Password reset

## Integration Points

### Server
- `packages/auth/src/index.ts` - Email OTP plugin configuration

### Clients
- `apps/nextjs/src/auth/client.ts` - Next.js client with OTP support
- `apps/expo/src/utils/auth.ts` - Expo client with OTP support

### Database
- `packages/db/src/auth-schema.ts` - Verification table for OTP storage

## Documentation

See `docs/EMAIL_OTP_GUIDE.md` for complete guide with examples.
