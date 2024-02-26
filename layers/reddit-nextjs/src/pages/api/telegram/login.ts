// import { NextRequest, NextResponse } from "next/server";
// import { TelegramClient } from "../../../../../gramjs/dist";
// import { StringSession } from "../../../../../gramjs/dist/sessions";
// import { useState } from "react";
//
// type LoginRequest = {
//   phone: string;
//   code?: string;
// }
//
// export const sendPhoneNumberAndPassword = async (phoneNumber, password) => {
//
//   const stringSession = new StringSession(""); // Pass your own string session here
//   const apiId = parseInt(process.env.TELEGRAM_API_ID)
//   const apiHash = process.env.TELEGRAM_API_HASH
//   const client = new TelegramClient(stringSession, apiId, apiHash, {
//     connectionRetries: 5,
//   });
//
//   await client.connect();
//   console.log("Connected to Telegram");
//   const { phoneCodeHash, isCodeViaApp } = await client.sendCode({
//     apiHash,
//     apiId,
//   }, phoneNumber)
//   console.log('phoneCodeHash', phoneCodeHash)
//   console.log('isCodeViaApp', isCodeViaApp)
//   const code = await client.signIn({
//     phoneNumber,
//     phoneCodeHash,
//     phoneCode: password
//   })
//   console.log('code', code)
//   return code
// }
// // const handler = async (request: NextRequest, response: NextResponse) => {
// //   console.log("Loading interactive example...");
// //   const stringSession = new StringSession(""); // Pass your own string session here
// //   const apiId = parseInt(process.env.TELEGRAM_API_ID)
// //   const apiHash = process.env.TELEGRAM_API_HASH
// //   const client = new TelegramClient(stringSession, apiId, apiHash, {
// //     connectionRetries: 5,
// //   });
// //
// //   await client.connect();
// //   console.log("Connected to Telegram");
// //   const { phoneCodeHash, isCodeViaApp } = await client.sendCode({
// //     apiHash,
// //     apiId,
// //   }, request.body.phone)
// //
// //
// // }
// //
// // export default handler;