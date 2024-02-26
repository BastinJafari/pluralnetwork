import { Context } from "./context";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const trpcServer = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return { shape, error };
  },
});
//
// const authedProcedure = t.procedure.use(async (opts) => {
//   const { ctx } = opts
//
//   console.log('authedProcedure')
//   console.log('ctx', ctx)
//   if (!ctx.user || !ctx.jwt) {
//     throw new TRPCError({ code: 'UNAUTHORIZED' });
//   }
//
//   return opts.next({
//     ctx: {
//       // ✅ user value is known to be non-null now
//       user: ctx.user,
//       jwt: ctx.jwt,
//
//     },
//   });
// });
// export const redditUserProcedure = authedProcedure.use((opts) => {
//     const { ctx } = opts
//
//     console.log('redditUserProcedure')
//     console.log('ctx', ctx)
//
//     jwt.verify(ctx.jwt, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//           throw new TRPCError({
//             code: 'UNAUTHORIZED',
//           });
//         }
//         if (decoded !== ctx.user) {
//           throw new TRPCError({
//             code: 'UNAUTHORIZED',
//           });
//         }
//       }
//     );
//     return opts.next({
//       ctx: {
//         user: ctx.user,
//         jwt: ctx.jwt,
//       },
//     });
//   }
// );




