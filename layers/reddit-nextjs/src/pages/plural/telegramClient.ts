'use Server'

import { TelegramClient } from "telegram";

export const createTelegramClient = async ({ stringSession, apiId, apiHash }) => {
  'use server'

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  return client
};
