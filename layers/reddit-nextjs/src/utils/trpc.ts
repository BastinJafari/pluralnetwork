// import { httpBatchLink } from '@trpc/client';
// import { createTRPCNext } from '@trpc/next';
// import { createHTTPHandler } from '@trpc/server/adapters/standalone';
// import { Context, createContext } from '../server/context'
// import { AppRouter, appRouter } from "../server/routers/_app";
// import { NextPageContext } from "next";
//
//
// function getBaseUrl() {
//   if (typeof window !== 'undefined')
//     // browser should use relative path
//     return '';
//
//   if (process.env.VERCEL_URL)
//     // reference for vercel.com
//     return `https://${process.env.VERCEL_URL}`;
//
//   if (process.env.RENDER_INTERNAL_HOSTNAME)
//     // reference for render.com
//     return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
//
//   // assume localhost
//   return `http://localhost:${process.env.PORT ?? 3000}`;
// }
//
// type CustomContext = Context & NextPageContext
// export const trpc = createTRPCNext<AppRouter, CustomContext>({
//   config(opts) {
//     return {
//       links: [
//         httpBatchLink({
//           /**
//            * If you want to use SSR, you need to use the server's full URL
//            * @link https://trpc.io/docs/v11/ssr
//            **/
//           url: `${getBaseUrl()}/api/trpc`,
//
//           // You can pass any HTTP headers you wish here
//           async headers() {
//             return {
//               // authorization: getAuthCookie(),
//             };
//           },
//         }),
//       ],
//     };
//   },
//   /**
//    * @link https://trpc.io/docs/v11/ssr
//    **/
//   ssr: false,
// });
//


import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import SuperJSON from "superjson";
import { AppRouter } from "../server/routers/_app";
import { Context } from "../server/context";
import * as jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { initTRPC } from "@trpc/server";


function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: 0,
          },
        },
      },
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});


const t = initTRPC.context<Context>().create();
export const publicProcedure = t.procedure;

const authedProcedure = t.procedure.use(async (opts) => {
  const { ctx } = opts

  console.log('authedProcedure')
  console.log('ctx', ctx)
  if (!ctx.jwt) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      jwt: ctx.jwt,

    },
  });
});
export const redditUserProcedure = authedProcedure.use((opts) => {
    const { ctx } = opts

    console.log('redditUserProcedure')
    console.log('ctx', ctx)

    jwt.verify(ctx.jwt, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
          });
        }
        if (decoded !== ctx.user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
          });
        }
      }
    );
    return opts.next({
      ctx: {
        user: ctx.user,
        jwt: ctx.jwt,
      },
    });
  }
);
