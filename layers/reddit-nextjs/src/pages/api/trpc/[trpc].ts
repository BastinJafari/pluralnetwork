/**
 * This file contains tRPC's HTTP response handler
 */

// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext,
//   onError({ error }) {
//     if (error.code === 'INTERNAL_SERVER_ERROR') {
//       console.error('Something went wrong', error);
//     }
//   },
//   batching: {
//     enabled: true,
//   },
// });

// export default createHTTPHandler({
//   router: appRouter,
//   createContext,
//   onError({ error }) {
//     if (error.code === 'INTERNAL_SERVER_ERROR') {
//       console.error('Something went wrong', error);
//     }
//   },
//   batching: {
//     enabled: true,
//   },
// });
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";
import { createContext } from "../../../server/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
});