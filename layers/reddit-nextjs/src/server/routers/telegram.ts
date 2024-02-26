// import { z } from "zod";
// import { PhoneNumber, TelegramVerificationCode } from "../../../types/user";
// import { StringSession } from "telegram/sessions";
// import { TelegramClient } from "telegram";
// import { redditUserProcedure } from "../context";

// import router from "next/router";
//
// export const telegramRouter = router({
//   healthcheck: procedure.query(() => 'yay!'),
//   // sendCode: redditUserProcedure.input(z.object({
//   //   phoneNumber: PhoneNumber,
//   password: z.string(),
//   phoneCode: TelegramVerificationCode.nullable()
// })).query(async ({ ctx, input }) => {
//   const apiHash = process.env.TELEGRAM_API_HASH;
//   const apiId = parseInt(process.env.TELEGRAM_API_ID);
//   const session = new StringSession("");
//   const client = new TelegramClient(session, apiId, apiHash, {});
//   console.log(';client Started')
//
//   client.start(
//     {
//       phoneNumber: input.phoneNumber as string,
//       password: () => new Promise((resolve, reject) => {
//         console.log(';password resolved')
//
//         resolve(input.password)
//       }),
//       phoneCode: () => new Promise((resolve, reject) => {
//         console.log(';phoneCode resolved')
//
//         resolve(null)
//       }),
//       onError: (err) => console.log(err)
//     }
//   )
//   await client.connect();
//
//
//   //   return {
//   //     text: "bla"
//   //   }
//   // })
//
//
// });
//
//
// export type AppRouter = typeof telegramRouter;

// src/trpc/router/greet/index.ts


// src/trpc/router/greet/hello.ts

import { z } from "zod";
import { trpcServer } from "../trpcInstance";

export const hello = trpcServer.procedure
  .input(
    z
      .object({
        text: z.string().nullish(),
      })
      .nullish()
  )
  .query(async ({ input }) => {
    return {
      greeting: `'Hello ${input?.text ?? "world"}`,
    };
  });
