#!/usr/bin/env node

/**
 * Test script for the email service
 *
 * Usage:
 *   RESEND_API_KEY=your_key node test-email.js to@example.com from@yourdomain.com
 *
 * This script demonstrates how to use the email service to send test emails.
 */
import { sendTestEmail } from "./src/demo.js";

const [, , to, from] = process.argv;

if (!to || !from) {
  console.error("Usage: node test-email.js <to> <from>");
  console.error(
    "Example: node test-email.js user@example.com noreply@yourdomain.com",
  );
  process.exit(1);
}

console.log(`Sending test email from ${from} to ${to}...`);

sendTestEmail(to, from)
  .then((result) => {
    if (result.success) {
      console.log("✅ Email sent successfully!");
      console.log(`Email ID: ${result.id}`);
    } else {
      console.error("❌ Failed to send email:");
      console.error(result.error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("❌ Unexpected error:");
    console.error(error);
    process.exit(1);
  });
