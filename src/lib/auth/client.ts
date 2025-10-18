import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import "client-only";

export const authClient = createAuthClient({
  plugins: [magicLinkClient()],
});

export type Session = typeof authClient.$Infer.Session;
