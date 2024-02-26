// import * as trpcNext from '@trpc/server/adapters/next';
// import * as jwt from 'jsonwebtoken';
// import { getSession } from "next-auth/react";
// import { initTRPC, TRPCError } from "@trpc/server";
//
// export async function createContext(
//   opts
//     : trpcNext.CreateNextContextOptions) {
//
//   console.log('creating Context')
//   const session = await getSession({ req: opts.req });
//   console.log('window,', window)
//
//   console.log('session', session)
//   let jwtString = null;
//   if (opts.req.headers.authorization) {
//
//     const secret = process.env.NEXTAUTH_SECRET
//     jwtString = opts.req.headers.authorization.split(' ')[1]
//     const user = jwt.verify(jwtString, secret)
//
//     return {
//       session,
//       user,
//       jwt: jwtString
//     };
//   }
//
//   // Create your context based on the request object
//   // Will be available as `ctx` in all your resolvers
//
//   // This is just an example of something you might want to do in your ctx fn
//
//
// }
//
// export const authedProcedure = initTRPC.context<typeof createContext>().create();
// authedProcedure.procedure.use(({ ctx, next, }) => {
//   console.log('t1.procedure.use')
//   console.log('ctx', ctx)
//   if (!ctx.user || !ctx.jwt) {
//     throw new TRPCError({ code: 'UNAUTHORIZED' });
//   }
//
//   return next({
//     ctx: {
//       // ✅ user value is known to be non-null now
//       user: ctx.user,
//       jwt: ctx.jwt,
//
//     },
//   });
//
// });
//
// export type Context = Awaited<ReturnType<typeof createContext>>;
//
// export const redditUserProcedure = initTRPC.context<Context>().create().procedure.use((opts) => {
//   console.log('t2.procedure.use')
//
//   console.log('opts', opts)
//   jwt.verify(opts.ctx.jwt, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         throw new TRPCError({
//           code: 'UNAUTHORIZED',
//         });
//       }
//       if (decoded !== opts.ctx.user) {
//         throw new TRPCError({
//           code: 'UNAUTHORIZED',
//         });
//       }
//     }
//   );
//   return opts.next({
//     ctx: {
//       user: opts.ctx.user,
//       jwt: opts.ctx.jwt,
//     },
//   });
// });
//
//
//

import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getToken, JWT } from "next-auth/jwt"
import * as process from "process";

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  jwt: JWT | null;
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createSSGHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    jwt: opts?.jwt
  };
}

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContext(opts: CreateNextContextOptions) {

  const req = opts.req;
  const secret = process.env.NEXTAUTH_SECRET
  let jwt = await getToken({ req, secret })
  console.log('jwt', jwt)

  const contextInner = await createContextInner({ jwt });

  return {
    ...contextInner,
    req: opts.req,
    res: opts.res,
  };
}

export type Context = Awaited<typeof createContextInner>;