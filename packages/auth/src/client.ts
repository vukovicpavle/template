import {
  emailOTPClient,
  magicLinkClient,
  phoneNumberClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    magicLinkClient(),
    phoneNumberClient(),
    emailOTPClient(),
  ],
});

export { emailOTPClient, magicLinkClient, phoneNumberClient, usernameClient };
