import { trpcServer } from "../trpcInstance";
import { Context } from "../context";
import * as jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { initTRPC } from "@trpc/server";
import { telegram } from "./telegram";

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
  telegram
});

export type AppRouter = typeof appRouter;


