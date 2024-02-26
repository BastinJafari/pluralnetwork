import { Context } from "./context";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";


export const trpcServer = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return { shape, error };
  },
});




