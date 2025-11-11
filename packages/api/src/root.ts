import { authRouter } from "./router/auth";
import { emailRouter } from "./router/email";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  email: emailRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
