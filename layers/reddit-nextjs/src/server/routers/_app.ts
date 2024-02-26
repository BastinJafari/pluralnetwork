import { trpcServer } from "../trpcInstance";
import { hello } from "./telegram";

/**
 * This file contains the root router of your tRPC-backend
 */
// import { publicProcedure, router } from '../trpcInstance';
// import { redditUserProcedure } from "../context";
// import { telegramRouter } from "./telegram";
//
// export const appRouter = router({
//   telegram: telegramRouter,
//   healthcheck: publicProcedure.query(() => 'yay!'),
//
// });
//
//
// export type AppRouter = typeof appRouter;


export const appRouter = trpcServer.router({
  hello,
});

export type AppRouter = typeof appRouter;