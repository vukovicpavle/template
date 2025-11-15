/**
 * Phone number authentication utilities
 * Provides SMS sending functionality for phone-based authentication
 */

/**
 * Send OTP via SMS
 * In development mode, logs to console
 * In production, uses Twilio if configured, otherwise logs to console
 */
export async function sendPhoneOTP(
  phoneNumber: string,
  code: string,
  config?: {
    twilioAccountSid?: string;
    twilioAuthToken?: string;
    twilioPhoneNumber?: string;
  },
): Promise<void> {
  // If Twilio credentials are provided, use Twilio
  if (
    config?.twilioAccountSid &&
    config.twilioAuthToken &&
    config.twilioPhoneNumber
  ) {
    try {
      // Dynamically import Twilio only when needed to avoid bundling it
      const twilio = await import("twilio");
      const client = twilio.default(
        config.twilioAccountSid,
        config.twilioAuthToken,
      );

      await client.messages.create({
        to: phoneNumber,
        from: config.twilioPhoneNumber,
        body: `Your verification code is: ${code}`,
      });

      console.log(`[Phone Auth] SMS sent to ${phoneNumber} via Twilio`);
    } catch (error) {
      console.error("[Phone Auth] Failed to send SMS via Twilio:", error);
      // Fall back to logging
      console.log(`[Phone Auth] Fallback - OTP for ${phoneNumber}: ${code}`);
    }
  } else {
    // In development or when Twilio is not configured, log to console
    console.log(
      `[Phone Auth] OTP for ${phoneNumber}: ${code} (Twilio not configured)`,
    );
  }
}
